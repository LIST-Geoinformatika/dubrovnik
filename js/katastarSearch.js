//----------------------KATASTAR SEARCH------------------------------------------
var odabranaKO;
var odabranaKC;
var polygon;
var cestica;
var opcina;
var centar;
var podcestica;
var polycestica;

//sloj za cestice 
var cestice = new L.FeatureGroup();
map.addLayer(cestice);

//prazni sloj cestice
function deleteCestice() {
    cestice.clearLayers();
};

//sloj za odabranu katastarsku opcinu
var opcine = new L.FeatureGroup();
//map.addLayer(opcine);

//prazni sloj opcine
function deleteOpcine() {
    opcine.clearLayers();
};

//pali sloj katastar
/*function slojKatastar() {
    if (!map.hasLayer(katcestice)) {
        map.addLayer(katcestice);
        document.getElementById("12").checked = true
    }
}
*/

var zgradne;

//dohvaćanje katastarskih opcina
function dohvatiKO() {
    //slojKatastar();
    upaliSloj(18);
	upaliSloj(19);
    $.ajax({
        type: "GET",
        url: "php/getKatastar.php",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: 'json',
        success: function (data) {
            $('#opcina').find('option').remove().end().append('<option value></option>');//da ne ispisuje nijednu opcinu u pocetku
            for (i = 0; i < data.length; i++) {
                $("#opcina").append('<option value="' + data[i].id + '">' + data[i].ko_naziv + '</option>');
            };
            $("#opcina").trigger("chosen:updated");
        },
    }); // Ajax Call,
};

//zapamti koja ko je odabrana 
$("#opcina").chosen().change(function () {
    odabranaKO = $(this).val();
    $('#vrstakc').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
    dohvatiVrstu();
    prikaziOpcinu();
    document.getElementById("kc").disabled = true;
    $('#kc').find('option').remove();
    $('#kc').find('option:first-child').prop('selected', true).end().trigger('chosen:updated'); 
  
});

//omoguci odabir vrste
function dohvatiVrstu() {
    document.getElementById("vrstakc").disabled = false;
    $("#vrstakc").trigger("chosen:updated");
};

//zapamti odabir vrste i ispisi takve čestice
$("#vrstakc").chosen().change(function () {
    zgradnaKC = $(this).val();
    dohvatiKC();    
});


//dohvaćanje katastarskih cestica
function dohvatiKC() {
    upaliSloj(15);
    document.getElementById("kc").disabled = false;
    $.ajax({
        type: "GET",
        url: "php/getKC.php",
        data: {
            ko: odabranaKO, //salje odabranu opcinu
            zgradnaKC: zgradnaKC,
        },
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: 'json',
        success: function (data) {
            $('#kc').find('option').remove().end().append('<option value></option>');
            for (i = 0; i < data.length; i++) {
                $("#kc").append('<option value="' + data[i].id + '">' + data[i].kc_broj + '</option>');
            }; //upisuje cestice u select menu
            $("#kc").trigger("chosen:updated");
        },
    }); // Ajax Call

};

//zapamti kc i prikazi je na karti
$("#kc").chosen().change(function () {
    odabranaKC = $(this).val(); //id odabrane čestice
    prikaziCesticu("yellow");

});



//dohvaća id čestice i prikazuje je na karti
function prikaziCesticu(color) {
    //console.log('pozvana prikazi cesticu');
    $.ajax({
        type: "GET",
        url: "php/postgis_geojson.php?geotable=v_dkp_kat_cestica&geomfield=geom&parameters=id=" + odabranaKC,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: 'json',

        success: function (data) {
            if (data.features[0].geometry.type == "Polygon") {
                deleteCestice();
                cestica = [];
                var a;
                for (var i = 0; i < data.features[0].geometry.coordinates[0].length; i++) {
                    a = [];
                    a.push(data.features[0].geometry.coordinates[0][i][1]);
                    a.push(data.features[0].geometry.coordinates[0][i][0]);
                    cestica.push(a);
                };
                L.polyline(cestica, {
                    color: color,
                    zIndex: 15,
                }).addTo(cestice);
                map.panTo(map.getCenter(cestica))
                map.fitBounds(cestica);
            } else {
                polycestica = [];
                var a;
                for (var i = 0; i < data.features[0].geometry.coordinates.length; i++) { //za svaki poligon u čestici
                    for (var j = 0; j < data.features[0].geometry.coordinates[i].length; j++) { //za svaku točku u poligonu
                        podcestica = [];
                        for (var k = 0; k < data.features[0].geometry.coordinates[i][j].length; k++) {
                            a = [];
                            a.push(data.features[0].geometry.coordinates[i][j][k][1], data.features[0].geometry.coordinates[i][j][k][0]);
                            //console.log(a)
                            podcestica.push(a)
                        }
                        polycestica.push(podcestica)
                    };
                };
                L.multiPolyline(polycestica, {
                    color: color,
                    zIndex: 15,
                }).addTo(map)
                map.panTo(map.getCenter(polycestica))
                map.fitBounds(polycestica);
            }
        },
    })
};

//zoomira se na opcinu na karti
function prikaziOpcinu() {
    $.ajax({
        type: "GET",
        url: "php/postgis_geojson.php?geotable=dkp_kat_opcina&geomfield=geom&parameters=id=" + odabranaKO + "&bbox=bbox",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: 'json',

        success: function (data) {
            deleteOpcine();
            opcina = [];

            var a;
            for (var i = 0; i < data.features[0].geometry.coordinates[0].length; i++) {
                a = [];
                a.push(data.features[0].geometry.coordinates[0][i][1]);
                a.push(data.features[0].geometry.coordinates[0][i][0]);
                opcina.push(a);
            };
            map.panTo(map.getCenter(opcina))
            map.fitBounds(opcina);
        },
    })
};




//otvori prozora za pretrazivanje katastra
function katastarOn(e) {
    document.getElementById("kc").disabled = true;
    document.getElementById("vrstakc").disabled = true;
    resetModalPosition();
    $('#opcina').find('option').remove();
    $('#opcina').find('option:first-child').prop('selected', true).end().trigger('chosen:updated'); //reset opcina
    $('#kc').find('option').remove()
    $('#kc').find('option:first-child').prop('selected', true).end().trigger('chosen:updated'); //reset cestica
    $('#vrstakc').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
    $("#modalKatastar").modal("show");
    dohvatiKO();
}