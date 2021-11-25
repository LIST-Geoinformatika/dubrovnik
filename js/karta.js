var UrlOSM = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    UrlDGU = 'http://geoportal.dgu.hr/wms';
    UrlGUP = 'https://dev.li-st.net/geoserver/up4c_du/wms';
    UrlHOK = 'http://geoportal.dgu.hr/services/hok/wms';

//bez podloge       
var base = L.tileLayer.wms(UrlDGU, {
    layers: ''
});

//DOF sloj
var dof_dgu = L.tileLayer.wms(UrlDGU, {
    layers: 'DOF',
    srs: 'EPSG:3765',
    format: 'image/jpeg',
    attribution: "DOF 2011. (DGU)",
    zIndex: 1,
    maxZoom: 19,
});

// HOK
var hok_dgu = L.tileLayer.wms(UrlHOK, {
    layers: 'HOK',
    srs: 'EPSG:3765',
    format: 'image/jpeg',
    attribution: "HOK (DGU)",
    zIndex: 1,
    maxZoom: 19,
    tileSize: 500,
});

//OSM
var osm = new L.TileLayer(UrlOSM, {
    zIndex: 1,
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors',
    maxZoom: 19,
});

//-----------------SLOJEVI GUP--------------------------------------------//
/*--------------- preklopni slojevi GUP ---------------*/
//namjena
/*var namjena = L.tileLayer.wms(UrlGUP, {
    layers: 'up4c:v_namjena_poly',
    srs: 'EPSG:3765',
    transparent: true,
    format: 'image/png',
    zIndex:2,
}); */
var namjena = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_namjena',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

var promet = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_promet',
    transparent: true,
    format: 'image/png',
    zIndex: 3
});

var telekomunikacija = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_telekomunikacija',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

var energ_sustavi = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_energ_sustavi',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

var voda = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_voda',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

var odvodnja = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_odvodnja',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

//zaštićena područja prirode
var bastina = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_zpb',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

//nacionalna ekološka mreža
var ekomreza = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_nem',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

var stanisnitip = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_stanista',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

var graditeljskabastina = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_grad_bastina',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

var krajobraz = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_krajobraz',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

//zaštita posebnih vrijednosti i obilježja
var zpvo = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_zpvo',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

var uredjenjezemljista = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_uredjenje_zemljista_a',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

var urbanapravila = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_urbanapravila', //'up4c:v_urbanapravila_poly',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

//primjena planskih mjera zaštite
var posebnazastita = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_ppmz',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

/*--------------- odlagalista ---------------*/
//odlagalista
var odlagalista = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_odlagalista_p',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})

/*--------------- stabla ---------------*/
//stabla ljutih naranci
var stabla = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:stabla',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})

/*--------------- ljetnikovci ---------------*/
//ljetnikovci
var ljetnikovci = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:ljetnikovci',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})

/*--------------- zelenilo u olacima -------*/
//zeleni koridori
var zelenikoridori = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:Zeleni koridori',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})
//zaštitno zelenilo
var zastitnozelenilo = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:Zastitno zelenilo ',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})
//vanjski sportski sadržaji
var vanjskisportski = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:Vanjski sportski sadrzaji',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})
//trgovi
var trgovi = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:Trgovi',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})
//stambeno zelenilo
var stambenozelenilo = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:Stambeno zelenilo',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})
//spomen područja
var spomenpodrucja = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:Spomen podrucja',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})
//prirodni ili doprirodni zeleni prostori
var prirodnidoprirodni = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:Prirodni ili doprirodni zeleni prostori',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})
//parkovi
var parkovi = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:Parkovi',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})
//groblja
var groblja = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:Groblje',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})
//dječja igrališta i prostori za mlade
var djecjaigrimladi = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:Djecja igralista i prostori za mlade',
    format: 'image/png',
    transparent: true,
    zIndex: 2
})

/*--------------- granice ---------------*/
//naselja
var naselja = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_naselja',
    format: 'image/png',
    transparent: true,
    zIndex: 10
})

var gradskikotari = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:v_gradski_kotari_a',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});

var gupgranice = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c:v_granica_gup',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});



/*--------------- katastar ---------------*/
var katopcine = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:dkp_kat_opcina',
    transparent: true,
    format: 'image/png',
    zIndex: 4
});

var katcestice = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:dkp_kat_cestica',
    transparent: true,
    format: 'image/png',
    zIndex: 4
});

var zgrade = new L.NonTiledLayer.WMS(UrlGUP, {
    layers: 'up4c_du:dkp_zgr',
    transparent: true,
    format: 'image/png',
    zIndex: 2
});




//------------OSTALI SLOJEVI; POSTAVKE KARTE-----------------------//
//heatmap

function heatmap() {
    var points = []
    $.ajax({
        type: "GET",
        url: "php/postgis_geojson.php?geotable=upit_lokinfo&geomfield=geom_wgs",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: 'json',

        success: function (data) {
            for (var i = 0; i < data.features.length; i++) {
                var a = [];
                a.push(data.features[i].geometry.coordinates[1]);
                a.push(data.features[i].geometry.coordinates[0]);
                a.push("10");
                points.push(a);
            };
        },
    })
    return points
}

var points = heatmap();

var heat = L.heatLayer(points, {
    radius: 25,
    blur: 40,
    //maxZoom: 17
});
var obuhvat = [[42.6198453248053,18.0389116051422],[42.6921846048023,18.0389116051422],[42.6921846048023,18.157997051448],[42.6198453248053,18.157997051448],[42.6198453248053,18.0389116051422]]
//karta
var map = L.map('karta', {
    center: new L.LatLng(42.6535, 18.1100),
    zoom: 13,
    minZoom: 12,
    maxZoom: 19,
    maxBounds: [[42.4148453248053,17.8269347626], [42.948126091674,18.357997051448]],
    layers: [dof_dgu, naselja],
    zoomControl: false,
    twoFingerZoom: true,
    tileSize: 400
});


//L.marker([42.6148453248053,18.0389116051422]).addTo(map);
//L.marker([42.6921846048023,18.0389116051422]).addTo(map);
//L.marker([42.6921846048023,18.157997051448]).addTo(map);
//L.marker([42.6148453248053,18.157997051448]).addTo(map);

map.panTo(map.getCenter(obuhvat))
map.fitBounds(obuhvat);
//podloge (prazno zbog izbornika sa slojevima gore desno - trebaju samo overlays-i
var baseMaps = [];

//slojevi za izbornik gore desno
var overlays = [
    {
        groupName: "Upiti",
        expanded: false,
        layers: {
            "Heatmap": heat,
            //"Clustering": markers,
        }
},
    {
        groupName: "Mjere uređenja i zaštite",
        expanded: false,
        layers: {
            "Naselja": naselja,
            "Urbana pravila": urbanapravila
        },

    },
];

//izbornik sa slojevima gore desno

//opcije za izbornik gore desno
/*var options = {
    container_width: "230px",
    container_maxHeight: "350px",
    group_maxHeight: "80px",
    collapsed: false
};*/

//izbornik sa slojevima gore desno
var control = L.Control.styledLayerControl(baseMaps, overlays, {
    autoZIndex: false
});

//map.addControl(control);

//izbornik za podloge - icon                    
var iconLayersControl = new L.Control.IconLayers(
[
        {
            title: 'OSM',
            layer: osm,
            icon: 'images/icons/osm_zagreb.jpg'
},
        {
            title: 'DOF',
            layer: dof_dgu,
            icon: 'images/icons/zagreb_dof.jpg'
},
        {
            title: 'HOK',
            layer: hok_dgu,
            icon: 'images/icons/zagreb_hok.jpg'
},
        {
            title: 'Bez podloge',
            layer: base,
            icon: ''
},
], {
        position: 'bottomright',
        maxLayersInRow: 5,
    }
);

iconLayersControl.addTo(map);


/*we can modify layers list
iconLayersControl.setLayers(layers);

iconLayersControl.on('activelayerchange', function(e) {
console.log('layer switched', e.layer);
});*/



//-------------OSTALO---------------------------------


//clustering
var markers = new L.MarkerClusterGroup();

var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [-3, -36]
    }
});

var greenIcon = new LeafIcon({
    iconUrl: 'images/marker-icon-green.png'
});

/*var redIcon = new LeafIcon({
    iconUrl: 'images/marker-icon-red.png'
});
var yellowIcon = new LeafIcon({
    iconUrl: 'images/marker-icon-yellow.png'
});*/


function Upiti() {
    var points = []
    $.ajax({
        type: "GET",
        url: "php/postgis_geojson.php?geotable=upit&geomfield=geom_wgs",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: 'json',

        success: function (data) {
            markers.clearLayers();
            for (var i = 0; i < data.features.length; i++) {
                //var vrsta = data.features[i].properties.vrsta;
                var naslov = data.features[i].properties.naslov;
                var poruka = data.features[i].properties.poruka;
                //var test = naslov 
                //console.log("vrsta = ", vrsta)
                var marker;
                var x = (data.features[i].geometry.coordinates[1]);
                var y = (data.features[i].geometry.coordinates[0]);
                /*
                if (vrsta == "vrsta1") {
                    //console.log("prvi marker")
                    marker = L.marker(L.latLng(x, y), {
                        icon: greenIcon
                    });
                } else if (vrsta == "vrsta2") {
                    //console.log("drugi marker")
                    marker = L.marker(L.latLng(x, y), {
                        icon: redIcon
                    });
                } else if (vrsta == "vrsta3") {
                    //console.log("treći marker")
                    marker = L.marker(L.latLng(x, y), {
                        icon: yellowIcon
                    });
                }*/
                marker = L.marker(L.latLng(x, y), {
                        icon: greenIcon
                    });
                marker.bindPopup("<b>" + naslov + "</b><br><br>" + poruka)
                markers.addLayer(marker);
            };
            },
    })
}



map.on('load', Upiti())

window.setInterval(function(){
  Upiti();
}, 180000); //3minute






//----------------ALATI-----------------------------------------------
//alati na karti

//povratak na početni zoom
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

//sidebar
var sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: 'left',
    autoPan: false,
});
map.addControl(sidebar);

//pokretanje sidebara na početku 
setTimeout(function () {
    sidebar.show();
}, 1800);

//hide sidebar klikom na kartu
/*map.on('click', function () {
    setTimeout(function () {
    sidebar.show();
}, 1800);
})
*/

L.easyButton('fa-bars fa-lg sidebar', function () {
    sidebar.toggle();
    alatiOff();
}, "Slojevi").addTo(map);

//------------------INFO/LOKACIJSKA, SLANJE UPITA, PRETRAŽIVANJE KATASTRA-------------

//odvajanje alata za slojeve i ostalih
$('.sidebar').parent().parent().parent().css('margin-bottom', '15px');

// easy button alati
var lokacijskagumbOn = false; //lokacijska alat
var infogumbOn = false; //info alat
var posaljiUpitOn = false; //posalji upit
var zajednicki = false; //alat za lokacijsku i info

$(document).ready(function () {
    $('button[title="Info"]').parent('div').append($("#alat2u1"));
$('button[title="Info"]').parent('div').css('background-color', 'white');
   // $('button[title="Info"].leaflet-bar button:hover').css('background-color','white');
    
    //$('button[title="Info"]').before('<p id="explanationText">neki tekst<p>')
    /*('button[title="Test"]').attr("onmouseover","pokaziPodizbornik()");     
    $('button[title="Test"]').attr("onmouseout","sakrijPodizbornik()");     
    */
});




//sakrij padajući izbornik za info i lokacijsku na početku
$('#alat2u1').hide();

function dodajTekstInfoAlat() {
    $('button[title="Info"]').prepend('<p id="explanationText">Odaberite alat<p>');
    $('button[title="Info"]').css('width', '100%');
    $('button[title="Info"]:hover').css('background-color', 'white');
    $('button[title="Info"]:hover').css('cursor','default');
}

function makniTekstInfoAlat() {
    $('#explanationText').remove();
    $('button[title="Info"]').css('width', '26px');
    $('.leaflet-touch .leaflet-bar button').css('width', '30px');
    $('p:empty').remove();
    $('button[title="Info"]:hover').css('cursor','pointer');
    $('button[title="Info"]:hover').css('background-color', 'white');
}



//info alat2u1 sa dropdownom
L.easyButton('fa-info-circle fa-lg info', function () {
    if (zajednicki == false) {
        alatiOff();
        otvoriIzbornik();//otvara dropdown
        zajednicki = true;
        //map.on('click',alatiOff);

    } else {
       alatiOff();
    }
}, "Info").addTo(map);


/*
//info alat - staro
L.easyButton('fa-info-circle fa-lg info', function () {
    if (infogumbOn == false) {
        alatiOff();
        $('button[title="Info"]').addClass("buttonOn");
        infogumbOn = true;
        helpCursor();
        map.on('click', infoOn);  
        $("#info-help").show();
    }else {
        infoOff();
       // defaultCursor();
    }
}, "Info").addTo(map);


//lokacijska -staro
L.easyButton('fa fa-list-alt fa-lg lokacijska123', function () {
     if (lokacijskagumbOn == false) {
        alatiOff();
        $('button[title="Lokacijska informacija"]').addClass("buttonOn");
        lokacijskagumbOn = true;
        helpCursor();
        map.on('click', lokacijskaInfo);
        $("#lokacijska-help").show();
    } else {
        lokacijskaInfoOff(); //iskljuci alat
       // defaultCursor();
     }
}, "Lokacijska informacija").addTo(map);

*/

//posalji upit
L.easyButton('fa fa-comments-o fa-lg upit', function () {
    if (posaljiUpitOn == false) {
        alatiOff();
        $('button[title="Pošalji upit"]').addClass("buttonOn");
        helpCursor();
        posaljiUpitOn = true;
        map.on('click', posaljiUpit);
        $("#upit-help").show();
    } else {
        slanjeUpitaOff(); //iskljuci alat 
        //defaultCursor();
    }
}, "Pošalji upit").addTo(map);

//pronađi katastarsku česticu
L.easyButton('fa fa-search fa-lg katastar', function () {
    alatiOff();
    katastarOn();
}, "Pronađi katastarsku česticu").addTo(map);

//-------------------------PRINT, UPUTE, MJERENJE-------------------------------------------

//odavanje ostalih alata (vizalno)
$('.katastar').parent().parent().parent().css('margin-bottom', '15px');

//print s geoserverom
/*var printProvider = L.print.provider({
    method: 'GET',
    url: 'http://vm1006.exovps.hr/geoserver/pdf',*/
    /* for GeoServer with the printing extension installed	http://docs.geoserver.org/latest/en/user/extensions/printing/index.html	*/
    /*autoLoad: true,
    dpi: 90,
    layout: 'landscape'
});

var printControl = L.control.print({
    provider: printProvider
});
map.addControl(printControl);*/


//pokretanje uvoda
L.easyButton('fa fa-question-circle fa-lg help', function () {
    alatiOff();
    pokretanjeUvoda();
    //defaultCursor();
}, "Upute").addTo(map);


//mjerenje povrsine i duljine
var measureControl2 = new L.Control.Measure({
    position: 'topleft',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: undefined,
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: undefined,
}).addTo(map);

//mjerilo                          
L.control.scale({imperial:false}).addTo(map);

//koordinate trenuntne pozicije miša ispisane ne ekranu                      
L.control.mousePosition({
    separator: ' N = ',
    numDigits: 8,
    prefix: 'HTRS96/TM  E = '
//    lngFormatter: e.latlng.lng + 13,
}).addTo(map);

//-----------------MOBILNI UREĐAJI----------------

//provjerava da li je mobilni uređaj
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if (isMobile.any()) {
    setTimeout(function () {
        sidebar.hide();
    }, 1800);
  
    var centar= new L.LatLng(42.6535, 18.1100)

    
    
}
