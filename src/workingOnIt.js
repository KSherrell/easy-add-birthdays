function workingOnIt(status, eMsg){
let workingTmp = HtmlService.createTemplateFromFile('loader-html');
workingTmp.workingContent = "";
let workingDiv = "<div id='loading' class='center-align loading'><a class='btn-floating btn-large grey pulse'></a><div class='working'>working ...</div></div>";
let openingDiv = "<div id='opening' class='center-align loading'><a class='btn-floating btn-large grey pulse'></a><div class='working'>opening ...</div></div>";
let readyDiv = "<div id='ready' class='center-align ready'><a class='btn-floating btn-large green'></a><div class='working'>ready</div></div>";
let successDiv = "<div id='success' class='center-align ready'><a class='btn-floating btn-large blue'></a><div class='working'>success</div></div>";
let notFoundDiv = "<div id='notFound' class='center-align ready'><a class='btn-floating btn-large red darken-2 pulse'></a><div class='working'>not found.</div></div>";
let errDiv = "<div id='errDiv' class='center-align ready'><a class='btn-floating btn-large red darken-2 pulse'></a><div class='working'> error message: <br />" + eMsg + "</div></div>";
let scriptTag = "<script>window.close = function(){window.setTimeout(function(){google.script.host.close()},3500)};close();</script>";
let dialogTitle = " ";

if(!status){
workingTmp.workingContent = workingDiv;
workingTmp.scriptTag = " ";
}

if(status == "opening"){
workingTmp.workingContent = openingDiv;
workingTmp.scriptTag = scriptTag;
}

if(status == 'ready'){
workingTmp.workingContent = readyDiv;
workingTmp.scriptTag = scriptTag;
}

if(status == 'success'){
workingTmp.workingContent = successDiv;
workingTmp.scriptTag = scriptTag;
}

if(status == "notFound"){
workingTmp.workingContent = notFoundDiv;
workingTmp.scriptTag = scriptTag;
}

if(status == "errorMsg"){
workingTmp.workingContent = errDiv;
workingTmp.scriptTag = scriptTag;
}

workingTmp = workingTmp.evaluate();
workingTmp.setWidth(300).setHeight(500);
SpreadsheetApp.getUi().showModalDialog(workingTmp, dialogTitle);
}

