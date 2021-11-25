<?php
		include_once ("lib/DbPgSql.php");
		include_once ("lib/DbPgSqlStatement.php");

		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$loginTried = true;
			$loggedIn = false;
			if (isset($_POST['korisnickoime']) && strlen($_POST['korisnickoime']) > 0 && isset($_POST['lozinka']) && strlen($_POST['lozinka']) > 0) {
				$usrName = pg_escape_string(stripslashes($_POST['korisnickoime']));
				$pwd = pg_escape_string(stripslashes($_POST['lozinka']));

				$sql = "SELECT id, ime, prezime, rola FROM users WHERE usrname = '$usrName' AND pwd = md5('$pwd') AND rola = 'admin'";
				$dbPgSql = new DbPgSql();
				$dbHandler = $dbPgSql -> getConnection();
				$dbStmt = new DbPgSqlStatement($dbHandler, $sql);
				$data = $dbStmt -> fetchArray();

				if (isset($data['id'])) {
					session_start();
					$_SESSION['id'] = $data['id'];
					$_SESSION['ime'] = $data['ime'];
					$_SESSION['prezime'] = $data['prezime'];
					$_SESSION['rola'] = $data['rola'];
					header('Location: index.php');
					$loggedIn = true;
				} else {
					$loggedIn = false;
				}
			}
		} else {
			$loggedIn = false;
			$loginTried = false;
		}
		?>


		<?php

		include_once ("lib/DbPgSql.php");
		include_once ("lib/DbPgSqlStatement.php");

		session_start();
		if (isset($_SESSION['id'])) {
			if (isset($_POST['action'])== 'odjava') {
				session_unset();
				}
		}
		?>



		<script><?php
		if (isset($_SESSION['rola']) && $_SESSION['rola'] == 'public') {
			if (isset($_SESSION['id'])) {
				echo "var userId = {$_SESSION['id']};";
			} else {
				echo "var userId = 1;";
			}
			echo "var isPublic = true;";
		} else {
			if (isset($_SESSION['id'])) {
				echo "var userId = {$_SESSION['id']};";
			} else {
				echo "var userId = 1;";
			}
			echo "var isPublic = false;";
		}
		?></script>