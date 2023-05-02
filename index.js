const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */
const final2014 = fifaData.filter(item => {
  return item["Year"] === 2014 && item.Stage === "Final";
});
console.log(final2014);

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
console.log(final2014[0]["Home Team Name"]);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(final2014[0]["Away Team Name"]);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(final2014[0]["Home Team Goals"]);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(final2014[0]["Away Team Goals"]);
//(e) 2014 Dünya kupası finali kazananı*/
if (final2014[0]["Home Team Name"] > final2014[0]["Away Team Name"]) {
  console.log(
    "2014 Dünya Kupasını " + final2014[0]["Home Team Name"] + " Kazandı"
  );
} else {
  console.log(
    "2014 Dünya Kupasını " + final2014[0]["Away Team Name"] + " Kazandı"
  );
}

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(fifaArray) {
  let finals = fifaArray.filter(item => {
    return item.Stage === "Final";
  });
  return finals;
}
//console.log(Finaller(fifaData));
/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaArray, callbackFinaller) {
  const finals = callbackFinaller(fifaArray);
  const years = finals.map(element => {
    return element.Year;
  });
  return years;
}
console.log(Yillar(fifaData, Finaller));
/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(fifaArray, callbackFinaller) {
  const finals = callbackFinaller(fifaArray);
  let winners = [];
  finals.forEach(item => {
    if (item["Home Team Goals"] > item["Away Team Goals"]) {
      return winners.push(item["Home Team Name"]);
    } else {
      return winners.push(item["Away Team Name"]);
    }
  });
  return winners;
}
console.log(Kazananlar(fifaData, Finaller));
/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(
  fifaArray,
  callbackFinaller,
  callbackYillar,
  callbackKazananlar
) {
  let array = [];
  let years = callbackYillar(fifaArray, callbackFinaller);
  let winners = callbackKazananlar(fifaArray, callbackFinaller);
  winners.forEach((item, i) => {
    array.push(`${years[i]} yılında, ${item} dünya kupasını kazandı!`);
  });
  return array;
}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));
/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(fifaArray) {
  let toplamGol = fifaArray.reduce((total, item) => {
    return total + item["Home Team Goals"] + item["Away Team Goals"];
  }, 0);
  return (toplamGol / fifaArray.length).toFixed(2);
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)));
/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data) {
  const finalMaclar = data.filter(mac => mac.Stage == "Final");

  const kazanan = mac => {
    if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
      return mac["Home Team Initials"];
    } else if (mac["Home Team Goals"] < mac["Away Team Goals"]) {
      return mac["Away Team Initials"];
    } else {
      const winner = mac["Win conditions"].split(" win ")[0];
      const result =
        winner == mac["Home Team Name"]
          ? mac["Home Team Initials"]
          : mac["Away Team Initials"];
      return result;
    }
  };

  let sampiyonlarKisaltma = finalMaclar.reduce((sampiyonluk, mac) => {
    sampiyonluk = sampiyonluk.concat(kazanan(mac));
    return sampiyonluk;
  }, []);

  const sampiyonlukSayilari = {};
  sampiyonlarKisaltma.forEach(takim => {
    if (sampiyonlukSayilari[takim]) {
      sampiyonlukSayilari[takim]++;
    } else {
      sampiyonlukSayilari[takim] = 1;
    }
  });
  return sampiyonlukSayilari;
}
console.log(UlkelerinKazanmaSayilari(fifaData));
/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan() {}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
  /* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
