<?php
// Varmistetaan että POST-dataa saatiin
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Ei suoraa pääsyä.");
}

// Haetaan ja suojataan lomakkeen kentät
$customer_name  = htmlspecialchars($_POST['customer_name']);
$customer_email = htmlspecialchars($_POST['customer_email']);
$customer_city  = htmlspecialchars($_POST['customer_city']);

$card_holder = htmlspecialchars($_POST['card_holder']);
$card_number = htmlspecialchars($_POST['card_number']);
$card_exp    = htmlspecialchars($_POST['card_exp']);
$card_cvc    = htmlspecialchars($_POST['card_cvc']);

// ============================
//  SÄHKÖPOSTIN LÄHETYS
// ============================

$to = $customer_email;   // Vastaanottaja (asiakas)
$subject = "Tilausvahvistus – Kiitos tilauksestasi!";

// Luodaan sähköpostin sisältö
$message = "
Hei $customer_name,

Kiitos tilauksestasi!

Tilaustiedot:
-------------------------------------
Nimi: $customer_name
Sähköposti: $customer_email
Paikkakunta: $customer_city

Maksutiedot (Demo):
Kortinhaltija: $card_holder
Kortin numero: $card_number
Voimassaolo: $card_exp
CVC: $card_cvc
-------------------------------------

Tämä on harjoitusprojektin sähköposti, ei oikea maksu.

Ystävällisin terveisin,
Verkkokauppa Demo
";

// Otsikot
$headers = "From: Verkkokauppa Demo <no-reply@demokauppa.fi>\r\n";
$headers .= "Reply-To: no-reply@demokauppa.fi\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Lähetetään sähköposti
$mail_sent = mail($to, $subject, $message, $headers);

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
        h2 { text-align: center; }
        .row { margin-bottom: 10px; }
        .label { font-weight: bold; }
        .success { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
    </style>
</head>
<body>

<div class="box">
    <h2>Tilaus vastaanotettu</h2>

    <?php if ($mail_sent): ?>
        <p class="success">Sähköpostivahvistus lähetettiin onnistuneesti!</p>
    <?php else: ?>
        <p class="error">Sähköpostin lähetys epäonnistui.</p>
    <?php endif; ?>

    <div class="row"><span class="label">Nimi:</span> <?= $customer_name ?></div>
    <div class="row"><span class="label">Sähköposti:</span> <?= $customer_email ?></div>
    <div class="row"><span class="label">Paikkakunta:</span> <?= $customer_city ?></div>

    <hr>

    <h3>Maksutiedot (DEMO)</h3>

    <div class="row"><span class="label">Kortinhaltija:</span> <?= $card_holder ?></div>
    <div class="row"><span class="label">Kortin numero:</span> <?= $card_number ?></div>
    <div class="row"><span class="label">Voimassaolo:</span> <?= $card_exp ?></div>
    <div class="row"><span class="label">CVC:</span> <?= $card_cvc ?></div>

    <hr>
    <p style="text-align:center;">(Tämä on vain esimerkkiprojekti — sähköpostit eivät ole oikeita maksuja.)</p>
</div>

</body>
</html>
