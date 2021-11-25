<?php
ini_set('display_errors',1);
header('content-type:text/html;charset=utf-8');  
include_once ("../lib/db_connection.php");


$sloj = $_GET["sloj"];
        
/*$query = 'SELECT id, opis, podrucje, gup_clanak,  opis_clanak FROM v_urbanapravila_poly WHERE ST_intersects(geom, (ST_Transform(ST_SetSRID(ST_Point('.$la.', '.$fi.'),4326),3765))) LIMIT 1;';*/
$query = "SELECT opis_sloja, boja, geometrija_legenda, rotacija FROM slojevi_stilovi WHERE tablica = '".$sloj."' ORDER BY naziv_sloja, opis_sloja ASC;";

// process results
//$myvalue = pg_result($myresult);

$result = pg_query($query); 
        if (!$result) { 
            echo "Problem with query " . $query . "<br/>"; 
            echo pg_last_error(); 
            exit(); 
        } 


$arr = pg_fetch_all($result);

//print_r($arr);
//$upit['arr'] = utf8_encode($arr);
//echo json_encode($arr);
echo json_encode($arr, JSON_UNESCAPED_UNICODE);

       // while($myrow = pg_fetch_assoc($result)) { 
       //     printf ("<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>", $myrow['id'], //htmlspecialchars($myrow['opis']), htmlspecialchars($myrow['podrucje'])); 
    //    } 


// print results
//print("My Value: $result<br />\n");


/* Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
*/

// if ($_GET['ip']):
    //    $ip = gethostbyname($_GET['ip']);
        //echo "IP adresa je: $ip" ;
	//	echo $_GET['koordSirina'];
//endif;  
//echo 'Koordinate: ' . $_GET['koordSirina'] . "; " . $_GET['koordDuzina'];


?>