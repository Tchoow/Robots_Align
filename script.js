// Variables
let robots = document.querySelectorAll(".robot");

// init
function initPositionRobots() {
    for (let r of robots) {
        let top  = Math.floor(Math.random() * window.innerHeight - 50) + 25;
        let left = Math.floor(Math.random() * window.innerWidth - 50)  + 25;
        r.style.left = left + "px"
        r.style.top  = top  + "px"
    }
}

// get robot position
function getRobotPosition(robot) {
    let coords = []
    coords[0]  = (robot.style.left).substring(0, robot.style.left.length - 2);
    coords[1]  = (robot.style.top).substring(0, robot.style.top.length - 2);
    return coords;
}

// sleep delay
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

//function delete current robot from array
function deleteRobotFromListOfRobot(robot, lstRobot) {
    for (let rob of lstRobot) {
        if (rob == robot) {
            lstRobot.splice(lstRobot, lstRobot.indexOf(rob));
        }
    }
    return lstRobot;
}

function getPositionToGo(robot) {
    // tmp variables
    let tempListRobots = [];
    let twoClosest     = [];
    let goalX          = getRobotPosition(robot)[0];
    let goalY          = getRobotPosition(robot)[1];

    // get all robots in temp array
    for (let r of robots) { tempListRobots.push(getRobotPosition(r)[0]) }

    // console.log(getRobotPosition(r)[0])

    // get the near X
    for (let cpt = 0; cpt < tempListRobots.length - 1; cpt++) {
        tempListRobots[cpt] = parseInt(Math.abs(goalX - tempListRobots[cpt]));
    }

    tempListRobots.sort();
    console.log(tempListRobots);
}

// init
initPositionRobots();
console.log(getRobotPosition(robots[0]));
getPositionToGo(robots[0]);
deleteRobotFromListOfRobot(robots[0], robots);
