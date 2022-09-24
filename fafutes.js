//Fafűtés számítása, 2017.10.22. Barják László
function init(){
  console.clear();
  var fa = document.fa.fajta.options[document.fa.fajta.selectedIndex].text;
  var ar = document.getElementById("ar").value;//Egy erdei köbméter fa ára Ft 
  var futoertek = document.getElementById("futoertek").value;//fűtőérték kWh/kg
  var nedvtart = document.getElementById("nedvtart").value;//nedvességtartalom térfogat %-ban
  var kazanHatasfok = document.getElementById("kazanHatasfok").value;//kazán hatásfoka %-ban
  
  var terfogat = 1.7; //erdei m3 fa sarangban, befoglaló térfogata m3-ben
  var suruseg;
  szamitas(fa);

  function szamitas(fa){
    switch (fa) {
      case 'gyertyán':
        suruseg = 0.8;
        break;
      case 'akác':
        suruseg = 0.73;
        break;
      case 'bükk':
        suruseg = 0.68;
        break;
      case 'tölgy':
        suruseg = 0.65;
        break;
      case 'cseresznye':
        suruseg = 0.57;
        break;
      case 'borovi':
        suruseg = 0.55;
        break;
      case 'hárs':
        suruseg = 0.49;
        break;
      case 'luc':
        suruseg = 0.43;
        break;
      case 'wood o2':
        suruseg = 0.955;//955*79=75445 Ft 1 m3, ami vágott fáknál 1 erdei m3-nek felel meg
        break;
    }
  
    var energia = ((100 - nedvtart) * futoertek - nedvtart * 0.63) / 100;
    var hasznosEnergia = energia * kazanHatasfok / 100;
    var nettoTerfogat = terfogat / 1.7;
    var vizTomege = 1000 * nettoTerfogat * nedvtart / 100;
    var faSzarazTomege = 1000 * nettoTerfogat * suruseg;
    var ossztomeg = vizTomege + faSzarazTomege;
    var teljesFutoErtek = faSzarazTomege * futoertek - vizTomege * 0.63;
    document.getElementsByClassName('suruseg')[0].innerHTML = 'Választott fa sűrűsége: ' + suruseg + ' g/cm<sup>3</sup>';
    document.getElementsByClassName('futoertek')[0].innerHTML = 'Nedves fa fűtőértéke: ' + energia.toFixed(3) + ' kWh/kg';
    document.getElementsByClassName('nedvtart')[0].innerHTML = 'Hasznos energia (kazán hatásfokkal): ' + hasznosEnergia.toFixed(3) + ' kWh/kg';
    document.getElementsByClassName('ossztomeg')[0].innerHTML = 'Össztömeg: ' + ossztomeg + ' kg';
    document.getElementsByClassName('szarazfa')[0].innerHTML = 'Száraz fa tömege: ' + faSzarazTomege + ' kg';
    document.getElementsByClassName('szarazfa2')[0].innerHTML = 'Száraz fa fűtőértéke: ' + (faSzarazTomege * futoertek).toFixed() + ' kWh';
    document.getElementsByClassName('viz')[0].innerHTML = 'Víz tömege: ' + vizTomege + ' kg';
    document.getElementsByClassName('viz2')[0].innerHTML = 'Veszteség a víztartalom miatt: ' + (vizTomege * 0.63).toFixed() + ' kWh';
    document.getElementsByClassName('teljes')[0].innerHTML = 'Teljes fűtőérték: ' + (teljesFutoErtek).toFixed() + ' kWh';
    document.getElementsByClassName('hasznos')[0].innerHTML = 'Hasznosuló fűtőérték (kazánhatásfokkal): ' + (teljesFutoErtek * kazanHatasfok / 100).toFixed() + ' kWh';
    document.getElementsByClassName('ar')[0].innerHTML = 'Ár: ' + (ar / (teljesFutoErtek * kazanHatasfok / 100)).toFixed(2) + ' Ft/kWh';
  }
}