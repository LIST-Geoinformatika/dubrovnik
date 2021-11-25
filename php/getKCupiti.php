<?php
ini_set('display_errors', 1);
header('content-type:text/html;charset=utf-8');
include_once ("../lib/db_connection.php");

$ko = $_GET["ko"];


$query = "	SELECT kc.id, kc.kc_broj
			FROM  dkp_kat_cestica kc
			JOIN dkp_kat_opcina ko
			ON kc.ko_id = ko.id
			WHERE ko.ko_naziv = '".$ko."'
			ORDER BY kc.kc_broj ASC;";


$result = pg_query($query);

if (!$result) {
	echo "Problem with query " . $query . "<br/>";
	echo pg_last_error();
	exit();
}

$arr = pg_fetch_all($result);
echo json_encode($arr, JSON_UNESCAPED_UNICODE);

?>