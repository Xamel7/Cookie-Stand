'use strict'
//random function between max and min input
function getRandom(max, min) {
   return Math.ceil(Math.random() * (max - min) + min);
}

function salmonCookies(loc, Min, Max, Avg) {
    this.loc = loc,
    this.Min = Min, 
    this.Max = Max,
    this.Avg = Avg;
    salmonCookies.allLocs.push(this);
    this.totalPerHour = [];
}
salmonCookies.allLocs = [];

// Creating objects to put in the constructor
var $Sea = new salmonCookies('Seattle', 23, 65, 6.3);
var $Tok = new salmonCookies('Tokyo', 3, 24, 1.2);
var $Dub = new salmonCookies('Dubai', 11, 38, 3.7);
var $Par = new salmonCookies('Paris', 20, 38, 2.3);
var $Lim = new salmonCookies('Lima', 2, 16, 4.6);

// putting the 'table' function to all location objects
salmonCookies.prototype.showData = compile;

var cookiesTable = document.getElementById('cookiesTable');

function getAvgCookies(location) {
    var getNum = Math.floor(Math.random() * (location.Max - location.Min + 1) + location.Min);
    var total = location.Avg * getNum;
    return Math.round(total);
}

// Attempt at a 12hour time display
function makeTime(hour) {
    var date = new Date(`March 05, 2023 ${hour}:00:00`);
    var dateOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return date.toLocaleTimeString('en-US', dateOptions);
}

var timesOnTableRow = document.getElementById('times-row');

for (var i = 6; i <= 19; i++) {
    var timesOnTable = document.createElement('th');
    timesOnTable.textContent = makeTime(i);
    timesOnTableRow.appendChild(timesOnTable);
}

var totalHeader = document.createElement('th');
totalHeader.textContext = 'Total';
// timesOnTableRow.appendChild(totalHeader);


// Hopefully renders cookie data into the table
function compile() {
    var sum = 0;
    var locationRow = document.getElementById('locations-and-data');
    var locationName = document.createElement('tr');
    locationName.textContent = this.loc;
    locationName.className = 'column1';
    for (var i = 0; i < 14; i++) {
        var averageCookies = getAvgCookies(this);
        sum += averageCookies;
        this.totalPerHour.push(averageCookies);
        var locationData = document.createElement('td');
        locationData.textContent = averageCookies;
        locationName.appendChild(locationData);
        locationRow.appendChild(locationName);
    }
    var showTotal = document.createElement('td');
    showTotal.textContent = sum;
    locationName.appendChild(showTotal);
    console.log(`${this.loc}'s total is ${sum}`);
    finalCompiler(); 
}

// Cookie data for the locations
$Sea.showData();
$Tok.showData();
$Dub.showData();
$Par.showData();
$Lim.showData();

var timesOnTable = document.createElement('th');
timesOnTable.textContent = "Total";
timesOnTableRow.appendChild(timesOnTable);

function formNewLoc(m) {
    m.preventDefault();
    console.log('Form submitted with new item' + m);
    var locFromForm = new salmonCookies(m.locName.value, parseInt(m.locMin.value), parseInt(m.locMax.value), parseInt(m.locAvg.value));
    locFromForm.showData();
}

var formElement = document.getElementById('new-location');

function finalCompiler() {
    cookiesTable.deleteTFoot();
    var newFoot = document.createElement('tfoot');
    cookiesTable.appendChild(newFoot);
    var footRow = document.createElement('tr');
    newFoot.appendChild(footRow);
    var footTotalTitle = document.createElement('th');
    footTotalTitle.textContent = 'Total';
    footRow.appendChild(footTotalTitle);
    var calcGrandTotal = 0;
    for (var r = 0; r < 14; r++){
      var dailySum = 0;
      for (var j = 0; j < salmonCookies.allLocs.length; j++) {
        dailySum += salmonCookies.allLocs[j].totalPerHour[r];
      }
      var hourlyTotal = document.createElement('td');
      hourlyTotal.textContent = dailySum;
      footRow.appendChild(hourlyTotal);
      calcGrandTotal += dailySum;
    }
    var grandTotal = document.createElement('td');
    grandTotal.textContent = `Grand Total: ${calcGrandTotal}`;
    footRow.appendChild(grandTotal);
}
// function createObjectForm(form) {
//     let loc = form.querySelector('#loc').value;
//     let Max = form.querySelector('#Max').value;
//     let Min = form.querySelector('#Min').value;
//     let Avg = form.querySelector('#Avg').value;

//     let hour = timeInputsToHours();
//     return new salmonCookies(loc, Min, Max, Avg, hoursDemo);
// }
let form = document.getElementById('form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    let locName = document.getElementById('locName').value;
    let locMin = document.getElementById('locMin').value;
    let locMax = document.getElementById('locMax').value;
    let locAvg = document.getElementById('locAvg').value;
    var $Mem = new salmonCookies(locName, locMin, locMax, locAvg);
    $Mem.showData();
    console.log('im running')
})

let search = document.getElementById('search');
search.addEventListener('submit', (e) =>{ 
    e.preventDefault();
    let text = document.getElementById('searchingCityName').value;
    var elements = document.getElementsByClassName('column1');
    console.log(elements)
    for(let i = 0; i < elements.length; i++) {
        if (elements[i].firstChild.textContent == text) {
            elements[i].style.backgroundColor = "red"
        }else {
            elements[i].style.backgroundColor = ""
        }
    }
    console.log(text)
});

// inside this eventlistener i need to do a condition to check my array of locations with a string that's being typed in.

let hoursDemo = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];

