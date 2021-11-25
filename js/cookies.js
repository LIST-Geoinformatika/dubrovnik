/*function getCookie(NameOfCookie){
    if (document.cookie.length > 0) {              
    begin = document.cookie.indexOf(NameOfCookie+"=");       
    if (begin != -1) {           
      begin += NameOfCookie.length+1;       
      end = document.cookie.indexOf(";", begin);
      if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(begin, end));
    } 
  }
  return null;
}

function setCookie(NameOfCookie, value, expiredays) {
var ExpireDate = new Date ();
ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));

document.cookie = NameOfCookie + "=" + escape(value) + 
    ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}

function delCookie (NameOfCookie) {
  if (getCookie(NameOfCookie)) {
    document.cookie = NameOfCookie + "=" +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

function checkCookie(){
 visited=getCookie('visited');
 if (visited==null) {
    setCookie('visited','yes',7);
    pokaziObavijest();
    pokretanjeUvoda();
 }
    else{
  //  makniObavijest();
    }
}

*/


function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate)
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return null
}

function provjeriObavijest(){
    visited=getCookie('visited');
    if (visited==null) {
        setCookie('visited','yes',30);
        pokaziObavijest();
        }     
}

window.onload = function () {
    provjeriObavijest();
    if (isMobile.any()){     
          $("button[title='Upute']").parent().hide();
            var centar= new L.LatLng(42.6535, 18.1100)
            map.setView(centar, 18);
    }
    else if (getCookie('upute') == null || getCookie('upute') == 0) {
        pokretanjeUvoda();
    }
    
}

function provjeriCookiesPostaviCheckbox() {
    //document.getElementById('odabir').checked = getCookie('linksNewWindow')==1? true : false;
    if (getCookie('upute') == 1) {
        $('input[type="checkbox"]#odabir').prop('checked', true);
    } else {
        $('input[type="checkbox"]#odabir').prop('checked', false);
    }
}

function set_check() {
    setCookie('upute', document.getElementById('odabir').checked ? 1 : 0, 30);
}



//--------------------------------------------------

function pokaziObavijest() {
    $("#cookie").fadeIn("slow");
    //('#cookie").delay(7000).fadeOut("slow");
};

function makniObavijest() {
    $("#cookie").fadeOut("slow");
};