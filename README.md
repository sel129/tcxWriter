# tcxWriter
tcxWrtier is a node module that allows you to write data in the Garmin TrainingCenterDatabase xml format (.tcx) specified by the schema here

https://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd

## Installation

`npm install --save tcxwriter`

## Usage

```
import {addTrackPoint, writeTcx} from "tcxWriter";

const trackPoint = {
    power: 100,
    cadence: 95,
    speed: 30,
    hr: 130,
    time: new Date().toISOString()
}

addTrackPoint(trackPoint);

const result = writeTcx();
```  

`writeTcx()` will return a string in the xml tcx format.
