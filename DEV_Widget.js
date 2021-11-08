
/*
##########################################################
  
  Salah Widget v1.1 - 031121
  Developed by: Maqbul Yusuf
  Email: maqbul.yusuf@sky.com
  Date: 14/10/21
  Compatible with iOS (scriptable app)
     
  Please do NOT remove or modify this header
     
  To check for updates or to leave feedback, tap on widget
  ##########################################################
*/



async function main() { //uncomment when publish

//copy parts from between this function only to widget.js and combine with original widget.js file on github
 
  
 //create local file to set preference 
 let fm =FileManager.local()
 let dir = fm.documentsDirectory()
 let path =fm.joinPath(dir, "show_beginning_preference.txt") 
 let getPreference=fm.readString(path)
 
 let  Show_Beginning_Times=getPreference //get preference from local set in main module
  
 console.log('Display beginning: '+Show_Beginning_Times)
  
let widget = new ListWidget()

let url = "https://mis-productions.co.uk/prayertimes/hsmc/data.json";
let r = new Request(url)
let getPrayer = await r.loadJSON()
var str=JSON.stringify(getPrayer)

var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var daynumber = Math.floor(diff / oneDay);

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
 
//timenow="19:00"

console.log('time: '+ timenow )
 
//check beginning preference and change display
if (timenow<fajarb&&Show_Beginning_Times!="yes"){
  nextprayername=fajar
  nextprayerlabel="FAJAR    "//9 CHAR SPACES
  }
  else if (timenow<fajarb){
  nextprayername=sunrise
  nextprayerlabel="SUNRISE"
  }
  
  if (timenow>fajar){
  nextprayername=sunrise
  nextprayerlabel="SUNRISE"//9 CHAR SPACES
  }
   

if (timenow>sunrise&&timenow<zohar&&Show_Beginning_Times!='yes'){
  nextprayername=zohar
  nextprayerlabel="ZOHAR    "//8 CHAR SPACES
  }
  
  else if (timenow>sunrise&&timenow<zoharb){
  nextprayername=zoharb
  nextprayerlabel="ZOHAR    "
  
  }
  
if (timenow>zohar&&timenow<asar&&Show_Beginning_Times!='yes'){
 nextprayerlabel="ASAR       "//8 SPACE CHARS MAX
nextprayername=asar
}  
  
  
  else if(timenow>zoharb&&timenow<asarb){
  nextprayername=asarb
  nextprayerlabel="ASAR       "
  }

  
 if (timenow>asarb&&timenow<maghribb){
 nextprayerlabel="MAGRIB  "//8 SPACE CHARS MAX
 nextprayername=maghribb
 
 }
 
  
 if (timenow>maghribb&&timenow<isha&&  Show_Beginning_Times!='yes'){
 nextprayerlabel="ISHA         "//8 SPACE CHARS MAX
 nextprayername=isha
}

else if (timenow>maghribb&&timenow<ishab){
  nextprayername=ishab
  nextprayerlabel="ISHA         "
  }


//set tomorrows sunrise after isha
var sunriseTomorrow=getPrayer[daynumber+1].beginning.sunrise.substring(1,5)

if (timenow>isha){
  nextprayername=sunriseTomorrow
  nextprayerlabel="SUNRISE"//8 CHAR SPACES
  }

let nextprayer=widget.addText(
nextprayerlabel + '                         '+ nextprayername)
nextprayer.textColor =Color.white()
nextprayer.font = Font.boldMonospacedSystemFont(23)
  

let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  
 if (timenow>=fajar&&timenow<sunrise){
  //sunrise
  gradient.colors = [
    new Color("d7816a"),
    new Color("bd4f6c")
  ]
}


else if (timenow>=sunrise&&timenow<asar){
 //day time until asar 
 gradient.colors = [
    new Color("18A8D8"),
    new Color("6048C0")
  ] 
}
else if(timenow>=asar&&timenow<maghribb){
//sunset
gradient.colors = [
    new Color("ee9617"),
    new Color("fe5858")
  ]
}


else if(timenow>=maghribb){
//night
gradient.colors = [
    new Color("353535"),
    new Color("030303")
  ]
}

  
  

//feedback message
widget.addSpacer(4)

widget.addStack()
var feedback = widget.addText('               USEFUL? LEAVE FEEDBACK - TAP WIDGET')
feedback.font = Font.headline()
feedback.font = Font.lightSystemFont(10); 
feedback.textOpacity=0 // On required day increase

var todaysDate=now.getDate()
console.log ('Todays date ' + todaysDate)

if (todaysDate==7 || todaysDate == 14 || todaysDate == 20 ||todaysDate == 26){
feedback.textOpacity=0.2 // On required day increase
}



widget.backgroundGradient = gradient
widget.addSpacer(9)
widget.url="http://www.mis-productions.co.uk/salah-widget-ios" 


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

spacing.addSpacer(305) // changed
main.addStack()
main.addSpacer(10)

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
    widget.addSpacer(20)

let asarIcon = SFSymbol.named("sun.max.fill")
    let docsElement3 = icon.addImage(asarIcon.image)
    docsElement3.imageSize = new Size(30, 22)
    docsElement3.tintColor = Color.white()
    docsElement3.imageOpacity = 0.7
 
 
let maghribIcon = SFSymbol.named("sunset.fill")
    let docsElement4 = icon.addImage(maghribIcon.image)
    docsElement4.imageSize = new Size(89, 22)
    docsElement4.tintColor = Color.white()
    docsElement4.imageOpacity = 0.7
    
 
left.addSpacer(10)

let ishaIcon = SFSymbol.named("moon.fill")
    let docsElement5 = icon.addImage(ishaIcon.image)
    docsElement5.imageSize = new Size(40, 22)
    docsElement5.tintColor = Color.white()
    docsElement5.imageOpacity = 0.5
 
      
//bottom spacing
widget.addSpacer(20)
label.addSpacer(5)

let fajrlabel = label.addText("fajar");
fajrlabel.textColor =Color.white()
   fajrlabel.font = Font.lightSystemFont(16); 
   fajrlabel.textOpacity=0.9
   fajrlabel.tintColor= Color.red()
   label.addSpacer(27)//changed


let zuhrlabel = label.addText("zuhr");
  zuhrlabel.textColor =Color.white()
  zuhrlabel.font = Font.lightSystemFont(16); 
  zuhrlabel.textOpacity=0.9
  label.addSpacer(26) //changed 


let asarlabel = label.addText("asar");
 asarlabel.textColor =Color.white()
    asarlabel.font = Font.lightSystemFont(16); 
   asarlabel.textOpacity=0.9
 label.addSpacer(29) //changed for 12 hour digit 


let maghriblabel = label.addText("magr");
  maghriblabel.textColor =Color.white() 
  maghriblabel.font = Font.lightSystemFont(16); 
   maghriblabel.textOpacity=0.9
 label.addSpacer(27)

let ishalabel = label.addText("isha");
ishalabel.textColor =Color.white()
   ishalabel.font = Font.lightSystemFont(16); 
   ishalabel.textOpacity=0.9
  label.addSpacer(1)
  
jamaat.addSpacer(1)
  if (Show_Beginning_Times=="yes"){
  var fajarjamaat = jamaat.addText(fajarb) 
  fajarjamaat.font = Font.boldMonospacedSystemFont(16) ;
fajarjamaat.textColor = Color.white()
fajarjamaat.textOpacity=0.9
  jamaat.addSpacer(21) 
  
  var zoharjamaat = jamaat.addText(zoharb) 
  zoharjamaat.font = Font.boldMonospacedSystemFont(16) ;
zoharjamaat.textColor = Color.white()
zoharjamaat.textOpacity=0.9
  jamaat.addSpacer(20) 
  
  var asarjamaat = jamaat.addText(asarb) 
  asarjamaat.font = Font.boldMonospacedSystemFont(16) ;
asarjamaat.textColor = Color.white()
asarjamaat.textOpacity=0.9
  jamaat.addSpacer(20) 
  
  var maghribjamaat = jamaat.addText(maghribb)
  maghribjamaat.font = Font.boldMonospacedSystemFont(16) ;
maghribjamaat.textColor = Color.white()
maghribjamaat.textOpacity=0.9
  jamaat.addSpacer(21) 
  
  
  var ishajamaat = jamaat.addText(ishab) 
  ishajamaat.font = Font.boldMonospacedSystemFont(16) ;
ishajamaat.textColor = Color.white()
ishajamaat.textOpacity=0.9
  jamaat.addSpacer(30) 
}
 else{

var fajarjamaat = jamaat.addText(fajar) 
fajarjamaat.font = Font.boldMonospacedSystemFont(16) ;
fajarjamaat.textColor = Color.white()
fajarjamaat.textOpacity=0.9
jamaat.addSpacer(23) 

var zoharjamaat = jamaat.addText(zohar) 
zoharjamaat.font = Font.boldMonospacedSystemFont(16) ;
zoharjamaat.textColor = Color.white()
zoharjamaat.textOpacity=0.9
jamaat.addSpacer(17) 

var asarjamaat = jamaat.addText(asar) 
asarjamaat.font = Font.boldMonospacedSystemFont(16) ;
asarjamaat.textColor = Color.white()
asarjamaat.textOpacity=0.9
jamaat.addSpacer(21) 


var maghribjamaat = jamaat.addText(maghrib) 
maghribjamaat.font = Font.boldMonospacedSystemFont(16) ;
maghribjamaat.textColor = Color.white()
maghribjamaat.textOpacity=0.9
jamaat.addSpacer(21) 


var ishajamaat = jamaat.addText(isha) 
ishajamaat.font = Font.boldMonospacedSystemFont(16) ;
ishajamaat.textColor = Color.white()
ishajamaat.textOpacity=0.9
jamaat.addSpacer(2) 
}

main.layoutVertically()
middle.layoutVertically()
left.layoutVertically()
right.layoutVertically()
  
widget.setPadding(50, 25, 0, 8) //changed
 

if(!config.runsInWidget){
widget.presentMedium()

}

 
// uncomment when publishing

Script.setWidget(widget)
Script.complete()
}

  //required by autoupdate module
module.exports = {
  main
} 
 

  
