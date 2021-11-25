<?php

$host = 'localhost';
$port = '5432';
$dbname = 'up4c_du';
$user = 'up4c_du';
$password = 'p2vYShYzGk';
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
if (!$conn) {
	echo "Not connected : " . pg_error();
	exit;
}

?>
