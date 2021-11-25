<?php
ini_set('display_errors',1);
header('content-type:text/html;charset=utf-8');  
include_once ("../lib/db_connection.php");

        
$query = 'SELECT id, ko_naziv FROM dkp_kat_opcina ORDER BY ko_naziv ASC';

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
?>