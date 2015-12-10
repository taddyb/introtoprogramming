/* Version 1.0
 * Tadd Bindas
 * CMPT 120
 * 12/6/2015
 */


function placeVisit(person, loc)
{
  person.currentLocation = loc;
  loc.visit = hasVisited(loc);
  change(loc.message);
  changeHistory(loc.place);
  changePicture(loc.place);
  var locIndex = locationArray.indexOf(loc);
  var i;
  for(i = 0; i<map[locIndex].length; i++)
  {
    if (from(loc, i) === null)
    {
      switch(i)
      {
        case 0: 
        document.getElementById('north').disabled = true;

        case 1:
        document.getElementById('south').disabled = true;

        case 2:
        document.getElementById('west').disabled = true;

        case 3:
        document.getElementById('east').disabled = true;

      }
    }
    else
    {
      switch(i)
      {
        case 0: 
        document.getElementById('north').disabled = false;

        case 1:
        document.getElementById('south').disabled = false;

        case 2:
        document.getElementById('west').disabled = false;

        case 3:
        document.getElementById('east').disabled = false;

      }
    }

  }
  if(loc.place === "sp")
    error("You are at: Starting Point");
  else
    error("You are at: " + loc.place);
  
}
