//------------------------SLANJE UPITA----------------------------------------------
//alat za slanje upita

var hdksX;
var hdksY;

var sirina_upit;
var duzina_upit;

//show/hide dodatna polja u slanju upita

$("#dodatnoGumb").on("click", function () {
    var gumb = $("#dodatnoPolja")
    gumb.toggleClass("hide");
    if (gumb.hasClass("hide")) {
        $("#ikonaDodatno").removeClass("fa-chevron-up")
        $("#ikonaDodatno").addClass("fa-chevron-down")
    } else {
        $("#ikonaDodatno").removeClass("fa-chevron-down")
        $("#ikonaDodatno").addClass("fa-chevron-up")
    }
});


function posaljiUpit(e) {
    var coord = e.latlng;
    sirina_upit = (coord.lat);
    duzina_upit = (coord.lng);
    //maknuti klase crveno kod provjere da li su ispunjena polja
    $('#ime').removeClass('ispuniti');
    $('#email').removeClass('ispuniti');
    $('#naslov').removeClass('ispuniti');
    //$('#vrsta').removeClass('ispuniti');
    $('#poruka').removeClass('ispuniti');
    $('.malaSlova').removeClass('crveno');
    $('.malaSlovaPogreska').hide();

    $("#modalUpit").modal("show");
    $('#koordinate').show();
    $("#success").empty();
    //reset dodatna polja da budu sakrivena
    $("#dodatnoPolja").addClass('hide');
    $("#ikonaDodatno").removeClass("fa-chevron-up");
    $("#ikonaDodatno").addClass("fa-plus");
    //reset vrijednosti polja
    $("input[type=text],input[type=email],textarea").val('');
    $('#characters_pitanje').text('[2048 / 2048]');
    $('#characters_ime').text('[60 / 60]');
    $('#characters_email').text('[60 / 60]');
    $('#characters_naslov').text('[60 / 60]');
    $('#characters_adresa').text('[200 / 200]');
    $('#characters_oib').text('[11 / 11]');
    $('#characters_tel').text('[60 / 60]');
    $('#characters_skype').text('[60 / 60]');
    //reset boje
    $('#characters_oib').css("color", "#aaa");
    //$('#vrsta option[value=vrsta0]').prop('selected', true);
    $('#posaljiDrugi').hide();
    $('#formaUpit').show();
    $('#koUpit').find('option:first-child').prop('selected', true).end().trigger('chosen:updated'); //reset opcina
    $('#kcUpit').find('option').remove()
    $('#kcUpit').find('option:first-child').prop('selected', true).end().trigger('chosen:updated'); //reset cestica
    document.getElementById("kcUpit").disabled = true;

    hdksX = (hdks6_x(duzina_upit, sirina_upit));
    hdksY = (hdks6_y(duzina_upit, sirina_upit));

    $("#koordinate").html("Kliknuli ste na koordinate: <br /> HTRS96/TM: E = " + (htrs_y(duzina_upit, sirina_upit)).toFixed(2) + ", N = " + (htrs_x(duzina_upit, sirina_upit)).toFixed(2) + '<br />HDKS 6. zona: X = ' + (hdks6_x(duzina_upit, sirina_upit)).toFixed(2) + ", Y = " + (hdks6_y(duzina_upit, sirina_upit)).toFixed(2));



    $('.fa-question-circle').removeClass("buttonOn");
    slanjeUpitaOff(); //gasi funkciju nakon slanja 1 upita
    defaultCursor();
    resetModalPosition();
    
      //reset opcina  
    $('#koUpit').find('option').remove();
    $('#koUpit').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');        //reset cestica
    $('#kcUpit').find('option').remove()
    $('#kcUpit').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');    
    dohvatiKOUpit();
};

//iskljucivanje upita
function slanjeUpitaOff() {
    map.off('click', posaljiUpit);
    $('button[title="Pošalji upit"]').removeClass("buttonOn");
    posaljiUpitOn = false;
    defaultCursor();
    $("#upit-help").fadeOut("slow");

};

//provjera polja i slanje mail-a (upita) na php scriptu
$('#submit').click(function () {
    //varijable trebaju samo za dodavanje i micanje klasa ispuniti/crveno za obavezna
    var name = document.getElementById('ime').value
    var email = document.getElementById('email').value
    var title = document.getElementById('naslov').value
    //var vrsta = document.getElementById('vrsta').value
    var query = document.getElementById('poruka').value
    var oib = document.getElementById('oib').value


    $('#ime').removeClass('ispuniti');
    $('#email').removeClass('ispuniti');
    $('#naslov').removeClass('ispuniti');
    //$('#vrsta').removeClass('ispuniti');
    $('#poruka').removeClass('ispuniti');
    $('#oib').removeClass('ispuniti');
    $('.malaSlova').removeClass('crveno');
    $('.malaSlovaPogreska').hide();

    if (name.length > 0 && email.length > 0 && title.length > 0 && query.length > 0 /*&& vrsta != "vrsta0"*/ && (oib.length == 0 || (oib.length == 11 && !isNaN(oib)) ) ) {
        var podaciUpit = $("#formaUpit").serializeArray();
        podaciUpit.push({
            name: 'fi',
            value: sirina_upit
        }, {
            name: 'la',
            value: duzina_upit
        }, {
            name: 'hdksX',
            value: hdksX
        }, {
            name: 'hdksY',
            value: hdksY
        });
        $.post("php/posaljiUpit.php", podaciUpit, function (response) {
            if (response == "Poruka je poslana!") {
                //dodaj marker u sloj clusteringa za svaki poslani upit
                var marker = L.marker(new L.LatLng(sirina_upit, duzina_upit));
                markers.addLayer(marker);
                var title = $('#poruka').val();
                marker.bindPopup(title);
                markers.addLayer(marker);
                //kraj
                $('#formaUpit').hide();
                $('.malaSlova').hide();
                $('.malaSlovaPogreska').hide();
                $('#success').html(response);
                $('#koordinate').hide();
                $('#characters_pitanje').text('[2048 / 2048]');
                $('#characters_ime').text('[60 / 60]');
                $('#characters_email').text('[60 / 60]');
                $('#characters_naslov').text('[60 / 60]');
                $('#characters_oib').text('[11 / 11]');
                $('#characters_adresa').text('[200 / 200]');
                $('#characters_skype').text('[60 / 60]');
                $('#characters_tel').text('[60 / 60]');
                $('#koUpit').find('option:first-child').prop('selected', true).end().trigger('chosen:updated'); //reset opcina
                $('#kcUpit').find('option').remove()
                $('#kcUpit').find('option:first-child').prop('selected', true).end().trigger('chosen:updated'); //reset cestica
            } else {
                $('#success').html(response);
                $('#formaUpit').hide();
                $('.malaSlova').hide();
                $('.malaSlovaPogreska').hide();
                $('#posaljiDrugi').show();
                $('#koordinate').hide();
            }
        })
    } else {

        $('.malaSlova').addClass('crveno');
        $('.malaSlovaPogreska').show().addClass('crveno');       
        if (name.length == 0) {
            $('#ime').addClass('ispuniti');
        }
        if (email.length == 0) {
            $('#email').addClass('ispuniti');
        }
        if (title.length == 0) {
            $('#naslov').addClass('ispuniti');
        }
        /*if (vrsta == "vrsta0") {
            $('#vrsta').addClass('ispuniti');
        }*/
        if (query.length == 0) {
            $('#poruka').addClass('ispuniti');
        }
        if (oib.length > 0)  {
            if(oib.match(/^\d+$/)==null || oib.length<11){
            $('#oib').addClass('ispuniti');
            }
            else{
            $('#oib').removeClass('ispuniti');

            }
        }
        
        
       // alert(oib.match(/^\d+$/));
        //alert(tel.match(/^\d+$/));
        
}
return false;
});

//funkcija za gumb 'povratak' u slanju upita
function povratak() {

    $('#formaUpit').show();
    $('#posaljiDrugi').hide();
    $("#success").empty();
    $('.malaSlova').show();
    $('.malaSlovaPogreska').hide();
    $('#koordinate').show();
};


//brojanje preostalog broja znakova
$('textarea').keyup(function () {
    var cs = 2048 - $(this).val().length;
    $('#characters_pitanje').text("[" + cs + " / 2048]");
    if (cs <= 50) {
        $('#characters_pitanje').css("color", "#555")
    } else {
        $('#characters_pitanje').css("color", "#aaa")
    }
});

$('#ime').keyup(function () {
    var cs = 60 - $(this).val().length;
    $('#characters_ime').text("[" + cs + " / 60]");
    if (cs <= 10) {
        $('#characters_ime').css("color", "#555")
    } else {
        $('#characters_ime').css("color", "#aaa")
    }
})

$('#naslov').keyup(function () {
    var cs = 60 - $(this).val().length;
    $('#characters_naslov').text("[" + cs + " / 60]");
    if (cs <= 10) {
        $('#characters_naslov').css("color", "#555")
    } else {
        $('#characters_naslov').css("color", "#aaa")
    }
})

$('#email').keyup(function () {
    var cs = 60 - $(this).val().length;
    $('#characters_email').text("[" + cs + " / 60]");
    if (cs <= 10) {
        $('#characters_email').css("color", "#555")
    } else {
        $('#characters_email').css("color", "#aaa")
    }
})

$('#oib').keyup(function () {
    var cs = 11 - $(this).val().length;
    $('#characters_oib').text("[" + cs + " / 11]");
    if (cs <= 10) {
        $('#characters_oib').css("color", "#555")
    } else {
        $('#characters_oib').css("color", "#aaa")
    }
})

$('#adresa').keyup(function () {
    var cs = 200 - $(this).val().length;
    $('#characters_adresa').text("[" + cs + " / 200]");
    if (cs <= 10) {
        $('#characters_adresa').css("color", "#555")
    } else {
        $('#characters_adresa').css("color", "#aaa")
    }
})

$('#tel').keyup(function () {
    var cs = 60 - $(this).val().length;
    $('#characters_tel').text("[" + cs + " / 60]");
    if (cs <= 10) {
        $('#characters_tel').css("color", "#555")
    } else {
        $('#characters_tel').css("color", "#aaa")
    }
})

$('#skype').keyup(function () {
    var cs = 60 - $(this).val().length;
    $('#characters_skype').text("[" + cs + " / 60]");
    if (cs <= 10) {
        $('#characters_skype').css("color", "#555")
    } else {
        $('#characters_skype').css("color", "#aaa")
    }
})


var odabranaKOupit;

function dohvatiKOUpit() {
    $.ajax({
        type: "GET",
        url: "php/getKatastar.php",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: 'json',
        success: function (data) {
             $('#koUpit').find('option').remove().end().append('<option value></option>');//da ne ispisuje nijednu opcinu u pocetku
            for (i = 0; i < data.length; i++) {
                $("#koUpit").append('<option value="' + data[i].ko_naziv + '">' + data[i].ko_naziv + '</option>');
            };
            $("#koUpit").trigger("chosen:updated");


        },
    }); // Ajax Call

}

//pamti ko
$("#koUpit").chosen().change(function () {
    odabranaKOupit = $(this).val();
    // console.log(odabranaKOupit)
    $('#kcUpit').find('option').remove();
    $('#kcUpit').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
    dohvatiKCUpit();
});


function dohvatiKCUpit() {
    // console.log("dohvatiKCUpit()")
    document.getElementById("kcUpit").disabled = false;
    $.ajax({
        type: "GET",
        url: "php/getKCupiti.php",
        data: {
            ko: odabranaKOupit, //salje odabranu opcinu
        },
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: 'json',
        success: function (data) {
            $('#kcUpit').find('option').remove().end().append('<option value></option>');
            for (i = 0; i < data.length; i++) {
                $("#kcUpit").append('<option value="' + data[i].kc_broj + '">' + data[i].kc_broj + '</option>');
            }; //upisuje cestice u select menu
            $("#kcUpit").trigger("chosen:updated");
        },
    }); // Ajax Call
}

//pamti kc
$("#kcUpit").chosen().change(function () {
    odabranaKCupit = $(this).val(); //id odabrane čestice
});