 <?php
 use Dotenv\Dotenv;
require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

?>
  <body id="page-top">
    <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=d6fe0320-bebc-4b2a-ae2c-d3311435ae96"> </script>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger fourstack-title" href="#page-top">
          <img class="logo-header" src="<?= $_ENV['DOMAIN'] ?>img/homepage/rrea-logo.svg" />
        </a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive"
          aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto" id="dynamic-navbar">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="services.php" id="servicesDropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Services
              </a>
              <div class="dropdown-menu custom-dropdown" id="servicesMenu" aria-labelledby="servicesDropdown"></div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="portfolioDropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Portfolio
              </a>
              <div class="dropdown-menu custom-dropdown" id="portfolioMenu" aria-labelledby="portfolioDropdown">
              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0 ml-lg-3 search-form position-relative">
  <div class="search-wrapper position-relative w-100">
    <input class="form-control search-input w-100" type="search" placeholder="Search Services" aria-label="Search">
    <button type="submit" class="search-button position-absolute end-0 top-50 translate-middle-y">
      <i class="fas fa-search"></i>
    </button>
    <ul class="autocomplete-list"></ul>
  </div>
</form>


        </div>
      </div>
    </nav>