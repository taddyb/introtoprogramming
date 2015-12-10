/* Version 1.0
 * Tadd Bindas
 * CMPT 120
 * 12/6/2015
 */
 


//Item Prototype
function Item(nameOfItem, descript)
{
  this.nameOfItem = nameOfItem;
  this.descript = descript;
}

//Item toString
Item.prototype.toString = function()
{
  return (this.nameOfItem);
}

//Item Instances
var axe = new Item("Axe", "A tool to help you make things for the raft");
var wood = new Item("Wood", "Building Materials");
var nail = new Item("Nail", "You can build with these");
var sheet = new Item("Sheet", "It looks like it could be made into a sail");
var boat = new Item("Boat", "Your ride home");

//Location prototype
function Location(hasVisit, message, item, name, help)
{
  this.visit = hasVisit;
  this.message = message;
  this.item = item;
  this.place = name;
  this.help = help;

}

//Location toString
Location.prototype.toString = function()
{
  return this.message;
}

//Location Objects
var green = new Location(false, "Nothing here, keep looking.", false, "green", "Possible Text Commands: N, S, T (Take Item), X (Examine for Item), B (Build)");
var sp = new Location(true, "You are where you began", false, "sp", "Possible Text Commands: N, E, S, W, T (Take Item), X (Examine for Item), B (Build)");
var cliff = new Location(false, "Watchout there is a cliff. ", false, "cliff", "Possible Text Commands: E, S, W, T (Take Item), X (Examine for Item), B (Build)");
var river = new Location(false, "There is a small river, it is passable. " + 
  "There are trees around.", wood, "river", "Possible Text Commands: N, E, W, T (Take Item), X (Examine for Item), B (Build)");
var path = new Location(false, "Someone has been here before. "
  +"This used to be a path.", false, "path", "Possible Text Commands: N, T (Take Item), X (Examine for Item), B (Build)");
var mine = new Location(false, "There is a mine here. "
  +"There are tools lying around.", axe, "mine", "Possible Text Commands: S, T (Take Item), X (Examine for Item), B (Build)");
var pit = new Location(false, "You fall down into a pit "
  +"There was a sign of a struggle here.", false, "pit", "Possible Text Commands: N, S, T (Take Item), X (Examine for Item), B (Build)");
var castle = new Location(false, "You keep walking and there is an ancient"
  +" castle. The door to the gate is chained up tight.", false, "castle", "Possible Text Commands: W, T (Take Item), X (Examine for Item), B (Build)");
var house = new Location(false, "You walked to an abandoned house. "
  +"There is a mess of items outside.", sheet, "house", "Possible Text Commands: N, T (Take Item), X (Examine for Item), B (Build)");
var cave = new Location(false, "You enter a cave. It is really dark and you cannot see anything. ", false, "cave", "Possible Text Commands: " 
  +"S, T (Take Item), X (Examine for Item), B (Build)");
var beach = new Location(false, "You walked down the cliff to the beach. "
  +"There is a green light off in the distance. ", nail, "beach" ,"Possible Text Commands: E, T (Take Item), X (Examine for Item), B (Build)");

var locationArray = [green, sp, cliff, river, path, mine, pit, castle, house, cave, beach];

 //Player Object
var player =
{
  currentLocation: locationArray[1],
  points:0, 
  inventory : [],
  breadcrumbTrail : ["Starting Point"],
  visited: 1
};

const NORTH = 0;
const SOUTH = 1;
const WEST = 2;
const EAST = 3;

var map =
[ [locationArray[9], locationArray[1], null, null]
, [locationArray[0], locationArray[4], locationArray[2], locationArray[3]]
, [null, locationArray[6], locationArray[10], locationArray[1]]
, [locationArray[5], null, locationArray[1], locationArray[7]]
, [locationArray[1], null, null, null]
, [null, locationArray[3], null, null]
, [locationArray[2], locationArray[8], null, null]
, [null, null, locationArray[3], null]
, [locationArray[6], null, null, null]
, [null, locationArray[0], null, null]
, [null, null, null, locationArray[2]]
];