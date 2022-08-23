const monthNames = [
    "Januar", "Februar", "M&auml;rz", "April", "Mai", "Jun", "July", "August", "September", "October", "November", "Dezember"
];
const dayNames = ["Sonntag","Montag","Dienstag","Mittwoch","Donnserstag","Freitag","Samstag"];
let calendarDate;
let calendarInfoDate;
window.onload = main;

function main() {
    calendarDate = new Date();
    calendarInfoDate = new Date();
    changeBoxText();
    drawCalendar();
}

function changeBoxText(){
    let year=calendarInfoDate.getFullYear();
    let month =calendarInfoDate.getMonth()+1;
    let day = calendarInfoDate.getDate();
    let monthD = monthNames[calendarInfoDate.getMonth()];
    document.getElementById('infotext_month').innerHTML = monthD;

    let germanDate= calendarInfoDate.getDate() + "." + month + "." + year;
    document.getElementById("infotext_dateD").innerHTML = germanDate;
    

    let holidayYesNoD = false;
    // Feiertage, fix
    if (day == 1 && month == 1 ) {
        holidayYesNoD = true;
    } else if (day== 1 && month== 5) {
        holidayYesNoD = true;
    } else if (day == 1 && month == 10) {
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
    document.getElementById("calendarH").innerHTML=germanDate
    document.getElementById("infotext_dateD").innerHTML = germanDate;
    //kann man mit normal if statement 
    document.getElementById("infotext_holiday").innerHTML = holidayYesNoD ? '' : 'nicht';
    document.getElementById("infotext_day").innerHTML = exactDay;
    document.getElementById("infotext_year").innerHTML = year
    let dayOfWeek = dayNames[calendarInfoDate.getDay()];
    document.getElementById('infotext_dayweek').innerHTML = dayOfWeek
    document.getElementById('infotext_dayweekmonat').innerHTML = dayOfWeek
}

function drawCalendar() {
    document.getElementById('kalendermonat').innerHTML = monthNames[calendarDate.getMonth()];
    document.getElementById('kalenderjahr').innerHTML = calendarDate.getFullYear();
    const lastOfMonth = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() +1,
        0
    );
    const lastDay = lastOfMonth.getDate(); //z.B. 31, 30, 28
    const lastOfMonthWeekday = lastOfMonth.getDay();
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
            schedule += '<td class="small kw">kwTest</td>'
        }
        let cellClass = '';
        // Zelle schreiben
        if (cellDate.getDay() == 6) {
            cellClass += 'we ';
        }
        else if(cellDate.getDay()==0){
            cellClass += 'w ';
        }
        if(
            cellDate.getDate()==calendarInfoDate.getDate() 
            && cellDate.getMonth()==calendarInfoDate.getMonth() 
            && cellDate.getFullYear()==calendarInfoDate.getFullYear()){
            cellClass +='changeToday '
        }
        if(isFeiertag(cellDate)){
            cellClass +='changeFeiertag '
        }

        let onClick = '"setInfoDate(new Date('+cellDate.getFullYear()+','+cellDate.getMonth()+','+cellDate.getDate()+'))"';
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

function setInfoDate(dateToSet){ 
    calendarInfoDate = dateToSet;    
    drawCalendar();
    changeBoxText();
}

function setCalendarDate(dateToSet){ 
    calendarDate = dateToSet;    
    drawCalendar();
    changeBoxText();
}

function decreaseMonth() {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, calendarDate.getDate()));
}
function increaseMonth(){
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, calendarDate.getDate()));
}
function decreaseYear(){
    setCalendarDate(new Date(calendarDate.getFullYear()- 1, calendarDate.getMonth(),calendarDate.getDate()));
}
function increaseYear(){
    setCalendarDate(new Date(calendarDate.getFullYear()+1, calendarDate.getMonth(),calendarDate.getDate()));
}

function isFeiertag(cellDate){
    let holidaysFixed = [
        new Date(cellDate.getFullYear(), 0, 1), // Neujahr
        new Date(cellDate.getFullYear(), 4, 1), // Tag der Arbeit
        new Date(cellDate.getFullYear(), 9, 3), // Tag der Deutschen Einheit
        new Date(cellDate.getFullYear(), 11, 25), // 1. Weihnachtstag
        new Date(cellDate.getFullYear(), 11, 26),
    ];
    for (let i = 0; i < holidaysFixed.length ; i++) {
        if( cellDate.getDate() == holidaysFixed[i].getDate() 
            && cellDate.getMonth() == holidaysFixed[i].getMonth()){
            return true 
        }
    }
    return false;
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



