function onOpen() {
    let ui = SpreadsheetApp.getUi();
    // Or DocumentApp or FormApp.
    ui.createMenu('Birthdays')
        .addItem('Update Birthdays', 'updateBirthdays')
        //      .addSeparator()
        //      .addItem('Create PDF', 'createPDF')
        .addToUi();
}

function deleteBirthdays() {
    //define our terms
    let ssBirthdays = SpreadsheetApp.getActiveSpreadsheet();
    let tabBirthdays = ssBirthdays.getSheetByName('birthdays');
    let lastRow = tabBirthdays.getLastRow();
    let empBDaysArr = tabBirthdays.getRange(3, 1, lastRow, 2).getValues();
    //let bdCalendar = tabBirthdays.getRange(3, 3).getValue().trim();
    let today = new Date();
    let theDay = today.getDate();
    let theMonth = today.getMonth();
    let lastYear = today.getFullYear() -1;
    let theYear = today.getFullYear() + 3;
    let futureDateStr = theMonth + "/" + theDay + "/" + theYear;
    let lastYearDateStr = theMonth + "/" + theDay + "/" + lastYear;
    let threeYearsRolling = new Date(futureDateStr);
    let lastYearRolling = new Date(lastYearDateStr);

    let allBDays = CalendarApp.getDefaultCalendar().getEvents(lastYearRolling, threeYearsRolling, {
        search: 'easyAddBirthdays'
    });

try{
    for (let i = 0; i < allBDays.length; i++) {
        allBDays[i].deleteEvent();
    }
      return true;
}
catch(err){ return err;}

}

function updateBirthdays() {
    workingOnIt();
    let returnMsg = deleteBirthdays();
    if (returnMsg == true) {
try{
  //define our terms
  //why did I do this redundancy thing? ... change this 
        let ssBirthdays = SpreadsheetApp.getActiveSpreadsheet();
        let tabBirthdays = ssBirthdays.getSheetByName('birthdays');
        let lastRow = tabBirthdays.getLastRow();
        let empBDaysArr = tabBirthdays.getRange(3, 1, lastRow, 2).getValues();
        let today = new Date();
        let theDay = today.getDate();
        let theMonth = today.getMonth();
        let theYear = today.getFullYear() + 3;
        let futureDateStr = theMonth + "/" + theDay + "/" + theYear;
        let threeYearsRolling = new Date(futureDateStr);
        
        for (let i = 0; i < lastRow; i++) {
            CalendarApp.getDefaultCalendar().createAllDayEventSeries(empBDaysArr[i][0] + "'s Birthday",
                new Date(empBDaysArr[i][1]),
                CalendarApp.newRecurrence().addYearlyRule().until(threeYearsRolling), {
                    description: "easyAddBirthdays"
                });
        }
   workingOnIt("ready");     
        
}
catch(err){
workingOnIt("errorMsg", err);
console.error(err);
}
     
    } else {
          workingOnIt("errorMsg",returnMsg);
    }
}


