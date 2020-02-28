let trackPoints = [];

export function addTrackPoint(trackPoint) {
  const {power, cadence, speed, hr, time} = trackPoint;

  //do any validation here.
  const powerValid = Number.isInteger(power);
  const cadanceValid = Number.isInteger(cadence);
  const speedValid = Number.isInteger(speed);
  const hrValid = Number.isInteger(hr);

  if(powerValid && cadanceValid && speedValid && hrValid) {
    trackPoints.push(trackPoint);
  }
}

export function writeTcx() {

  const trackPointReducer = (accumulator, trackPoint) => {
    const tpString = "\n<Trackpoint><Time>" + trackPoint.time + "</Time><Cadence>" + trackPoint.cadence + "</Cadence><Extensions><ns3:TPX><ns3:Watts>" + trackPoint.power + "</ns3:Watts></ns3:TPX></Extensions></Trackpoint>";
    return accumulator + tpString;
  };
  const trackPointsElement = trackPoints.reduce(trackPointReducer, "");

  const trackElement = '<Track>' +
                          trackPointsElement +
                       '</Track>';
  const lapElement = '<Lap StartTime ="${trackPoints[0].time}">' +
                        '<TotalTimeSeconds>300</TotalTimeSeconds>' +
                        '<DistanceMeters>10</DistanceMeters>' +
                        '<MaximumSpeed>30</MaximumSpeed>' +
                        '<Calories>49</Calories>' +
                        '<AverageHeartRateBpm>' +
                          '<Value>120</Value>' +
                        '</AverageHeartRateBpm>' +
                        '<MaximumHeartRateBpm>' +
                          '<Value>180</Value>' +
                        '</MaximumHeartRateBpm>' +
                        '<Intensity>Active</Intensity>' +
                        '<Cadence>79</Cadence>' +
                        '<TriggerMethod>Time</TriggerMethod>' +
                        trackElement +
                      '</Lap>';
  const ActivitiesElement = '<Activities>' +
                              '<Activity Sport="Biking">' +
                                '<Id>${trackPoints[0].time}</Id>' +
                                lapElement +
                              '</Activity>' +
                            '</Activities>';

  const tcxElement = '<?xml version="1.0" encoding="utf-8"?>' +
                    '<TrainingCenterDatabase xsi:schemaLocation="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 https://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd" xmlns:ns5="http://www.garmin.com/xmlschemas/ActivityGoals/v1" xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2" xmlns:ns2="http://www.garmin.com/xmlschemas/UserProfile/v2" xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns4="http://www.garmin.com/xmlschemas/ProfileExtension/v1" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
                      ActivitiesElement +
                    '</TrainingCenterDatabase>';

  return tcxElement;
}
