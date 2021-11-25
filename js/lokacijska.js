//markeri za lokacijsku 
var oznakeLI = new L.FeatureGroup();
map.addLayer(oznakeLI);

//micanje markera kod lokacijske informacije
function deleteMarkers() {
    oznakeLI.clearLayers();
};

//-------------------LOKACIJSKA----------------------------------------------------
// za lokacijsku informaciji (dohvaca podatke iz baze)

function isprazniSveLokInfo() {
    $('#NamjenaLokInfoOpis').empty();
    $('#PrometLokInfoOpis').empty();
    $('#TelekomunikacijaLokInfoOpis').empty();
    $('#EnergetskiSustaviLokInfoOpis').empty();
    $('#VodaLokInfoOpis').empty();
    $('#OdvodnjaLokInfoOpis').empty();
    $('#ZasticenaPodrucjaPrirodeLokInfoOpis').empty();
    $('#NacionalnaEkoloskaMrezaLokInfoOpis').empty();
    $('#StanisnitipLokInfoOpis').empty();
    $('#GraditeljskaBastinaLokInfoOpis').empty();
    $('#KrajobrazLokInfoOpis').empty();
    $('#ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis').empty();
    $('#UredjenjezemljistaLokInfoOpis').empty();
    $('#UrbanaPravilaLokInfoOpis').empty();
    $('#PrimjenaPlanskihMjeraZastiteLokInfoOpis').empty();
    //
    //$('#LokInfoOpis').empty();

    $('.NamjenaLokInfo').addClass('hide');
    $('.PrometLokInfo').addClass('hide');
    $('.UrbanaPravilaLokInfo').addClass('hide');
    $('.TelekomunikacijaLokInfo').addClass('hide');
    $('.EnergetskiSustaviLokInfo').addClass('hide');
    $('.VodaLokInfo').addClass('hide');
    $('.OdvodnjaLokInfo').addClass('hide');
    $('.NacionalnaEkoloskaMrezaLokInfo').addClass('hide');
    $('.StanisnitipLokInfo').addClass('hide');
    $('.GraditeljskaBastinaLokInfo').addClass('hide');
    $('.KrajobrazLokInfo').addClass('hide');
    $('.ZastitaposebnihvrijednostiiobiljezjaLokInfo').addClass('hide');
    $('.UredjenjezemljistaLokInfo').addClass('hide');
    $('.PrimjenaPlanskihMjeraZastiteLokInfo').addClass('hide');
    $('.ZasticenaPodrucjaPrirodeLokInfo').addClass('hide');
    //$('.LokInfoOpis').addClass('hide');
}

function lokacijskaInfo(e) {
    deleteMarkers();

    $("#modalLokacijska").modal("show");
    //$('#urbanaPravila').empty();
    var coord = e.latlng;
    var sirina = coord.lat;
    var duzina = coord.lng;
    //points.push([sirina, duzina, "10"]); //dodaj koordinate u heatmap array za svaki klik na kartu

    var marker = L.marker([sirina, duzina]).addTo(oznakeLI); //dodavanje markera
    //heat._reset(); //refresh heat sloj
    //$('#koordinateInfo').html('Lokacijska informacija za koordinate: <br /> WGS84: φ = ' + sirina.toFixed(6) + ', λ = ' + duzina.toFixed(6) + '<br />HDKS 6. zona: X = ' + (hdks6_x(duzina, sirina)).toFixed(2) + ", Y = " + (hdks6_y(duzina, sirina)).toFixed(2) + '<br />HTRS96/TM: E = ' + (htrs_y(duzina, sirina)).toFixed(2) + ", N = " + (htrs_x(duzina, sirina)).toFixed(2)); //info o koordinatama
    $.ajax({
        type: "GET",
        url: "php/getLokInfo.php",
        data: {
            fi: sirina.toFixed(6),
            la: duzina.toFixed(6)
        },
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: 'json',
        /*success: function (msg) {
         $('#resultip').html(msg);
        */
        success: function (data) {
            isprazniSveLokInfo();
            odabranaKC = data[0].id_kc
            prikaziCesticu("cyan");
            
            $('#koordinateInfo').html('Katastarska općina: <b>' + data[0].ko + '</b><br>Katastarska čestica: <b>' + data[0].kc + '</b>');
            for (var i = 0; i < data[0].tables.length; i++) {
                //console.log(data[0].tables[i].layer)
                if (data[0].tables[i].layer == "Namjena") {
                    $('.NamjenaLokInfo').removeClass('hide');
                    //console.log("namjena, " + data[0].tables[i].records.length)
                    //console.log(data[0].tables[i].records)
                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#NamjenaLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].records[j].primarna_namjena != null && data[0].tables[i].records[j].primarna_namjena.length > 0) {
                            $("#NamjenaLokInfoOpis").append("<b>Primarna namjena: </b>" + data[0].tables[i].records[j].primarna_namjena + "</br>");
                        } else {
                            $("#NamjenaLokInfoOpis").append("<b>Primarna namjena: </b>Nema informacija</br>");
                        }

                        if (data[0].tables[i].records[j].simbol != null && data[0].tables[i].records[j].simbol.length > 0) {
                            $("#NamjenaLokInfoOpis").append("<b>Simbol: </b>" + data[0].tables[i].records[j].simbol + "</br>");
                        } else {
                            $("#NamjenaLokInfoOpis").append("<b>Simbol: </b>Nema informacija</br>");
                        }

                        if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                            $("#NamjenaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                        } else {
                            $("#NamjenaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                        }

                        if (data[0].tables[i].records[j].lokalitet != null && data[0].tables[i].records[j].lokalitet.length > 0) {
                            $("#NamjenaLokInfoOpis").append("<b>Lokalitet: </b>" + data[0].tables[i].records[j].lokalitet + "</br>");
                        } else {
                            $("#NamjenaLokInfoOpis").append("<b>Lokalitet: </b>Nema informacija</br>");
                        }

                        if (data[0].tables[i].records[j].kapacitet != null && data[0].tables[i].records[j].kapacitet.length > 0) {
                            $("#NamjenaLokInfoOpis").append("<b>Kapacitet: </b>" + data[0].tables[i].records[j].kapacitet + "</br>");
                        } else {
                            $("#NamjenaLokInfoOpis").append("<b>Kapacitet: </b>Nema informacija</br>");
                        }

                        if (data[0].tables[i].records[j].status != null && data[0].tables[i].records[j].status.length > 0) {
                            $("#NamjenaLokInfoOpis").append("<b>Status: </b>" + data[0].tables[i].records[j].status + "</br>");
                        } else {
                            $("#NamjenaLokInfoOpis").append("<b>Status: </b>Nema informacija</br>");
                        }

                        if (data[0].tables[i].records[j].gup_cl != null && data[0].tables[i].records[j].gup_cl.length > 0) {
                            $("#NamjenaLokInfoOpis").append("<b>GUP članak: </b>" + data[0].tables[i].records[j].gup_cl + "</br>");
                        } 
                        
                        if (data[0].tables[i].records[j].atribut != null && data[0].tables[i].records[j].atribut.length > 0 && data[0].tables[i].records[j].opis_cl != null && data[0].tables[i].records[j].opis_cl.length > 0) {
                            $("#NamjenaLokInfoOpis").append("<b>" + capitalize(data[0].tables[i].records[j].atribut) + ": </b>" + data[0].tables[i].records[j].opis_cl + "</br>");
                        }

                        if (data[0].tables[i].records[j].gup_cl1 != null && data[0].tables[i].records[j].gup_cl1.length > 0) {
                            $("#NamjenaLokInfoOpis").append("<b>GUP članak: </b>" + capitalize(data[0].tables[i].records[j].gup_cl1) + "</br>");
                        } 

                        if (data[0].tables[i].records[j].atribut1 != null && data[0].tables[i].records[j].atribut1.length > 0 && data[0].tables[i].records[j].opis_cl1 != null && data[0].tables[i].records[j].opis_cl1.length > 0) {
                            $("#NamjenaLokInfoOpis").append("<b>" + capitalize(data[0].tables[i].records[j].atribut1) + ": </b>" + data[0].tables[i].records[j].opis_cl1 + "</br>");
                        }
                        $("#NamjenaLokInfoOpis").append("<hr>");


                    }
                }

                if (data[0].tables[i].layer == "Promet") {
                    $('.PrometLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i].records)

                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#PrometLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")

                        if (data[0].tables[i].table_name =="Koridor") {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#PrometLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#PrometLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].gup_cl != null && data[0].tables[i].records[j].gup_cl.length > 0) {
                                $("#PrometLokInfoOpis").append("<b>GUP članak: </b>" + data[0].tables[i].records[j].gup_cl + "</br>");
                            } else {
                                $("#PrometLokInfoOpis").append("<b>GUP članak: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].opis_cl != null && data[0].tables[i].records[j].opis_cl.length > 0) {
                                $("#PrometLokInfoOpis").append("<b>Opis članka: </b>" + data[0].tables[i].records[j].opis_cl + "</br>");
                            } else {
                                $("#PrometLokInfoOpis").append("<b>Opis članka: </b>Nema informacija</br>");
                            }
                        }

                        else if (data[0].tables[i].table_name == "Ceste") {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#PrometLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#PrometLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].oznaka != null && data[0].tables[i].records[j].oznaka.length > 0) {
                                $("#PrometLokInfoOpis").append("<b>Oznaka: </b>" + data[0].tables[i].records[j].oznaka + "</br>");
                            } else {
                                $("#PrometLokInfoOpis").append("<b>Oznaka: </b>Nema informacija</br>");
                            }
                        }
                        else {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#PrometLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#PrometLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                        }
                        $("#PrometLokInfoOpis").append("<hr>");
                    }
                }

                if (data[0].tables[i].layer == "Telekomunikacija") {
                    $('.TelekomunikacijaLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i].records)

                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#TelekomunikacijaLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].table_name == "Telekomunikacijske točke") {
                            //console.log(data[0].tables[i].table_name) 
                            if (data[0].tables[i].records[j].kategorija != null && data[0].tables[i].records[j].kategorija.length > 0) {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Kategorija: </b>" + data[0].tables[i].records[j].kategorija + "</br>");
                            } else {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Kategorija: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].text != null && data[0].tables[i].records[j].text.length > 0) {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Tekst: </b>" + data[0].tables[i].records[j].text + "</br>");
                            } else {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Tekst: </b>Nema informacija</br>");
                            }
                        }
                        else if (data[0].tables[i].table_name == "Telekomunikacijske linije") {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].kategorija != null && data[0].tables[i].records[j].kategorija.length > 0) {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Kategorija: </b>" + data[0].tables[i].records[j].kategorija + "</br>");
                            } else {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Kategorija: </b>Nema informacija</br>");
                            }
                        }
                        else {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#TelekomunikacijaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                        }     
                        $("#TelekomunikacijaLokInfoOpis").append("<hr>");
                    }
                }

                if (data[0].tables[i].layer == "Energetski sustavi") {
                    $('.EnergetskiSustaviLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i].records)

                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#EnergetskiSustaviLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].table_name == "Granica obale") {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#EnergetskiSustaviLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#EnergetskiSustaviLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                        }
                        else {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#EnergetskiSustaviLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#EnergetskiSustaviLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].text != null && data[0].tables[i].records[j].text.length > 0) {
                                $("#EnergetskiSustaviLokInfoOpis").append("<b>Kategorija: </b>" + data[0].tables[i].records[j].text + "</br>");
                            } else {
                                $("#EnergetskiSustaviLokInfoOpis").append("<b>Kategorija: </b>Nema informacija</br>");
                            }
                        }
                        $("#EnergetskiSustaviLokInfoOpis").append("<hr>");
                    }
                }

                if (data[0].tables[i].layer == "Voda") {
                    $('.VodaLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i].records)
                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#VodaLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].table_name == "Vodoopskrba") {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#VodaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#VodaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].text != null && data[0].tables[i].records[j].text.length > 0) {
                                $("#VodaLokInfoOpis").append("<b>Tekst: </b>" + data[0].tables[i].records[j].text + "</br>");
                            } else {
                                $("#VodaLokInfoOpis").append("<b>Tekst: </b>Nema informacija</br>");
                            }
                        }
                        else {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#VodaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#VodaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                        }
                        $("#VodaLokInfoOpis").append("<hr>");
                    }
                }

                if (data[0].tables[i].layer == "Odvodnja") {
                    $('.OdvodnjaLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i].records)

                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#OdvodnjaLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                            $("#OdvodnjaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                        } else {
                            $("#OdvodnjaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                        }
                        $("#OdvodnjaLokInfoOpis").append("<hr>");
                    }
                }

                if (data[0].tables[i].layer == "Zaštićena područja prirode") {
                    $('.ZasticenaPodrucjaPrirodeLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i])

                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].table_name == "Zaštićena prirodna baština točke") {
                            if (data[0].tables[i].records[j].regostarski_br != null && data[0].tables[i].records[j].regostarski_br.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Registarski broj: </b>" + data[0].tables[i].records[j].regostarski_br + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Registarski broj: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].zastita != null && data[0].tables[i].records[j].zastita.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Zaštita: </b>" + data[0].tables[i].records[j].zastita + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Zaštita: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].naziv != null && data[0].tables[i].records[j].naziv.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Naziv: </b>" + data[0].tables[i].records[j].naziv + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Naziv: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].gup_cl != null && data[0].tables[i].records[j].gup_cl.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>GUP članak: </b>" + data[0].tables[i].records[j].gup_cl + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>GUP članak: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].clanak_opis != null && data[0].tables[i].records[j].clanak_opis.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Opis članka: </b>" + data[0].tables[i].records[j].clanak_opis + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Opis članka: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                        }
                        else if (data[0].tables[i].table_name == "Zaštićena prirodna baština poligon") {
                            if (data[0].tables[i].records[j].registarski_br != null && data[0].tables[i].records[j].registarski_br.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Registarski broj: </b>" + data[0].tables[i].records[j].registarski_br + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Registarski broj: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].zastita != null && data[0].tables[i].records[j].zastita.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Zaštita: </b>" + data[0].tables[i].records[j].zastita + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Zaštita: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].naziv != null && data[0].tables[i].records[j].naziv.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Naziv: </b>" + data[0].tables[i].records[j].naziv + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Naziv: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].gup_cl != null && data[0].tables[i].records[j].gup_cl.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>GUP članak: </b>" + data[0].tables[i].records[j].gup_cl + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>GUP članak: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].mjere_zastite != null && data[0].tables[i].records[j].mjere_zastite.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Mjere zaštite: </b>" + data[0].tables[i].records[j].mjere_zastite + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Mjere zaštite: </b>Nema informacija</br>");
                            }
                        }
                        else if (data[0].tables[i].table_name == "Staništa točke") {
                            if (data[0].tables[i].records[j].kategorija != null && data[0].tables[i].records[j].kategorija.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Kategorija: </b>" + data[0].tables[i].records[j].kategorija + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Kategorija: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                        }
                        $("#ZasticenaPodrucjaPrirodeLokInfoOpis").append("<hr>");
                    }
                }

                if (data[0].tables[i].layer == "Nacionalna ekološka mreža") {
                    $('.NacionalnaEkoloskaMrezaLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i].records)

                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].table_name == 'Nacionalna ekološka mreža točke') {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } 
                            else {
                                $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>"); }
                            if (data[0].tables[i].records[j].kategorija != null && data[0].tables[i].records[j].kategorija.length > 0) {
                                $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<b>Kategorija: </b>" + data[0].tables[i].records[j].kategorija + "</br>");
                            } 
                            else {
                                $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<b>Kategorija: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].napomena != null && data[0].tables[i].records[j].napomena.length > 0) {
                                $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<b>Napomena: </b>" + data[0].tables[i].records[j].napomena + "</br>");
                            } else {
                                $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<b>Napomena: </b>Nema informacija</br>");
                            }
                        }
                        else {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].site_code != null && data[0].tables[i].records[j].site_code.length > 0) {
                                $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<b>Site code: </b>" + data[0].tables[i].records[j].site_code + "</br>");
                            } else {
                                $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<b>Site code: </b>Nema informacija</br>");
                            }
                            $("#NacionalnaEkoloskaMrezaLokInfoOpis").append("<hr>");
                        }   
                    }
                }

                if (data[0].tables[i].layer == "Stanišni tip") {
                    $('.StanisnitipLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i].records)
                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#StanisnitipLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                            $("#StanisnitipLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                        } 
                        else {
                            $("#StanisnitipLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>"); }
                        if (data[0].tables[i].records[j].kategorija != null && data[0].tables[i].records[j].kategorija.length > 0) {
                            $("#StanisnitipLokInfoOpis").append("<b>Kategorija: </b>" + data[0].tables[i].records[j].kategorija + "</br>");
                        } 
                        else {
                            $("#StanisnitipLokInfoOpis").append("<b>Kategorija: </b>Nema informacija</br>");
                        }
                        $("#StanisnitipLokInfoOpis").append("<hr>");
                    }
                }


                if (data[0].tables[i].layer == "Graditeljska baština") {
                    $('.GraditeljskaBastinaLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i].records)

                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#GraditeljskaBastinaLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].table_name == "Graditeljska baština točke") {
                            if (data[0].tables[i].records[j].kategorija != null && data[0].tables[i].records[j].kategorija.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Kategorija: </b>" + data[0].tables[i].records[j].kategorija + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Kategorija: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].vrsta != null && data[0].tables[i].records[j].vrsta.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Vrsta: </b>" + data[0].tables[i].records[j].vrsta + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Vrsta: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].znacaj != null && data[0].tables[i].records[j].znacaj.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Značaj: </b>" + data[0].tables[i].records[j].znacaj + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Značaj: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].naziv != null && data[0].tables[i].records[j].naziv.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Naziv: </b>" + data[0].tables[i].records[j].naziv + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Naziv: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].zastita != null && data[0].tables[i].records[j].zastita.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Zaštita: </b>" + data[0].tables[i].records[j].zastita + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Zaštita: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].napomena != null && data[0].tables[i].records[j].napomena.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Napomena: </b>" + data[0].tables[i].records[j].napomena + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Napomena: </b>Nema informacija</br>");
                            }
                        }                   
                        else if (data[0].tables[i].table_name == "Graditeljska baština poligoni") {                            
                            if (data[0].tables[i].records[j].naziv != null && data[0].tables[i].records[j].naziv.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Naziv: </b>" + data[0].tables[i].records[j].naziv + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Naziv: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].vrsta != null && data[0].tables[i].records[j].vrsta.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Vrsta: </b>" + data[0].tables[i].records[j].vrsta + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Vrsta: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].zastita != null && data[0].tables[i].records[j].zastita.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Zaštita: </b>" + data[0].tables[i].records[j].zastita + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Zaštita: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].kategorija != null && data[0].tables[i].records[j].kategorija.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Kategorija: </b>" + data[0].tables[i].records[j].kategorija + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Kategorija: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].napomena != null && data[0].tables[i].records[j].napomena.length > 0) {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Napomena: </b>" + data[0].tables[i].records[j].napomena + "</br>");
                            } else {
                                $("#GraditeljskaBastinaLokInfoOpis").append("<b>Napomena: </b>Nema informacija</br>");
                            }
                        }
                        $("#GraditeljskaBastinaLokInfoOpis").append("<hr>");
                    }
                }

                if (data[0].tables[i].layer == "Krajobraz") {
                    $('.KrajobrazLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i].records)

                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#KrajobrazLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if(data[0].tables[i].table_name == "Krajobraz točke"){
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#KrajobrazLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#KrajobrazLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].kategorija != null && data[0].tables[i].records[j].kategorija.length > 0) {
                                $("#KrajobrazLokInfoOpis").append("<b>Kategorija: </b>" + data[0].tables[i].records[j].kategorija + "</br>");
                            } else {
                                $("#KrajobrazLokInfoOpis").append("<b>Kategorija: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].sadrzaj != null && data[0].tables[i].records[j].sadrzaj.length > 0) {
                                $("#KrajobrazLokInfoOpis").append("<b>Sadržaj: </b>" + data[0].tables[i].records[j].sadrzaj + "</br>");
                            } else {
                                $("#KrajobrazLokInfoOpis").append("<b>Sadržaj: </b>Nema informacija</br>");
                            }
                            
                        }
                        else if (data[0].tables[i].table_name == "Krajobraz poligon") {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#KrajobrazLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#KrajobrazLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].obuhvat != null && data[0].tables[i].records[j].obuhvat.length > 0) {
                                $("#KrajobrazLokInfoOpis").append("<b>Obuhvat: </b>" + data[0].tables[i].records[j].obuhvat + "</br>");
                            } else {
                                $("#KrajobrazLokInfoOpis").append("<b>Obuhvat: </b>Nema informacija</br>");
                            }
                        }
                        else if (data[0].tables[i].table_name == "Zaštita površina") {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#KrajobrazLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#KrajobrazLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].napomena != null && data[0].tables[i].records[j].napomena.length > 0) {
                                $("#KrajobrazLokInfoOpis").append("<b>Napomena: </b>" + data[0].tables[i].records[j].napomena + "</br>");
                            } else {
                                $("#KrajobrazLokInfoOpis").append("<b>Napomena: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].gup_cl != null && data[0].tables[i].records[j].gup_cl.length > 0) {
                                $("#KrajobrazLokInfoOpis").append("<b>GUP članak: </b>" + data[0].tables[i].records[j].gup_cl + "</br>");
                            } else {
                                $("#KrajobrazLokInfoOpis").append("<b>GUP članak: </b>Nema informacija</br>");
                            }
                            if (data[0].tables[i].records[j].mjere_ocuvanja != null && data[0].tables[i].records[j].mjere_ocuvanja.length > 0) {
                                $("#KrajobrazLokInfoOpis").append("<b>Mjere očuvanja: </b>" + data[0].tables[i].records[j].mjere_ocuvanja + "</br>");
                            } else {
                                $("#KrajobrazLokInfoOpis").append("<b>Mjere očuvanja: </b>Nema informacija</br>");
                            }
                        }
                        $("#KrajobrazLokInfoOpis").append("<hr>");
                    }
                }


                if (data[0].tables[i].layer == "Zaštita posebnih vrijednosti i obilježja") {
                    $('.ZastitaposebnihvrijednostiiobiljezjaLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i].records)

                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                        if (data[0].tables[i].records[j].sastavnica != null && data[0].tables[i].records[j].sastavnica.length > 0) {
                                $("#ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis").append("<b>Sastavnica: </b>" + data[0].tables[i].records[j].sastavnica + "</br>");
                            } else {
                                $("#ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis").append("<b>Sastavnica: </b>Nema informacija</br>");
                            }
                        if (data[0].tables[i].records[j].gup_cl != null && data[0].tables[i].records[j].gup_cl.length > 0) {
                                $("#ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis").append("<b>GUP članak: </b>" + data[0].tables[i].records[j].gup_cl + "</br>");
                            } else {
                                $("#ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis").append("<b>GUP članak: </b>Nema informacija</br>");
                            }
                        if (data[0].tables[i].records[j].mjere_zastite != null && data[0].tables[i].records[j].mjere_zastite.length > 0) {
                                $("#ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis").append("<b>Mjere zaštite: </b>" + data[0].tables[i].records[j].mjere_zastite + "</br>");
                            } else {
                                $("#ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis").append("<b>Mjere zaštite: </b>Nema informacija</br>");
                            }
                        $("#ZastitaposebnihvrijednostiiobiljezjaLokInfoOpis").append("<hr>");
                    }
                }

                if (data[0].tables[i].layer == "Uređenje zemljišta") {
                    $('.UredjenjezemljistaLokInfo').removeClass('hide');
                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#UredjenjezemljistaLokInfo").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#UredjenjezemljistaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#UredjenjezemljistaLokInfoOpis").append("<b>Opis: </b>Nema informacija</br>");
                            }
                        $("#UredjenjezemljistaLokInfoOpis").append("<hr>");
                    }
                }


                if (data[0].tables[i].layer == "Urbana pravila") {
                    $('.UrbanaPravilaLokInfo').removeClass('hide');

                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        //$('#UrbanaPravilaOpis').html('<p>aa</p>')
                        $("#UrbanaPravilaLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].table_name == "Urbana pravila točke") {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Opis: </b>Nema podataka</br>");
                            }
                            if (data[0].tables[i].records[j].kapacitet != null && data[0].tables[i].records[j].kapacitet.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Kapacitet: </b>" + data[0].tables[i].records[j].kapacitet + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Kapacitet: </b>Nema podataka</br>");
                            }
                            if (data[0].tables[i].records[j].kategorija != null && data[0].tables[i].records[j].kategorija.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Kategorija: </b>" + data[0].tables[i].records[j].kategorija + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Kategorija: </b>Nema podataka</br>");
                            }
                            if (data[0].tables[i].records[j].oznaka != null && data[0].tables[i].records[j].oznaka.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Oznaka: </b>" + data[0].tables[i].records[j].oznaka + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Oznaka: </b>Nema podataka</br>");
                            }
                            if (data[0].tables[i].records[j].lokacija != null && data[0].tables[i].records[j].lokacija.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Lokacija: </b>" + data[0].tables[i].records[j].lokacija + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Lokacija: </b>Nema podataka</br>");
                            }
                            if (data[0].tables[i].records[j].gup_cl != null && data[0].tables[i].records[j].gup_cl.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>GUP članak: </b>" + data[0].tables[i].records[j].gup_cl + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>GUP članak: </b>Nema podataka</br>");
                            }
                            if (data[0].tables[i].records[j].opis_clanak != null && data[0].tables[i].records[j].opis_clanak.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Opis članka: </b>" + data[0].tables[i].records[j].opis_clanak + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Opis članka: </b>Nema podataka</br>");
                            }
                            if (data[0].tables[i].records[j].uvjeti != null && data[0].tables[i].records[j].uvjeti.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Uvjeti: </b>" + data[0].tables[i].records[j].uvjeti + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Uvjeti: </b>Nema podataka</br>");
                            }
                        }
                        else if (data[0].tables[i].table_name == "Urbana pravila poligoni") {
                            if (data[0].tables[i].records[j].opis != null && data[0].tables[i].records[j].opis.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Opis: </b>" + data[0].tables[i].records[j].opis + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Opis: </b>Nema podataka</br>");
                            }
                            if (data[0].tables[i].records[j].podrucje != null && data[0].tables[i].records[j].podrucje.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Područje: </b>" + data[0].tables[i].records[j].podrucje + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Područje: </b>Nema podataka</br>");
                            }
                            if (data[0].tables[i].records[j].gup_clanak != null && data[0].tables[i].records[j].gup_clanak.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>GUP članak: </b>" + data[0].tables[i].records[j].gup_clanak + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>GUP članak: </b>Nema podataka</br>");
                            }
                            if (data[0].tables[i].records[j].opis_clanak != null && data[0].tables[i].records[j].opis_clanak.length > 0) {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Opis članka: </b>" + data[0].tables[i].records[j].opis_clanak + "</br>");
                            } else {
                                $("#UrbanaPravilaLokInfoOpis").append("<b>Opis članka: </b>Nema podataka</br>");
                            }
                        }
                        $("#UrbanaPravilaLokInfoOpis").append("<hr>");
                    }
                    //console.log(data[0].tables[i])
                    //console.log(data[0].tables[i].records[0].gup_clanak)
                }

                if (data[0].tables[i].layer == "Primjena planskih mjera zaštite") {
                    $('.PrimjenaPlanskihMjeraZastiteLokInfo').removeClass('hide');
                    //console.log(data[0].tables[i].records)

                    for (var j = 0; j < data[0].tables[i].records.length; j++) {
                        $("#PrimjenaPlanskihMjeraZastiteLokInfoOpis").append("<b>Sloj: </b>" + data[0].tables[i].table_name + "</br>")
                        if (data[0].tables[i].records[j].obuhvat_pp != null && data[0].tables[i].records[j].obuhvat_pp.length > 0) {
                            $("#PrimjenaPlanskihMjeraZastiteLokInfoOpis").append("<b>Obuhvat prostornog plana: </b>" + data[0].tables[i].records[j].obuhvat_pp + "</br>");
                        } else {
                            $("#PrimjenaPlanskihMjeraZastiteLokInfoOpis").append("<b>Obuhvat prostornog plana: </b>Nema informacija</br>");
                        }
                        if (data[0].tables[i].records[j].status != null && data[0].tables[i].records[j].status.length > 0) {
                            $("#PrimjenaPlanskihMjeraZastiteLokInfoOpis").append("<b>Status: </b>" + data[0].tables[i].records[j].status + "</br>");
                        } else {
                            $("#PrimjenaPlanskihMjeraZastiteLokInfoOpis").append("<b>Status: </b>Nema informacija</br>");
                        }
                        $("#PrimjenaPlanskihMjeraZastiteLokInfoOpis").append("<hr>");
                    }
                }

            };
            //$("#urbanaPravila").html("<b>Opis:</b> " + data[0].opis + "<br /><b>Područje:</b> " + data[0].podrucje + "<br /><b>Članak:</b> " + data[0].gup_clanak + "<br /><b>Posebna pravila:</b> " + data[0].opis_clanak);
            $('div.namjena').addClass('hide');
        },

        error: function () {
            isprazniSveLokInfo();
            $('#koordinateInfo').html('Potrebno je kliknuti na neku katastarsku česticu kako bi se dobila lokacijska informacija za istu.');
        }

    }); // Ajax Call
    resetModalPosition();
    $("#lokacijska-help").fadeOut("slow");
    //lokacijskaInfoOff(); /*gasenje funckije nakon svakog upita*/
    //defaultCursor();
};

//iskljucivanje
function lokacijskaInfoOff() {
    map.off('click', lokacijskaInfo);
    // $('button[title="Lokacijska informacija"]').removeClass("buttonOn"); //za odvojene alate
    lokacijskagumbOn = false;
    deleteMarkers();
    defaultCursor();
    $("#lokacijska-help").fadeOut("slow");

};
