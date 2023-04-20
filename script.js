let hour = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let timeZone = document.getElementById('timeZone');
let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
let date = document.getElementById("date");
let alarm = document.querySelectorAll('.timepicker');
let alarmList = document.getElementById('alarm-list');
let elem = document.getElementById('elem-time');
let startDate = document.getElementById('start-date');
let alarmName = document.getElementById('name');
const deleteBtn = document.querySelectorAll('.delete-alarm');

let alarmObj = {
    alarms: []
};
let alarmIndex = 0;



let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const appear = (x) => { return (x < 10 ? "0" + x : x); }
const convert = (x) => { return Number.parseInt(x) }
const hider4 = (x) => { x.hidden = (x.hidden) ? false : true; }
function setTime() {
    setInterval(() => {
        let d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();
        let din = d.getDay();
        let mon = d.getMonth();
        let tarik = d.getDate();
        let y = d.getFullYear();
        let dur = "AM";
        if ((h > 12) || (h == 12 && m > 0)) {

            dur = "PM"
        }
        if (h > 12) {
            h = h - 12;
        }

        hour.innerHTML = appear(h);
        min.innerHTML = appear(m);
        sec.innerHTML = appear(s);
        timeZone.innerHTML = dur;
        day.innerHTML = days[din];
        month.innerHTML = monthName[mon];
        year.innerHTML = y;
        date.innerHTML = appear(tarik);
        let minDate = d.toISOString().slice(0, 10);
        startDate.setAttribute("min", minDate);
        alarmRings();
    }, 1000);
}
setTime();

function alarmRings() {
    alarmObj.alarms.forEach(function (alarm) {
        let name = alarm.name;
        let hour = alarm.hour;
        let minute = alarm.min;
        let meridian = alarm.mer;
        let alarmDate = new Date(startDate.value);

        let now = new Date();
        let alarmTime = new Date(alarmDate.getFullYear(), alarmDate.getMonth(), alarmDate.getDate(), hour, minute);

        if (meridian === 'PM' && hour !== 12) {
            hour += 12;
        }
        alarmTime.setHours(hour);
        let timeDifference = alarmTime.getTime() - now.getTime();
        if (timeDifference > 0) {
            setTimeout(() => {
                // Code to ring the bell
                console.log(`Alarm for ${hour % 12}:${minute} ${meridian} is ringing!`);
            }, timeDifference);
        }
    });
}


const set = () => {

    let alarmString = alarm[0].value;
    let hour = convert(alarmString.substr(0, 2));
    let min = convert(alarmString.substr(3, 2));
    let mer = alarmString.substr(6, 2);

    let alarmDate = new Date(startDate.value);
    let now = new Date();
    if (alarmName.value == '') {
        alarmName.value = 'New Alarm';
    }
    if (startDate.value == '') {
        startDate.value = new Date().toISOString().slice(0, 10);
    }
    let alarmTime = new Date(alarmDate.getFullYear(), alarmDate.getMonth(), alarmDate.getDate(), hour, min);
    let newAlarm = {
        name: "New Alarm",
        hour: hour,
        min: min,
        mer: mer,
        alarmDate: startDate.value,
    };

    if (alarmTime <= now) {
        alert('bhaggg');
        return;
    } else {
        alarmIndex++;
        newAlarm.id = `${alarmIndex}`;
        newAlarm.name = alarmName.value; // set the name of the alarm
        alarmObj.alarms.push(newAlarm); // add the new alarm to the array
    }


    console.log(alarmObj);
    let newElement = document.createElement('div');
    newElement.innerHTML = `
            <li class="card" >
                <div class="row">
                    <div class="col">
                        <span>${newAlarm.name}</span> 
                    </div>
                    <div class="col">
                        <span>${appear(hour)}:${appear(min)} ${mer}</span>
                    </div>
                    <div class="col">
                        <span><i class="fa-solid fa-pen-to-square"></i></span>
                        <button class="delete-alarm" onClick="deleteAlarm(event)" ><i class="fa-solid fa-trash"></i></button>                    

                    </div>

                </div>
                

            </li>
    `;
    elem.value = '';
    alarmName.value = '';
    // Append the new element to the DOM
    alarmList.appendChild(newElement);


};

function deleteAlarm(event) {
    event.preventDefault();
    let alarmid = parseInt(event.target.parentNode.parentNode.getAttribute('id'));
    console.log(alarmid);
    // // let alarmId = event.target.getAttribute('id');
    // // console.log(alarmId);
    // // let alarmElement = document.getElementById(alarmId);
    // // console.log(alarmElement);
    // // alarmElement.remove();
    // // // remove the alarm from the alarmObj
    // // for (let i = 0; i < alarmObj.alarms.length; i++) {
    // //     if (alarmObj.alarms[i].id == alarmId) {
    // //         alarmObj.alarms.splice(i, 1);
    // //         break;
    // //     }
    // // }


}



document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, {});
});