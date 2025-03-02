/*
  Salah Widget 
  
  13/02/24 Enhanced offline view
  
  v1.2 - 240122
  Developed by: Maqbul Yusuf
  Email: maqbul.yusuf@sky.com
  Launched Date: 14/10/21
  Compatible with iOS (scriptable app)
     
  Please do NOT remove or modify this header
  To check for updates or to leave feedback, tap on widget


   change log:
 * -1 added to day number var as going ahead 1 day
 * new year bug fix (no data displayed) 
 * added gradient for Asar 
 * formatted to show 24 hour times
 * reduced 30 lines of code using fuctions for formatting
   (plus code tidy)

##########################################################
*/

//Notes: copy all code to github - DEV_Widget.js, remove commented lines at top (async) and bottom to test then if all ok, replace Widget.js on github


async function main() { //uncomment when publish

  
 let localFm = FileManager.local()
let cachePath = localFm.documentsDirectory()
let data;
let usingCachedData = false;
let cache = localFm.joinPath(cachePath, "lastread")

  
 //create local file to set preference 
 let fm =FileManager.local()
 let dir = fm.documentsDirectory()
 let path =fm.joinPath(dir, "show_beginning_preference.txt") 
 let getPreference=fm.readString(path)
 
 let  Show_Beginning_Times="yes" //get preference from local set in main module
  
 console.log('Display beginning: '+Show_Beginning_Times)
  
let widget = new ListWidget()


try {
  log('online')
 let url = ("https://mis-productions.co.uk/hsmc/salahtime/salahtimeshsmc_data.json")

  //let url = ("https://mis-productions.co.uk/prayertimes/hsmc/data.json")
  localFm.writeString(cache, url)

let r = new Request(url)
let getPrayer = await r.loadJSON()
var str=JSON.stringify(getPrayer)

var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var daynumber = Math.floor(diff / oneDay); // -1 or +1 to adjust days

console.log('Day number: ' + daynumber);

//beginnings
var fajarb=getPrayer[daynumber].beginning.fajarb
var sunrise=getPrayer[daynumber].beginning.sunrise
var zoharb=getPrayer[daynumber].beginning.zoharb
var asarb=getPrayer[daynumber].beginning.asarb
var maghribb=getPrayer[daynumber].beginning.maghribb
var ishab=getPrayer[daynumber].beginning.ishab

//jamaat
var fajar=getPrayer[daynumber].jamaat.fajar
var zohar=getPrayer[daynumber].jamaat.zohar
var asar=getPrayer[daynumber].jamaat.asar
var maghrib=getPrayer[daynumber].jamaat.maghribb
var isha=getPrayer[daynumber].jamaat.isha
 
   
var nextprayerlabel="   "
var nextprayername=""

let time = new Date()
h=time.getHours()
m=time.getMinutes()

if (h<10){h="0"+h}
if (m<10){m="0"+m}

timenow=h+':'+m
 
// timenow="06:55"

console.log('time: '+ timenow )
 
//NEXT PRAYER LABEL - based on begin/jamaat preference

 if (timenow<fajarb&&Show_Beginning_Times=="no"){
  nextprayername=fajar
  nextprayerlabel="FAJAR   "//9 CHAR SPACES
  }
  else if (timenow>fajarb&&timenow<sunrise){
  nextprayername=sunrise
  nextprayerlabel="SUNRISE"
  }
  
   

if (timenow>sunrise&&timenow<zohar&&Show_Beginning_Times=='no'){
  nextprayername=zohar
  nextprayerlabel="ZOHAR  "
  }
  
  else if (timenow>sunrise&&timenow<zoharb){
  nextprayername=zoharb
  nextprayerlabel="ZOHAR   "
  
  }
  
if (timenow>zohar&&timenow<asar&&Show_Beginning_Times=='no'){
 nextprayerlabel="ASAR      "
nextprayername=asar
}  
  
  else if(timenow>zoharb&&timenow<asarb){
  nextprayername=asarb
  nextprayerlabel="ASAR        "
  }

  
 if (timenow>asarb&&timenow<maghribb){
 nextprayerlabel="MAGRIB "//8 SPACE CHARS MAX
 nextprayername=maghribb
 
 }
 
  
 if (timenow>maghribb&&timenow<isha&&  Show_Beginning_Times=='no'){
 nextprayerlabel="ISHA        "
 nextprayername=isha
}

else if (timenow>maghribb&&timenow<isha){
  nextprayername=ishab
  nextprayerlabel="ISHA        "
  }

 
//set tomorrows sunrise after isha on new years day say message (ths is a bug fix showing error as reached 365 day number and can not +1 for next dayi.e 366 non existence)

if (timenow>isha&&daynumber<365){
var sunriseTomorrow=getPrayer[daynumber+1].beginning.sunrise

  nextprayername=sunriseTomorrow
  nextprayerlabel="SUNRISE"//8 CHAR SPACES
  }
  else if (timenow>isha&&daynumber==365){
   nextprayername="New Year" 
  }
  
  

let nextprayer=widget.addText(
nextprayerlabel + '                         '+ nextprayername)
nextprayer.textColor =Color.white()
nextprayer.font = Font.boldMonospacedSystemFont(22)
  
  
//GRADIENT COLOR CHANGE  

let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  
  
// SUNRISE COLOR  
 if (timenow>=fajar&&timenow<sunrise){
    gradient.colors = [
    new Color("d7816a"),
    new Color("bd4f6c")
  ]
}

// ZOHAR COLOR
else if(timenow>sunrise&&timenow<zohar){ 
    gradient.colors = [
    new Color("18A8D8"),
    new Color("6048C0")
  ] 
 }

// ASAR COLOR
else if (timenow>=zohar&&timenow<asar){
    gradient.colors = [
    new Color("91A1D1"),
    new Color("6148CC")
  ] 
 }

// MAGHRIB COLOR
else if(timenow>=asar&&timenow<maghribb){
    gradient.colors = [
    new Color("ee9617"),
    new Color("fe5858")
  ]
}


// ISHA COLOR
else if(timenow>=maghribb){
    gradient.colors = [
    new Color("353535"),
    new Color("030303")
  ]
}

  
  

// Feedback message
widget.addSpacer(4)

widget.addStack()
var feedback = widget.addText('CHECK OUR NEW SALAH TIME APP - TAP HERE  ') //ADD MESSAGE HERE AND LINK BELOW IF NEEDED
feedback.font = Font.headline()
feedback.font = Font.lightSystemFont(10); 
feedback.textOpacity=0 

var todaysDate=now.getDate()
console.log ('Todays date ' + todaysDate)

if (todaysDate == 15 || todaysDate== 20 || todaysDate== 29 || todaysDate==6){
feedback.textOpacity=0.9 //Opacity when displaying msg
}


widget.backgroundGradient = gradient
widget.addSpacer(9)

//widget.url="http://www.mis-productions.co.uk/salah-widget-ios" use Feedback link also add message for lock screen feedback!

//track taps to new widget
widget.url="https://www.masjideraza.com/salahtime"


let main = widget.addStack()
let left = main.addStack()
let right = main.addStack()
let middle = main.addStack()

let spacing = middle.addStack()

let icon = left.addStack()
let jamaat = middle.addStack()
let label = middle.addStack()

let rightTitle = right.addStack()
let rightContent = right.addStack()

spacing.addSpacer(300) 
main.addStack()
main.addSpacer(10)


// ICON DISPLAY

let fajarIcon = SFSymbol.named("sun.haze.fill")
    let docsElement1 = icon.addImage(fajarIcon.image)
    docsElement1.imageSize = new Size(40, 23)
    docsElement1.tintColor = Color.white()
    docsElement1.imageOpacity = 0.7
    
      
    let zoharIcon = SFSymbol.named("sun.max.fill")
    let docsElement2 = icon.addImage(zoharIcon.image)
    docsElement2.imageSize = new Size(80, 22)
    docsElement2.tintColor = Color.white()
    docsElement2.imageOpacity = 0.7
    widget.addSpacer(21)
    

let asarIcon = SFSymbol.named("sun.max.fill")
    let docsElement3 = icon.addImage(asarIcon.image)
    docsElement3.imageSize = new Size(34, 22)
    docsElement3.tintColor = Color.white()
    docsElement3.imageOpacity = 0.7
 
 
let maghribIcon = SFSymbol.named("sunset.fill")
    let docsElement4 = icon.addImage(maghribIcon.image)
    docsElement4.imageSize = new Size(88, 22)
    docsElement4.tintColor = Color.white()
    docsElement4.imageOpacity = 0.7
    
 
left.addSpacer(10)

let ishaIcon = SFSymbol.named("moon.fill")
    let docsElement5 = icon.addImage(ishaIcon.image)
    docsElement5.imageSize = new Size(32, 22)
    docsElement5.tintColor = Color.white()
    docsElement5.imageOpacity = 0.5
 
      
// Bottom spacing
widget.addSpacer(20)
label.addSpacer(5)


//SALAH LABELS FOOTER


let fajrlabel = label.addText("fajar");
formatSalahLabel(fajrlabel)
label.addSpacer(29) // < changes next salah spacing 


let zuhrlabel = label.addText("zuhr");
formatSalahLabel(zuhrlabel)
label.addSpacer(29) 


let asarlabel = label.addText("asar");
formatSalahLabel(asarlabel)
label.addSpacer(25) 


let maghriblabel = label.addText("magr");
formatSalahLabel(maghriblabel)
label.addSpacer(28)

let ishalabel = label.addText("isha");
formatSalahLabel(ishalabel)

label.addSpacer(1)
jamaat.addSpacer(1)  


function formatSalahLabel(salah){
salah.font=Font.lightSystemFont(16);
salah.textColor = Color.white()
salah.textOpacity=0.9
}

  
// SHOW BEGINNING TIMES - if preference set  
  
if (Show_Beginning_Times=="yes"){

var fajarjamaat = jamaat.addText(fajarb) 
formatSalah(fajarjamaat)
jamaat.addSpacer(19) // < changes next salah
  
var zoharjamaat = jamaat.addText(zoharb) 
formatSalah(zoharjamaat)
jamaat.addSpacer(16) 
  
var asarjamaat = jamaat.addText(asarb) 
formatSalah(asarjamaat)
jamaat.addSpacer(22) 
  
var maghribjamaat = jamaat.addText(maghribb)
formatSalah(maghribjamaat)
jamaat.addSpacer(19) 
  
  
var ishajamaat = jamaat.addText(ishab) 
formatSalah(ishajamaat)
jamaat.addSpacer(5) 
}

//SHOW JAMAAT TIMES - if preference set  


if (Show_Beginning_Times=="no"){

var fajarjamaat = jamaat.addText(fajar) 
formatSalah(fajarjamaat)
jamaat.addSpacer(19) // < changes next salah spacing


var zoharjamaat = jamaat.addText(zohar) 
formatSalah(zoharjamaat)
jamaat.addSpacer(16) 

var asarjamaat = jamaat.addText(asar) 
formatSalah(asarjamaat)
jamaat.addSpacer(22) 


var maghribjamaat = jamaat.addText(maghribb) 
formatSalah(maghribjamaat) 
jamaat.addSpacer(19) 


var ishajamaat = jamaat.addText(isha) 
formatSalah(ishajamaat)
jamaat.addSpacer(5) 
}


// truncated duplicate code below using function

function formatSalah(salah){
salah.font=Font.boldMonospacedSystemFont(13.5) ;
salah.textColor = Color.white()
salah.textOpacity=0.9
}



main.layoutVertically()
middle.layoutVertically()
left.layoutVertically()
right.layoutVertically()
  
widget.setPadding(50, 25, 0, 8)
 


} //end try block, do all above when online


// and below if offline
catch(e) {
  console.log("Offline mode")
    data = localFm.readString(cache);
    usingCachedData = true

ref="صَلَاة "
reftext = widget.addText(ref);
reftext.font =Font.regularSystemFont(20)
reftext.centerAlignText();

}





if(!config.runsInWidget){
widget.presentMedium()

}

/////

// icon-color: light-brown; icon-glyph: magic;




Script.setWidget(widget)
Script.complete()
}// uncomment left brace when publishing to github

  //required by autoupdate module
module.exports = {
  main
} 
 
