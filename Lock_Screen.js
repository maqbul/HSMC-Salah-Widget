  /*
##########################################################
  Salah Time Lock screen Widget HSMC BETA via scriptdude
  v1.1 - Sept 2023

  FEATURES

  * Shows next beginning followed by jamaat time 
  * Tap icon to view full widget (must be setup)


  Developed by: Maqbul Yusuf
  Email: maqbul.yusuf@sky.com
  Launched Date: 01/09/23

  Compatible with iOS (scriptable app)
     
  Please do NOT remove or modify this header
     
  To check for updates or to leave feedback, tap on widget


##########################################################
*/

//Notes: copy all code to github - salah-lockscreen -widget.js, remove commented lines at top (async) and bottom to test then if all ok, replace salah-lockscreen -widget.js on github


async function main() { //uncomment when publish

 
  
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
 
//timenow="04:55"

console.log('time: '+ timenow )
 
//NEXT PRAYER LABEL - 

 if (timenow<fajarb){
  nextprayername=fajarb
  nextprayerlabel="F   "//9 CHAR SPACES
  }
  else if (timenow>fajarb&&timenow<sunrise){
  nextprayername=sunrise
  nextprayerlabel="S"
  }
  
   

if (timenow>sunrise&&timenow<zoharb){
  nextprayername=zoharb
  nextprayerlabel="Z"
  
  }
  
  
  if (timenow>zoharb&&timenow<zohar){
  nextprayername=zohar
  nextprayerlabel="Z J"
  
  }
  
  
  
if (timenow>zohar&&timenow<asarb){
 nextprayerlabel="A      "
nextprayername=asarb
}  
  
 if(timenow>asarb&&timenow<asar){
  nextprayername=asar
  nextprayerlabel="A   J  "
  }

  
 if (timenow>asarb&&timenow<=maghribb){
 nextprayerlabel="M "//8 SPACE CHARS MAX
 nextprayername=maghribb
 
 }
 
  
 

 if (timenow>maghribb&&timenow<=ishab){
  nextprayername=ishab
  nextprayerlabel="I      "
  }
  
  
  if (timenow>ishab&&timenow<isha){
  nextprayername=isha
  nextprayerlabel="I  J    "
  }

 
//set tomorrows sunrise after isha on new years day display message (a bug fix as showing error can not +1 for next day as 366 non existent

if (timenow>isha&&daynumber<365){
var sunriseTomorrow=getPrayer[daynumber+1].beginning.sunrise

  nextprayername=sunriseTomorrow
  nextprayerlabel="S"//8 CHAR SPACES
  }
  else if (timenow>isha&&daynumber==365){
   nextprayername="N Year" 
  }
  
  

let nextprayer=widget.addText(
nextprayerlabel + '                         '+ nextprayername)
nextprayer.textColor =Color.white()
nextprayer.font = Font.boldMonospacedSystemFont(18)
nextprayer.centerAlignText() //added for lockscreen
  
  
widget.url="scriptable:///run/Salah%20Widget" 


    
    
    
    
    

  widget.addAccessoryWidgetBackground = true
//Script.setWidget(widget);
widget.presentAccessoryCircular()
//Script.complete();

//Script.setWidget(widget);
//widget.presentSmall();
//Script.complete();
    
    
    
    
    Script.setWidget(widget)
Script.complete()
} //< uncomment when publishing to github

  //required by autoupdate module
module.exports = {
  main //< uncomment when publishing to github
} 

 



