//----------------------------UPUTE ZA KORISTENJE PORTALA-------------------------------
// Uvodni tekst na portalu

function vratiSlojeveNaPocetnoStanje() {
        gasiSveSlojeve();
        //uključi sloj
        upaliSloj(15);
    }
    /*
    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            if (trenutniKorak === 22) {
                tour.goTo(17);
                trenutniKorak = 0;
            }
        }
        if (e.keyCode == 39) {
            if (trenutniKorak === 17) {
                tour.goTo(22);
                trenutniKorak = 0;
            }
        }
    });
    var trenutniKorak;*/


$("body").on("click", "button", function () {
    if ($(this).attr("data-role") === 'naPP') {
        vratiPocetniZoom();
        tour.goTo(14);
        vratiSlojeveNaPocetnoStanje();
    } else if ($(this).attr("data-role") === 'backtoupute') {
        vratiPocetniZoom();
        tour.goTo(1);
        vratiSlojeveNaPocetnoStanje();
    } else if ($(this).attr("data-role") === 'backtohome') {
        tour.goTo(0);
        vratiPocetniZoom();
        vratiSlojeveNaPocetnoStanje();
    } else if ($(this).attr("data-role") === 'preskociJavnost') {
        tour.goTo(21)
    } else if ($(this).attr("data-role") === 'vratiBezJavnosti') {
        tour.goTo(16);
    };
});

var tour;

function pokaziTabSlojevi() {
    $('ul#myTab > li:first-child').addClass('active');
    $('#slojevi').addClass('active in');
    $('#legenda').removeClass('active in');
    $('#login').removeClass('active in');
    $('ul#myTab > li:last-child').removeClass('active');
    $('ul#myTab > li:nth-child(2)').removeClass('active');
}

function otvoriGrupu() {
    var grupa = $('#accord');
    grupa.accordion("option", "active", 1);
    //var podgrupa = $('#accord1 > div');
    //podgrupa.accordion("option", "active", 0);
}

function ukljuciSidebarOtvoriGrupu() {
    sidebar.show();
    pokaziTabSlojevi()
    otvoriGrupu();
}


function hasClass(id) {
    return (' ' + document.getElementById(id).className + ' ').indexOf(' '+'ui-accordion-header-active'+' ') > -1;
}

function hasClassCollapse(id) {
    if (hasClass(id, 'ui-accordion-header-active') == true) {
        $("#"+id).click();
    }
}

function hasClassOpen(id) {
    if (hasClass(id, 'ui-accordion-header-active') == false) {
        $("#"+id).click();
    }
}


function gasiSveSlojeve() {
    for (var i = 0; i < overlaylayers.length - 2; i++) {
        ugasiSloj(i)
    };
    //document.getElementById("100").checked = false; //korištenje i namjena površina
    //document.getElementById("101").checked = false; //infrastruktura
    //document.getElementById("106").checked = false; //posebni uvjeti korištenja
    //document.getElementById("110").checked = false; //mjere uređenja i zaštite
}

function vratiPocetniZoom() {
    map.panTo(map.getCenter(obuhvat))
    map.fitBounds(obuhvat);
}

function pokretanjeUvoda() {
    tour = new Tour({
        onEnd: function () {
            alatiOff();
        },
        steps: [
            {
                //element: ".info",
                title: "Urban planning portal Dubrovnik",
                template: '<div class="popover tour">  <div class="arrow"></div>  <h3 class="popover-title"></h3>  <div class="popover-content"></div> <div class="preuzimanjeUputaPdf"><div style="margin-top:15px"><input type="checkbox" name="upute" id="odabir" onchange="set_check()" value="upute"><p class="uputeOdabir" style="display:inline; vertical-align:text-bottom"> Ne prikazuj više </p></div></div> <div class="popover-navigation"> <button class="btn btn-primary" data-role="next">Pokreni upute za korištenje portala &raquo;</button> <button class="btn btn-info" data-role="naPP">O prostornim planovima &raquo;</button> <button class="btn btn-default" id="zatvoriUpute" data-role="end">Zatvori   </button></div></div>',
                content: "<div  style='padding-bottom:5px'><b>Urban Planning Portal</b> je obrazovni i informativni portal koji omogućuje interakciju između građana, OCD-a i lokalnih vlasti u problematici prostornog planiranja. Portal omogućuje korisniku kretanje po karti, uključivanje i isključivanje slojeva po želji, te identificiranje i traženje obilježja prostornih planova.</p><p>Urban Planning Portal razvijen je kao dio projekta <b>'Urban Planning 4 Citizens'</b> kojeg provodi udruga DEŠA - Dubrovnik u partnerstvu s udrugom Institut za GIS, Gradom Dubrovnikom, Općinom Jakovlje i Zavodom CEKTRA iz Slovenije. Projekt financira Europska unija u okviru IPA I. komponente – Pomoć u tranziciji i izgradnja institucija te sufinancira Ured za udruge Vlade RH, a kroz poziv IPA 2011. za osnaživanje uloge organizacija civilnog društva u jačanju transparentnosti i dobrog upravljanja u državnoj upravi RH.</div><h4>UVJETI KORIŠTENJA:</h4><p>Pristupom portalu korisnik prihvaća slijedeće uvjete korištenja:<ul><li>Podaci u sustavu nemaju službeni karakter te Grad Dubrovnik ne odgovara za bilo kakvu štetu nastalu uporabom podataka dobivenih korištenjem preglednika.</li><li>Korisnik aplikacije prihvaća sve rizike koji mogu nastati korištenjem podataka dobivenih putem portala i prihvaća ih koristiti isključivo za vlastite potrebe i na vlastitu odgovornost te prima na znanje da su prvenstveno informativnog, a ne službenog karaktera.</li></ul></p><p>Više informacija možete pronaći na web stranici projekta: <a href='http://www.up4c.eu' target='_blank'>www.up4c.eu</a></p><p style='margin:0; padding:2px 0 -4px 0'><img src='images/logoEU.png' width='90px' style='position:absolute; display:table; bottom:70px; right:20px'></p>",
                orphan: true,
                backdrop: true,
                onShown: function (tour) {
                    provjeriCookiesPostaviCheckbox();
                    vratiSlojeveNaPocetnoStanje();
                    vratiPocetniZoom();
                },
            },
            {
                element: "a[title='Info alat']",
                title: "1/13 Info alat",
                content:"<p>Informacija o trenutno uključenim slojevima prostonog plana (GUP Dubrovnik) za određenu lokaciju (ne za katastarsku česticu).</p><p>Za dobiti informacije o slojevima za određenu lokaciju uključite alat i kliknite na željenu lokaciju na karti.<p>",
                //backdrop: true,
                onShow: function () {
                    zajednickiInfoLokacijskaOff();
                    otvoriIzbornik();
                    zajednicki = true;
                },
                onPrev: function () {
                    sakrijIzbornik();
                    alatiOff();
                    zajednicki = false;
                }
            },
            {
                element: "a[title='Lokacijska informacija']",
                title: "2/13 Lokacijska informacija",
                content: "<p>Lokacijska informacija se izdaje u svrhu upoznavanja s namjenom prostora i uvjetima provedbe zahvata u prostoru iz prostornih planova na određenom zemljištu.</p><p>Lokacijska informacija se izdaje za <b>katastarsku česticu</b>. Za dobiti lokacijsku informaciju uključite alat čime će se automatski uključiti i sloj s katastarskim česticama. Ako ne vidite sloj katastarskih čestica uvećajte prikaz. Kad kliknete na željenu katastarsku česticu na karti alat će uvećati prikaz na odabranu česticu i prikazati prozor s lokacijskom informacijom.<p>",
                //backdrop: true,
                onShow: function () {
                    zajednickiInfoLokacijskaOff();
                    otvoriIzbornik();
                    zajednicki = true;
                },
                onPrev: function () {
                    alatiOff()
                }
            },
            {
                element: "button[title='Pošalji upit']",
                title: "3/13 Pošaljite upit",
                content: "Kliknite na željeno područje na karti i ispunite sva potrebna polja. Upit pošaljite klikom na gumb 'Pošalji'.",
                //backdrop: true
                onShow: function () {
                    sakrijIzbornik();
                    alatiOff();
                    zajednicki = false;
                }
            },
            {
                element: "button[title='Pronađi katastarsku česticu']",
                title: "4/13 Pronađi katastarsku česticu",
                content: "Alat za pretraživanje katastra. <p>Kliknite na alat te odaberite katastarsku općinu i katastarsku česticu nakon čega će se prikaz karte uvećati na odabranu česticu.</p>",
                //backdrop: true
                onShow: function () {
                    alatiOff();
                }
            },
            {
                element: "button[title='Upute']",
                title: "5/13 Upute",
                content: "Interaktivni vodič za korištenje portala i vodič kroz prostorne planove.",
                //backdrop: true
            },
            {
                element: ".leaflet-control-measure",
                title: "6/13 Mjerenje na karti",
                content: "Alat koji omogućuje mjerenje duljina i površina na karti.",
                //backdrop: true
            },
            {
                element: "button[title='Slojevi']",
                title: "7/13 Izbornik",
                content: "Uključivanje i isključivanje izbornika sa slojevima portala, legendom i prijavom za registrirane korisnike.",
                //backdrop: true,
                onShow: function () {
                    sidebar.show();
                },
            },
            {
                element: "ul#myTab > li:first-child",
                title: "8/13 Slojevi",
                content: "Slojevi koje možete pregledavati na portalu.",
                //backdrop: true,
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu()
                    hasClassOpen("koristenje")
                    hasClassOpen("infrastruktura")
                    hasClassOpen("posebniuvjeti")
                    hasClassOpen("mjereuredjenja")
                },
            },
            {
                element: "#accord",
                title: "9/13 Slojevi",
                content: "<p>Sve slojeve možete uključiti i isključiti.<br>U grupi 'Temeljni slojevi' možete promijeniti trenutnu podlogu. Slojevi koji se nalaze unutar 'GUP' grupe su slojevi generalnog urbanističkog plana (GUP-a) grada Dubrovnika.<br>U grupi 'Granice' nalaze se granice naselja, granice gradskih kotara i granice GUP-a.<br>Grupa 'Katastar' sadrži katastarske općine, katastarske čestice i zgrade.</p><p>Napomena: Ukoliko je sloj nedostupan potrebno je uvećati prikaz.</p>",
                //backdrop: true,
                onShow: function () {
                    sidebar.show();
                    pokaziTabSlojevi();
                },
            },
            {
                element: "ul#myTab > li:nth-child(2)",
                title: "10/13 Legenda",
                content: "Legenda se prikazuje za uključene slojeve GUP-a. <br>Ako legenda nije prikazana znači da nijedan sloj GUP-a trenutno nije uključen.<p>Za uključivanje slojeva kliknite na izbornik slojevi te stavite kvačicu na sloj koji želite prikazati.</p>",
                //backdrop: true,
                onShow: function () { //postavlja na tab legenda
                    sidebar.show();
                    $('ul#myTab > li:nth-child(2)').addClass('active');
                    $('ul#myTab > li:first-child').removeClass('active');
                    $('ul#myTab > li:last-child').removeClass('active');

                    $('#slojevi').removeClass('active in');
                    $('#login').removeClass('active in');
                    $('#legenda').addClass('active in');
                },
                /* onNext: function () {
                     $('ul#myTab > li:first-child').addClass('active');
                     $('ul#myTab > li:nth-child(2)').removeClass('active');
                     $('#slojevi').addClass('active in');
                     $('#legenda').removeClass('active in');
                 }*/
            },


            {
                element: "ul#myTab > li:last-child",
                title: "11/13 Prijava",
                content: "Prijava za registrirane korisnike.",
                //backdrop: true,
                onShow: function () { //postavlja na tab login
                    sidebar.show();
                    $('ul#myTab > li:last-child').addClass('active');
                    $('ul#myTab > li:nth-child(2)').removeClass('active');
                    $('ul#myTab > li:first-child').removeClass('active');
                    $('#slojevi').removeClass('active in');
                    $('#legenda').removeClass('active in');
                    $('#login').addClass('active in');
                },
                onNext: function () { //uklanja sidebar i postavlja na tab slojevi
                    $('ul#myTab > li:first-child').addClass('active');
                    $('ul#myTab > li:nth-child(2)').removeClass('active');
                    $('ul#myTab > li:last-child').removeClass('active');

                    $('#slojevi').addClass('active in');
                    $('#legenda').removeClass('active in');
                    $('#login').removeClass('active in');
                    sidebar.hide();
                }
            },
            {
                element: ".leaflet-iconLayers-layersRow",
                title: "12/13 Temeljni slojevi",
                content: "Izbornik sa temeljnim slojevima portala. Za promijeniti trenutni temeljni sloj kliknite na ikonu željenog sloja.",
                placement: "top",
                //backdrop: true
                onShow: function () {
                    $('div[data-layerid="26"]').removeClass('leaflet-iconLayers-layerCell_hidden');
                    $('div[data-layerid="24"]').removeClass('leaflet-iconLayers-layerCell_hidden');
                    $('div[data-layerid="25"]').removeClass('leaflet-iconLayers-layerCell_hidden');
                    $('div[data-layerid="18"]').removeClass('leaflet-iconLayers-layerCell_hidden');
                }
            },
            {
                element: ".logoupp",
                title: "13/13 Info",
                template: '<div class="popover tour"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-navigation"><button class="btn btn-primary" data-role="naPP">O prostornim planovima &raquo;</button><br><button class="btn btn-info" data-role="backtohome">&laquo; Natrag na početnu stranicu</button><br><button class="btn btn-default" data-role="prev">&laquo; Natrag</button><button class="btn btn-default" data-role="end">Zatvori   </button></div></div>',
                content: "Web-stranica projekta 'Urban Planning 4 Citizens' na kojoj možete pronaći više informacija o projektu te materijale s održanih predavanja i radionica.",
                placement: "left",
                //backdrop: true,
                onNext: function (tour) {
                    tour.end();
                    sidebar.show();
                }
            },
/*-------------------------------------PROSTORNO PLANIRANJE--------------------------------------------*/
            {
                //element: ".logoupp",
                title: " 1/19 Prostorno planiranje",
                template: '<div class="popover tour" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-navigation"><button class="btn btn-default" data-role="next">Naprijed &raquo;</button><button class="btn btn-default" data-role="end">Zatvori   </button></div></div>',
                content: "<b>Prostorno planiranje</b> predstavlja skup aktivnosti koje se provode u svrhu <b>održivog upravljanja prostorom</b>, kao temeljnim ograničenim prirodnim i kulturnim resursom.<br>Pravilnim upravljanjem prostorom stvaraju se uvjeti za ostvarenje razvojnih projekata, privlačenje poduzetnika i investitora, a time i povećanje kvalitete života (nova radna mjesta, bolji standard, kvalitetnija ponuda, razvijenija infrastruktura, zdraviji i ljepši okoliš), povećanje potražnje, privlačenje posjetitelja te mlađih i obrazovanijih stanovnika koji su temeljni razvojni resurs suvremene ekonomije.<br>Planska projekcija prostornih planova, kojima se organizacija prostora postiže na nacionalnoj, regionalnoj i lokalnoj razini, proteže se na vremensko razdoblje od 20 do 30 godina.",
                //placement: "left",
                //backdrop: true,
                orphan: true,
            },
            {
                //element: ".logoupp",
                title: "2/19 Cilj prostornog planiranja",
                content: "Karakteristični <b>cilj prostornih planova</b> je stvoriti ambijent u kojem se uspješno radi i udobno stanuje na način da se na određenom teritoriju riješe problemi rasporeda i razvoja gradova i naselja, problemi prometa i ostale infrastrukture, problemi smještaja i razvoja gospodarskih sadržaja, industrije, servisa, turizma i sl.; da se zaštite vrijednosti prirodne i kulturne baštine te da se predložena rješenja temelje na načelima održivog razvoja.",
                //placement: "left",
                //backdrop: true,
                orphan: true,
            },
            {
                title: "3/19 Uključivanje javnosti",
                template: '<div class="popover tour" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-navigation"><button class="btn btn-default" data-role="next">Više o uključivanju javnosti</button><br><button class="btn btn-default" data-role="prev">&laquo; Natrag</button><button class="btn btn-default" data-role="preskociJavnost">Naprijed &raquo;</button><button class="btn btn-default" data-role="end">Zatvori</button></div></div>',
                content: "Osim donosioca odluka i uključenih stručnjaka, zaštita prostora je obaveza svakog pojedinca i njegovo osnovno ljudsko pravo.<br>Uključivanjem građana u fazu analiziranja valorizacije prostornih resursa, definiranja razvojnih ciljeva i prioriteta te izradu koncepcije prostorne organizacije, postižu se višestruki efekti: ostvaruje se dotok informacija o stvarnim potrebama i aspiracijama građana za područje za koje se kreira plan, ali i dotok „svježih ideja“ i novih pogleda na konkretni životni prostor; postaju vidljivijima pluralizam interesa i problemska polja vezana za određeni prostor na koja će se fokusirati stručnjaci za planiranje; iznalaze se najprihvatljivija rješenja za svaki konkretni slučaj „sukoba interesa“ već u fazi koncipiranja prvih projekcija prostornog razvoja; razvija se otpornost plana kao razvojnog ili provedbenog dokumenta na promjene u okruženju.",
                orphan: true,
            },
            {
                title: "3.a/19 Oblici uključivanja javnosti",
                content: "Uključivanje građana u proces izrade planova odvija se u <b>tri</b> oblika javnog savjetovanja:",
                orphan: true,
            },
            {
                title: "3.b/19 Prvi oblik javnog savjetovanja",
                content: "<b>Prvi oblik javnog savjetovanja</b> je najsveobuhvatniji, usmjeren na opću javnost sa ciljem da se dobije što više odziva, pribavi što više mišljenja, ideja, prijedloga, sugestija i potreba različitih skupina društva.<br>Informativna osnova ove faze savjetovanja čini Odluka o izradi prostornog plana s razlozima donošenja te ciljevima i programskim polazištima prostornog plana, a poželjna je i koncepcija prostornog razvoja data u najkraćoj verziji i prezentirana popularnim jezikom prihvatljivim i za laičku javnost.<br>Rezultati uključivanja građana (pitanja, primjedbe, prijedlozi) prezentiraju se u formi sintenziranog dokumenta koji se kao jedan od inputa uključuje u daljnji proces planiranja.",
                orphan: true,
            },
            {
                title: "3.c/19 Drugi oblik javnog savjetovanja",
                content: "<b>Drugi oblik javnog savjetovanja (javna rasprava s javnim uvidom)</b> odvija se oko prijedloga planskog dokumenta. Usmjeren je na opću javnost, ali se značajno fokusira i na ekspertne i druge grupe od kojih se očekuje poseban doprinos u definitivnom opredjeljenju oko alternativnih rješenja.<br>Inicijalni informativni materijal za ovaj krug je prijedlog plana sa svojim tekstualnim i grafičkim dijelom te izrađenim stručnim podlogama korištenim kao osnova za izradu plana. <br>Informacije generirane u ovom krugu sintenziraju se kroz javno dostupno Izviješće o javnoj raspravi te se koriste kao input za konačni prijedlog planskog dokumenta.",
                orphan: true,
            },
            {
                title: "3.d/19 Treći oblik javnog savjetovanja",
                content: "<b>Treći oblik javnog savjetovanja</b> je kroz referendume, pravo građanske inicijative te mjesne zborove građana, odnosno preko izabranih predstavnika građana u predstavnička tijela općina, gradova i županije, na način kako je to propisano posebnim zakonima.",
                orphan: true,
            },
            {
                title: "4/19 Vrste prostornih planova",
                template: '<div class="popover tour" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-navigation"><button class="btn btn-default" data-role="vratiBezJavnosti">&laquo; Natrag</button><button class="btn btn-default" data-role="next">Naprijed &raquo;</button><button class="btn btn-default" data-role="end">Zatvori</button></div></div>',
                content: "1. Prostorni plan županije<br>2. Prostorni plan uređenja općine/grada (PPUO/G)<br>3. Generalni urbanistički plan (GUP)<br>4. Urbanistički plan uređenja (UPU)<br><div style='margin-top:20px;'><img class='img-responsive' src='images/vrstePlanovi.jpg' width='370px'></div>",
                orphan: true,
            },
           /* {
                title: "1. Prostorni plan županije",
                content: "<b>Prostorni plan županije</b> uz poštivanje ciljeva prostornog uređenja te uvažavanjem specifičnih potreba koje proizlaze iz regionalnih osobitosti, prirodnih, krajobraznih i kulturno-povijesnih vrijednosti, razrađuje ciljeve prostornog uređenja i određuje racionalno korištenje prostora i u skladu u najvećoj mogućoj mjeri sa susjednim županijama, prostorni razvoj i zaštitu prostora. U pravilu se izrađuju u mjerilu 1:100 000, a po potrebi i u drugim mjerilima. <br>Županijskim prostornim planom se određuju površine namjena i infrastrukture te propisuju uvjeti provedbe zahvata županijskog i državnog značaja, kao i smjernice za izradu nižih planova i UPU-a.",
                orphan: true,
                },
            {
                title: "2. Prostorni plan uređenja općine/grada (PPUO/G)",
                content: "<b>Prostorni plan uređenja općine ili grada</b> određuje usmjerenja za razvoj djelatnosti i namjenu površina te uvjete za održivi i uravnoteženi razvitak na području grada ili općine. U pravilu se izrađuju u mjerilu 1:25 000, a po potrebi i u 1:10 000, iznimno u 1:5 000.<br>Prostorni plan uređenja određuje građevinsko područje naselja, izdvojeno građevinsko područje izvan naselja i izdvojeni dio građevinskog područja naselja te neizgrađene i neuređene dijelove tih područja, sa površinama namjene i infrastrukture lokalnog značaja. Također, propisuje uvjete provedbe zahvata lokalnog značaja u prostoru, kao i smjernice za izradu UPU-a.",
                orphan: true,
                },*/
            {
                element: "#ui-id-3",
                title: "5/19 Generalni urbanistički plan (GUP)",

                content: "<b>Generalni urbanistički plan</b> se u pravilu izrađuje za naselja koja imaju više od 10 000 stanovnika (naselja u kojima je sjedište županija). U GUP-u moraju biti sadržani oni elementi koji su značajni za cijeli grad i kojih lokacija ima interakcijski utjecaj na cjelinu gradskog prostora. U pravilu se izrađuju u mjerilu 1:5 000 i/ili 1:10 000.<br>GUP određuje neizgrađeni dio građevinskog područja naselja i izdvojenog građevinskog područja izvan naselja u svom obuhvatu te dio građevinskog područja naselja i izdvojenog građevinskog područja izvan naselja, planiran za urbanu preobrazbu i urbanu sanaciju. Također, propisuje uvjete provedbe zahvata u prostoru te smjernice za izradu UPU-a. GUP mora biti usklađen sa prostornim planom uređenja općine/grada i sa prostornim planom županije.",
                //orphan: true,
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    //trenutniKorak = 23;
                },
            },
/*
            {
                title: "4. Urbanistički plan uređenja (UPU)",
                content: "<b>Urbanistički plan uređenja</b> donosi se obvezno za neuređene dijelove građevinskog područja i za izgrađene dijelove tih područja planiranih za urbanu preobrazbu ili urbanu sanaciju, za koja detaljnije određuje prostorni razvoj naselja ili dijela naselja s osnovom prostornih i funkcionalnih rješenja, uvjeta i oblikovanja pojedinih prostornih cjelina naselja. U pravilu se izrađuju u mjerilu 1:5 000, 1:2 000 ili 1:1 000.",
                orphan: true,
                },*/
            {
                element: "#tekstGUP",
                title: "6/19 Tekstualni dio Generalnog urbanističkog plana grada Dubrovnika",
                content: "Poveznica na Odredbe za provođenje (Službeni glasnik Grada Dubrovnika br. 9/2014.). Odredbe za provođenje su pravne norme prostornog plana, koje su osim tekstualnim, određene i grafičkim prikazima prostornog plana.",
                //orphan: true,
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                },
            },
            {
                element: "label[for='0']",
                title: "7/19 Dijelovi plana:",
                content: "<b>Namjena površina</b> je sustav korištenja prostora, površina, zemljišta, odnosno uporabe građevina, određena/propisana prostornim planom.",
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    hasClassOpen("koristenje");
                    hasClassCollapse("infrastruktura");
                    hasClassCollapse("posebniuvjeti");
                    hasClassCollapse("mjereuredjenja");
                    document.getElementById("100").checked = true;
                    //uključi sloj
                    upaliSloj(0);
                },
            },
            {
                element: "#infrastruktura",
                title: "8/19 Dijelovi plana:",
                content: "<b>Infrastruktura</b> je sustav koridora i površina na kojima se mogu graditi građevine prometne infrastrukture, kao i komunalne građevine i uređaji te infrastruktura, na posebno određenim prostorima.",
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    hasClassCollapse("koristenje");
                    hasClassOpen("infrastruktura");
                    hasClassCollapse("posebniuvjeti");
                    hasClassCollapse("mjereuredjenja");
                    gasiSveSlojeve();
                    map.panTo(map.getCenter(obuhvat));
                    vratiPocetniZoom();

                    //upali grupu za infrastrukuru
                    document.getElementById("101").checked = true;
                    //uključi slojeve
                    for (var i = 1; i <= 5; i++) {
                        upaliSloj(i);
                    }
                },
            },
            {
                element: "#posebniuvjeti",
                title: "9/19 Dijelovi plana:",
                content: "<b>Posebni uvjeti i ograničenja u korištenju</b> predstavljaju osnovu za određivanje osnovnih pravila, kriterija, normativa, i daju generalne odrednice uređenja, građenja i načina korištenja prostora, a temelje se na zahtjevima zaštite prirode, kulturne baštine i drugih zaštićenih vrijednosti.",
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    hasClassCollapse("koristenje");
                    hasClassCollapse("infrastruktura");
                    hasClassOpen("posebniuvjeti");
                    hasClassCollapse("mjereuredjenja");
                    for (var i = 6; i <= 10; i++) {
                        upaliSloj(i);
                    }
                },

            },
            {
                element: "#zasticenapodrucjaprirode",
                title: "10/19 Dijelovi plana:",
                content: "<b>Zaštićena područja prirode</b> vode se kroz Upisnik zaštićenih područja Ministarstva zaštite okoliša i prirode. Definicije njihovih temeljnih vrijednosti i mjere zaštite propisane su Zakonom o zaštiti prirode. Evidentirana baština štiti se sukladno prostornom planu do njene potpune valorizacije i zaštite.",
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    hasClassCollapse("koristenje");
                    hasClassCollapse("infrastruktura");
                    hasClassOpen("posebniuvjeti");
                    hasClassCollapse("mjereuredjenja");
                    //uključi sloj
                    upaliSloj(6);
                },
            },
            
            {
                element: "#nacionalnaekoloskamreza",
                title: "11/19 Dijelovi plana:",
                content: "<b>Nacionalna ekološka mreža</b> je sustav najvrijednijih područja za ugrožene divlje svojte i stanišne tipove, koja su dostatno bliska i međusobno povezana koridorima, čime je omogućena međusobna komunikacija i razmjena vrsta. Uredbom o ekološkoj mreži se propisuje popis ciljanih vrsta i stanišnih tipova te smjernice za mjere zaštite. Zakonom o zaštiti prirode određeno je da se ekološka mreža štiti i provođenjem ocjene prihvatljivosti za ekološku mrežu.",
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    hasClassCollapse("koristenje");
                    hasClassCollapse("infrastruktura");
                    hasClassOpen("posebniuvjeti");
                    hasClassCollapse("mjereuredjenja");
                    //uključi sloj
                    upaliSloj(7);
                },
            },
            
            {
                element: "#stanisnitip",
                title: "12/19 Dijelovi plana:",
                content: "<b>Stanišni tip </b>čine istovrsna staništa, tj. jedinstvene funkcionalne jedinice kopnenog ili vodenog ekosustava, određene geografskim, biotičkim i abiotičkim svojstvima, neovisno o tome da li su prirodna ili doprirodna. Zaštita staništa propisana je Pravilnikom o popisu stanišnih tipova, karti staništa te ugroženim i rijetkim stanišnim tipovima.",
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    hasClassCollapse("koristenje");
                    hasClassCollapse("infrastruktura");
                    hasClassOpen("posebniuvjeti");
                    hasClassCollapse("mjereuredjenja");
                    //uključi sloj
                    upaliSloj(8);
                },
            },
            {
                element: "#graditeljskabastina",
                title: "13/19 Dijelovi plana:",
                content: "<b>Graditeljsku baštinu</b> s utvrđenim svojstvom  kulturnog dobra čine pojedinačne građevine i /ili kompleksi građevina, kulturno-povijesne cjeline, krajolici te arheološka nalazišta i zone. Štiti se prema Zakonu o zaštiti i očuvanju kulturnih dobara, a vodi se u Registru kulturnih dobara Republike Hrvatske. Evidentirana baština štiti se sukladno prostornom planu do njene potpune valorizacije i zaštite.",
                //orphan: true,
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    upaliSloj(9);
                    hasClassCollapse("koristenje");
                    hasClassCollapse("infrastruktura");
                    hasClassOpen("posebniuvjeti");
                    hasClassCollapse("mjereuredjenja");
                },

            },
            {
                element: "#krajobraz",
                title: "14/19 Dijelovi plana:",
                content: "<b>Krajobrazne vrijednosti</b> su svojstvenosti prirodnoga, kultiviranog ili kulturnog krajobraza, koje određuju njegovu prirodnu, kulturno-povijesnu i estetsku osobnost.",
                //orphan: true,
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    upaliSloj(10);
                    hasClassCollapse("koristenje");
                    hasClassCollapse("infrastruktura");
                    hasClassOpen("posebniuvjeti");
                    hasClassCollapse("mjereuredjenja");
                },
            },
            
            {
                element: "#mjereuredjenja",
                title: "15/19 Dijelovi plana:",
                content: "<b>Mjere uređenja i zaštite</b> predstavljaju osnovu za uređenje i sanaciju oštećenih i ugroženih dijelova prostora, područja primjene posebnih planskih mjera zaštite (obuhvati urbanističkih i detaljnih planova uređenja, arhitektonsko-urbanističkih natječaja i prostorno programskih studija) te područja primjene posebnih urbanih pravila.",
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    upaliSloj(11);
                    upaliSloj(12);
                    upaliSloj(13);
                    upaliSloj(14);
                    hasClassCollapse("koristenje");
                    hasClassCollapse("infrastruktura");
                    hasClassCollapse("posebniuvjeti");
                    hasClassOpen("mjereuredjenja");
                },
            },    
            {
                element: "#zastitaposebnihvrijednostiiobiljezja",
                title: "16/19 Dijelovi plana:",
                content: "<b>Zaštita posebnih vrijednosti i obilježja </b>odnosi se na područja za koja je potrebno provesti postupak sanacije, tj. obnove i revitalizacije, sukladno sanacijskom programu.",
                orphan: true,
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    upaliSloj(11);
                    hasClassCollapse("koristenje");
                    hasClassCollapse("infrastruktura");
                    hasClassCollapse("posebniuvjeti");
                    hasClassOpen("mjereuredjenja");
                },
            },
            {
                element: "label[for='11']",
                title: "17/19 Dijelovi plana:",
                content: "<b>Uređenje zemljišta </b>provodi se temeljem potreba lakšeg upravljanja, zaštite okoliša i krajobraznog uređenja, sukladno tehničkim i drugim propisima.",
                orphan: true,
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    upaliSloj(12);
                    hasClassCollapse("koristenje");
                    hasClassCollapse("infrastruktura");
                    hasClassCollapse("posebniuvjeti");
                    hasClassOpen("mjereuredjenja");
                },
            },
            {
                element: "#urbanapravila",
                title: "18/19 Dijelovi plana:",
                content: "<b>Urbana pravila</b> predstavljaju sustav uvjeta za gradnju i uređenje područja i građevina određen u skladu s prirodnim i urbanističko-arhitektonskim nasljeđem, stupnjem konsolidiranosti područja te korištenjem i namjenom prostora, a prvotno opremanjem prostora adekvatnom infrastrukturom.",
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    //uključi sloj
                    upaliSloj(13);
                    hasClassCollapse("koristenje");
                    hasClassCollapse("infrastruktura");
                    hasClassCollapse("posebniuvjeti");
                    hasClassOpen("mjereuredjenja");
                },
            },
            {
                element: "#posebnemjerezastite",
                title: "19/19 Dijelovi plana:",
                template: '<div class="popover tour" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-navigation"><button class="btn btn-primary" data-role="backtoupute">Upute za korištenje portala &raquo;</button><br><button class="btn btn-info" data-role="backtohome">&laquo; Natrag na početnu stranicu</button><br><button class="btn btn-default" data-role="prev">&laquo; Natrag</button><button class="btn btn-default" data-role="end">Zatvori   </button></div></div>',
                content: "<b>Primjena planskih mjera zaštite</b> odnosi se na područja za koja se  primjenjuju odredbe detaljnijih planova u čijem se obuhvatu nalaze, ukoliko su na snazi te područja za koja je propisana obveza izrade detaljnijih planova.",
                onShow: function () {
                    ukljuciSidebarOtvoriGrupu();
                    gasiSveSlojeve();
                    vratiPocetniZoom();
                    //uključi sloj
                    upaliSloj(14);
                },
            }
            ],
        storage: false,
        onEnd: function () {
            gasiSveSlojeve();
            //uključi sloj
            //map.addLayer(naselja);
            //document.getElementById("12").checked = true
            upaliSloj(15);
            hasClassOpen("koristenje");
            hasClassOpen("infrastruktura");
            hasClassOpen("posebniuvjeti");
            hasClassOpen("mjereuredjenja");
            alatiOff();
        }
    });
    tour.init(); // Initialize the tour
    tour.start(); // Start the tour
};
//pokretanjeUvoda();