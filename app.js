//hesapla butonu ile input alanı kontrolu ıcın hangi tip secilmis bu tutulmalı
let whichType = "sadece_donem"; // ekrana ilk gelis hali bu
//Sadece donem ort mu yoksa hepsi mi
const sadece_donem = document.getElementById("sadece-donem-div");
const hepsi = document.getElementById("hepsi-div");

//hidden yapmak ıcın eski input classına sahip elementleri bul
const eski_inputs = document.querySelector(".eski-inputs");

//sadece doneme tıklanmıs
sadece_donem.addEventListener("click",function(e){
      eski_inputs.style.display = "none";
      whichType = "sadece_donem";
});

//hepsine tıklanmıs
hepsi.addEventListener("click",function(e){
   eski_inputs.style.display = "inline";
   whichType = "hepsi";
});

//**Bu donem kac ders alıyor onun combo box ı ve ona gore ders kutularının cıkması
const select = document.getElementById("ders_sayisi");
const ders_bilgi = document.querySelector(".ders_bilgi");
select.addEventListener("change",function(e){
    ders_bilgi.innerHTML = "";
    dersEkle(Number(select.value));
});
function dersEkle(dersSayisi){
    const parent = document.querySelector(".ders_bilgi");
    for(let i = 0;i<dersSayisi;i++){
        let yeniDers = dersiOlustur();
        parent.appendChild(yeniDers);
    }
}
function dersiOlustur(){
    const yeniDers = document.createElement("div");
    yeniDers.className = "ders ders-margin";

    //icteki input
    const ictekiInput = document.createElement("input");
    ictekiInput.type = "number";
    ictekiInput.className = "ders_kredi";
    ictekiInput.placeholder = "Kac Kredi";

    //icteki inputu ders divine ekle
    yeniDers.appendChild(ictekiInput);

    //icteki combo box olustur
    const select = document.createElement("select");
    select.name = "grade";
    select.className = "grade";
    select.add(new Option("AA","AA"));
    select.add(new Option("BA","BA"));
    select.add(new Option("BB","BB"));
    select.add(new Option("CB","CB"));
    select.add(new Option("CC","CC"));
    select.add(new Option("DC","DC"));
    select.add(new Option("DD","DD"));
    select.add(new Option("FF","FF"));

    //selecti dive ekleme
    yeniDers.appendChild(select);
    return yeniDers;
}

//en son hesaplama yapabılmek ıcın tum kontroller sonrası bir booelean
let allChecked = true;

//eski kredi sayısı
let eski_kredi_sayisi = document.getElementById("eski_kredi_sayisi");
//eski ort
let eski_ort =  document.getElementById("eski_ort");

    let donemToplamPuan = 0;
    let donemToplamKredi = 0;
    let donemOrt = 0;
    let genelOrt = 0;
    let genelToplamPuan = 0;
    let genelToplamKredi = 0;
//Hesapla butonu
const hesapla = document.getElementById("hesapla");
hesapla.addEventListener("click",function(e){

    donemToplamPuan = 0;
    donemToplamKredi = 0;
    donemOrt = 0;
    genelOrt = 0;
    genelToplamPuan = 0;
    genelToplamKredi = 0;

    allChecked = true;
    if(whichType === "sadece_donem"){ // sadece donem ort
    dersKontrolu();
    document.getElementById("genel").style.display = "none"
    }else{ //hem donem hem genel ort
        document.getElementById("genel").style.display = "block"
     eskiInputKontrolu();
     dersKontrolu();
    }
    //tum kontroller bitti
    //her hesap sonrası inner html eski haline donsun
    document.getElementById("donem_ici").innerHTML = "Dönem içi not ortalamanız : "
    document.getElementById("genel").innerHTML = "Genel not Ortalamanız: "
    if(allChecked){
        //dersler
        const dersler = document.querySelectorAll(".ders");
        dersler.forEach(function(ders){
            puanEkle(Math.abs(Number(ders.firstChild.value)),ders.lastChild.value);
        });
        donemOrt = donemToplamPuan / donemToplamKredi;
        genelToplamPuan = Math.abs(Number(eski_ort.value)) * Math.abs(Number(eski_kredi_sayisi.value)) + donemToplamPuan;
        genelToplamKredi = donemToplamKredi + Math.abs(Number(eski_kredi_sayisi.value));
        genelOrt = genelToplamPuan / genelToplamKredi;

        if(donemToplamPuan != 0){
         document.getElementById("donem_ici").innerHTML += String(donemOrt);
        }
        else
        document.getElementById("donem_ici").innerHTML += String(0.00);

        if(genelToplamPuan != 0)
        document.getElementById("genel").innerHTML += String(genelOrt);
        else
        document.getElementById("genel").innerHTML += String(0.00);
    }else{
        document.getElementById("donem_ici").innerHTML += String(0.00);
        document.getElementById("genel").innerHTML += String(0.00);
    }
});

function puanEkle(kredi,not) {
    donemToplamKredi += kredi;
     switch(not){
         case "AA":
            donemToplamPuan += kredi * 4;
             break;
        case "BA":
            donemToplamPuan += kredi * 3.5;
            break;    
        case "BB":
            donemToplamPuan += kredi * 3;
            break; 
        case "CB":
            donemToplamPuan += kredi * 2.5;
            break;
        case "CC":
            donemToplamPuan += kredi * 2;
            break;
        case "DC":
            donemToplamPuan += kredi * 1.5;
            break;
        case "DD":
            donemToplamPuan += kredi * 1;
            break;
        case "FF":
            donemToplamPuan += kredi * 0;
            break;
     }
}

function dersKontrolu(){
    //kredi alanları > 20 veya bos ise placeholder = "bos bırakılamaz kredi sayısı 20 den fazla olamaz"
    const dersler = document.querySelectorAll(".ders");
    dersler.forEach(function(ders){
        //her ders icin eger input alanları dogru ıse yesil yapalım borderı
        let dersChecked = true;
        //kredi input alanı bos
        let input = ders.firstChild.value.trim();
        if(input === ""){
            ders.firstChild.placeholder = "BOS";
            ders.firstChild.style.border = "2px solid red";
            allChecked = false;
            dersChecked = false;
        }
        //kredi sayısı 20 yi gecmesin
        if(Number(input) > 20){
            ders.firstChild.value = "";
            ders.firstChild.placeholder = "Kredi < 20 olmalı";
            ders.firstChild.style.border = "2px solid red";
            allChecked = false;
            dersChecked = false;
        }
        //eger o ders tamamen dogru ise ver yesil borderı
        if(dersChecked) ders.firstChild.style.border = "2px solid green"
    })
}

function eskiInputKontrolu(){
  let eskiKrediChecked = true;
  let eskiOrtChecked = true;
  
  //icerikler bos mu ve ort > 4 mu
  if(eski_kredi_sayisi.value === ""){
      eski_kredi_sayisi.style.border = "2px solid red";
      allChecked = false;
  }else{
    eski_kredi_sayisi.style.border = "2px solid green";
  }

  if(eski_ort.value === "" || Number(eski_ort.value) > 4){
    eski_ort.style.border = "2px solid red";
    allChecked = false;
  }else{
      eski_ort.style.border = "2px solid green";
    }
}