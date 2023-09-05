/*
##########################################################
  
  Salah Widget v1.0 
  Developed by: Maqbul Yusuf
  Email: maqbul.yusuf@sky.com
  Date: 14/10/21
  Compatible with iOS (scriptable app)
     
  Please do NOT remove or modify this header
     
  To check for updates or to leave feedback, tap on widget
  ##########################################################
*/

//   V1.0 - Features added:
// * Preference to show beginning or Jamaat times 
// * Color changes according to time of day


let scriptName = 'Salah Widget';
let scriptUrl = 'https://raw.githubusercontent.com/maqbul/HSMC-Salah-Widget/main/Widget.js'; 

let fm =FileManager.local()


// ***** SET OPTION *****
var show_beginning_times="no" //change to yes or no



let dir = fm.documentsDirectory()
let path =fm.joinPath(dir, "show_beginning_preference.txt")

//write preference to local file to be read from widget.js
fm.writeString(path, show_beginning_times)

//let showBeginning= fm.readString(path)
//console.log ("saved "+showBeginning)  

let modulePath = await downloadModule(scriptName, scriptUrl); // jshint ignore:line
if (modulePath != null) {
  let importedModule = importModule(modulePath);
  await importedModule.main(); // jshint ignore:line
} else {
  console.log('Failed to download new module and could not find any local version.');
}

async function downloadModule(scriptName, scriptUrl) {
  // returns path of latest module version which is accessible
  let fm = FileManager.local();
  let scriptPath = module.filename;
  let moduleDir = scriptPath.replace(fm.fileName(scriptPath, true), scriptName);
  if (fm.fileExists(moduleDir) && !fm.isDirectory(moduleDir)) fm.remove(moduleDir);
  if (!fm.fileExists(moduleDir)) fm.createDirectory(moduleDir);
  let dayNumber = Math.floor(Date.now() / 1000 / 60 / 60 / 1);
  let moduleFilename = dayNumber.toString() + '.js';
  let modulePath = fm.joinPath(moduleDir, moduleFilename);
  if (fm.fileExists(modulePath)) {
    console.log('Running local file ' + moduleFilename);
    return modulePath;
  } else {
    let [moduleFiles, moduleLatestFile] = getModuleVersions(scriptName);
    console.log('Downloading ' + moduleFilename + ' from URL: ' + scriptUrl);
    let req = new Request(scriptUrl);
    let moduleJs = await req.load().catch(() => {
      return null;
    });
    if (moduleJs) {
      fm.write(modulePath, moduleJs);
      if (moduleFiles != null) {
        moduleFiles.map(x => {
          fm.remove(fm.joinPath(moduleDir, x));
        });
      }
      return modulePath;
    } else {
      console.log('Failed to download new module. Using latest local version: ' + moduleLatestFile);
      return (moduleLatestFile != null) ? fm.joinPath(moduleDir, moduleLatestFile) : null;
    }
  }
}
 

function getModuleVersions(scriptName) {
  // returns all saved module versions and latest version of them
  let fm = FileManager.local();
  let scriptPath = module.filename;
  let moduleDir = scriptPath.replace(fm.fileName(scriptPath, true), scriptName);
  let dirContents = fm.listContents(moduleDir);
  if (dirContents.length > 0) {
    let versions = dirContents.map(x => {
      if (x.endsWith('.js')) return parseInt(x.replace('.js', ''));
    });
    
    
    versions.sort(function(a, b) {
      return b - a;
    });
    versions = versions.filter(Boolean);
    if (versions.length > 0) {
      let moduleFiles = versions.map(x => {
        return x + '.js';
      });
      moduleLatestFile = versions[0] + '.js';
      return [moduleFiles, moduleLatestFile];
    }
    
  }
  

  return [null, null];
}
