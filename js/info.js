
//---------------------------INFO ALAT----------------------------------------------
//info gumb (samo za ukljucene slojeve)
function upaljeniSlojevi(upaljeni_slojevi) {
    var upaljenislojevi = "";
    for (var i = 0; i < upaljeni_slojevi.length; i++) {
        upaljenislojevi = upaljenislojevi + upaljeni_slojevi[i].toString() + ",";
    };
    upaljenislojevi = upaljenislojevi.slice(0, -1);
    return upaljenislojevi
}

//accordion za elemente modala za Info Klik
/*$(function(){
    $('#infoKlik > div').accordion({
        header: "h3",
        collapsible: true,
        heightStyle: "content",
        icons: {
            header: "fa fa-chevron-down",
            activeHeader: "fa fa-chevron-up"
        },
    });
});*/

//funkcija koja zatvara sve predefinirane elemente koji se popunjavaju i spremaju u info klik
function isprazniSveInfo() {
    $('#NamjenaInfoOpis').empty();
    $('#PrometInfoOpis').empty();
    $('#TelekomunikacijaInfoOpis').empty();
    $('#EnergetskisustaviInfoOpis').empty();
    $('#VodaInfoOpis').empty();
    $('#OdvodnjaInfoOpis').empty();
    $('#ZaštićenapodručjaprirodeInfoOpis').empty();
    $('#NacionalnaekološkamrežaInfoOpis').empty();
    $('#StanišnitipInfoOpis').empty();
    $('#GraditeljskabaštinaInfoOpis').empty();
    $('#KrajobrazInfoOpis').empty();
    $('#ZaštitaposebnihvrijednostiiobilježjaInfoOpis').empty();
    $('#UređenjezemljištaInfoOpis').empty();
    $('#UrbanapravilaInfoOpis').empty();
    $('#PrimjenaplanskihmjerazaštiteInfoOpis').empty();
	$('#LokacijespremnikazaodvojenoprikupljanjeotpadaInfoOpis').empty();
    
    //$('#LokInfoOpis').empty();

    $('.NamjenaInfo').addClass('hide');
    $('.PrometInfo').addClass('hide');
    $('.UrbanapravilaInfo').addClass('hide');
    $('.TelekomunikacijaInfo').addClass('hide');
    $('.EnergetskisustaviInfo').addClass('hide');
    $('.VodaInfo').addClass('hide');
    $('.OdvodnjaInfo').addClass('hide');
    $('.NacionalnaekološkamrežaInfo').addClass('hide');
    $('.StanišnitipInfo').addClass('hide');
    $('.GraditeljskabaštinaInfo').addClass('hide');
    $('.KrajobrazInfo').addClass('hide');
    $('.ZaštitaposebnihvrijednostiiobilježjaInfo').addClass('hide');
    $('.UređenjezemljištaInfo').addClass('hide');
    $('.PrimjenaplanskihmjerazaštiteInfo').addClass('hide');
    $('.ZaštićenapodručjaprirodeInfo').addClass('hide');
	$('.LokacijespremnikazaodvojenoprikupljanjeotpadaInfo').addClass('hide');
    //$('.LokInfoOpis').addClass('hide');
}

//infoHideLayers();
function infoOn(e) {
    deleteMarkers();
    isprazniSveInfo();
    //ugasiSloj(12);
    var coord = e.latlng;
    sirina = coord.lat;
    duzina = coord.lng;
    var marker = L.marker([sirina, duzina]).addTo(oznakeLI); //dodavanje markera
    $("#modalInfo").modal("show");
    //[namjena, promet, telekomunikacija, energ_sustavi, voda, odvodnja, bastina, ekomreza, graditeljskabastina, krajobraz, urbanapravila, posebnazastita]
    var upaljenislojevi = upaljeniSlojevi(upaljeni_slojevi);
    $.ajax({
        type: "GET",
        url: "php/getInfo.php",
        data: {
            upaljeni_slojevi: upaljenislojevi,
            fi: sirina.toFixed(6),
            la: duzina.toFixed(6)
        },
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: 'json',

        success: function (data) {
            if (data.length > 0) {
                $('#NemaUpaljenihSlojeva').hide();
                $('#KlikniteNaObjekt').hide();

                for (i = 0; i < data.length; i++) {
                    var grupa = data[i].naziv_sloja;
                    grupa = grupa.replace(/ /g, '');
                    var id = "." + grupa + "Info";
                    //console.log(id);
                    $(id).removeClass('hide');
                    var divID = "#" + grupa + "InfoOpis";
                    var naslov = (data[i].naziv);
                    $(divID).append('<p><b class="infoKlikBold">' + naslov + ' </b></p>')
                    var lista = [];
                    for (var j = 0; j < data[i].zapis[0][0].length; j++) {
                        var opis = data[i].zapis[0][0][j].opis;
                        var provjeriOpis = false;
                        for (l = 0; l < lista.length; l++) {
                            if (opis == lista[l]) {
                                provjeriOpis = true;
                            }
                        }
                        if (provjeriOpis === false) {
                            lista.push(opis)
                            $(divID).append('<p>' + opis + '</p>');
                        }
                    };
                }
            } else {
                $('#KlikniteNaObjekt').show();
                $('#NemaUpaljenihSlojeva').hide();
                //infoHideLayers();
            }
        },
        error: function () {
            //infoHideLayers();
            $('#NemaUpaljenihSlojeva').show();
            $('#KlikniteNaObjekt').hide();
        }
    }); // Ajax Call

    //$('#urbanaPravila').empty();
    $('#koordinateInfo2').html('Kliknuli ste na koordinate: <br /> HTRS96/TM: E = ' + (htrs_y(duzina, sirina)).toFixed(2) + ", N = " + (htrs_x(duzina, sirina)).toFixed(2) + '<br />HDKS 6. zona: X = ' + (hdks6_x(duzina, sirina)).toFixed(2) + ", Y = " + (hdks6_y(duzina, sirina)).toFixed(2)); //info o koordinatama
    resetModalPosition();
    $("#info-help").fadeOut("slow");
}

function infoOff(e) {
    map.off('click', infoOn);
    //$('button[title="Info"]').removeClass("buttonOn"); //za odvojene alata
    infogumbOn = false;
    deleteMarkers();
    defaultCursor();
    $("#info-help").fadeOut("slow");
}



//---------------UPRAVLJANJE INFO I LOKACIJSKA (IZBORNIK)------------------------------
//funkcije za upravljanje 2u1 alatom 
function pokreniInfo() {
    if (infogumbOn == false) {
        alatiOff();
        //$('a#infoalat2').addClass("buttonOn");
        $('button[title="Info"]').addClass("buttonOn");
        $('.info').removeClass('fa-info-circle');
        $('.info').addClass('fa-map-marker');
        zajednicki = true;
        infogumbOn = true;
        helpCursor();
        $('#alat2u1').fadeOut('fast'); //ugasi izbornik
        $("#info-help").show(); //pokazi upute
        //aktivira funkciju nakon 0.7 sekunda (inače se aktivira kod ukljucivanja)
        setTimeout(function () {
            map.on('click', infoOn);
        }, 700);
    } else {
        zajednickiInfoLokacijskaOff();
        // defaultCursor();
    }
};

//funkcije za upravljanje 2u1 alatom 
function pokreniLokacijsku() {
    if (lokacijskagumbOn == false) {
        alatiOff();
        $("#lokacijska-help").show();
        // $('a#lokacijska2').addClass("buttonOn");
        $('button[title="Info"]').addClass("buttonOn");
        $('.info').removeClass('fa-info-circle');
        $('.info').addClass('fa-table');
        zajednicki = true;
        lokacijskagumbOn = true;
        helpCursor();
        $('#alat2u1').fadeOut('fast');
        upaliSloj(18); //pali sloj katastar
        upaliSloj(19); //pali sloj katastarske čestice
        //aktivira funkciju nakon 0.7 sekunda (inače se aktivira kod ukljucivanja)
        setTimeout(function () {
            map.on('click', lokacijskaInfo);
        }, 700);
    } else {
        zajednickiInfoLokacijskaOff();
        // defaultCursor();
    }
};

//otvaranja i zatvaranje dropdown-a
function otvoriIzbornik() {
    $('#alat2u1').fadeIn();
    dodajTekstInfoAlat();
}

function sakrijIzbornik() {
    $('#alat2u1').hide();
    makniTekstInfoAlat();
}

//reset info  (2u1) alata na početnu vrijednost i gasi sve alate
function zajednickiInfoLokacijskaOff() {
    // $('a#infoalat2').removeClass("buttonOn");
    //$('a#lokacijska2').removeClass("buttonOn");
    $('button[title="Info"]').removeClass("buttonOn");
    $('.info').addClass('fa-info-circle');
    $('.info').removeClass('fa-map-marker');
    $('.info').removeClass('fa-table');
    zajednicki = false;
    lokacijskaInfoOff();
    infoOff();
    makniTekstInfoAlat();
}
