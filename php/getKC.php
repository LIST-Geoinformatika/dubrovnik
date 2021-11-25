<?php
ini_set('display_errors', 1);
header('content-type:text/html;charset=utf-8');
include_once ("../lib/db_connection.php");

$ko = $_GET["ko"];
$zgradnaKC = $_GET["zgradnaKC"];

if ($zgradnaKC == 'true') {
	//select only zgradne parcels
	$query = "	SELECT id, kc_broj 
				FROM dkp_kat_cestica 
				WHERE ko_id= $ko
				AND zgradna = 'TRUE'
				ORDER BY kc_broj ASC;";
} else {

	$query = "	SELECT id, kc_broj 
				FROM dkp_kat_cestica 
				WHERE ko_id= $ko
				AND zgradna IS NULL
				ORDER BY kc_broj ASC;";
}

$result = pg_query($query);

if (!$result) {
	echo "Problem with query " . $query . "<br/>";
	echo pg_last_error();
	exit();
}

$arr = pg_fetch_all($result);
echo json_encode($arr, JSON_UNESCAPED_UNICODE);

?>