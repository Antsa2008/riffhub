<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Composer autoload
require __DIR__ . '/vendor/autoload.php';

// Varmistetaan että POST-data saatiin
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Ei suoraa pääsyä.");
}

// Haetaan lomakkeen kentät
$customer_name  = htmlspecialchars($_POST['customer_name']);
$customer_email = htmlspecialchars($_POST['customer_email']);
$customer_city  = htmlspecialchars($_POST['customer_city']);

$card_holder = htmlspecialchars($_POST['card_holder']);
$card_number = htmlspecialchars($_POST['card_number']);
$card_exp    = htmlspecialchars($_POST['card_exp']);
$card_cvc    = htmlspecialchars($_POST['card_cvc']);

// =============================
// SÄHKÖPOSTIN LÄHETYS (PHPMailer + Gmail)
// =============================

$mail = new PHPMailer(true);

try {
    // Gmail SMTP asetukset
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    // *** VAIHDA TÄHÄN OMA GMAIL-OSOITE ***
    $mail->Username = 'OMA_GMAIL_OSOITE@gmail.com';

    // *** VAIHDA TÄHÄN GMAIL-SOVELLUSSALASANA ***
    $mail->Password = 'GMAIL_APPS_PASSWORD';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Lahettäjä
    $mail->setFrom('OMA_GMAIL_OSOITE@gmail.com', 'Verkkokauppa Demo');

    // Vastaanottaja (asiakas)
    $mail->addAddress($customer_email, $customer_name);

    // Aihe
    $mail->Subject = "Tilausvahvistus – Kiitos tilauksestasi!";

    // Viesti (HTML)
    $mail->isHTML(true);
    $mail->Body = "
    <h2>Kiitos tilauksestasi!</h2>
    <p><strong>Nimi:</strong> $customer_name<br>
    <strong>Sähköposti:</strong> $customer_email<br>
    <strong>Paikkakunta:</strong> $customer_city</p>

    <h3>Maksutiedot (DEMO)</h3>
    <p><strong>Kortinhaltija:</strong> $card_holder<br>
    <strong>Kortin numero:</strong> $card_number<br>
    <strong>Voimassaolo:</strong> $card_exp<br>
    <strong>CVC:</strong> $card_cvc</p>

    <p style='color:gray;'>Tämä on harjoitusprojektin automaattinen viesti.</p>
    ";

    // Tekstiversio
    $mail->AltBody = "
Kiitos tilauksestasi!

Nimi: $customer_name
Sähköposti: $customer_email
Paikkakunta: $customer_city

Maksutiedot (DEMO)
Kortinhaltija: $card_holder
Kortin numero: $card_number
Voimassaolo: $card_exp
CVC: $card_cvc
    ";

    // Lähetä
    $mail->send();
    $mail_sent = true;

} catch (Exception $e) {
    $mail_sent = false;
    $error_message = $mail->ErrorInfo;
}
?>

<!DOCTYPE html>
<html lang="fi">
<head>
    <meta charset="UTF-8">
    <title>Tilaus vastaanotettu</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        .box {
            background: white;
            padding: 20px;
            max-width: 500px;
            margin: auto;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .success { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
    </style>
</head>
<body>

<div class="box">
    <h2>Tilaus vastaanotettu</h2>

    <?php if ($mail_sent): ?>
        <p class="success">Sähköposti lähetettiin onnistuneesti! ✔</p>
    <?php else: ?>
        <p class="error">Sähköpostin lähetys epäonnistui.<br><?= $error_message ?></p>
    <?php endif; ?>

    <p><strong>Nimi:</strong> <?= $customer_name ?></p>
    <p><strong>Sähköposti:</strong> <?= $customer_email ?></p>
    <p><strong>Paikkakunta:</strong> <?= $customer_city ?></p>

    <h3>Maksutiedot (Demo)</h3>
    <p><strong>Kortinhaltija:</strong> <?= $card_holder ?></p>
    <p><strong>Kortin numero:</strong> <?= $card_number ?></p>
    <p><strong>Voimassaolo:</strong> <?= $card_exp ?></p>
    <p><strong>CVC:</strong> <?= $card_cvc ?></p>
</div>

</body>
</html>
