window.onload = main;
const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
let today = new Date();
let calendarDate = today;
let dayCalendar =calendarDate.getDate();
let monthCalendar =calendarDate.getMonth()+1;
const dayNames = ["Sonntag","Montag","Dienstag","Mittwoch","Donnserstag","Freitag","Samstag"];
let dayOfWeekCalendar= dayNames[calendarDate.getDate()];



function changeBoxText(){
    let year=calendarDate.getFullYear();
    let month =calendarDate.getMonth()+1;
    let day = calendarDate.getDate();
    let monthD = monthNames[calendarDate.getMonth()];
    document.getElementById('infotext_month').innerHTML = monthD;

    let germanDate= calendarDate.getDate() + "." + month + "." + year;
    document.getElementById("infotext_dateD").innerHTML = germanDate;
    
    let exactDay
    
    if (day <= 7) {
        exactDay =1;
    }else if (day <= 14){
        exactDay =2
    }else if(day <=22){
        exactDay =3
    }
    else if (day<=28){
        exactDay =4
    }else{
        exactDay =5
    }
    document.getElementById("infotext_day").innerHTML = exactDay;

    document.getElementById("infotext_year").innerHTML = year

    let dayOfWeek = dayNames[calendarDate.getDay()];
    document.getElementById('infotext_dayweek').innerHTML = dayOfWeek
    document.getElementById('infotext_dayweekmonat').innerHTML = dayOfWeek
}

function main() {
    let year=today.getFullYear();
    let month =today.getMonth()+1;
    let day = today.getDate();
    let exactDay
    let holidayYesNoD = false;
    
    let germanDate= day + "." + month + "." + year;

    changeBoxText();

    // Feiertage, fix
    if (day == 1 && month == 1 ) {
        holidayYesNoD = true;
    } else if (day== 1 && month== 5) {
        holidayYesNoD = true;
    } else if (day == 3 && month == 10) {
        holidayYesNoD = true;
    } else if (day == 25 && month == 12) {
        holidayYesNoD = true;
    } else if (day == 26 && month == 12) {
        holidayYesNoD = true;
    }
    // Feiertage, beweglich
    let ostersonntag = easterDate(year);
    // let ostermontag = new Date(ostersonntag.getFullYear(), ostersonntag.getMonth(), ostersonntag.getDate() + 1);
    // let karfreitag = new Date(ostersonntag.getFullYear(), ostersonntag.getMonth(), ostersonntag.getDate() - 2);
    // let christihimmelfahrt = new Date(ostersonntag.getFullYear(), ostersonntag.getMonth(), ostersonntag.getDate() + 39);
    if (day == ostersonntag.getDate() && month == ostersonntag.getMonth() + 1) {
        holidayYesNoD = true;
    }

    // console.log('year:' + dateToday.getFullYear())
    // console.log('year:' + year)

    document.getElementById("infotext_year").innerHTML = today


    if (day <= 7) {
        exactDay =1;
    }else if (day <= 14){
        exactDay =2
    }else if(day <=22){
        exactDay =3
    }
    else if (day<=28){
        exactDay =4
    }else{
        exactDay =5
    }
    document.getElementById("calendarH").innerHTML=germanDate
    document.getElementById('infotext_year').innerHTML = year;
    document.getElementById("infotext_dateD").innerHTML = today;
    document.getElementById("infotext_day").innerHTML = exactDay;
    document.getElementById("infotext_dateD").innerHTML = germanDate;
    //kann man mit normal if statement 
    document.getElementById("infotext_holiday").innerHTML = holidayYesNoD ? '' : 'nicht';
    drawCalendar();
}

function drawCalendar() {
    document.getElementById('kalendermonat').innerHTML = monthNames[calendarDate.getMonth()];
    document.getElementById('kalenderjahr').innerHTML = calendarDate.getFullYear();
    const lastOfMonth = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() +1,
        0
    );
    console.log(lastOfMonth)
    const lastDay = lastOfMonth.getDate(); //z.B. 31, 30, 28
    const lastOfMonthWeekday = lastOfMonth.getDay();
    console.log(lastOfMonthWeekday)


    // 0    0
    // 1    6
    // 2    5
    // 3    4
    // 4    3
    // 5    2
    // 6    1
    const daysToDrawAfter = lastOfMonthWeekday == 0 ? 0 : 7 - lastOfMonthWeekday;

    let firstOfMonth =  new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        1
      );
    let firstOfMonthWeekday = firstOfMonth.getDay(); // 0: Snntag, 1: Montag, Dienstag, Mittwoch...
    let daysToDrawBefore = firstOfMonthWeekday == 0 ? 6 : firstOfMonthWeekday - 1;
    let firstDayToDraw = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        1 - daysToDrawBefore
      );

      

    let schedule = '';
    for (let i = 0; i < daysToDrawBefore + lastDay + daysToDrawAfter; i++) {
        // HIER WERDEN DIE TAGE GEBAUT!!
        let cellDate = new Date (firstDayToDraw.getFullYear(), firstDayToDraw.getMonth(), firstDayToDraw.getDate() + i);
        // Reihe öffnen
        if (cellDate.getDay() == 1) {
            schedule += '<tr>'
            schedule += '<td class="small">kwTest</td>'
        }
        let cellClass = '';
        // Zelle schreiben
        if (cellDate.getDay() == 6) {
            cellClass += 'we ';
        }
        else if(cellDate.getDay()==0){
            cellClass += 'w ';
        }
        else if(cellDate.getDate()==today.getDate() && cellDate.getMonth()==today.getMonth() && cellDate.getFullYear()==today.getFullYear()){
            cellClass +='changeToday '
        }
        else if(isFeiertag(cellDate)){
            cellClass +='changeFeiertag '
        }

        if(calendarDate.getDate() == cellDate.getDate() && calendarDate.getMonth() == cellDate.getMonth()){
            cellClass +='calendarDate '
        }
        
       
        // else if(cellDate.ostersonntag.getDate()  && ostersonntag.getMonth() + 1){
        //     cellClass +='changeOstern'
        // }

        // console.log(cellDate.getDate())
        console.log(calendarDate.getDate())

        let onClick =  '"setDate(new Date('+cellDate.getFullYear()+','+cellDate.getMonth()+','+cellDate.getDate()+'))"';
    //HTML Beispiel->   "setDate(new Date(2022,7,19))"

        let newDay = '<td class="' + cellClass + '"onClick='+ onClick + ' ">' + cellDate.getDate() + '</td>'; // In Dieser zeile wird der Tag zusammengebaut
        schedule += newDay;

        // Reihe schließen
        if (cellDate.getDay() == 0) {
            schedule += '</tr>';
        }



    }
    document.getElementById("monatskalender").innerHTML = schedule;

}


function setDate(dateToSet){ 

    calendarDate = dateToSet;    
    drawCalendar();
    changeBoxText();
}

function decreaseMonth() {
    setDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, calendarDate.getDate()));
}
function increaseMonth(){
    setDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, calendarDate.getDate()));
}
function decreaseYear(){
    setDate(new Date(calendarDate.getFullYear()- 1, calendarDate.getMonth(),calendarDate.getDate()));
}
function increaseYear(){
    setDate(new Date(calendarDate.getFullYear()+1, calendarDate.getMonth(),calendarDate.getDate()));
}

function isFeiertag(cellDate){
    let holidayDays=[1,3,6,9,5,30,10]
    let holidayMonths=[0,1,4,5,6,8,9]
    for (let i=0; i < 6 ; i++) {
        if(cellDate.getDate()==holidayDays[i] && cellDate.getMonth()==holidayMonths[i]){
            return true 
            
        }
        
    }

}

    function easterDate( year ) {
    var date, a, b, c, m, d;
    // Instantiate the date object.
    date = new Date;
    // Set the timestamp to midnight.
    date.setHours( 0, 0, 0, 0 );
    // Set the year.
    date.setFullYear( year );
    // Find the golden number.
    a = year % 19;
    // Choose which version of the algorithm to use based on the given year.
    b = ( 2200 <= year && year <= 2299 ) ?
        ( ( 11 * a ) + 4 ) % 30 :
        ( ( 11 * a ) + 5 ) % 30;
    // Determine whether or not to compensate for the previous step.
    c = ( ( b === 0 ) || ( b === 1 && a > 10 ) ) ?
        ( b + 1 ) :
        b;
    // Use c first to find the month: April or March.
    m = ( 1 <= c && c <= 19 ) ? 3 : 2;
    // Then use c to find the full moon after the northward equinox.
    d = ( 50 - c ) % 31;
    // Mark the date of that full moon—the "Paschal" full moon.
    date.setMonth( m, d );
    // Count forward the number of days until the following Sunday (Easter).
    date.setMonth( m, d + ( 7 - date.getDay() ) );
    // Gregorian Western Easter Sunday
    return date;
}



