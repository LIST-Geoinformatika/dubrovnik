<?php

function arrayToString ($array, $delimiter) {
	$outString = ''; // initialize value of a string
	foreach ($array as $value) {
		$outString = $outString . $value . $delimiter;
	}
	$outString = rtrim($outString, $delimiter);
	
	return $outString;
}

function arrayValuesToString ($array, $delimiter) {
	$outString = ""; // initialize value of a string
	foreach ($array as $value) {
        if ($value == 'null') {
            $outString = $outString . "$value" . $delimiter;
        } else {
            $outString = $outString . "'$value'" . $delimiter;
        }
	}
	$outString = rtrim($outString, $delimiter);
	
	return $outString;
}

function associativeArrayToString ($array, $delimiter, $whereOperator = '=') {
	$outString = ''; // initialize value of a string
    
	foreach ($array as $key => $value) {
        if ($value == 'null') {
            $outString = $outString . " $key = $value $delimiter";
        } else {
            if ($whereOperator == 'LIKE') {
                $outString = $outString . " $key $whereOperator $value $delimiter";
            } else {
                $outString = $outString . " $key $whereOperator '$value' $delimiter";
            }
        }
    }
	$outString = rtrim($outString, $delimiter);
    
	return $outString;
}

function stripSingleQuotes($value) {
	return str_replace("'", "", $value);
}

function stripDoubleQuotes($value) {
	return str_replace("'", "", $value);
}

function messageToJSON ($success, $message) {
	$msgJson = json_encode(
		array(
			'success' => $success,
			'total' => 0,
			'data' => $message
		)//, JSON_UNESCAPED_UNICODE
	);
	
	return $msgJson;
}