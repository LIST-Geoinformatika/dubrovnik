//slika pri učitavanju stranice	
$(window).load(function() {
				$(".loader").fadeOut("slow");
			})

//----------------------KOORDINATE--------------------------------------------
// preračunavanje koordinata
//FME = 551.73, 162.86, 467.93, 4.820429, 6.037326, -1., 11.381551 
proj4.defs([
  /*[
    'EPSG:3907',
    '+title=HDKS5 (long/lat) +proj=tmerc +pm=greenwich +lat_0=0 +lon_0=15 +k=0.9999 +x_0=5500000 +y_0=0 +ellps=bessel +towgs84=550.499,164.116,475.142,5.80967,2.07902,-11.62386,0.99999445824 +units=m'
  ],
  [
    'EPSG:3908',
    '+title=HDKS6 (long/lat) +proj=tmerc +pm=greenwich +lat_0=0 +lon_0=18 +k=0.9999 +x_0=6500000 +y_0=0 +ellps=bessel +towgs84=550.499,164.116,475.142,5.80967,2.07902,-11.62386,0.99999445824 +units=m'
  ],
  [
    'EPSG:3908',
    '+title=HDKS6 (long/lat) +proj=tmerc +lat_0=0 +lon_0=18 +k=0.9999 +x_0=6500000 +y_0=0 +ellps=bessel +towgs84=682,-203,480,0,0,0,0 +units=m +no_defs'
  ],*/
  [
    'EPSG:3907',
    '+title=HDKS5 (long/lat) +proj=tmerc +pm=greenwich +lat_0=0 +lon_0=15 +k=0.9999 +x_0=5500000 +y_0=0 +ellps=bessel +towgs84=551.73, 162.86, 467.93, 4.820429, 6.037326, -1., 11.381551 +units=m'
  ],
    [
    'EPSG:3908',
    '+title=HDKS6 (long/lat) +proj=tmerc +lat_0=0 +lon_0=18 +k=0.9999 +x_0=6500000 +y_0=0 +ellps=bessel +towgs84=551.73, 162.86, 467.93, 4.820429, 6.037326, -1., 11.381551 +units=m +no_defs'
  ],
  [
    'EPSG:3765',
    '+title=HTRS96 (long/lat) +proj=tmerc +lat_0=0 +lon_0=16.5 +k=0.9999 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
  ]
]);


//proj4(fromProjection, tsoProjection, [long,lat])

function hdks6_y(lng, lat) {
    var a = proj4('EPSG:4326', 'EPSG:3908', [lng, lat]);
    var lng = a[0];
    return lng;
}



function hdks6_x(lng, lat) {
    var a = proj4('EPSG:4326', 'EPSG:3908', [lng, lat]);
    var lat = a[1];
    return lat;
}

function htrs_y(lng, lat) {
    var a = proj4('EPSG:4326', 'EPSG:3765', [lng, lat]);
    var lng = a[0];
    return lng;
}

function htrs_x(lng, lat) {
    var a = proj4('EPSG:4326', 'EPSG:3765', [lng, lat]);
    var lat = a[1];
    return lat;
}

//----------------------OSTALO-----------------------------------------------------

//promjena cursora
function helpCursor() {
    $('#karta').addClass('cursorHelp');
};

function defaultCursor() {
    $('#karta').removeClass('cursorHelp');
};


//pomocni tekstovi za alate na vrhu stranice
$("#upit-help").hide();
$("#lokacijska-help").hide();
$("#info-help").hide();


//dragabble modals (pop up)
$('.modal').modal({
    backdrop: 'static',
    keyboard: false,
    show: false
});

// Jquery draggable - pomice se na headeru
$('.modal-dialog').draggable({
    handle: ".modal-header"
});

//reset to original postion after dragging 
function resetModalPosition() {
    $(".modal-dialog").animate({
        top: "0px",
        left: "0px"
    }, 1);
}


//varijable za slanje trenutnih koordinata bazi
var sirina;
var duzina;


//alati
//lokacijska
//info
//katastar
//slanjeUpita
//upute


//----------------------GASENJE SVIH ALATA-------------------------

//iskljucivanje svih alata
function alatiOff() {
    infoOff();
    lokacijskaInfoOff();
    slanjeUpitaOff();
    zajednickiInfoLokacijskaOff();
    //iskljucivanje padajućeg izbornika
    sakrijIzbornik();
    //$('#alat2u1').fadeOut('fast');
    //makniTekstInfoAlat();
}

//gasi ostale alate kad se pokrene alat za mjerenje
$('.js-start').on("click", alatiOff);

