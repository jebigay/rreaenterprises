<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

header('Content-Type: application/json');

// Validate required fields
if (
    empty($_POST['name']) ||
    empty($_POST['email']) ||
    empty($_POST['message']) ||
    empty($_POST['phone']) ||
    !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill all required fields.']);
    exit;
}

$name = htmlspecialchars(strip_tags($_POST['name']));
$email = htmlspecialchars(strip_tags($_POST['email']));
$phone = htmlspecialchars(strip_tags($_POST['phone']));
$message = htmlspecialchars(strip_tags($_POST['message']));

$allowedMimeTypes = [
    'image/*',
    'application/pdf'
];

if (!empty($_FILES['attachments']['name'][0])) {
    foreach ($_FILES['attachments']['tmp_name'] as $key => $tmp_name) {
        if ($_FILES['attachments']['error'][$key] === UPLOAD_ERR_OK) {
            $fileType = mime_content_type($tmp_name);
            if (!in_array($fileType, $allowedMimeTypes)) {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Invalid file type uploaded. Only images, Word, Excel, and PDFs are allowed.'
                ]);
                exit;
            }
        }
    }
}

$mail = new PHPMailer(true);

try {
    // SMTP config from .env
    $mail->isSMTP();
    $mail->Host = $_ENV['MAIL_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['MAIL_USERNAME'];
    $mail->Password = $_ENV['MAIL_PASSWORD'];
    $mail->SMTPSecure = $_ENV['MAIL_ENCRYPTION'];
    $mail->Port = $_ENV['MAIL_PORT'];

    $mail->setFrom('noreply@rreaenterprises.com', 'RREA Enterprises Contact Form');
    $mail->addAddress($_ENV['MAIL_USERNAME']);
    // $mail->addCC('roseaguilar11272013@gmail.com', 'Rose Aguilar');
    $mail->addCC('rudyaguilar11272013@gmail.com', 'Rudy Aguilar');
    // $mail->addCC('asteroid3112@gmail.com', 'Asteroid');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    // $mail->Subject = "New contact from $name";
    // $mail->Body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";

    $mail->Subject = "Inquiry from $name";

// HTML Email Template
    $mail->Body = "
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8' />
                <style>
                body {
                    font-family: 'Poppins', Arial, sans-serif;
                    line-height: 30px;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                }

                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border: 1px solid #e0e0e0;
                    border-radius: 5px;
                    padding: 20px;
                }

                .header {
                    background: linear-gradient(to bottom left, #3957EB,  #F213FC);
                    color: #ffffff;
                    padding: 15px;
                    text-align: center;
                    border-radius: 6px 6px 0 0;
                    font-size: 1.2rem;
                }
                
                .content {
                    padding: 20px;
                }

                .content p {
                    margin: 10px 0;
                    font-size: 1rem;
                    color: #333;
                }

                .label {
                    font-weight: bold;
                }

                .footer {
                    text-align: center;
                    font-size: 0.85rem;
                    color: #999;
                    margin-top: 20px;
                }
                </style>
            </head>
            <body>
                <div class='email-container'>
                <div class='header'>
                    New Contact Inquiry
                </div>
                <div class='content'>
                    <p><span class='label'>Name:</span> {$name}</p>
                    <p><span class='label'>Email:</span> {$email}</p>
                    <p><span class='label'>Contact Number:</span> {$phone}</p>
                    <p><span class='label'>Inquiry Message:</span> {$message}</p>
                </div>
                <div class='footer'>
                    This message was generated from your website contact form.
                </div>
                </div>
            </body>
            </html>
            ";

    if (!empty($_FILES['attachments']['name'][0])) {
        foreach ($_FILES['attachments']['tmp_name'] as $key => $tmp_name) {
            if ($_FILES['attachments']['error'][$key] === UPLOAD_ERR_OK) {
                $mail->addAttachment($tmp_name, $_FILES['attachments']['name'][$key]);
            }
        }
    }

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Email has been sent.']);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Mailer Error: ' . $mail->ErrorInfo
    ]);
}
?>