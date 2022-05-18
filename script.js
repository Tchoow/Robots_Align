// Variables
let robots = document.querySelectorAll(".robot");

// init
function initPositionRobots() {
    for (let r of robots) {
        let top = Math.floor(Math.random() * window.innerHeight - 50) + 25;
        let left = Math.floor(Math.random() * window.innerWidth - 50) + 25;
        r.style.left = left + "px"
        r.style.top = top + "px"
    }
}

// get robot position
function getRobotPosition(robot) {
    let coords = []
    coords[0] = (robot.style.left).substring(0, robot.style.left.length - 2);
    coords[1] = (robot.style.top).substring(0, robot.style.top.length - 2);
    return coords;
}

// sleep delay
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

//function delete current robot from array
function deleteRobotFromListOfRobot(robot, lstRobot) {

    // cast to arrray to get fonctions
    let tempLstRobot = Array.from(lstRobot);
    let index = tempLstRobot.indexOf(robot);
    tempLstRobot.splice(index, 1);
    return tempLstRobot;
}

function compareCoord(a, b) {
    if (a[1] < b[1]) { return -1; }
    if (a[1] > b[1]) { return 1; }
    return 0;
}


function ultimeCompareCoord(a, b) {
    
}

function getCoordFromStyle(robot) {
    let coordX = parseInt((robot.style.left).substring(0, robot.style.left.length-2));
    let coordY = parseInt((robot.style.top ).substring(0, robot.style.top .length-2));
    return new Array(coordX, coordY);
}


function getPositionToGo(robot) {

    // tmp variables
    let tempListRobots = [];
    let tempXmoreNear  = [];
    let tempYmoreNear  = [];
    let goalX = getRobotPosition(robot)[0];
    let goalY = getRobotPosition(robot)[1];


    // get all robots in temp array
    for (let r of robots) { tempListRobots.push(r) }
    // remove current robot from this Array
    tempListRobots = Array.from(deleteRobotFromListOfRobot(robot, tempListRobots));


    // fill array with x coord
    for (let cpt = 0; cpt < tempListRobots.length; cpt++) {
        tempXmoreNear[cpt] = new Array(cpt,
            parseInt((tempListRobots[cpt].style.left)
                .substring(0, (tempListRobots[cpt].style.left).length - 2)));
    }

    let newTempX = [];
    for (let cpt = 0; cpt < tempListRobots.length; cpt++) {
        newTempX[cpt] = new Array(cpt, Math.abs(parseInt(goalX - tempXmoreNear[cpt][1])));
    }


    newTempX.sort(compareCoord);


    // fill array with y coord
    for (let cpt = 0; cpt < tempListRobots.length; cpt++) {
        tempYmoreNear[cpt] = new Array(cpt,
            parseInt((tempListRobots[cpt].style.top)
                .substring(0, (tempListRobots[cpt].style.top).length - 2)));
    }

    let newTempY = [];
    for (let cpt = 0; cpt < tempListRobots.length; cpt++) {
        newTempY[cpt] = new Array(cpt, Math.abs(parseInt(goalY - tempYmoreNear[cpt][1])));
    }

    newTempY.sort(compareCoord);

    let newTempXY = [];
    for (let cpt = 0; cpt < tempListRobots.length; cpt++) {
        newTempXY[cpt] = new Array(cpt, newTempX[0], newTempY[0]);
    }

    //newTempXY.sort(ultimeCompareCoord);

    console.log(newTempXY);
    
    robot.style.height = "50px";
    robot.style.width  = "50px";
    robot.style.border = "5px solid yellow";


    tempListRobots[newTempX[0][0]].style.height = "50px";
    tempListRobots[newTempX[0][0]].style.width  = "50px";

    tempListRobots[newTempX[1][0]].style.height = "50px";
    tempListRobots[newTempX[1][0]].style.width  = "50px";


    let targetX = (getCoordFromStyle(tempListRobots[newTempX[0][0]])[0]
                 + getCoordFromStyle(tempListRobots[newTempX[1][0]])[0] ) / 2;

    let targetY = null;

    return new Array (targetX, targetY);
}

// init
initPositionRobots();
getPositionToGo(robots[0]);
