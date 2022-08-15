window.onload = main;

function main() {
    const monthDays = document.querySelector(".days");

   
    
  
   
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
    let date=new Date();
    let year=date.getFullYear();
    let month =date.getMonth()+1
    
    let day =date.getDate()
    console.log(day)
    let genauerTag
    let holidayYesNoD = false;
    
    let germanDate= day + "." + month + "." + year;
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["Sonntag","Montag","Dienstag","Mittwoch","Donnserstag","Freitag","Samstag"];
    let monthD = monthNames[date.getMonth()];
    document.getElementById('infotext_month').innerHTML = monthD ;

    const dayOfWeek = dayNames[date.getDay()];
    document.getElementById('infotext_dayweek').innerHTML = dayOfWeek
   

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
    let ostermontag = new Date(ostersonntag.getFullYear(), ostersonntag.getMonth(), ostersonntag.getDate() + 1);
    let karfreitag = new Date(ostersonntag.getFullYear(), ostersonntag.getMonth(), ostersonntag.getDate() - 2);
    let christihimmelfahrt = new Date(ostersonntag.getFullYear(), ostersonntag.getMonth(), ostersonntag.getDate() + 39);
    if (day == ostersonntag.getDate() && month == ostersonntag.getMonth() + 1) {
        holidayYesNoD = true;
    }

    console.log('year:' + date.getFullYear())
    console.log('year:' + year)

    document.getElementById("infotext_year").innerHTML = date


    if (day <= 7) {
        genauerTag =1;
    }else if (day <= 14){
        genauerTag=2
    }else if(day <=22){
        genauerTag=3
    }
    else if (day<=28){
        genauerTag=4
    }else{
        genauerTag=5
    }
    document.getElementById('infotext_year').innerHTML = year;
    document.getElementById("infotext_dateD").innerHTML = date;
    document.getElementById("infotext_day").innerHTML = genauerTag;
    // document.getElementById("infotext_month").innerHTML = monthD;
    document.getElementById("infotext_dateD").innerHTML = germanDate;
    document.getElementById("infotext_holiday").innerHTML = holidayYesNoD ? '' : 'nicht';

    console.log(year);
    console.log(easterDate(2021));


     //Kalendar

     const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();

    const firstDay=new Date(date.getFullYear(), date.getMonth(),1).getDate()
    console.log(lastDay);

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
//Kalender date 

}


