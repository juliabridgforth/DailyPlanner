$(document).ready(function () {


    //Adding the current day to the top of the page
    var currentDayEl = $("#currentDay");
    var today = moment().format('LL');
    currentDayEl.append(today);


    //Create a currentTime variable
    //Create a currentHour variable to check against the time-block hour

    var currentTime = moment().format('LT');
    console.log(currentTime);

    var currentHour = moment().format('HH');
    console.log("Current Hour:" + moment().format('HH'));
    console.log(currentHour);

    //Create an array of the hours
    //Create an array of times

    timeBlockHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    timeBlockTimes = ["9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM"];

    //Code a for loop that will render the timeblocks onto the page

    

    //this is the function the will render the local storage to the page
    var storedPlans = [];

    init ();

    function renderStoredPlans() {

        eventLog = storedPlans;

    }

    function init() {
        var plansFromStorage = JSON.parse(localStorage.getItem("storedPlans"));

        for (i = 0; i < timeBlockHours.length; i++) {
            var index = i;
    
            var timeBlock = $("<div>");
            timeBlock.attr("id", "hour-" + timeBlockHours[i]);
            timeBlock.attr("class", "row time-block");
            timeBlock.attr("data-number", timeBlockHours[i]);
            $(".container").append(timeBlock);
    
            var hourBlock = $("<div>");
            hourBlock.attr("class", "col-md-1 hour");
            hourBlock.text(timeBlockTimes[i]);
            timeBlock.append(hourBlock);
    
            var textArea = $("<textarea>");
            textArea.attr("class", "col-md-10 description");
            textArea.attr("id", "input-" + index);
            //console.log("console!!" + plansFromStorage[timeBlockTimes[i]]);
            textArea.text(plansFromStorage[timeBlockTimes[i]]);
            timeBlock.append(textArea);
    
            var saveButton = $("<button>");
            saveButton.attr("class", "btn saveBtn col-md-1");
            saveButton.attr('id', `saveid-${index}`);
            saveButton.attr("data-id", index);
            saveButton.attr("data-time", timeBlockTimes[i]);
            timeBlock.append(saveButton);

            if (plansFromStorage[timeBlockTimes[i]]) {
                var saveIcon = $("<icon>");
                saveIcon.attr("class", "fa fa-lock");
                saveButton.append(saveIcon);
                
            } 
            else {
                var saveIcon = $("<icon>");
                saveIcon.attr("class", "fa fa-unlock");                
                saveButton.append(saveIcon);
            }
        }
    
        //Create code that will check current time against timeBlockHour//convert 
        for (i = 0; i < timeBlockHours.length; i++) {
    
            var specificBlock = $("#hour-" + timeBlockHours[i]);
            var hourData = parseInt(specificBlock.attr("data-number"));
            console.log($("#hour-" + timeBlockHours[i]).attr("data-number"));
    
            console.log($("#hour-" + timeBlockHours[0]))
    
            //if currentTime<timeBlockHour: future;
            //if currentTime=timeBlockHour: presenet;
            //if currentTime>timeBlockHour: past;
    
            if (hourData < currentHour) {
                specificBlock.css("background-color", "#B4BBBB");
            }
            else if (hourData > currentHour) {
                specificBlock.css("background-color", "#AEEF95");
            }
            else if (hourData = currentHour) {
                specificBlock.css("background-color", "#FF8370");
    
            };
        }


    }

    //Create on "click" event that will change lock icon and save text to local storage


    $(".saveBtn").on("click", function() {
        var buttonState = $(this).children().attr("class");
        var index= $(this).attr('data-id');
        var inputId = '#input-'+ index;
        var eventLog = $(inputId).val();
        var dataTime=$(this).attr('data-time');
        var objLog = {};
        objLog[dataTime]=eventLog;
        // Save
        if(buttonState==="fa fa-unlock") {
            $(this).children().attr("class", "fa fa-lock");
            var tempStorage = JSON.parse(localStorage.getItem("storedPlans"));
            if(!tempStorage&&eventLog){
                localStorage.setItem("storedPlans", JSON.stringify(objLog));
            }
            else if(tempStorage&&eventLog){
                tempStorage[dataTime]=eventLog;
                localStorage.setItem("storedPlans", JSON.stringify(tempStorage));
            }
        }
        // Unsave
        else {
            $(this).children().attr("class", "fa fa-unlock");
            var tempStorage = JSON.parse(localStorage.getItem("storedPlans"));
            delete tempStorage[dataTime];
            localStorage.setItem("storedPlans", JSON.stringify(tempStorage));
        }
    });

    renderStoredPlans();

})
