
// 
var timeBlock = document.getElementById("currentDay");
function updateTime() {
    timeBlock.textContent = moment().format("MMMM Do YYYY, h:mm:ss a");
}

$(document).ready(function () {
    setInterval(function () {
        updateTime();
    }, 1000)
    var scheduleInfo = [];
    var hours = moment().hours();
    var workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    
    init();

    function init() {
        for (var i = 0; i < workHours.length; i++) {
            createSchedule(i);
        }
        checkLocalStorage();
    }

    // function init() {
    //     
    // }

    function createSchedule(currentIndex) {
        var scheduleRow = $("<section>");
            scheduleRow.addClass("row");
            $(".container").append(scheduleRow);

        var hourNumber = $("<article>");
            hourNumber.addClass("time-block col-sm-1");
            scheduleRow.append(hourNumber);
        var scheduleHour = $("<h3>");
            scheduleHour.addClass("hour");
            scheduleHour.text(displayHours(workHours[currentIndex]));
            hourNumber.append(scheduleHour);

        var scheduleText = $("<article>");
            scheduleText.addClass("col-sm-10");
            scheduleRow.append(scheduleText);
        var textArea = $("<textarea>");
            textArea.val(checkForText[currentIndex]);
            textArea.addClass(hourClass(workHours[currentIndex]));
            scheduleText.append(textArea);

        var buttonCol = $("<article>");
            buttonCol.addClass("col-sm-1");
            scheduleRow.append(buttonCol);
        var newButton = $("<button>");
            newButton.addClass("saveBtn");
            newButton.attr("value", workHours[currentIndex]);
            buttonCol.append(newButton);
        var buttonClass = $("<i>");
            buttonClass.addClass("far fa-save");
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
        for (var i = 0; i < scheduleInfo.length; i++) {
            if(scheduleInfo[i].time === theObj.scheduleTime) {
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
        var agenda = "";
        for (var h = 0; h < scheduleInfo.length; h++) {
            if (scheduleInfo[h].time == hour) {
                agenda = scheduleInfo[h].text
                break;
            }
        }
        return agenda;
    }

   
    

    $("section").on("click", function(event) {
        console.log("clicked")
        if(event.target.id !== "clear" && event.target.id !== "saveAll" && event.target.matches("button") || event.target.matches("i")) {
            var text = this.children[1].children[0].value;
            var scheduleTime = this.children[2].children[0].value;
            var newObj = {
                time: scheduleTime,
                text: text
            }
            updateList(newObj, text);
            localStorage.setItem("schedule", JSON.stringify(scheduleInfo));
        }
     });

});


 // function renderSchedule() {
    //     scheduleStore = "";
    //     $("textarea").attr.scheduleStore
    //     for (var s = 0; s < scheduleText.length; s++) {
    //         var scheduleStore = scheduleText[s];


    //  }
    // }
// store times in local storage