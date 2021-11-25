<?php
/**
*
* @author     Saša Vranić <sasa6554@gmail.com>
* @license    GPL
* @version    1.0.0
*/
include_once(__DIR__.'/DbInterface.php');
include_once(__DIR__.'/GfException.php');
include_once(__DIR__.'/config.php');
include_once(__DIR__.'/GfUtility.php');

class DbPgSql implements DbInterface {
	
	private $dbHost;
	private $dbUser;
	private $dbPass;
	private $dbName;
	private $dbHandler;
	private $queryText ='';
	private $queryTextAll ='';
	private $queryResult;
	private $resultNumRows;
	
	public function __construct () {
	    $this->dbHost 	= constant("DB_HOST");
	    $this->dbUser	= constant("DB_USER");
	    $this->dbPass 	= constant("DB_PASS");
	    $this->dbName 	= constant("DB_NAME");
	    
	    try {
	    	$this->dbHandler = pg_connect(
	    			"host=$this->dbHost
	    			dbname=$this->dbName
	    			user=$this->dbUser
	    			password=$this->dbPass");
	    
	    	if (!$this->dbHandler) {
	    		throw new GfException("Database connection error.\n" . pg_last_error($this->dbHandler));
	    	}
	    	
	    } catch (Exception $e) {
	    	echo $e->getMessage();
	    }
	}
	
	public function __destruct() {
		if (isset($this->dbHandler)) {
			pg_close($this->dbHandler);
			unset($this->dbHandler);
		}
	}
	
	public function getConnection() {
    	return $this->dbHandler;
	}

	public function closeConnection() {
		__destruct();
	}
	
	public function getVersionNumber() {
		return pg_version($this->dbHandler);
	}
	
	public function executeQuery($tableName, $columns, $where, $queryStart, $queryLimit, $orderClause = '', $whereOperator = ' = ') {
		// generate column list
		$colNames = arrayToString($columns, ',');
		
		// if where not null generate where list
		if ($where != null) {
		$whereText = 'WHERE ';
		/*$colNames = arrayToString($columns, ',');
			foreach ($where as $key => $value) {
				$whereText = $whereText . " $key = '$value' AND";
			}
			$whereText = rtrim($whereText, 'AND');*/
			$whereText = $whereText . associativeArrayToString($where, 'AND', $whereOperator);
		} else {
			$whereText = '';
		}
        if ($orderClause != '') {
            $orderBy = " ORDER BY " . $orderClause[0]['property'] . ' ' . $orderClause[0]['direction'];
        } else {
            $orderBy = '';
        }
        
		$queryStart != null ? $queryStart = "OFFSET $queryStart" : $queryStart = '';
		$queryLimit != null ? $queryLimit = "LIMIT $queryLimit" : $queryLimit = '';
		
		$this->queryText = "SELECT $colNames FROM $tableName $whereText $orderBy $queryLimit $queryStart";
		$this->queryTextAll = "SELECT COUNT(1) FROM $tableName $whereText"; // for paging grid
		
		try {
			if (!empty($this->queryText) || $this->queryText = "") {
				$this->queryResult = pg_query($this->dbHandler, $this->queryText);
			} else {
				throw new GfException("Query error.Query text not defined!");
			}
		
			if ($this->queryResult) {
				$this->resultNumRows = pg_num_rows($this->queryResult);
			} else {
				throw new GfException("Query execution error.\n" . pg_last_error($this->dbHandler));
			}
			return true;
		} catch (GfException $e) {
			$msgJson = $e->getMessageJson(); 
			return $msgJson; 
		}
	}
	
	public function getResultNumRows() {
		return $this->resultNumRows;
	}
	
	public function fetchRow($rowIndex) {
		$rowIndex = empty($rowIndex) ? 0 : $rowIndex;
		return pg_fetch_row($this->queryResult, $rowIndex);
	}
	
	public function fetchArray() {
		//return $this->queryResult->fetch_array();
		return pg_fetch_assoc($this->queryResult);
	}
	
	public function fetchResultJson($pagingGrid = true) {
		$rows = array();
		$i = 0;
		if ($pagingGrid == true) {
			$totalRowNoQueryResult = pg_fetch_row(pg_query($this->dbHandler, $this->queryTextAll), 0);
			$totalRowNum = $totalRowNoQueryResult[0];
			$rowNum = $this->getResultNumRows();
		} else {
			$totalRowNum = $this->getResultNumRows();
			$rowNum = $this->getResultNumRows();
		}
		
		while ($i<$rowNum) {
			$row = pg_fetch_array($this->queryResult, $i, PGSQL_ASSOC);
			array_push($rows, $row);
			$i++;
		}
		if ($rowNum != 0) {
           
            
            $jsonData = json_encode(
				array(
					'success' => true,
					'total' => $totalRowNum,
					'data' => $rows
                  
				)//,
				//JSON_UNESCAPED_UNICODE
			);
		} else {
			$jsonData = json_encode(
				array(
					'success' => false,
					'total' => $totalRowNum,
					'data' => ''
				)//, JSON_UNESCAPED_UNICODE
			);
		}
		//echo $jsonData;
		return $jsonData;
	}
	
	public function insertRow($tableName, $colNames, $colValues) {
		try {
			$colNames = arrayToString($colNames, ',');
			$colValues = arrayValuesToString($colValues, ',');
			
			$insertStmt = "INSERT INTO $tableName ($colNames) VALUES ($colValues)";
			
			$insSuccess = pg_query($this->dbHandler, $insertStmt);
			if ($insSuccess == false) {
				//$insSuccess2 = messageToJSON(true, "Unsuccessful insert!");
				throw new GfException("Insert error.\n" . pg_last_error($this->dbHandler));
			} else {
				$insSuccess = messageToJSON(true, "Successful insert!");
			}
            
            $insSuccess = json_encode(array(
            "success" => pg_last_error($this->dbHandler) == 0,
            "msg" => pg_last_error($this->dbHandler)
        ));
			
			return $insSuccess;
			
		} catch (GfException $e) {
			return $e->getMessageJson();
		}
	}
	
	public function updateRow($tableName, $keyColNamesValues, $colNamesValues) {
		$keyColNamesValues = associativeArrayToString($keyColNamesValues, 'AND');
		$colNamesValues = associativeArrayToString($colNamesValues, ',');
		
		$updateStmt = "UPDATE $tableName SET $colNamesValues WHERE $keyColNamesValues";
		
		$updSuccess = pg_query($this->dbHandler, $updateStmt);
        
        $updSuccess = json_encode(array(
            "success" => pg_last_error($this->dbHandler) == 0,
            "msg" => pg_last_error($this->dbHandler)
        ));
	
		return $updSuccess;
	}
	
	public function deleteRow($tableName, $keyColNamesValues) {
		$keyColNamesValues = associativeArrayToString($keyColNamesValues, 'AND');
		
		$deleteStmt = "DELETE FROM $tableName WHERE $keyColNamesValues";
		
		$delSuccess = pg_query($this->dbHandler, $deleteStmt);
        $delSuccess = json_encode(array(
            "success" => pg_last_error($this->dbHandler) == 0,
            "msg" => pg_last_error($this->dbHandler)
        ));
	
		return $delSuccess;
	}
}

?>