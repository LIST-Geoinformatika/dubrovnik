var overlaylayers = [namjena, promet, telekomunikacija, energ_sustavi, voda, odvodnja, bastina, ekomreza, stanisnitip, graditeljskabastina, krajobraz, zpvo, 
    uredjenjezemljista, urbanapravila, posebnazastita, naselja, gradskikotari, gupgranice, katopcine, katcestice, zgrade, odlagalista, stabla, 
    ljetnikovci, zelenikoridori,zastitnozelenilo,vanjskisportski,trgovi,stambenozelenilo,spomenpodrucja,prirodnidoprirodni,parkovi,groblja,djecjaigrimladi, markers, heat]
    
var upaljeni_slojevi = []; //varijabla u koju se spremaju trenutno upaljeni slojevi
function upaliSloj(layer_id){
    if (! map.hasLayer(overlaylayers[layer_id])){
        map.addLayer(overlaylayers[layer_id]);
        document.getElementById(layer_id).checked = true;
        //console.log("layer " + layer_id + " has been added")
        sloj = "." + document.getElementById(layer_id).value + "Legenda"
        $(sloj).show();
        if (layer_id < 15 || layer_id == 22 || layer_id == 23 || layer_id == 24 || layer_id == 25 || layer_id == 26 || layer_id == 27 || layer_id == 28 || layer_id == 29 || layer_id == 30 || layer_id == 31 || layer_id == 32 || layer_id == 33 ){
            upaljeni_slojevi.push(layer_id);
            provjeriSlojUGrupi();
            //console.log(upaljeni_slojevi)
            $(".nemaslojeva").hide();
        };
    }
}

function ugasiSloj(layer_id){
    map.removeLayer(overlaylayers[layer_id]);
    document.getElementById(layer_id).checked = false;
    sloj = "."+document.getElementById(layer_id).value + "Legenda";
    $(sloj).hide();
    upaljeni_slojevi.remove(layer_id);
    provjeriSlojUGrupi();
    //console.log("upaljeni slojevi " + upaljeni_slojevi);
    if (upaljeni_slojevi.length == 0) {
        $(".nemaslojeva").show();
    }
}

function provjeriSlojUGrupi(){
    var grupa0 = [0];
    var grupa1 = [1,2,3,4,5];
    var grupa2 = [6,7,8,9,10];
    var grupa3 = [11,12,13,14];

    var sloj0 = 0;
    var sloj1 = 0;
    var sloj2 = 0;
    var sloj3 = 0;
	
    var grupa0_id = 100;
    var grupa1_id = 101;
    var grupa2_id = 106;
    var grupa3_id = 111;


    for (var i = 0; i < upaljeni_slojevi.length; i++) {
        for (var j = 0; j < grupa0.length; j ++) {
            if (upaljeni_slojevi[i] == grupa0[j]) {
                sloj0 += 1;
            }
        }
        for (var j = 0; j < grupa1.length; j ++) {
            if (upaljeni_slojevi[i] == grupa1[j]) {
                sloj1 += 1;
            }
        }
        for (var j = 0; j < grupa2.length; j ++) {
            if (upaljeni_slojevi[i] == grupa2[j]) {
                sloj2 += 1;
            }
        }
        for (var j = 0; j < grupa3.length; j ++) {
            if (upaljeni_slojevi[i] == grupa3[j]) {
                sloj3 += 1;
            }
        }		
    }

    function grupe(grupa, grupa_id, sloj) {
        if (sloj == 0) {
            document.getElementById(grupa_id).indeterminate = false;
            document.getElementById(grupa_id).checked = false;
        }
        else if (sloj < grupa.length) {
            document.getElementById(grupa_id).indeterminate = true;
            document.getElementById(grupa_id).checked = false;
        }
        else if (sloj == grupa.length) {
            document.getElementById(grupa_id).indeterminate = false;
            document.getElementById(grupa_id).checked = true;
        }
    }
    grupe(grupa0, grupa0_id, sloj0);
    grupe(grupa1, grupa1_id, sloj1);
    grupe(grupa2, grupa2_id, sloj2);
    grupe(grupa3, grupa3_id, sloj3);

}

/*function infoKlikAccord(){
    $('#infoKlik').accordion({   //$('#accord > div').accordion({
        //header: "h3",
        collapsible: true,
        heightStyle: "content",
        active: 1,
        
    });
};*/

// Capitalize first letter of a string
function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}


$(document).ready(function(){
    $(function(){
        $('#accord').accordion({   //$('#accord > div').accordion({
        	//header: "h3",
        	collapsible: true,
        	heightStyle: "content",
        	active: 1,
            icons: {
				header: "fa fa-folder-o fa-lg",
				activeHeader: "fa fa-folder-open-o fa-lg"
			},
        });
    });


    $(function(){
        $('#accord2 > div').accordion({
            header: "h3",
            collapsible: true,
            heightStyle: "content",
            active: 0,
            icons: {
                header: "fa fa-chevron-down fa-lg",
                activeHeader: "fa fa-chevron-up fa-lg"
            },
        });
    });


    $(function(){
        $('#accord1 > div').accordion({
        	header: "h4",
        	collapsible: true,
        	heightStyle: "content",
        	active: 0,
            icons: {
				header: "fa fa-folder-o",
				activeHeader: "fa fa-folder-open-o"
			},
        });
    });
    
    //prebacivanje tab-ova
    $("#myTab a").click(function(e){
          e.preventDefault();
          $(this).tab('show')
    });

    

    //popunjavanje legende
    function popuniLegendu(nazivsloja) {
        $.ajax({
            type: "GET",
            url: "php/legenda.php",
            data: {
                sloj: nazivsloja,
            },
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            dataType: 'json',
            
            success: function (data) {
                var opisi_slojeva = []
                var opis;
                var boja;
                var klasa;
                var geometrija;
                var rotacija;

                for (var i = 0; i < data.length; i++) {
                    boja = data[i].boja;
                    klasa = "." + nazivsloja + "Legenda > div";
                    opis = data[i].opis_sloja;
                    //opis = dugiopis.split('-')[0];
                    opis = capitalize(opis);
                    geometrija = data[i].geometrija_legenda;
                    opis_geometrija = opis + geometrija;
                    rotacija = data[i].rotacija;
                    if (rotacija > 0) {
                        geometrija = geometrija + " " + rotacija;
                    }
                    //console.log(geometrija)
                    provjeriOpis = false;

                    for (var a = 0; a < opisi_slojeva.length; a++) {
                        if (opis_geometrija === opisi_slojeva[a]) {
                            provjeriOpis = true;
                        }
                    }

                    if (provjeriOpis == false) {
                        opisi_slojeva.push(opis_geometrija);
                        //console.log(geometrija)
                        if (geometrija == 'polygon') {
                            $(klasa).append('<div class="simbol_polygon" style="background-color:' + boja + '"></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'line') {
                            $(klasa).append('<div class="simbol_line" style="border-top-color:' + boja + '"></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'line dotted') {
                            $(klasa).append('<div class="simbol_line_dotted" style="color:' + boja + '">....</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'line dashed') {
                            $(klasa).append('<div class="simbol_line_dashed" style="color:' + boja + '">- -</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'stroke') {
                            $(klasa).append('<div class="simbol_stroke" style="border-color:' + boja + '"></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'plus') {
                            $(klasa).append('<div class="simbol_simbol" style="color:' + boja + '">&#9638</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'vertline') {
                            $(klasa).append('<div class="simbol_simbol"> <p style="color:' + boja + '">&#9637</p></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'horline') {
                            $(klasa).append('<div class="simbol_simbol" style="color:' + boja + '">&#9636</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'slash') {
                            $(klasa).append('<div class="simbol_simbol" style="color:' + boja + '">&#9640</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'backslash') {
                            $(klasa).append('<div class="simbol_simbol" style="color:' + boja + '">&#9639</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'times') {
                            $(klasa).append('<div class="simbol_simbol" style="color:' + boja + '">&#9641</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'point' || geometrija == 'circle') {
                            $(klasa).append('<div class="simbol_simbol_point2" style="font-size:24px; margin-top: -9px; color:' + boja + '">&#9679</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'point stroke') {
                            $(klasa).append('<div class="simbol_point_stroke" style="border-color:' + boja + '"></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'triangle') {
                            $(klasa).append('<div class="simbol_simbol_point" style="color:' + boja + '">&#9650</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'square') {
                            $(klasa).append('<div class="simbol_simbol_point" style="font-size:16px; color:' + boja + '">&#9632</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'square 45') {
                            $(klasa).append('<div class="simbol_simbol_point" style="font-size:16px; margin-left:19px; margin-right:9px; color:' + boja + '">&#9670</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'triangle 90') {
                            $(klasa).append('<div class="simbol_simbol_point" style="font-size:16px; color:' + boja + '">&#9654</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'triangle 270') {
                            $(klasa).append('<div class="simbol_simbol_point" style="font-size:16px; margin-left:19px; margin-right:9px; color:' + boja + '">&#9664</div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'dbc') {
                            $(klasa).append('<div class="simbol_dbc"></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'gc') {
                            $(klasa).append('<div class="simbol_gc"></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'ggc') {
                            $(klasa).append('<div class="simbol_ggc"></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'oc') {
                            $(klasa).append('<div class="simbol_oc"></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'sc') {
                            $(klasa).append('<div class="simbol_sc"></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        else if (geometrija == 'odc') {
                            $(klasa).append('<div class="simbol_odc"></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }
                        /*else {
                            $(klasa).append('<div class="simbol" style="background-color:' + boja + '"></div>');
                            $(klasa).append('<p>'+ opis +'</p>')
                        }*/
                    }
                }; 
            },
 
        }); // Ajax Call
    }


    slojevi = ['urbanapravila', 'namjena', 'promet', 'v_grad_bastina', 'v_zpb', 'v_ppmz', 'voda', 'telekomunikacija', 'krajobraz', 'odvodnja', 'v_nem', 'energetski_sustavi', 'zpvo', 'uredjenje_zemljista', 'v_stanista', 'odlagalista', 'stabla', 'ljetnikovci','zelenikoridori','zastitnozelenilo','vanjskisportski','trgovi','stambenozelenilo','spomenpodrucja','prirodnidoprirodni','parkovi','groblja','djecjaigrimladi']
    
    for (var i = 0; i < slojevi.length; i++) {
        popuniLegendu(slojevi[i]);
    };
    

    //funkcija za brisanje elemenata iz liste
    if (!Array.prototype.remove) {
        Array.prototype.remove = function(val) {
            var i = this.indexOf(val);
                return i>-1 ? this.splice(i, 1) : [];
        };
    }

   //početne oznake na radiobuttons i checkbox - oznake za upaljene i ugašene slojeve
   //baselayers
    document.getElementById("1000").checked = false; //osm
    document.getElementById("1001").checked = false; //prazan
    document.getElementById("1002").checked = true; //dof_dgu
    document.getElementById("1003").checked = false; //hok_dgu

    //overlay layers
    document.getElementById("0").checked = false; //namjena
    document.getElementById("1").checked = false; //promet
    document.getElementById("2").checked = false; //telekomunikacija
    document.getElementById("3").checked = false; //energetski sustavi
    document.getElementById("4").checked = false; //voda
    document.getElementById("5").checked = false; //odvodnja
    document.getElementById("6").checked = false; //bastina - zaštićena područja prirode
    document.getElementById("7").checked = false; //ekomreza
    document.getElementById("8").checked = false; //stanišni tip
    document.getElementById("9").checked = false; //graditeljska baština 
    document.getElementById("10").checked = false; //krajobraz    
    document.getElementById("11").checked = false; //zaštita posebnih vrijednosti i obilježja
    document.getElementById("12").checked = false; //uređenje zemljišta
    document.getElementById("13").checked = false; //urbanapravila
    document.getElementById("14").checked = false; //posebnazastita
    document.getElementById("15").checked = true; //naselja
    document.getElementById("16").checked = false; //gradski kotari
    document.getElementById("17").checked = false; //gupgranice
    document.getElementById("18").checked = false; //katastarske opcine
    document.getElementById("19").checked = false; //katastarske cestice
    document.getElementById("20").checked = false; //zgrade
    document.getElementById("21").checked = false; //odlagalista
    document.getElementById("22").checked = false; //stabla
    document.getElementById("23").checked = false; //ljetnikovci	
    document.getElementById("24").checked = false; //zeleni koridori
    document.getElementById("25").checked = false; //zastitno zelenilo
    document.getElementById("26").checked = false; //vanjski sportski sadrzaji
    document.getElementById("27").checked = false; //trgovi
    document.getElementById("28").checked = false; //stambeno zelenilo
    document.getElementById("29").checked = false; //spomen područja
    document.getElementById("30").checked = false; //prirodni ili doprirodni zeleni prostori
    document.getElementById("31").checked = false; //parkovi
    document.getElementById("32").checked = false; //groblja
    document.getElementById("33").checked = false; //dječja igrališta i prostori za mlade
    //document.getElementById("22").checked = false; //markers
    //document.getElementById("23").checked = false; //heat
    

    //grupe
    document.getElementById("100").checked = false; //korištenje i namjena površina
    document.getElementById("101").checked = false; //infrastruktura
    document.getElementById("106").checked = false; //posebni uvjeti korištenja
    document.getElementById("111").checked = false; //mjere uređenja i zaštite

    //Legenda - vidljiva je samo legenda za slojeve koji su vidljivi pri učitavanju 
    $(".namjenaLegenda").hide();
    $(".prometLegenda").hide();
    $(".telekomunikacijaLegenda").hide();
    $(".energetski_sustaviLegenda").hide();
    $(".vodaLegenda").hide();
    $(".odvodnjaLegenda").hide();
    $(".v_zpbLegenda").hide();
    $(".v_nemLegenda").hide();
    $(".v_stanistaLegenda").hide();
    $(".v_grad_bastinaLegenda").hide();
    $(".krajobrazLegenda").hide();
    $(".zpvoLegenda").hide();
    $(".uredjenje_zemljistaLegenda").hide();
    $(".urbanapravilaLegenda").hide();
    $(".v_ppmzLegenda").hide();
    $(".nemaslojeva").show();

    



    //infoHideLayers();  //skriva sve predefinirane elemente iz modala za info klik
    isprazniSveLokInfo(); //skriva sve predefinirane elemente iz modala lokacijska informacija


    function provjeriSloj(sloj_id, zoom_level){
        if (trenutnizoom < zoom_level) {
            document.getElementById(sloj_id).disabled = true;
            $("label[for='"+sloj_id+"']").addClass("sivo");
            document.getElementById(sloj_id).title = "Potrebno je uvećati prikaz kako bi bilo moguće prikazati sloj";
        }
        else {
            document.getElementById(sloj_id).disabled = false;
            $("label[for='"+sloj_id+"']").removeClass("sivo");
            document.getElementById(sloj_id).title = "";
        }
    }

    function provjeriGrupu(label_id, id_grupe, zoom_level){
        if (trenutnizoom < zoom_level) {
            document.getElementById(label_id).disabled = true;
            $("#"+id_grupe).addClass("sivo");
            document.getElementById(label_id).title = "Potrebno je uvećati prikaz kako bi bilo moguće prikazati slojeve ove grupe";
        }
        else {
            document.getElementById(label_id).disabled = false;
            $("#"+id_grupe).removeClass("sivo");
            document.getElementById(label_id).title = "";
        }
    }


    function provjeriSveSlojeve(){
        /*provjeriGrupu(101,"infrastruktura",14);
        provjeriSloj(1,14); 
        provjeriSloj(2,14);
        provjeriSloj(3,14);
        provjeriSloj(4,14);
        provjeriSloj(5,14);

        provjeriSloj(15,13); //naselja
        provjeriSloj(17,13); //granice GUP-a
        */
        provjeriSloj(19,17); //katastarske čestice
        provjeriSloj(20,18); //zgrade
        provjeriSloj(21,14); //odlagalista
        provjeriSloj(22,15); //stabla
        provjeriSloj(23,15);
        provjeriSloj(24,15);
        provjeriSloj(25,15);
        provjeriSloj(26,15);
        provjeriSloj(27,15);
        provjeriSloj(28,15);
        provjeriSloj(29,15);
        provjeriSloj(30,15);
        provjeriSloj(31,15);
        provjeriSloj(32,15);
        provjeriSloj(33,15);
    }

    var trenutnizoom = map.getZoom();
    provjeriSveSlojeve();
    
    map.on('zoomend', function(){
        trenutnizoom = map.getZoom();
        provjeriSveSlojeve();
    })

//upravljanje temeljnim slojevima
//s obzirom na id kliknutog radiobuttona, pali se sloj koji ima isti id, ostali slojevi se gase
	var baselayers = [osm, base, dof_dgu, hok_dgu];

	$(".radio").click(function(){
        /*baselayer_id je id određenog baselayera u listi baselayers
        baseradio_id je id HTML elementa radiobutton vezanog uz određeni sloj*/
		var baselayer_id = parseInt(this.id)-1000; 
		//console.log(baselayer_id)
        var baseradio_id
		for (var i = 0; i < baselayers.length; i++) {
			if (baselayer_id == i) {
				map.addLayer(baselayers[i]);
                baseradio_id = i + 1000;
		        document.getElementById(baseradio_id).checked = true;
			}
			else {
				map.removeLayer(baselayers[i]);
                baseradio_id = i + 1000;
				document.getElementById(baseradio_id).checked = false;
			};
		};
	});


//upravljanje preklopnim slojevima
    

    $(".checkbox").click(function(){
		var layer_id = parseInt(this.id);
		for (var i = 0; i < overlaylayers.length; i++) {
			if (layer_id == i){
				if (map.hasLayer(overlaylayers[i])) {
					ugasiSloj(i);
				}
				else {
					upaliSloj(i);
                    };
                    //console.log("upaljeni slojevi " + upaljeni_slojevi);
				}
			};
		});
	



//paljenje i gašenje grupa slojeva
    $(".grupecheckbox").click(function(){
        /* thisgroup_id je id elementa za uključivanje/isključivanje grupe na koji je kliknuto
        nextgroup_id je id iduće grupe
        minlayer_id je id prvog sloja kojeg treba uključiti
        maxlayer_id je id zadnjeg sloja kojeg treba uključiti */
        var thisgroup_id = parseInt(this.id);
        var minlayer_id = thisgroup_id - 100;    
        //var nextgroup_id = parseInt(($(this).parent().next().find(".grupecheckbox")).attr('id')); 
        /*if (isNaN(nextgroup_id)) {
            nextgroup_id = 106;
        }*/
        var nextgroup_id;
        if (thisgroup_id == 100) {
            nextgroup_id = 101
        }
        else if (thisgroup_id == 101) {
            nextgroup_id = 106
        }
        else if (thisgroup_id == 106) {
            nextgroup_id = 111
        }
        else if (thisgroup_id == 111){
            nextgroup_id = 115
        }
        /*else if (thisgroup_id == 110) {
            nextgroup_id = 110
        };*/
        var maxlayer_id = nextgroup_id - 100 - 1; 


        if (document.getElementById(thisgroup_id).checked == true) {
            for (var layer_id = minlayer_id; layer_id <= maxlayer_id ; layer_id++) {
                upaliSloj(layer_id);
            }
        }

        else {
            for (var layer_id = minlayer_id; layer_id <= maxlayer_id ; layer_id++) {
                ugasiSloj(layer_id);
            };
        } 
    })
});
