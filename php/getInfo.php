<?php
ini_set('display_errors', 1);
header('content-type:text/html;charset=utf-8');
include_once ("../lib/db_connection.php");

$fi = $_GET["fi"];
$la = $_GET["la"];
$layers_index = $_GET["upaljeni_slojevi"];

//Continus if the $layers_index has values
if ($layers_index != null) {

	$query = "SELECT index_sloja, naziv_sloja, naziv_tablice, naziv_stupca, naziv, geometry  FROM slojevi WHERE index_sloja IN ($layers_index) ORDER BY index_sloja;";
	$result = pg_query($query);
	$layers = pg_fetch_all($result);
	//print_r($layers);

	$records = array();
	$i = 0;

	foreach ($layers as $value) {
		//Tables with line or point geometry, intersect with the buffer of selected point

		
		
		
		if ($value['geometry'] == 'point') {

			//~8m buffer 0.0001
			$query = "SELECT $value[naziv_stupca] AS opis FROM $value[naziv_tablice] WHERE ST_Intersects(geom, (ST_Transform (ST_Buffer(ST_GeomFromText('POINT($la $fi)',4326),0.00003),3765)));";
			$result = pg_query($query);

			$arr_result = pg_fetch_all($result);
			$arr = array($arr_result);
			//print_r ($arr);

			//Delete empty records
			foreach ($arr as $key => $value1) {
				if (empty($value1[0])) {
					unset($arr);
				}
			}

			if (!empty($arr)) {
				$arr = array_values($arr);
				$records[$i]["index_sloja"] = $value['index_sloja'];
				$records[$i]["naziv_sloja"] = $value['naziv_sloja'];
				$records[$i]["naziv"] = $value['naziv'];
				$records[$i]["zapis"][] = $arr;

				$i++;
			}
		}
		
		
		
		elseif ($value['geometry'] == 'line') {

			//~8m buffer 0.0001
			$query = "SELECT $value[naziv_stupca] AS opis FROM $value[naziv_tablice] WHERE ST_Intersects(geom, (ST_Transform (ST_Buffer(ST_GeomFromText('POINT($la $fi)',4326),0.000025),3765)));";
			$result = pg_query($query);

			$arr_result = pg_fetch_all($result);
			$arr = array($arr_result);
			//print_r ($arr);

			//Delete empty records
			foreach ($arr as $key => $value2) {
				if (empty($value2[0])) {
					unset($arr);
				}
			}

			if (!empty($arr)) {
				$arr = array_values($arr);
				$records[$i]["index_sloja"] = $value['index_sloja'];
				$records[$i]["naziv_sloja"] = $value['naziv_sloja'];
				$records[$i]["naziv"] = $value['naziv'];
				$records[$i]["zapis"][] = $arr;

				$i++;
			}
		}

		//Tables with polygon geometry, intersect with the selected point
		elseif ($value['geometry'] == 'polygon') {

			$query = "SELECT $value[naziv_stupca] AS opis FROM $value[naziv_tablice] WHERE ST_Intersects(geom, (ST_Transform(ST_GeomFromText('POINT($la $fi)',4326),3765)));";
			$result = pg_query($query);

			$arr_result = pg_fetch_all($result);
			$arr = array($arr_result);
			//print_r ($arr);

			//Delete empty records
			foreach ($arr as $key => $value3) {
				if (empty($value3[0])) {
					unset($arr);
				}
			}

			if (!empty($arr)) {
				$arr = array_values($arr);
				$records[$i]["index_sloja"] = $value['index_sloja'];
				$records[$i]["naziv_sloja"] = $value['naziv_sloja'];
				$records[$i]["naziv"] = $value['naziv'];
				$records[$i]["zapis"][] = $arr;

				$i++;
			}
		}

	}

	//print_r($records);

	$reindexed_array = array_values($records);
	//print_r($reindexed_array);
	echo json_encode($records, JSON_UNESCAPED_UNICODE);
}
?>