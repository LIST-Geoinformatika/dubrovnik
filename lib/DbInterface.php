<?php

interface DbInterface {
	function getConnection();
	
	//function getVersionNumber();
	
	function executeQuery($tableName, $columns, $where, $queryStart, $queryLimit);
	
	function getResultNumRows();
	
	function fetchRow($rowIndex);
	
	function fetchArray();
	
	function fetchResultJson();
	
	function insertRow($tableName, $colNames, $colValues);
	
	function updateRow($tableName, $keyColNamesValues, $colNamesValues);
	
	function deleteRow($tableName, $keyColNamesValues);

	//function bulkInsert($tableName, $colNamesValues);
	
	//function bulkUpdate($tableName, $keyColNamesValues, $colNamesValues);
	
	//function bulkDelete($tableName, $keyColNamesValues);
}

?>