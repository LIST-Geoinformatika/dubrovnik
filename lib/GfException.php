<?php
/**
*
* @author     Saša Vranić <sasa6554@gmail.com>
* @license    GPL
* @version    1.0.0
*/
include_once(__DIR__.'/GfUtility.php');

class GfException extends Exception {
	
	protected $message;
	protected $code;
	protected $previous;
	protected $messageJson;
	
	public function __construct($message, $code = 0, Exception $previous = null) {
		parent::__construct($message, $code, $previous);
		$this->message = $message;
		$this->code = $code;
		$this->previous = $previous;
		$this->messageJson = messageToJSON(false, $this->message);
		echo $this->messageJson;
	}
	
	private function setMessageJson () {
		$this->messageJson =
			json_encode(
				array(
					'success' => false,
					'total' => 0,
					'data' => $this->message
				)//, JSON_UNESCAPED_UNICODE
			); 
	}

	public function getMessageJson () {
		return $this->messageJson;
	}
}

?>