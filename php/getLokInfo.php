<?php
ini_set('display_errors', 1);
header('content-type:text/html;charset=utf-8');
include_once ("../lib/db_connection.php");

/*
 * @author     		Irena Mitton
 * @email			irena.mitton@gmail.com
 * @date			2015/11/12
 * @project			Urban planning 4 citizens
 * @version    		1.0.0
 * @file name		getLokInfo
 * @description		Get location data based on the cadastral parcel from the pointed location
 */

//example: /getLokInfo.php?fi=42.659334&la=18.075138

$fi = $_GET["fi"];
$la = $_GET["la"];

$query_ins = 'INSERT INTO upit_lokinfo (geom, geom_wgs, datum) VALUES (ST_Transform(ST_SetSRID(ST_Point('.$la.', '.$fi.'),4326),3765), ST_SetSRID(ST_Point('.$la.', '.$fi.'),4326), now());';
$result_ins = pg_query($query_ins);

$query = "	SELECT id, ko_naziv, kc_broj
			FROM v_dkp_kat_cestica
			WHERE ST_Intersects(geom, (ST_Transform(ST_GeomFromText('POINT($la $fi)',4326),3765))) 
			ORDER BY ko_naziv, kc_broj;";
$result = pg_query($query);
$parcels = pg_fetch_all($result);
//print_r($parcels);

if (!empty($parcels)) {
	$i_p = 0;

	$records = array();

	//Search for interested tables
	$query = "	SELECT distinct (naziv_tablice), index_sloja, naziv_sloja, lok_info, naziv 
				FROM slojevi
				WHERE naziv_tablice IS NOT NULL
				AND lok_info IS NOT NULL
				ORDER BY index_sloja, naziv_tablice;";
	$result = pg_query($query);
	$tables = pg_fetch_all($result);

	//Search for records in the table that intersect with the cadastral parcel
	foreach ($parcels as $value_p) {

		$records[$i_p]["ko"] = $value_p['ko_naziv'];
		$records[$i_p]["kc"] = $value_p['kc_broj'];
		$records[$i_p]["id_kc"] = $value_p['id'];

		$i_t = 0;

		foreach ($tables as $value_t) {

			$query = "	SELECT $value_t[lok_info] 
						FROM $value_t[naziv_tablice] a
						INNER JOIN dkp_kat_cestica kc 
						ON ST_Intersects(a.geom, kc.geom)
						WHERE kc.id=$value_p[id];";

			$result = pg_query($query);
			$record = pg_fetch_all($result);

			if (!empty($record)) {
				$records[$i_p]["tables"][$i_t]["layer"] = $value_t['naziv_sloja'];
				$records[$i_p]["tables"][$i_t]["table_name"] = $value_t['naziv'];	
				$records[$i_p]["tables"][$i_t]["table"] = $value_t['naziv_tablice'];

				foreach ($record as $value_r) {
					$records[$i_p]["tables"][$i_t]["records"] = $record;
				}
				
				$i_t++;
			
			}

		}

		$i_p++;
	}

}

if (!empty($records)) {
	//$reindexed_array = array_values($records);
	//print_r($reindexed_array);
	//print_r($records);
	echo json_encode($records, JSON_UNESCAPED_UNICODE);
}
?>