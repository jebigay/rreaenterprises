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
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
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
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $_ENV['MAIL_PORT'];

    $mail->setFrom($_ENV['MAIL_USERNAME'], 'Website Contact');
    $mail->addAddress($_ENV['MAIL_USERNAME']);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(false);
    $mail->Subject = "New contact from $name";
    $mail->Body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";

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