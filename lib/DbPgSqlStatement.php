<?php

class DbPgSqlStatement {
	private $queryText;
	private $queryResult;
	
	public function __construct($dbHandler, $queryText = "") {
		$this->queryText = $queryText;
		
		$this->queryResult = pg_query($dbHandler, $this->queryText);
		
		if ($this->queryResult) {
			null;//printf("Select returned %d rows.\n", $this->getResultNumRows());
		} else {
			printf("Error occured during execution of the query.\n"
				. "Err msg: " . pg_last_error($dbHandler));
			exit();
		}		
	}
	
	public function __destruct() {
		if (isset($this->queryText)) {
			unset($this->queryText);
		}
		if (isset($this->queryResult)) {
			unset($this->queryResult);
		}
	}
	
	public function getResultNumRows() {
		return pg_num_rows($this->queryResult);
	}
	public function fetchRow(int $rowIndex = NULL) {
		$rowIndex == NULL ? 0 : $rowIndex; 
		return pg_fetch_row($this->queryResult, $rowIndex);
	}
	
	public function fetchArray() {
		//return $this->queryResult->fetch_array();
		return pg_fetch_assoc($this->queryResult);
	}
	
	public function fetchAssocArray() {
		$rows = array();
		$i = 0;
		$rowNum = $this->getResultNumRows();
		while ($i<$rowNum) {
			$row = pg_fetch_array($this->queryResult, $i, PGSQL_ASSOC);
			array_push($rows, $row);
			$i++;
		}
		return $rows;
	}
	
	public function fetchResultJSON() {
		$rows = array();
		$i = 0;
		$rowNum = $this->getResultNumRows();
		while ($i<$rowNum) {
			$row = pg_fetch_array($this->queryResult, $i, PGSQL_ASSOC);
			array_push($rows, $row);
			$i++;
		}
        
        
        
		if ($rowNum != 0) {
			print_r(json_encode(
				array(
					'success' => true,
		            'total' => $rowNum,
		            'data' => $rows
                    
		        )//, JSON_UNESCAPED_UNICODE
				)
			);
		} else {
			print_r(json_encode(
				array(
					'success' => false,
					'total' => $rowNum
					)//, JSON_UNESCAPED_UNICODE
				)
				);
		}
	}

	public function fetchResultPagingGridJSON() {
		$rows = array();
		$i = 0;
		$rowNum = $this->getResultNumRows();
		while ($i<$rowNum) {
			$row = pg_fetch_array($this->queryResult, $i, PGSQL_ASSOC);
			array_push($rows, $row);
			$i++;
		}
        
         
        
		if ($rowNum != 0) {
			print_r(json_encode(
			array(
			'success' => true,
			'total' => $rowNum,
			'data' => $rows
               
			), JSON_UNESCAPED_UNICODE)
			);
		} else {
			print_r(json_encode(
			array(
			'success' => false,
			'total' => $rowNum
			), JSON_UNESCAPED_UNICODE)
			);
		}
	}
	

	/*public function update($tableName, $colNames, $colValues, $keyCol, $keyVal) {
		null;
	}

	public function delete($tableName, $keyColumn, $objectId) {
		null;
	}
	
	private function tableExists($table)
	{
		$this->queryText = "SELECT * FROM pg_catalog WHERE lower(table_name) = " . strtolower($tableName);
		$tablesInDb = $this->fetchArray();
		if($tablesInDb)
		{
			if(pg_num_rows($tablesInDb) == 1)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}*/
}

?>