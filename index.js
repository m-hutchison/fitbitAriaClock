#       This is just a basic clock applet for the FitBit Versa
#       I'm still learning how this all works, so please be nice
#                 V1.0 developed by Mathew Hutchison
#                             13/06/2019

import clock from "clock";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { display } from "display";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";

// Step Counter
let fitbitSteps = document.getElementById("fitbitSteps");
fitbitSteps.text = today.adjusted.steps || 0;


// Clock Applet Below
clock.granularity = "minutes";

const fitbitTime = document.getElementById("fitbitTime");
const fitbitDate = document.getElementById("fitbitDate");

clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  fitbitTime.text = `${hours}:${mins}`;
  fitbitDate.text = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
}

// Heart rate code below
const hrmData = document.getElementById("hrm-data");

const sensors = [];

if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    hrmData.text = JSON.stringify(
      hrm.heartRate
    );
  });
  sensors.push(hrm);
  hrm.start();
} else {
  hrmData.style.display = "none";
  hrmData.text.display = "#YouDead";
}

display.addEventListener("change", () => {
  // Automatically stop all sensors when the screen is off to conserve battery
  display.on ? sensors.map(sensor => sensor.start()) : sensors.map(sensor => sensor.stop());
});
