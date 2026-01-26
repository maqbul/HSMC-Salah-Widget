  /*
##########################################################
  Salah Time Lock screen Widget HSMC BETA
If making adjustments to times +1 or -1 then also do same to main salah widget file

  update 11/02/24 
* time remaining circle bar 
* better offline appearance

  v1.2 - Sept 2023

  FEATURES
  * added outline circle and full salah name
  * shows fajar begin time after isha
..

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

 
  
const widget = new ListWidget()


var fajarb=""
let localFm = FileManager.local()
let cachePath = localFm.documentsDirectory()
let data;
let usingCachedData = false;
let cache = localFm.joinPath(cachePath, "lastread")

try {
  log('online')
 let url = ("https://www.mis-productions.co.uk//hsmc/salahtime/salahtimeshsmc_data.json")
  localFm.writeString(cache, url)


let r = new Request(url)
let getPrayer = await r.loadJSON()
var str=JSON.stringify(getPrayer)

var now = new Date()-1;
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var daynumber = Math.floor(diff / oneDay);//-1 or +1 if timing is offset a day or so

console.log('Day number: ' + daynumber);

//beginnings
 fajarb=getPrayer[daynumber].beginning.fajarb
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

//console.log(m)

if (h<10){h="0"+h}
if (m<10){m="0"+m}

timenow=h+':'+m
 
//timenow="05:50"

console.log('time: '+ timenow )
 
//NEXT PRAYER LABEL - 

 if (timenow<=fajarb){
  nextprayername=fajarb
  nextprayerlabel="  FJR"//9 CHAR SPACES
  }
  
  else if (timenow>fajarb&&timenow<=fajar){
  nextprayername=fajar
  nextprayerlabel="  FJR"
  
  }
  
  
  else if (timenow>fajarb&&timenow<=sunrise){
  nextprayername=sunrise
  nextprayerlabel="  SRI"
  }
  
   

if (timenow>sunrise&&timenow<=zoharb){
  nextprayername=zoharb
 nextprayerlabel="  ZHR"

  }
  
  
  if (timenow>zoharb&&timenow<=zohar){
  nextprayername=zohar
  nextprayerlabel="  ZHR"
  
  }
  
  
  
if (timenow>zohar&&timenow<=asarb){
 nextprayerlabel="  ASR"
nextprayername=asarb
}  
  
 if(timenow>asarb&&timenow<=asar){
  nextprayername=asar
  nextprayerlabel=" ASR"
  }

  
 if (timenow>asar&&timenow<=maghribb){
 nextprayerlabel="  MGR"//8 SPACE CHARS MAX
 nextprayername=maghribb
 
 }
 

 if (timenow>maghribb&&timenow<=ishab){
  nextprayername=ishab
  nextprayerlabel="  ESH"
  }
  
  
  if (timenow>ishab&&timenow<=isha){
  nextprayername=isha
  nextprayerlabel="  ESH"
  }

 
//set tomorrows sunrise after isha on new years day display message (a bug fix as showing error can not +1 for next day as 366 non existent

if (timenow>isha&&daynumber<365){
var sunriseTomorrow=getPrayer[daynumber+1].beginning.sunrise

  nextprayername=fajarb
  nextprayerlabel="  FJR"//8 CHAR SPACES
  }
  else if (timenow>isha&&daynumber==365){
   nextprayername="N Year" 
  }
  
widget.url="www.mis-productions.co.uk/salah-widget-ios/#widget_feedback"  

// insert js code to calc mins remaining
  minutes=""
  function remaining(arr){

let msChecker = 10000000000000000;
for ( let i = 0; i < arr.length; i++) {   
  if (i % 2 === 0) { 
 //   console.log(arr[i])
let end = new Date("February 11, 2024 " + arr[i]);
let start = new Date("February 11, 2024  " + arr[i+1]);
let ms = Math.floor(start - end);

if ( ms < msChecker) { 
  msChecker = ms
}
  }
}
 minutes = Math.floor(msChecker/1000/60) //Made this variable into global, so it works
let hours =  Math.floor(msChecker/1000/60/60)

console.log("mins:"+minutes)
  
  console.log("nxt"+nextprayerlabel+" " +nextprayername)
  }

var getMins=remaining ([timenow,nextprayername])


let progressStack = await progressCircle(widget,minutes-5)



let sf = SFSymbol.named("cloud.fill")
progressStack.addText(nextprayerlabel+"  "+nextprayername).font = Font.boldMonospacedSystemFont(13)


sf.tintColor = new Color("#fafafa")


async function progressCircle(
  on,
  value = 100,
  colour = "hsl(0, 0%, 100%)",
  background = "hsl(0, 0%, 10%)",
  size = 61,
  barWidth = 4.3,
) {
  if (value > 1) {
    value /= 50
  }
  if (value < 0) {
    value = 0
  }
  if (value > 1) {
    value = 1
  }

  async function isUsingDarkAppearance() {
    return !Color.dynamic(Color.white(), Color.black()).red
  }
  let isDark = await isUsingDarkAppearance()

  if (colour.split("-").length > 1) {
    if (isDark) {
      colour = colour.split("-")[1]
    } else {
      colour = colour.split("-")[0]
    }
  }

  if (background.split("-").length > 1) {
    if (isDark) {
      background = background.split("-")[1]
    } else {
      background = background.split("-")[0]
    }
  }

  let w = new WebView()
  await w.loadHTML('<canvas id="c"></canvas>')

  let base64 = await w.evaluateJavaScript(
    `
  let colour = "${colour}",
    background = "${background}",
    size = ${size}*3,
    lineWidth = ${barWidth}*3,
    percent = ${value * 100}
      
  let canvas = document.getElementById('c'),
    c = canvas.getContext('2d')
  canvas.width = size
  canvas.height = size
  let posX = canvas.width / 2,
    posY = canvas.height / 2,
    onePercent = 360 / 100,
    result = onePercent * percent
  c.lineCap = 'round'
  c.beginPath()
  c.arc( posX, posY, (size-lineWidth-1)/2, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) )
  c.strokeStyle = background
  c.lineWidth = lineWidth 
  c.stroke()
  c.beginPath()
  c.strokeStyle = colour
  c.lineWidth = lineWidth
  c.arc( posX, posY, (size-lineWidth-1)/2, (Math.PI/180) * 270, (Math.PI/180) * (270 + result) )
  c.stroke()
  completion(canvas.toDataURL().replace("data:image/png;base64,",""))`,
    true
  )
  
  
  const image = Image.fromData(Data.fromBase64String(base64))
  
  let stack = on.addStack()
  stack.size = new Size(size, size)
  stack.backgroundImage = image
  stack.centerAlignContent()
  let padding = barWidth * 2
  stack.setPadding(padding, padding, padding, padding)
  
  
  return stack

} //end , Closure for Canvas. Circle code

widget.addAccessoryWidgetBackground = true
//Script.setWidget(widget);
widget.presentAccessoryCircular()

   
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


widget.addAccessoryWidgetBackground = true
//Script.setWidget(widget);
widget.presentAccessoryCircular()

}





    
    Script.setWidget(widget)
Script.complete()
} //< uncomment when publishing to github

  //required by autoupdate module
module.exports = {
  main //< uncomment when publishing to github
} 


