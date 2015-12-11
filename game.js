/* Version 1.0
 * Tadd Bindas
 * CMPT 120
 * 12/6/2015
 */

//the go button function
function textBox()
{
  var input = document.getElementById('user')
  switch(input.value.toUpperCase())
  {
    case"N":
      move(NORTH);
      break;
    
    case"S":
      move(SOUTH);
      break;

    case"E":
      move(EAST);
      break;

    case"W":
      move(WEST);
      break;

    case"T":
      takeItem();
      break;

    case"H":
      displayHelp();
      break;

    case"B":
      build();
      break;

    case"X":
      examine();
      break;

    case"U":
      win();
      break;

    default:
      error("Please try again, that was invalid");
      break;
  }
}

function scoreUpdate(update)
{

  switch(update)
  {
    case"help":
      player.points -= 1;
      break;

    case"spot":
      player.points += 5;
      break;

    case"examine":
      player.points -= 1;
      break;

    case"item":
      player.points += 3;
      break;

    case"boat":
      player.points += 25;
      break;
  } 

  document.getElementById('points').innerHTML = "Points: " + player.points;
}

function build()
{
  var i;
  for(i = 0; i<locationArray.length; i++)
  {
    if(locationArray[i].item !== false)
    {
      error("You need all the items to build");
      return false;
    }
  }
    error("You used your Items to build a boat");
    document.getElementById('scene').innerHTML = "Go to the beach then type 'U' into the text bar to escape";
    player.inventory = [];
    player.inventory.push(boat);
    inventoryDisplay();
    scoreUpdate("boat");
    
 }

function win()
{
  if((player.currentLocation.place === "beach") && (player.inventory[0].nameOfItem === "Boat"))
  {
    document.getElementById('west').disabled = true;
    document.getElementById('east').disabled = true;
    document.getElementById('south').disabled = true;
    document.getElementById('north').disabled = true;
    document.getElementById('go').disabled = true;
    document.getElementById('helpButton').disabled = true;
    document.getElementById('buildButton').disabled = true;
    document.getElementById('end').innerHTML = "You Win!!!";
    error("You scored: " + player.points + " points" + " \n Play Again!");
    document.getElementById('scene').innerHTML = ("You visited " + player.visited + "/11 spots");
  }

}

function displayHelp()
{
  scoreUpdate("help");
  error(player.currentLocation.help);
}

function examine()
{
  if(player.currentLocation.item !== false)
  {
    error("The item is: " + player.currentLocation.item);
    scoreUpdate("examine");
    return true;
  }
  else
  {
    error("There is no item");
    scoreUpdate("examine");
    return false;
  }
}

function hasAxe()
{
  var i;
  for(i = 0; i<player.inventory.length; i++)
  {
    if (player.inventory[i].nameOfItem === "Axe")
      return true;
  }

  return false;
}

function takeItem()
{
  if(examine() === true)
  {
    if(player.currentLocation.place === "river")
    {
      if(hasAxe())
      {
        error("You took an item");
        scoreUpdate("item");
        player.inventory.push(player.currentLocation.item);
        inventoryDisplay();
        player.currentLocation.item = false;
      }
      else
        error("You need to find the Axe to get the item");
    }
    else
    {
      error("You took an item");
      scoreUpdate("item");
      player.inventory.push(player.currentLocation.item);
      inventoryDisplay();
      player.currentLocation.item = false;
    }
    
  }
  else
  {
    error("There is no item");
  }
}

function changePicture(name)
{
  document.getElementById('map').src = name + "map.png";
}

function changeWaterLevel(timer)
{
  if(timer > 80 && timer <=100)
    document.getElementById('waterLevel').src = "quarter" + "island.png";

  if(timer > 40 && timer <=80)
    document.getElementById('waterLevel').src = "half" + "island.png";

  if(timer >  0 && timer <=40)
    document.getElementById('waterLevel').src = "3quarter" + "island.png";

  if (timer <= 0)
    document.getElementById('waterLevel').src = "flooded" + "island.png";

}

function error(message)
{
  document.getElementById('error').innerHTML = message; 
}

function inventoryDisplay()
{
  document.getElementById('backpack').innerHTML= "Your backpack has: " + "\n" + player.inventory.join(", ");

}

//function to check if visited
function hasVisited(variable)
{
  if(variable.visit === false)
  {
    scoreUpdate("spot");
    player.visited ++;
    return true;
  }

  return true;
}

//function to change text
function change(descrpt)
{
  document.getElementById('scene').innerHTML = descrpt;
}


function changeHistory(message)
{
  if(message === "sp")
    message = "Starting Point";
  if(player.breadcrumbTrail.length<5)
  {
    player.breadcrumbTrail.push(message);
    document.getElementById('locs').innerHTML = "Your Previous Locations: " + "\n" + player.breadcrumbTrail.join(', ');
  }
  else
  {
    player.breadcrumbTrail.shift();
    player.breadcrumbTrail.push(message);
    document.getElementById('locs').innerHTML = "Your Previous Locations: " + "\n" + player.breadcrumbTrail.join(',');
  }
}

function addInventory(message)
{
  items.push(message);
}

function dirToStr(dir)
{
  switch (dir) 
  {
    case NORTH: return "North";
    case SOUTH: return "South";
    case WEST: return "West";
    case EAST: return "East";
  }
}

function from(loc, dir) 
{
  var locIndex; 
  locIndex = locationArray.indexOf(loc);
  return map[locIndex][dir];
}

function move(dir) 
{
  var nextLocation;  
  if(from(player.currentLocation, dir)=== null)
    change("You cannot go here");
  else
  {
    placeVisit(player, from(player.currentLocation, dir));
  }
}


function startTimer(duration, display) 
{
  var timer = duration, minutes, seconds;
  var countdown = setInterval(function () 
  {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    timer--;
    changeWaterLevel(timer);

    if (timer < 0) 
    {
      document.getElementById('west').disabled = true;
      document.getElementById('east').disabled = true;
      document.getElementById('south').disabled = true;
      document.getElementById('north').disabled = true;
      document.getElementById('go').disabled = true;
      document.getElementById('helpButton').disabled = true;
      document.getElementById('buildButton').disabled = true;
      document.getElementById('end').innerHTML = "GAME OVER";
      document.getElementById('scene').innerHTML ="You visited " + player.visited + "/11 places";
      error("Refresh the page to play again!");
      clearInterval(countdown);
    }
  }, 1000);
}

window.onload = function () 
{
    var twoMinutes = 60 * 2,
    display = document.querySelector('#time');
    startTimer(twoMinutes, display);
};