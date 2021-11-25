<?php
include_once ("../lib/db_connection.php");

    $fi = $_POST['fi'];
	$la = $_POST['la'];
	$hdksX = $_POST['hdksX'];
	$hdksY = $_POST['hdksY'];
    $ime=$_POST['ime'];
    $email=$_POST['email'];
    $poruka=$_POST['poruka'];
    $naslov=$_POST['naslov'];
    $vrsta=$_POST['vrsta'];
    //neobavezna polja
    $oib=$_POST['oib'];
    $adresa=$_POST['adresa'];
    $skype=$_POST['skype'];
    $tel=$_POST['tel'];
    //ko i kc
    $ko=$_POST['koUpit'];
    $kc=$_POST['kcUpit'];
    // $from='From: '.$email;
    $from= "From: Urban Planning Portal <noreply@upp.com>\r\n" . "Reply-To: ".$ime." <".$email.">\r\n";
    $to='urbanizam@dubrovnik.hr';
    $subject='Upit UP4C Dubrovnik: '.$naslov;
    $body="Od: $ime\nE-mail: $email \nOIB: $oib \nAdresa: $adresa \nTelefon: $tel \nSkype: $skype \n\nVrsta upita: $vrsta \nKO: $ko \nKC: $kc \nPoruka:\n$poruka";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) { // this line checks that we have a valid email address
    mail($to, $subject, $body,$from);//This method sends the mail.
	
			//spremanje lokacije i upita u bazu
			$query = "INSERT INTO upit (ime_prezime, email, oib, adresa, kontakt, skype, naslov, poruka, vrsta, kat_opcina, kat_cestica, datum_upita, hdks_x, hdks_y, geom, geom_wgs)
			  VALUES
			 ('$ime', '$email', '$oib', '$adresa', '$tel', '$skype' , '$naslov', '$poruka', '$vrsta', '$ko', '$kc', now(), '$hdksX', '$hdksY', ST_Transform(ST_SetSRID(ST_Point('$la', '$fi'),4326),3765), ST_SetSRID(ST_Point('$la', '$fi'),4326))";

			//echo $query;
			$result = pg_query($query);
	
    echo "Poruka je poslana!"; // success message
    }
else
    {
    echo "Došlo je do greške, pokušajte ponovno!";
    }

// Subject of confirmation email.
$conf_subject = 'Urban Planning Portal Dubrovnik - Upit: ' . $_POST['naslov'];

// Who should the confirmation email be from?
$conf_sender = 'Urban Planning Portal <no-reply@myemail.upp>';

$msg = "Poštovani/a " . $_POST['ime'] .",\n\nVaš upit je zaprimljen i poslan na adresu Upravnog odjela za urbanizam, prostorno planiranje i zaštitu okoliša grada Dubrovnika. Ovo je automatska poruka, molimo da ne odgovarate na nju. \n\nSrdačan pozdrav,\nUrban Planning Portal\n\n" . "U nastavku su detalji poslanog upita: \n\n" . "Ime i prezime: " . $_POST['ime'] . "\nE-mail: " . $_POST['email'] . "\nOIB: " . $_POST['oib'] . "\nAdresa: " . $_POST['adresa'] . "\nTelefon: " . $_POST['tel'] . "\nSkype: " . $_POST['skype'] . "\nVrsta upita: " . $_POST['vrsta'] . "\nKO: " . $_POST['koUpit'] . "\nKC: " . $_POST['kcUpit'] . "\nPoruka:\n" . $_POST['poruka'];

mail( $_POST['email'], $conf_subject, $msg, 'From: ' . $conf_sender );

     /*   if($_POST['submit']) {
            if(mail($to,$subject,$body,$from)) {
            echo '<p>Poruka je poslana!</p>';
            } 
            else {
        echo '<p>Došlo je do greške, pokušajte ponovno!</p>';
        }
    }*/


?>