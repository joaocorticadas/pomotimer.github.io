

//document.addEventListener("DOMContentLoaded", function () {
 // Create Variables
    let { currentMinutes, addButton, reduceButton, resumeButton, timerBaseMinutes, startButton, pauseButton, resetButton, currentStreakElement, nextButton, state } = newFunction();



  //Show table element when app loads
  

  //Button Variables JS 
  newFunction_1();
    

  //Increase Timer Button
  addButton.onclick = function () {
    if (timerBaseMinutes < 60) {
      timerBaseMinutes += 5;
      document.getElementById(
        "current-minutes"
      ).innerHTML = `${timerBaseMinutes}:00`;
    } 
  };

  //Decrease Timer Button
  reduceButton.onclick = function () {
    if (timerBaseMinutes > 5 ) {
      timerBaseMinutes -= 5;
      document.getElementById("current-minutes").innerHTML = `${timerBaseMinutes}:00`;
    }
  };

  //Reset Button
  resetButton = document.getElementById("reset-btn");
  resetButton.onclick = function restart() {
    resetStyles() 
    state = false;
    timerBaseMinutes = 25;
    currentMinutes.innerHTML = `${timerBaseMinutes}:00`;
    clearInterval(timerLoop) ;
    resetLastElement ()
    saveStorage ()
  }


let savedTime;
let savedTimeString
let timerLoop;

function newFunction_1() {
  currentMinutes = document.getElementById("current-minutes");
  addButton = document.getElementById("sum-button");
  reduceButton = document.getElementById("subtract-button");
  resumeButton = document.getElementById("resume-btn");
  currentMinutes.innerHTML = `${timerBaseMinutes}:00`;
  startButton = document.getElementById("start-btn");
  pauseButton = document.getElementById("pause-btn");
  resetButton = document.getElementById("reset-btn");
  currentStreakElement = document.getElementById("streak");
  nextButton = document.getElementById("next-btn");
}

function newFunction() {
  let timerBaseMinutes = 25;
  const timerBaseSeconds = 00;
  let addButton;
  let reduceButton;
  let currentMinutes;
  let startButton;
  let pauseButton;
  let resumeButton;
  let resetButton;
  let state; // True or False
  let currentStreakElement;
  let nextButton;
  let strikeClass;
  return { currentMinutes, addButton, reduceButton, resumeButton, timerBaseMinutes, startButton, pauseButton, resetButton, currentStreakElement, nextButton, state };
}

//Start Styles Function
function startStyles (){
  document.querySelector("body").style.backgroundColor = "#D16F75";
  document.getElementById("subtract-button").style.display = "none";
  document.getElementById("sum-button").style.display = "none";
  document.getElementById("reset-btn").style.display = "inline-block";
  document.getElementById("pause-btn").style.display = "inline-block";
  document.getElementById("start-btn").style.display = "none";
}

//Timer function
function timer (){
  let minutes = savedTimeNumber -1
  let seconds = 60;
  if (minutes >= -1) { 
      console.log("A")
      timerLoop = setInterval(looping, 1000)
          function looping () {    
          if (seconds > 10 && minutes >-1 && state == true){
              currentMinutes.innerHTML = minutes + ":" + (seconds = seconds - 1);
              console.log(minutes + ":" + seconds) 
          } else if (seconds > 0 && minutes >-1 && state == true) {
              currentMinutes.innerHTML = minutes + ":0" + (seconds = seconds - 1);
              console.log(minutes + ":" + seconds)  
          } if ( seconds == 0 && minutes > -1 && state == true) {
              currentMinutes.innerHTML = ((minutes-=1) + ":" + (seconds=59));
              console.log(minutes + ":" + seconds) 
          } if (seconds == 59 && minutes == -1) {
              saveDuration(savedTimeNumber);
              saveTask ()
              saveDate()
              setTable()
              clearInterval(timerLoop)
              completedMessage ()
              document.getElementById("task").value = "";
          }
      }
      
  } 

}



//Start Button
  startButton.onclick = function startButtonFunction () {
  startStyles()
  currentTask ()
  state = true;
  savedTime = document.getElementById("current-minutes").innerHTML;
  savedTimeString = savedTime[0] + savedTime[1];
  savedTimeNumber = parseInt(savedTimeString, 10);
  console.log(savedTimeNumber);

  timer();
  }

  //Reset Styles
  function resetStyles() {
    document.querySelector("body").style.backgroundColor = "#2D365C";
    document.getElementById("subtract-button").style.display = "inline-block";
    document.getElementById("sum-button").style.display = "inline-block";
    document.getElementById("reset-btn").style.display = "none";
    document.getElementById("pause-btn").style.display = "none";
    document.getElementById("start-btn").style.display = "inline-block";
  
    document.getElementById("task-tag").innerHTML = `<label style="inline-block">Task:</label>`;
    const taskId = document.getElementById("task");
    taskId.style.display = "inline-block";
  }


  //Next Button 
  nextButton.onclick = function restart() {
  resetStyles();
  nextButton.style.display = "none";  
  state = false;
  timerBaseMinutes = 25;
  currentMinutes.innerHTML = `${timerBaseMinutes}:00`;
  clearInterval(timerLoop) ;
  
} 



//Pause Button
pauseButton.onclick = function () {
    pauseButton.style.display = "none";
    resetButton.style.display = "none";
    resumeButton.style.display = "inline-block";
    state= false;
}

//Resume Button
resumeButton.onclick = function (){
    pauseButton.style.display = "inline-block";
    resetButton.style.display = "inline-block";
    resumeButton.style.display = "none";
    state = true;
}

//----------- Save Data Locally-----------------//

//Criteria Variables
let durationArray;
let taskArray;
let dateArray;

// Check if the website has been visited before
if(localStorage.getItem("visited") == null){
  localStorage.setItem('visited', 'yes');
  durationArray = [];
  taskArray = [];
  dateArray = [];
  localStorage.setItem("durationLocal", JSON.stringify(durationArray));
  localStorage.setItem("taskLocal", JSON.stringify(taskArray));
  localStorage.setItem("dateLocal", JSON.stringify(dateArray));
} else {
  let retrievedData1 = localStorage.getItem("durationLocal");
  let retrievedData2 = localStorage.getItem("taskLocal");
  let retrievedData3 = localStorage.getItem("dateLocal");
  durationArray = JSON.parse(retrievedData1);
  taskArray = JSON.parse(retrievedData2);
  dateArray = JSON.parse(retrievedData3);
}

//Save duration locally function

function saveDuration(number){
  durationArray.push(number);
  localStorage.setItem("durationLocal", JSON.stringify(durationArray));
}

//Save task locally function

function saveTask (){
  let formData = document.getElementById("task").value;
  if (formData.length == 0){
    taskArray.push("New Task");
    localStorage.setItem("taskLocal", JSON.stringify(taskArray));
  } else {
    taskArray.push(formData);
    localStorage.setItem("taskLocal", JSON.stringify(taskArray))
  }
}

//Save current date locally function

function saveDate(){
  let today = new Date()
  let currentDate = [[today.getFullYear()], [(today.getMonth()+1)], [today.getDate()]];
  dateArray.push(currentDate);
  localStorage.setItem("dateLocal", JSON.stringify(dateArray))
}




//----------- Show data on the Table-----------------//


//Retrieve arrays from Local 








//Show the current task on the Table


//Access TableElements
const table3 = document.getElementById("table3");
const table4 = document.getElementById("table4");
const table5 = document.getElementById("table5");
const table6 = document.getElementById("table6");
const table7 = document.getElementById("table7");
const table8 = document.getElementById("table8");
const table9 = document.getElementById("table9");
const table10 = document.getElementById("table10");
const table11 = document.getElementById("table11");
const table12 = document.getElementById("table12");
const table13 = document.getElementById("table13");
const table14 = document.getElementById("table14");
const table15 = document.getElementById("table15");
const table16 = document.getElementById("table16");
const table17 = document.getElementById("table17");
const table18 = document.getElementById("table18");
const table19 = document.getElementById("table19");
const table20 = document.getElementById("table20");



// Displaying the elements on the Table

function setTable(){
let element = JSON.parse(localStorage.getItem("durationLocal"));
let element2 = JSON.parse(localStorage.getItem("taskLocal"));

  console.log("setTable function")
if (element[0]  > 0 ){
table5.innerHTML = element[element.length - 1] + ":00";
table6.innerHTML = element2 [element.length - 1]}

if (element[1] > 0){
table7.innerHTML = element[element.length - 2] + ":00"; 
table8.innerHTML = element2 [element.length - 2]}

if (element[2] > 0){
table9.innerHTML = element[element.length - 3] + ":00"; 
table10.innerHTML = element2 [element.length - 3]}

if (element[3] > 0 ){
table11.innerHTML = element[element.length - 4] + ":00"; 
table12.innerHTML = element2 [element.length - 4]}

if (element[4] > 0 ){
table13.innerHTML = element[element.length - 5] + ":00";
table14.innerHTML = element2 [element.length - 5]}

if (element[5] > 0 ){
table15.innerHTML = element[element.length - 6] + ":00"; 
table16.innerHTML = element2 [element.length - 6]}

if (element[6] > 0 ){
table17.innerHTML = element[element.length - 7] + ":00"; 
table18.innerHTML = element2 [element.length - 7]}

if (element[7] > 0){
table19.innerHTML = element[element.length - 8] + ":00"; 
table20.innerHTML = element2 [element.length - 8]}
}

setTable()



//Function Current Task 
function currentTask (){
  const actualTask = document.getElementById("task").value;
  const taskId = document.getElementById("task");
  document.getElementById("task-tag").innerHTML = `<h2 style="text-align: center;">Current Task: ${actualTask}</h2>`;
  taskId.style.display = "none";
}

//Task Completed message
function completedMessage (){
  const taskId = document.getElementById("task");
  document.getElementById("task-tag").innerHTML = `<h2 style="text-align: center;">Task successfully completed.</h2>`;
  currentMinutes.innerHTML = "<h1 style='font-size: 8.5rem;'>Wooh!</h1>";
  document.body.style.backgroundColor = "#30B17C";
  nextButton.style.display = "inline-block";
  pauseButton.style.display= "none";
  resetButton.style.display= "none";
}


//--------------------Statistics Page-----------------//
const statisticsButton = document.getElementById("statistics");
const returnButton = document.getElementById("return");

statisticsButton.onclick = function () {
  //Styles
  document.querySelector(".left-content").style.display = "none";
  document.querySelector(".statistics-side").style.display = "inline-block";
  statisticsButton.style.display = "none"
  returnButton.style.display = "inline-block"
  document.getElementById("last-one").style.display = "none";

  //Return Button
returnButton.onclick = function () {
  //Styles
  document.querySelector(".left-content").style.display = "inline-block";
  document.querySelector(".right-content").style.display = "inline-block";
  document.querySelector(".statistics-side").style.display = "none";
  returnButton.style.display = "none";
  statisticsButton.style.display = "inline-block";
  document.getElementById("last-one").style.display = "inline-block";
}
  //Functions
  hoursFocused ();
  minutesFocused ();
  daysAccessed ();
  totalHoursMonth ();
  startChart ();
}





//Function Hours Focused
function hoursFocused (){
let pushDuration = JSON.parse(localStorage.getItem("durationLocal"));
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalMinutesSum = pushDuration.reduce(reducer);
const totalHours = Math.floor(totalMinutesSum / 60) ;
document.getElementById("hours-focused").innerHTML = totalHours;
}


//Function Tasks completed
function minutesFocused (){
  let pushDuration = JSON.parse(localStorage.getItem("durationLocal"));
  document.getElementById("days-accessed").innerHTML = pushDuration.length;
  }


//Function Days Accessed 
function daysAccessed (){
  let pushDates = JSON.parse(localStorage.getItem("dateLocal"));
  console.log(pushDates)  
  let daysPushed = [];
  let var1 = [];
  for(let i = 0; i < pushDates.length; i++){
  daysPushed.push([pushDates[i][0][0], pushDates[i][1][0], pushDates[i][2][0]].join("-"));
  console.log(daysPushed)
  }
  const uniqueDays= Array.from(new Set(daysPushed));
  console.log(uniqueDays)
  document.getElementById("day-streak").innerHTML = uniqueDays.length;
}

//-------------------About Page------------------------/

//About Button
let aboutButton = document.getElementById("works");
aboutButton.onclick = function () {
  console.log("i am")
  document.querySelector(".grid").style.display = "none";
  document.querySelector(".about-page").style.display = "block";
  document.getElementById("statistics").style.display = "none"
  document.getElementById("return-2").style.display = "inline-block";
  document.getElementById("return").style.display = "none";
  document.getElementById("works").style.display = "none";
  aboutButton.style.display="none";
}

//Return about
let returnButton2 = document.getElementById("return-2");
returnButton2.onclick = function () {
  console.log("Button clicked")
  document.querySelector(".grid").style.display = "grid";
  document.querySelector(".about-page").style.display = "none";
  returnButton2.style.display = "none";
  document.querySelector(".about-page").style.display = "none";
  document.getElementById("works").style.display = "inline-block";
  document.getElementById("return").style.display = "inline-block";
  document.getElementById("return").style.display = "none";
  aboutButton.style.display="inline-block";
  returnButton2.style.display="none"
  document.getElementById("statistics").style.display = "inline-block"
}



//------------------Preparing data for the graph------------------/

//Total Hours by month
let jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec;
jan = [0]
feb = [0];
mar = [0];
apr = [0];
may = [0];
jun = [0];
jul = [0];
aug = [0];
sep = [0];
oct = [0];
nov = [0];
dec = [0];
let monthsData =[];

janReduced = 0;
 febReduced  = 0;
marReduced  =  0;
 aprReduced  =  0;
 mayReduced  =  0;
 junReduced  =  0;
julReduced  =  0;
augReduced  =  0;
 sepReduced  =  0;
 octReduced  =  0;
novReduced  =  0;
 decReduced  =  0;



function totalHoursMonth (){
  
  let pushDates = JSON.parse(localStorage.getItem("dateLocal")); 
  let daysPushed = [];
  let var1 = [];
  for(let i = 0; i < pushDates.length; i++){
    daysPushed.push(pushDates[i][1][0]);
    console.log(daysPushed)}
  
  for (let j = 0; j < daysPushed.length; j++){
      if (daysPushed [j] == 1){
        jan.push(durationArray[j])
      }
      if (daysPushed [j] == 2){
        feb.push(durationArray[j])
      }
      if (daysPushed [j] == 3){
        mar.push(durationArray[j])
      }
      if (daysPushed [j] == 4){
        apr.push(durationArray[j])
      }
      if (daysPushed [j] == 5){
        may.push(durationArray[j])
      }
      if (daysPushed [j] == 6){
        jun.push(durationArray[j])
      }
      if (daysPushed [j] == 7){
        jul.push(durationArray[j])
      }
      if (daysPushed [j] == 8){
        aug.push(durationArray[j])
      }
      if (daysPushed [j] == 9){
        sep.push(durationArray[j])
      }
      if (daysPushed [j] == 10){
        oct.push(durationArray[j])
      }
      if (daysPushed [j] == 11){
        nov.push(durationArray[j])
      }
      if (daysPushed [j] == 12){
        dec.push(durationArray[j])
      }
  }

   console.log(" That is" + jan)

   const reducer = (accumulator, currentValue) => accumulator + currentValue;
   let janReduced = jan.reduce(reducer);
   let febReduced  = feb.reduce(reducer);
   let marReduced  = mar.reduce(reducer);
   let aprReduced  = apr.reduce(reducer);
   let mayReduced  = may.reduce(reducer);
   let junReduced  = jun.reduce(reducer);
   let julReduced  = jul.reduce(reducer);
   let augReduced  = aug.reduce(reducer);
   let sepReduced  = sep.reduce(reducer);
   let octReduced  = oct.reduce(reducer);
   let novReduced  = nov.reduce(reducer);
   let decReduced  = dec.reduce(reducer);


   newFunction_2();


  function newFunction_2() {
    monthsData.push(Math.floor(janReduced / 60));
    monthsData.push(Math.floor(febReduced / 60));
    monthsData.push(Math.floor(marReduced / 60));
    monthsData.push(Math.floor(aprReduced / 60));
    monthsData.push(Math.floor(mayReduced / 60));
    monthsData.push(Math.floor(junReduced / 60));
    monthsData.push(Math.floor(julReduced / 60));
    monthsData.push(Math.floor(augReduced / 60));
    monthsData.push(Math.floor(sepReduced / 60));
    monthsData.push(Math.floor(octReduced / 60));
    monthsData.push(Math.floor(novReduced / 60));
    monthsData.push(Math.floor(decReduced / 60));
  }
}






function startChart (){
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"],
        datasets: [{
            label: 'Total Hours (per month)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: monthsData
        }]
    },

    // Configuration options go here
    options: {}
});
}






