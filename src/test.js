import {addTrackPoint, writeTcx} from "./tcxWriter.js";

const trackPoint = {
  power: 100,
  cadence: 95,
  speed: 30,
  hr: 130,
  time: new Date().toISOString()
}

addTrackPoint(trackPoint);

console.log(writeTcx());
