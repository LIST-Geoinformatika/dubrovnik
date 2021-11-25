<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- The above 3 meta tags *must* come first in the head; any other head content must come  *after* these tags -->
		<title>UPP | Dubrovnik</title>
		<link rel="icon" type="image/png" href="images/favicon-15.png">
		<!-- Bootstrap -->
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<!--link href="css/bootstrap3.0.0.min.css" rel="stylesheet"-->
		<!--bootstrap intro-->
		<link href="css/bootstrap-tour.min.css" rel="stylesheet">
		<!--css leaflet plugins-->

		<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css" />
		<!-- min -->
		<link rel="stylesheet" href="css/iconLayers.min.css">
		<link rel="stylesheet" href="css/L.Control.MousePosition.min.css" />
		<link rel="stylesheet" type="text/css" href="css/leaflet-measure.min.css" />
		<link rel="stylesheet" href="css/leaflet.zoomhome.min.css" />
		<link rel="stylesheet" href="css/styledLayerControl.min.css" />
		<link rel="stylesheet" href="css/MarkerCluster.min.css" />
		<link rel="stylesheet" href="css/MarkerCluster.Default.min.css" />
		<link rel="stylesheet" href="css/easy-button.min.css" />
		<link rel="stylesheet" href="css/L.Control.Sidebar.min.css" />
		<link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="css/chosen.min.css">
		<link rel="stylesheet" type="text/css" href="css/bootstrap-select.min.css">
		<link href="css/main.css" rel="stylesheet">
		<!-- min kraj -->


		<!-- normalni >
		<link rel="stylesheet" href="css/iconLayers.css">
		<link rel="stylesheet" href="css/L.Control.MousePosition.css" />
		<link rel="stylesheet" type="text/css" href="css/leaflet-measure.css" />
		<link rel="stylesheet" href="css/leaflet.zoomhome.css" />
		<link rel="stylesheet" href="css/styledLayerControl.css" />
		<link rel="stylesheet" href="css/MarkerCluster.css" />
		<link rel="stylesheet" href="css/MarkerCluster.Default.css" />
		<link rel="stylesheet" href="css/easy-button.css" />
		<link rel="stylesheet" href="css/L.Control.Sidebar.css" />
		<link rel="stylesheet" href="font-awesome/css/font-awesome.css">
		<link rel="stylesheet" type="text/css" href="css/chosen.css">
		<link rel="stylesheet" type="text/css" href="css/bootstrap-select.css">
		<link href="css/main.css" rel="stylesheet">
		< normalni kraj-->

		<!--Leaflet-->
		

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->

		<!--Skipte-->
		<script src="http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js"></script>

		<!--leaflet plugins-->

		<!-- min -->
		<script src="js/data/zgrade.js"></script>

		<script type="text/javascript" src="js/L.Control.MousePosition.min.js"></script>
		<script type="text/javascript" src="js/iconLayers.min.js"></script>
		<script type="text/javascript" src="js/leaflet.markercluster.js"></script>
		<script src="js/easy-button.min.js"></script>
		<script src="js/styledLayerControl.min.js"></script>
		<script src="js/L.Control.Sidebar.min.js"></script>
		<script src="js/NonTiledLayer.min.js"></script>
		<script src="js/NonTiledLayer.WMS.min.js"></script>
		<!-- min kraj -->

		<!-- normalni >
		<script type="text/javascript" src="js/L.Control.MousePosition.js"></script>
		<script type="text/javascript" src="js/iconLayers.js"></script>
		<script type="text/javascript" src="js/leaflet.markercluster.js"></script>
		<script src="js/easy-button.js"></script>
		<script src="js/styledLayerControl.js"></script>
		<script src="js/L.Control.Sidebar.js"></script>
				<script src="js/NonTiledLayer.js"></script>
		<script src="js/NonTiledLayer.WMS.js"></script>
		< normalni kraj -->

		<!--proj 4-->
		<script src="js/proj4.js"></script>
		<?php include("lib/login.php"); ?>
	</head>

		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-57245114-5"></script>
		<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'UA-57245114-5');
		</script>
	<body>
		<div class="loader"></div>
		<div id="cookie" style="display:none">
			<p>
				Urban Planning Portal koristi kolačiće (eng. cookies) radi boljeg korisničkog iskustva. Ako nastavite koristiti portal smatrat ćemo da ste suglasni s navedenom uporabom kolačića.
			</p>
			<button type="button" class="btn btn-default btn-s" onclick="makniObavijest()">
				U redu
			</button>

		</div>

		<div class='container-fluid'>
			<!--SIDEBAR-->
			<div id="sidebar">
				<div class="bs-example">
					<ul class="nav nav-tabs" id="myTab">
						<li class="active">
							<a href="#slojevi"><i class="fa fa-bars fa-lg"></i> Slojevi</a>
						</li>
						<li>
							<a href="#legenda"><i class="fa fa-info fa-lg"></i> Legenda</a>
						</li>
						<li>
							<a href="#login"><i class="fa fa-sign-in"></i></a>
						</li>
					</ul>

					<div class="tab-content">
						<div id="slojevi" class="tab-pane fade in active">
							<div>
								<div id="accord">
									<!--div-->
									<h3 class="grupeSlojeva">Temeljni slojevi</h3>
									<div class="prvaRazina">
										<label>
											<input class="radio" type="radio" name="osm" value="osm" style="display:inline" id="1000">
											OSM</label>
										<br>
										<label>
											<input class="radio" type="radio" name="base" value="base" style="display:inline" id="1001">
											Prazan sloj</label>
										<br>
										<label>
											<input class="radio" type="radio" name="dof_dgu" value="dof_dgu" style="display:inline" id="1002">
											DOF</label>
										<br>
										<label>
											<input class="radio" type="radio" name="hok_dgu" value="hok_dgu" style="display:inline" id="1003">
											HOK</label>
										<br>
									</div>
									<!--/div-->

									<!--div-->
									<h3 class="grupeSlojeva">GUP</h3>
									<div id="accord1">
										<div class="uvuceno">
											<a href="http://www.dubrovnik.hr/uploads/20141203/sluzbeni_glasnik_broj_9_27.%20rujna%202014.pdf#page=81" target="_blank" id="tekstGUP">Više o GUP-u</a>
										</div>
										<div class="uvuceno">
											<label>
												<input class="grupecheckbox" type="checkbox" name="svi_koristenje" value="svi_koristenje" style="display:inline" id="100">
											</label>
											<h4 class="podgrupeSlojevi" id="koristenje" style="display:inline-table"> Korištenje i namjena površina</h4>

											<div class="drugaRazina">
												<label for="0">
													<input class="checkbox" type="checkbox" name="namjena" value="namjena" style="display:inline" id="0">
													Namjena</label>
												<br>
											</div>
										</div>

										<div class="uvuceno">
											<label>
												<input class="grupecheckbox" type="checkbox" name="svi_infrastruktura" value="svi_infrastruktura" style="display:inline" id="101">
											</label for="101">
											<h4 class="podgrupeSlojevi" id="infrastruktura" style="display:inline-table"> Infrastruktura</h4>

											<div class="drugaRazina">
												<label for="1">
													<input class="checkbox" type="checkbox" name="promet" value="promet" style="display:inline" id="1">
													Promet</label>
												<br>
												<label for="2">
													<input class="checkbox" type="checkbox" name="telekomunikacija" value="telekomunikacija" style="display:inline" id="2">
													Telekomunikacija</label>
												<br>
												<label for="3">
													<input class="checkbox" type="checkbox" name="energetskisustavi" value="energetski_sustavi" style="display:inline" id="3">
													Energetski sustavi</label>
												<br>
												<label for="4">
													<input class="checkbox" type="checkbox" name="voda" value="voda" style="display:inline" id="4">
													Voda</label>
												<br>
												<label for="5">
													<input class="checkbox" type="checkbox" name="odvodnja" value="odvodnja" style="display:inline" id="5">
													Odvodnja</label>
												<br>
											</div>
										</div>

										<div class="uvuceno">
											<label>
												<input class="grupecheckbox" type="checkbox" name="svi_posebniuvjeti" value="svi_posebniuvjeti" style="display:inline" id="106">
											</label>
											<h4 class="podgrupeSlojevi" id="posebniuvjeti" style="display:inline-table"> Posebni uvjeti i ograničenja u <br>korištenju</h4>

											<div class="drugaRazina">
												<label id="zasticenapodrucjaprirode" for="6">
													<input class="checkbox" type="checkbox" name="zasticenapodrucjaprirode" value="v_zpb" style="display:inline" id="6">
													Zaštićena područja prirode</label>
												<br>
												<label id="nacionalnaekoloskamreza" for="7">
													<input class="checkbox" type="checkbox" name="ekomreza" value="v_nem" style="display:inline" id="7">
													Nacionalna ekološka mreža</label>
												<br>
												<label id="stanisnitip" for="8">
													<input class="checkbox" type="checkbox" name="stanisnitip" value="v_stanista" style="display:inline" id="8">
													Stanišni tip</label>
												<br>
												<label id="graditeljskabastina" for="9">
													<input class="checkbox" type="checkbox" name="graditeljskabastina" value="v_grad_bastina" style="display:inline" id="9">
													Graditeljska baština</label>
												<br>
												<label id="krajobraz" for ="10">
													<input class="checkbox" type="checkbox" name="krajobraz" value="krajobraz" style="display:inline" id="10">
													Krajobraz</label>
												<br>
											</div>
										</div>

										<div class="uvuceno">
											<label>
												<input class="grupecheckbox" type="checkbox" name="svi_mjereuredjenja" value="svi_mjereuredjenja" style="display:inline" id="111">
											</label>
											<h4 class="podgrupeSlojevi" id="mjereuredjenja" style="display:inline-table"> Mjere uređenja i zaštite</h4>

											<div class="drugaRazina">
												<label id="zastitaposebnihvrijednostiiobiljezja" for ="11">
													<input class="checkbox" type="checkbox" name="zastitaposebnihvrijednostiiobiljezja" value="zpvo" style="display:inline" id="11">
													Zaštita posebnih vrijednosti i obilježja</label>
												<br>
												<label for ="12">
													<input class="checkbox" type="checkbox" name="uredjenjezemljista" value="uredjenje_zemljista" style="display:inline" id="12">
													Uređenje zemljišta</label>
												<br>
												<label id="urbanapravila" for="13">
													<input class="checkbox" type="checkbox" name="urbanapravila" value="urbanapravila" style="display:inline" id="13">
													Urbana pravila</label>
												<br>
												<label id="posebnemjerezastite" for="14">
													<input class="checkbox" type="checkbox" name="posebnazastita" value="v_ppmz" style="display:inline" id="14">
													Primjena planskih mjera zaštite</label>
												<br>
											</div>
										</div>
									</div>

									<h3 class="grupeSlojeva" class="grupecheckbox" id="granice">Granice</h3>	
									<div class="prvaRazina">
										<label for="15">
											<input class="checkbox" type="checkbox" name="naselja" value="naselja" style="display:inline" id="15">
											Naselja</label>
										<br>
										<label for="16">
											<input class="checkbox" type="checkbox" name="gradskikotari" value="gradskikotari" style="display:inline" id="16">
											Gradski kotari</label>
										<br>
										<label for="17">
											<input class="checkbox" type="checkbox" name="gupgranice" value="gupgranice" style="display:inline" id="17">
											Granice GUP-a</label>
										<br>
									</div>


									<h3 class="grupeSlojeva" class="grupecheckbox" id="katastar">Katastar</h3>	
									<div class="prvaRazina">
										<label for="18">
											<input class="checkbox" type="checkbox" name="katopcine" value="katopcine" style="display:inline" id="18">
											Katastarske općine</label>
										<br>
										<label for="19">
											<input class="checkbox" type="checkbox" name="katcestice" value="katcestice" style="display:inline" id="19">
											Katastarske čestice</label>
										<br>
										<label for="20">
											<input class="checkbox" type="checkbox" name="zgrade" value="zgrade" style="display:inline" id="20">
											Zgrade</label>
										<br>
									</div>

									
									<h3 class="grupeSlojeva" class="grupecheckbox" id="odlagalista">Odlagališta otpada</h3>	
									<div class="prvaRazina">
										<label for="21">
											<input class="checkbox" type="checkbox" name="odlagalista" value="odlagalista" style="display:inline" id="21">
											Lokacije spremnika za odvojeno prikupljanje otpada</label>
										<br>
									</div>

									<h3 class="grupeSlojeva" class="grupecheckbox" id="stabla">Ljute naranče</h3>	
									<div class="prvaRazina">
										<label for="22">
											<input class="checkbox" type="checkbox" name="stabla" value="stabla" style="display:inline" id="22">
											Ljute naranče</label>
										<br>
									</div>

									<h3 class="grupeSlojeva" class="grupecheckbox" id="ljetnikovci">Ljetnikovci</h3>	
									<div class="prvaRazina">
										<label for="23">
											<input class="checkbox" type="checkbox" name="ljetnikovci" value="ljetnikovci" style="display:inline" id="23">
											Ljetnikovci</label>
										<br>
									</div>

									<h3 class="grupeSlojeva" class="grupecheckbox" id="zelenilo_u_oblacima">Zelenilo u oblacima</h3>	
									<div class="prvaRazina">
										<label for="24">
											<input class="checkbox" type="checkbox" name="zelenikoridori" value="zelenikoridori" style="display:inline" id="24">
											Zeleni koridori</label>
										<br>
										<label for="25">
											<input class="checkbox" type="checkbox" name="zastitnozelenilo" value="zastitnozelenilo" style="display:inline" id="25">
											Zaštitno zelenilo</label>
										<br>
										<label for="26">
											<input class="checkbox" type="checkbox" name="vanjskisportski" value="vanjskisportski" style="display:inline" id="26">
											Vanjski sportski sadržaji</label>
										<br>
										<label for="27">
											<input class="checkbox" type="checkbox" name="trgovi" value="trgovi" style="display:inline" id="27">
											Trgovi</label>
										<br>
										<label for="28">
											<input class="checkbox" type="checkbox" name="stambenozelenilo" value="stambenozelenilo" style="display:inline" id="28">
											Stambeno zelenilo</label>
										<br>
										<label for="29">
											<input class="checkbox" type="checkbox" name="spomenpodrucja" value="spomenpodrucja" style="display:inline" id="29">
											Spomen područja</label>
										<br>
										<label for="30">
											<input class="checkbox" type="checkbox" name="prirodnidoprirodni" value="prirodnidoprirodni" style="display:inline" id="30">
											Prirodni ili doprirodni zeleni prostori</label>
										<br>
										<label for="31">
											<input class="checkbox" type="checkbox" name="parkovi" value="parkovi" style="display:inline" id="31">
											Parkovi</label>
										<br>
										<label for="32">
											<input class="checkbox" type="checkbox" name="groblja" value="groblja" style="display:inline" id="32">
											Groblja</label>
										<br>
										<label for="33">
											<input class="checkbox" type="checkbox" name="djecjaigrimladi" value="djecjaigrimladi" style="display:inline" id="33">
											Dječja igrališta i prostori za mlade</label>
										<br>
									</div>
									
									<?php
									if(isset($_SESSION['id'])){
										echo'
									<h3 class="grupeSlojeva" class="grupecheckbox" id="upiti">Statistika</h3>	
									<div class="prvaRazina">
										<form action="">
											<label>
												<input class="checkbox" type="checkbox" name="markers" value="markers" style="display:inline" id="34">
												Poslani upiti</label>
											<br>
											<label>
												<input class="checkbox" type="checkbox" name="heat" value="heat" style="display:inline" id="35">
												Zahtjevi za lokacijsku informaciju</label>
										</form>
									</div>
									';	
									} else {	
									}									
									?>

								</div>
							</div>
						</div>
						<div id="legenda" class="tab-pane fade">
							<div>
								<p class="nemaslojeva">
									<i>Legenda se prikazuje samo za trenutno vidljive slojeve GUP-a.
									<br>
									Trenutno nema uključenih slojeva. Za uključivanje slojeva kliknite na izbornik slojevi te stavite kvačicu na sloj koji želite prikazati.</i>
								</p>
								<div id="accord2">
									<div class="namjenaLegenda">
										<h3 class="podgrupeSlojevi">Namjena</h3>
										<div></div>
									</div>

									<div class="prometLegenda">
										<h3 class="podgrupeSlojevi">Promet</h3>
										<div></div>
									</div>

									<div class="telekomunikacijaLegenda">
										<h3 class="podgrupeSlojevi">Telekomunikacija</h3>
										<div></div>
									</div>

									<div class="energetski_sustaviLegenda">
										<h3 class="podgrupeSlojevi">Energetski sustavi</h3>
										<div></div>
									</div>

									<div class="vodaLegenda">
										<h3 class="podgrupeSlojevi">Voda</h3>
										<div></div>
									</div>

									<div class="odvodnjaLegenda">
										<h3 class="podgrupeSlojevi">Odvodnja</h3>
										<div></div>
									</div>

									<div class="v_zpbLegenda">
										<h3 class="podgrupeSlojevi">Zaštićena područja prirode</h3>
										<div></div>
									</div>

									<div class="v_nemLegenda">
										<h3 class="podgrupeSlojevi">Nacionalna ekološka mreža</h3>
										<div></div>
									</div>

									<div class="v_stanistaLegenda">
										<h3 class="podgrupeSlojevi">Stanišni tip</h3>
										<div></div>
									</div>

									<div class="v_grad_bastinaLegenda">
										<h3 class="podgrupeSlojevi">Graditeljska baština</h3>
										<div></div>
									</div>

									<div class="krajobrazLegenda">
										<h3 class="podgrupeSlojevi">Krajobraz</h3>
										<div></div>
									</div>

									<div class="zpvoLegenda">
										<h3 class="podgrupeSlojevi">Zaštita posebnih vrijednosti i obilježja</h3>
										<div></div>
									</div>

									<div class="uredjenje_zemljistaLegenda">
										<h3 class="podgrupeSlojevi">Uređenje zemljišta</h3>
										<div></div>
									</div>
									

									<div class="urbanapravilaLegenda">
										<h3 class="podgrupeSlojevi">Urbana pravila</h3>
										<div></div>
									</div>

									<div class="v_ppmzLegenda">
										<h3 class="podgrupeSlojevi">Primjena planskih mjera zaštite </h3>
										<div></div>
									</div>
								</div>
							</div>
						</div>

						<div id="login" class="tab-pane fade">
									<?php
									if(isset($_SESSION['id'])){
										echo'
										
							<div>
								<br/><br/>Prijavljeni korisnik: ' . $_SESSION['ime'] . ' ' . $_SESSION['prezime'] . '<br/><br/>
								
								<form action="" method="post">
    								<button name="action" class="btn btn-default" value="odjava">Odjava</button>
								</form>
							</div>
							';	
									} elseif (($_POST['action'])== 'odjava') {
										echo'
							<div>
								<form id="formaPrijava" action="" method="post">
									<div class="form-group">
										<label for="korisnickoime">Korisničko ime:</label>
										<br>
										<input class="form-control" type="text" id="korisnickoime" name="korisnickoime" required>
									</div>

									<div class="form-group">
										<label for="lozinka">Lozinka:</label>
										<br>
										<input type="password" class="form-control" id="lozinka" name="lozinka" required>
									</div>
									<button class="btn btn-default">
										Prijava
									</button>
								</form>	
							</div>										
										';
										
									} elseif ($loginTried == true && $loggedIn == false) {
										echo'
							<div>
								<form id="formaPrijava" action="" method="post">
									<div class="form-group">
										<label for="korisnickoime">Korisničko ime:</label>
										<br>
										<input class="form-control" type="text" id="korisnickoime" name="korisnickoime" required>
									</div>

									<div class="form-group">
										<label for="lozinka">Lozinka:</label>
										<br>
										<input type="password" class="form-control" id="lozinka" name="lozinka" required>
									</div>
									<button class="btn btn-default">
										Prijava
									</button>
								</form>	
								<br/><p style="color:red"> Neuspješna prijava.</p>
							</div>										
										';
										
									} else {
										echo'
							<div>
								<form id="formaPrijava" action="" method="post">
									<div class="form-group">
										<label for="korisnickoime">Korisničko ime:</label>
										<br>
										<input class="form-control" type="text" id="korisnickoime" name="korisnickoime" required>
									</div>

									<div class="form-group">
										<label for="lozinka">Lozinka:</label>
										<br>
										<input type="password" class="form-control" id="lozinka" name="lozinka" required>
									</div>
									<button class="btn btn-default">
										Prijava
									</button>
								</form>	
							</div>										
										';
										
									}
									?>
						</div>
					</div>
				</div>
			</div>

			<div class="logoupp">
				
				<a href="http://www.up4c.eu" target="_blank" title="EU projekt 'Urban Planning 4 Citizens'"><img src="images/logo1.png"> </a>
			</div>
			<div class='row'>
				<div class='col-md-12 karta'>
					<div id="karta"></div>
				</div>
			</div>

			<!-- Modal (popup) za info/lokacijsku informaciju -->
			<div class="modal fade" id="modalLokacijska" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog modal-lg" role="document">
					<div class="modal-content" >
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="deleteMarkers()">
								<span aria-hidden="true" >&times;</span>
							</button>
							<h4 class="modal-title" id="myModalLabel">Lokacijska informacija</h4>
						</div>
						<div class="modal-body" id="lokPrint">
							<div id="koordinateInfo"></div>
							<br>

							<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
								

								<div class="panel panel-default NamjenaLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseNamjena" aria-expanded="false" aria-controls="collapseNamjena"> Namjena </a></h4>
									</div>
									<div id="collapseNamjena" class="panel-collapse collapse" role="tabpanel"> <!--  aria-labelledby="headingTwo" -->
										<div class="panel-body" id="NamjenaLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default PrometLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapsePromet" aria-expanded="false" aria-controls="collapsePromet"> Promet </a></h4>
									</div>
									<div id="collapsePromet" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="PrometLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default TelekomunikacijaLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTelekomunikacija" aria-expanded="false" aria-controls="collapseTelekomunikacija"> Telekomunikacija </a></h4>
									</div>
									<div id="collapseTelekomunikacija" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="TelekomunikacijaLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default EnergetskiSustaviLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseEnergetskiSustavi" aria-expanded="false" aria-controls="collapseEnergetskiSustavi"> Energetski Sustavi </a></h4>
									</div>
									<div id="collapseEnergetskiSustavi" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="EnergetskiSustaviLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default VodaLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseVoda" aria-expanded="false" aria-controls="collapseVoda"> Voda </a></h4>
									</div>
									<div id="collapseVoda" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="VodaLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default OdvodnjaLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOdvodnja" aria-expanded="false" aria-controls="collapseOdvodnja"> Odvodnja </a></h4>
									</div>
									<div id="collapseOdvodnja" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="OdvodnjaLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default ZasticenaPodrucjaPrirodeLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseZasticenaPodrucjaPrirode" aria-expanded="false" aria-controls="collapseZasticenaPodrucjaPrirode"> Zaštićena područja prirode </a></h4>
									</div>
									<div id="collapseZasticenaPodrucjaPrirode" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="ZasticenaPodrucjaPrirodeLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default NacionalnaEkoloskaMrezaLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseNacionalnaEkoloskaMreza" aria-expanded="false" aria-controls="collapseNacionalnaEkoloskaMreza"> Nacionalna ekološka mreža </a></h4>
									</div>
									<div id="collapseNacionalnaEkoloskaMreza" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="NacionalnaEkoloskaMrezaLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default StanisnitipLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseStanisnitip" aria-expanded="false" aria-controls="collapseStanisnitip"> Stanišni tip</a></h4>
									</div>
									<div id="collapseStanisnitip" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="StanisnitipLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default GraditeljskaBastinaLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseGraditeljskaBastina" aria-expanded="false" aria-controls="collapseGraditeljskaBastina"> Graditeljska baština </a></h4>
									</div>
									<div id="collapseGraditeljskaBastina" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="GraditeljskaBastinaLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default KrajobrazLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseKrajobraz" aria-expanded="false" aria-controls="collapseKrajobraz"> Krajobraz </a></h4>
									</div>
									<div id="collapseKrajobraz" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="KrajobrazLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default ZastitaposebnihvrijednostiiobiljezjaLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseZastitaposebnihvrijednostiiobiljezja" aria-expanded="false" aria-controls="collapseZastitaposebnihvrijednostiiobiljezja"> Zaštita posebnih vrijednosti i obilježja </a></h4>
									</div>
									<div id="collapseZastitaposebnihvrijednostiiobiljezja" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default UredjenjezemljistaLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseUredjenjezemljista" aria-expanded="false" aria-controls="collapseUredjenjezemljista"> Uređenje zemljišta </a></h4>
									</div>
									<div id="collapseUredjenjezemljista" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="UredjenjezemljistaLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default UrbanaPravilaLokInfo" id="urbanaPrint"> <!--class urbana -->
									<div class="panel-heading" role="tab"> <!--  id="headingOne" -->
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseUrbanaPravila" aria-expanded="false" aria-controls="collapseUrbanaPravila"> Urbana pravila </a></h4>
									</div>
									<div id="collapseUrbanaPravila" class="panel-collapse collapse" role="tabpanel" > <!-- aria-labelledby="headingOne" -->
										<div class="panel-body" id="UrbanaPravilaLokInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default PrimjenaPlanskihMjeraZastiteLokInfo">
									<div class="panel-heading" role="tab"> <!--  id="headingTwo" -->
										<h4 class="panel-title"><!--dodat class accordio-toggle da bi se prikazivale ikonice--><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapsePrimjenaPlanskihMjeraZastite" aria-expanded="false" aria-controls="collapsePrimjenaPlanskihMjeraZastite"> Primjena planskih mjera zaštite</a></h4>
									</div>
									<div id="collapsePrimjenaPlanskihMjeraZastite" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="PrimjenaPlanskihMjeraZastiteLokInfoOpis">

										</div>
									</div>
								</div>
		
							</div>
						</div>
						<div class="modal-footer">
							<!--<button type="button" class="btn btn-primary" >
								Print
							</button>-->
							<!--onclick="printContent('lokPrint')"-->
							<button type="button" class="btn btn-default" data-dismiss="modal" onclick="deleteMarkers()">
								Zatvori
							</button>
						</div>
					</div>
				</div>
			</div>
			<!--kraj-->

			<!--modal za postavi pitanje-->
			<div class="modal fade" id="modalUpit" role="dialog">
				<div class="modal-dialog modal-md">
					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">
								&times;
							</button>
							<h2 class="modal-title">Postavite upit</h2>
						</div>
						<div class="modal-body">
							<div id="modal-map"></div>
							<div id="koordinate"></div>
							<p class="malaSlova">
								(Polja označena * su obavezna)
							</p>
							<p class="malaSlovaPogreska">
								Došlo je do pogreške, molimo provjerite unesene podatke.
							</p>
							<form id="formaUpit" action="" method="post">
                                                     
								<div class="form-group">
                                    <label for="ime">Ime i prezime:* <span id="characters_ime">[60 / 60]</span></label>
									<br>
									<input class="form-control" type="text" id="ime" name="ime" maxlength="60" required>
								</div>

								<div class="form-group">
									<label for="email">Email:* <span id="characters_email">[60 / 60]</span></label>
									<br>
									<input type="email" class="form-control" id="email" name="email" maxlength="60" required>
								</div>
                                <button type="button" class="btn btn-default" id="dodatnoGumb">Dodatna kontakt polja<i id="ikonaDodatno" class="fa fa-chevron-down"></i></button>
                                <div id="dodatnoPolja" class="hide">
                               
                                    <div class="form-group">
										<label for="oib">OIB: <span id="characters_oib">[11 / 11]</span></label>
										<br>
										<input type="text" class="form-control" id="oib" name="oib" maxlength="11" >
									</div>
                                    
                                    <div class="form-group">
										<label for="adresa">Adresa: <span id="characters_adresa">[200 / 200]</span></label>
										<br>
										<input type="text" class="form-control" id="adresa" name="adresa" maxlength="60">
									</div>
                                    
                                    <div class="form-group">
										<label for="tel">Telefon: <span id="characters_tel">[60 / 60]</span></label>
										<br>
										<input type="text" class="form-control" id="tel" name="tel" maxlength="60">
									</div>
                                    
                                    <div class="form-group">
										<label for="skype">Skype: <span id="characters_skype">[60 / 60]</span></label>
										<br>
										<input type="text" class="form-control" id="skype" name="skype" maxlength="60">
									</div>
                                    
                                    
                                    
                                </div>
                                
                                
                                
								<div class="form-group" style="margin-top:15px">
									<label for="naslov">Naslov:* <span id="characters_naslov">[60 / 60]</span></label>
									<br>
									<input type="text" class="form-control" id="naslov" name="naslov" maxlength="60" required>
								</div>

								<!--div class="form-group">
									<label for="vrsta">Vrsta upita:*</label>
									<br>
									<select class="form-control" name="vrsta" id="vrsta">
										<option value="vrsta0" selected disabled>-- odaberite vrstu upita --</option>
										<option value="vrsta1">Vrsta1</option>
										<option value="vrsta2">Vrsta2</option>
										<option value="vrsta3">Vrsta3</option>
									</select>
								</div-->



								
							
							
								<div class="form-group">
									<label for="koUpit">Katastarska općina:</label>
									<select class="form-control chosen-select" name="koUpit" id="koUpit" data-placeholder="-- upišite ime katastarske općine --">
										<option value=""></option>

									</select>
								</div>
								
								<div class="form-group">
									<label for="kc">Katastarska čestica:</label>
									<select class="form-control chosen-select" name="kcUpit" id="kcUpit" data-placeholder="-- upišite broj katastarske čestice --" disabled>
										<option value=""></option>
									</select>
								</div>
								<br>
							

								<div class="form-group">
									<label for="message">Pitanje:* <span id="characters_pitanje">[2048 / 2048]</span></label> 
									<br> 
									<textarea class="form-control" rows="5" id="poruka" name="poruka" maxlength="2048" required></textarea> 
								</div>

								<button type="submit" name="submit" id="submit" class="btn btn-default">
									Pošalji
								</button>
							</form>
							<div>
								<div id="success"></div>
								<button onclick="povratak()" id="posaljiDrugi" type="button" class="btn btn-default">
									Povratak
								</button>
							</div>

						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">
								Zatvori
							</button>
						</div>
					</div>

				</div>
			</div>
			<!--kraj-->

			<!--info modal-->

			<div class="modal fade" id="modalInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog modal-lg" role="document">
					<div class="modal-content" >
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="deleteMarkers()">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 class="modal-title" id="myModalLabel">Info</h4>
						</div>
						<div class="modal-body" id="Info">
							<div id="koordinateInfo2"></div>
							<br>
							<p id="NemaUpaljenihSlojeva">Potrebno je uključiti bar jedan od slojeva GUP-a.</p>
							<p id="KlikniteNaObjekt">Na ovom području nema informacija za trenutno uključeni sloj/slojeve</p>
							

							<div class="panel-group" id="accordionInfo" role="tablist" aria-multiselectable="true">
								<div class="panel panel-default NamjenaInfo">
									<div class="panel-heading" role="tab"> 
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseNamjenaInfo" aria-expanded="false" aria-controls="collapseNamjenaInfo"> Namjena </a></h4>
									</div>
									<div id="collapseNamjenaInfo" class="panel-collapse collapse" role="tabpanel"> <!--  aria-labelledby="headingTwo" -->
										<div class="panel-body" id="NamjenaInfoOpis">
										</div>
									</div>
								</div>

								<div class="panel panel-default PrometInfo">
									<div class="panel-heading" role="tab">
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapsePrometInfo" aria-expanded="false" aria-controls="collapsePrometInfo"> Promet </a></h4>
									</div>
									<div id="collapsePrometInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="PrometInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default TelekomunikacijaInfo">
									<div class="panel-heading" role="tab"> 
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseTelekomunikacijaInfo" aria-expanded="false" aria-controls="collapseTelekomunikacijaInfo"> Telekomunikacija </a></h4>
									</div>
									<div id="collapseTelekomunikacijaInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="TelekomunikacijaInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default EnergetskisustaviInfo">
									<div class="panel-heading" role="tab">
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseEnergetskisustaviInfo" aria-expanded="false" aria-controls="collapseEnergetskisustaviInfo"> Energetski Sustavi </a></h4>
									</div>
									<div id="collapseEnergetskisustaviInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="EnergetskisustaviInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default VodaInfo">
									<div class="panel-heading" role="tab">
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseVodaInfo" aria-expanded="false" aria-controls="collapseVodaInfo"> Voda </a></h4>
									</div>
									<div id="collapseVodaInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="VodaInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default OdvodnjaInfo">
									<div class="panel-heading" role="tab"> 
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseOdvodnjaInfo" aria-expanded="false" aria-controls="collapseOdvodnjaInfo"> Odvodnja </a></h4>
									</div>
									<div id="collapseOdvodnjaInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="OdvodnjaInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default ZaštićenapodručjaprirodeInfo">
									<div class="panel-heading" role="tab"> 
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseZaštićenapodručjaprirodeInfo" aria-expanded="false" aria-controls="collapseZaštićenapodručjaprirodeInfo"> Zaštićena područja prirode </a></h4>
									</div>
									<div id="collapseZaštićenapodručjaprirodeInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="ZaštićenapodručjaprirodeInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default NacionalnaekološkamrežaInfo">
									<div class="panel-heading" role="tab">
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseNacionalnaekološkamrežaInfo" aria-expanded="false" aria-controls="collapseNacionalnaekološkamrežaInfo"> Nacionalna ekološka mreža </a></h4>
									</div>
									<div id="collapseNacionalnaekološkamrežaInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="NacionalnaekološkamrežaInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default StanišnitipInfo">
									<div class="panel-heading" role="tab">
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseStanišnitipInfo" aria-expanded="false" aria-controls="collapseStanišnitipInfo"> Stanišni tip </a></h4>
									</div>
									<div id="collapseStanišnitipInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="StanišnitipInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default GraditeljskabaštinaInfo">
									<div class="panel-heading" role="tab"> 
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseGraditeljskabaštinaInfo" aria-expanded="false" aria-controls="collapseGraditeljskabaštinaInfo"> Graditeljska baština </a></h4>
									</div>
									<div id="collapseGraditeljskabaštinaInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="GraditeljskabaštinaInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default KrajobrazInfo">
									<div class="panel-heading" role="tab"> 
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseKrajobrazInfo" aria-expanded="false" aria-controls="collapseKrajobrazInfo"> Krajobraz </a></h4>
									</div>
									<div id="collapseKrajobrazInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="KrajobrazInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default ZaštitaposebnihvrijednostiiobilježjaInfo">
									<div class="panel-heading" role="tab"> 
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseZaštitaposebnihvrijednostiiobilježjaInfo" aria-expanded="false" aria-controls="collapseZaštitaposebnihvrijednostiiobilježjaInfo"> Zaštita posebnih vrijednosti i obilježja </a></h4>
									</div>
									<div id="collapseZaštitaposebnihvrijednostiiobilježjaInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="ZaštitaposebnihvrijednostiiobilježjaInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default UređenjezemljištaInfo">
									<div class="panel-heading" role="tab"> 
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseUređenjezemljištaInfo" aria-expanded="false" aria-controls="collapseUređenjezemljištaInfo"> Uređenje zemljišta </a></h4>
									</div>
									<div id="collapseUređenjezemljištaInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="UređenjezemljištaInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default UrbanapravilaInfo" id="urbanaPrint">
									<div class="panel-heading" role="tab">
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseUrbanapravilaInfo" aria-expanded="false" aria-controls="collapseUrbanapravilaInfo"> Urbana pravila </a></h4>
									</div>
									<div id="collapseUrbanapravilaInfo" class="panel-collapse collapse" role="tabpanel" >
										<div class="panel-body" id="UrbanapravilaInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default PrimjenaplanskihmjerazaštiteInfo">
									<div class="panel-heading" role="tab"> 
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapsePrimjenaplanskihmjerazaštiteInfo" aria-expanded="false" aria-controls="collapsePrimjenaplanskihmjerazaštiteInfo"> Primjena planskih mjera zaštite</a></h4>
									</div>
									<div id="collapsePrimjenaplanskihmjerazaštiteInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="PrimjenaplanskihmjerazaštiteInfoOpis">

										</div>
									</div>
								</div>

								<div class="panel panel-default LokacijespremnikazaodvojenoprikupljanjeotpadaInfo">
									<div class="panel-heading" role="tab"> 
										<h4 class="panel-title"><a class="collapsed accordion-toggle" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseLokacijespremnikazaodvojenoprikupljanjeotpadaInfo" aria-expanded="false" aria-controls="collapseLokacijespremnikazaodvojenoprikupljanjeotpadaInfo"> Odlagalište otpada</a></h4>
									</div>
									<div id="collapseLokacijespremnikazaodvojenoprikupljanjeotpadaInfo" class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body" id="LokacijespremnikazaodvojenoprikupljanjeotpadaInfoOpis">

										</div>
									</div>
								</div>	
								
							</div>
						</div>
				
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal" onclick="deleteMarkers()">
								Zatvori
							</button>
						</div>
					</div>
				</div>
			</div>

			<!--kraj-->

			<!--pretrazi katasta-->

			<div class="modal fade" id="modalKatastar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content" >
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="deleteMarkers()">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 class="modal-title" id="myModalLabel">Pronađi katastarsku česticu</h4>
						</div>
						<div class="modal-body">
							<div id="kat"></div>
							<br>
							<div class="form-group">
								<label for="vrsta">Katastarska općina:</label>
								<br>
								<select class="form-control chosen-select" name="opcina" id="opcina" data-placeholder="-- upišite ime katastarske općine --">
									<option value=""></option>

								</select>
							</div>
							<br>
							<div>
								<div class="form-group">
									<label for="vrstakc">Vrsta čestice:</label>
									<br>
									<select class="form-control chosen-select" name="vrstakc" id="vrstakc" data-placeholder="-- odaberite vrstu katastarske čestice --" disabled>
										<option value=""></option>
										<option value="false">Zemljišne</option>
										<option value="true">Zgradne</option>

									</select>
								</div>
								<br>
							</div>
							<div>
								<div class="form-group">
									<label for="kc">Katastarska čestica:</label>
									<br>
									<select class="form-control chosen-select" name="kc" id="kc" data-placeholder="-- upišite broj katastarske čestice --">
										<option value=""></option>

									</select>
								</div>
								<br>
							</div>
						</div>
						<br>

						<div class="modal-footer">
							
							<button type="button" class="btn btn-default" data-dismiss="modal">
								Odustani
							</button>
						</div>
					</div>
				</div>
			</div>

			<!--kraj-->

			<div id="upit-help">
				<p>
					Kliknite na lokaciju na karti za koju želite poslati upit.
				</p>
			</div>

			<div id="info-help">
				<p>
					Kliknite na lokaciju na karti za koju želite saznati informacije.
				</p>
			</div>

			<div id="lokacijska-help">
				<p>
					Kliknite na lokaciju na karti za koju želite dobiti lokacijsku informaciju.
				</p>
			</div>

			<div id="alat2u1">
				<a href="#" title="Lokacijska informacija" onclick="pokreniLokacijsku()" id ="lokacijska2"> <i class="fa fa-table fa-lg"></i> Lokacijska informacija</a>
				<a id ="infoalat2" title="Info alat" href="javascript:void(0);" onclick="pokreniInfo()"> <i class="fa fa-map-marker fa-lg"></i> Info</a>
			</div>
		</div>

		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<!-- <script src="js/jquery.min.js"></script>
		<script src="js/jquery.js"></script>-->
		<!--jquery UI-->
		<script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="js/bootstrap.min.js"></script>
		<!--script src="js/bootstrap3.0.0.min.js"></script-->
		<!--leaflet plugins heat-->
		<script src="js/leaflet-heat.js"></script>
	

		<script src="js/leaflet.zoomhome.min.js"></script>
		<script src="js/bootstrap-tour.min.js"></script>
		<script type="text/coffeescript" src="js/bootstrap-tour.coffee"></script>
		<script type="text/javascript" src="js/coffee-script.js"></script>
		

		<!-- min -->
		<!--<script src="js/data/zgrade.json"></script>-->
		<script src="js/cookies.js"></script>
		<script type="text/javascript" src="js/leaflet-measure.min.js"></script>
		<script type="text/javascript" src="js/karta.js"></script>
		<script src="js/bootstrap-select.min.js"></script>
		<script type="text/javascript" src="js/chosen.jquery.min.js"></script>
		<script type="text/javascript" src="js/ostalo.js"></script>
	    <script type="text/javascript" src="js/lokacijska.js"></script>  
        <script type="text/javascript" src="js/info.js"></script>
        <script type="text/javascript" src="js/katastarSearch.js"></script>
        <script type="text/javascript" src="js/slanjeUpita.js"></script>
        <script type="text/javascript" src="js/upute.js"></script>
		<script type="text/javascript" src="js/functions.js"></script>
		<!-- min kraj -->

		<!-- normalni >
		<script src="js/igisJS/cookies.js"></script>
		<script type="text/javascript" src="js/leaflet-measure.js"></script>
		<script type=text/javascript src="js/igisJS/karta.js"></script>
		<script src="js/bootstrap-select.js"></script>
		<script type="text/javascript" src="js/chosen.jquery.js"></script>
		<script type="text/javascript" src="js/igisJS/ostalo.js"></script>
		<script type="text/javascript" src="js/igisJS/lokacijska.js"></script>  
        <script type="text/javascript" src="js/igisJS/info.js"></script>
        <script type="text/javascript" src="js/igisJS/katastarSearch.js"></script>
        <script type="text/javascript" src="js/igisJS/slanjeUpita.js"></script>
        <script type="text/javascript" src="js/igisJS/upute.js"></script>
		<script type="text/javascript" src="js/igisJS/functions.js"></script>
		< normalni kraj-->


		
        
            <!--alati by IGIS redoslijed je bitan!-->
		

		
            
		<script type="text/javascript">
			var config = {
				'.chosen-select' : {},
				'.chosen-select-deselect' : {
					allow_single_deselect : true
				},
				'.chosen-select-no-single' : {
					disable_search_threshold : 10
				},
				'.chosen-select-no-results' : {
					no_results_text : 'Oops, nothing found!'
				},
				'.chosen-select-width' : {
					width : "95%"
				}
			}
			for (var selector in config) {
				$(selector).chosen(config[selector]);
			}
	
        </script>
	</body>
</html>


