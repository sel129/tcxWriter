import {addTrackPoint, writeTcx} from "../src/tcxWriter.js";

test('Watts is added to tcx file', () => {
  const trackPoint = {
    power: 100,
    cadence: 95,
    speed: 30,
    hr: 130,
    time: new Date().toISOString()
  }

  addTrackPoint(trackPoint);

  const result = writeTcx();

  console.log(result);

  expect(result.includes('<ns3:Watts>100</ns3:Watts>')).toBeTruthy();
});
