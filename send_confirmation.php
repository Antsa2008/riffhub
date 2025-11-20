<?php
use PHPMailer\PHPmailer\PHPMailer;
use PHPMailer\PHPmailer\Exception;

require __DIR__ . '/vendor/autoload.php';

// Varmistetaan POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Ei suoraa pääsyä.");
}

// Lomaketiedot
$customer_name  = htmlspecialchars($_POST['customer_name']);
$customer_email = htmlspecialchars($_POST['customer_email']); // käyttäjän syöttämä
$customer_city  = htmlspecialchars($_POST['customer_city']);
$card_holder    = htmlspecialchars($_POST['card_holder']);
$card_number    = htmlspecialchars($_POST['card_number']);
$card_exp       = htmlspecialchars($_POST['card_exp']);
$card_cvc       = htmlspecialchars($_POST['card_cvc']);

// PHPMailer + Gmail
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;

    // Oma Gmail-tili (lähettäjänä)
    $mail->Username   = 'SINUN_GMAIL_OSOITE@gmail.com';
    $mail->Password   = 'SOVELLUSSALASANA';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Lähettäjä = sinun Gmail
    $mail->setFrom('SINUN_GMAIL_OSOITE@gmail.com', 'Verkkokauppa Demo');

    // Vastaanottaja = käyttäjän syöttämä sähköposti
    $mail->addAddress($customer_email, $customer_name);

    $mail->Subject = 'Tilausvahvistus – Kiitos tilauksestasi!';
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
</head>
<body>
<h2>Tilaus vastaanotettu</h2>

<?php if ($mail_sent): ?>
    <p style="color:green;">Sähköposti lähetettiin onnistuneesti käyttäjän antamaan osoitteeseen!</p>
<?php else: ?>
    <p style="color:red;">Sähköpostin lähetys epäonnistui: <?= $error_message ?></p>
<?php endif; ?>

<p>Nimi: <?= $customer_name ?></p>
<p>Sähköposti: <?= $customer_email ?></p>
<p>Paikkakunta: <?= $customer_city ?></p>

<h3>Maksutiedot (Demo)</h3>
<p>Kortinhaltija: <?= $card_holder ?></p>
<p>Kortin numero: <?= $card_number ?></p>
<p>Voimassaolo: <?= $card_exp ?></p>
<p>CVC: <?= $card_cvc ?></p>

</body>
</html>
