
// 
var timeBlock = document.getElementById("currentDay");
function updateTime() {
    timeBlock.textContent = moment().format("MMMM Do YYYY, h:mm:ss a");
}

$(document).ready(function () {
    setInterval(function () {
        updateTime();
    }, 1000)
    let scheduleInfo = [];
    let hours = moment().hours();
    let workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    init();

    function init() {
        checkLocalStorage();
        for (let i = 0; i < workHours.length; i++) {
            createSchedule(i);
        }
    }

    function createSchedule(currentIndex) {
        let scheduleRow = $("<section>");
            scheduleRow.addClass("row");
            $(".container").append(scheduleRow);

        let hourNumber = $("<article>");
            hourNumber.addClass("time-block col-sm-1");
            scheduleRow.append(hourNumber);
        let scheduleHour = $("<h3>");
            scheduleHour.addClass("hour");
            scheduleHour.text(displayHours(workHours[currentIndex]));
            hourNumber.append(scheduleHour);

        let scheduleText = $("<article>");
            scheduleText.addClass("col-sm-10");
            scheduleRow.append(scheduleText);
        let textArea = $("<textarea>");
            textArea.val(checkForText(workHours[currentIndex]));
            textArea.addClass(hourClass(workHours[currentIndex]));
            scheduleText.append(textArea);

        let buttonCol = $("<article>");
            buttonCol.addClass("col-sm-1");
            scheduleRow.append(buttonCol);
        let newButton = $("<button>");
            newButton.addClass("saveBtn");
            newButton.attr("value", workHours[currentIndex]);
            buttonCol.append(newButton);
        let buttonClass = $("<i>");
            buttonClass.addClass("fas fa-save");
            newButton.append(buttonClass);
    }

    function checkLocalStorage() {
        scheduleInfo = JSON.parse(localStorage.getItem("schedule"));
        if(scheduleInfo === null) {
            scheduleInfo = [];
        }
    }

    function displayHours(workHours) {
        if (workHours > 12) {
            text = (workHours - 12) + "PM"
        }
        else {
            text = workHours + "AM"
        }
        return text;
    }

    function updateList(theObj, currentText) {
        for (let i = 0; i < scheduleInfo.length; i++) {
            if(scheduleInfo[i].time === theObj.time) {
            scheduleInfo[i].text = currentText;
            return;
            }
        }
        scheduleInfo.push(theObj);
    }

    function hourClass(workHours) {
        if(hours > workHours) {
            return "past";
        }
        else if(hours === workHours) {
            return "present";
        }
        return "future"; 
    }

    function checkForText(hour) {
        let agenda = "";
        for (let i = 0; i < scheduleInfo.length; i++) {
            console.log(hour, scheduleInfo[i].time)
            if (scheduleInfo[i].time == hour) {
                return agenda = scheduleInfo[i].text
            }
        }
    }
    
    $("section").click(function(event) {
        if(event.target.matches("button") || event.target.matches("i")) {
            console.log(this)
            let text = this.children[1].children[0].value;
            let scheduleTime = this.children[2].children[0].value;
            let newObj = {
                time: scheduleTime,
                text: text
            }
            updateList(newObj, text,);
            localStorage.setItem("schedule", JSON.stringify(scheduleInfo));
        }
     });
});