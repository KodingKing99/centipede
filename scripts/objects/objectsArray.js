MyGame.objects.objectsArray = [];
function getSphere(radius, center) {
    return { radius: radius, center: center };
}
MyGame.objects.initialize = function (width, height, numCells) {
    let cellSize = Math.floor(width / numCells);
    console.log(`cell size is ${cellSize}`)
    let sizeOffset = { x: 0.7, y: 1 }
    // i and j are those values because I want to render mushrooms at around
    // 1 - 32 on x and 1 - 24 on y (going from top left corner)
    for (let i = cellSize; i < width - cellSize; i += cellSize) {
        for (let j = cellSize; j < height - cellSize; j += cellSize) {
            let addMush = Math.random() < 0.05;
            if (addMush) {
                let spec = {
                    center: { x: i, y: j },
                    size: { x: cellSize * sizeOffset.x, y: cellSize },
                    rotation: 0
                }
                let mushie = MyGame.objects.Mushroom(spec);
                mushie.sphere = getSphere(((Math.sqrt(mushie.size.y ** 2 + mushie.size.x ** 2)) / 2), mushie.center); // for collision detection
                MyGame.objects.objectsArray.push({ type: 'mushroom', object: mushie })
            }
        }
    }
    // add ship to bottom middle
    let shipSpec = {
        center: { x: width / 2, y: height - (cellSize * 2) },
        size: { x: cellSize * sizeOffset.x, y: cellSize },
        rotation: 0,
        moveRate: 0.5,
    }
    let ship = MyGame.objects.Ship(shipSpec);
    ship.sphere = getSphere(((Math.sqrt(ship.size.y ** 2 + ship.size.x ** 2)) / 2), ship.center); // for collision detection
    MyGame.objects.objectsArray.push({ type: 'ship', object: ship })
    console.log(MyGame.objects.objectsArray)
}
let toDelete = {};
function getDistance(center1, center2) {
    return (center1.x - center2.x) ** 2 + (center1.y - center2.y) ** 2;
}
function theyCollide(sphere1, sphere2) {
    let radi1 = sphere1.radius ** 2;
    let radi2 = sphere2.radius ** 2;
    let distance = getDistance(sphere1.center, sphere2.center);
    if (distance <= radi1 + radi2) {
        return true;
    }
    return false;
}
MyGame.objects.collisionDetection = function () {
    let colissions = [];
    for (let i = 0; i < this.objectsArray.length; i++) {
        for (let j = 0; j < this.objectsArray.length; j++) {
            if (i != j) {
                if (theyCollide(this.objectsArray[i].object.sphere, this.objectsArray[j].object.sphere)) {
                    colissions.push({ 'first': this.objectsArray[i], 'second': this.objectsArray[j] })
                }
            }
        }
    }
    return colissions;
};
MyGame.objects.handleUpdate = function (elapsedTime) {
    for (let i = 0; i < this.objectsArray.length; i++) {
        if (this.objectsArray[i].type === 'ship') {
            let ship = this.objectsArray[i];
            ship.object.setAllDirShouldMove();
            if (ship.object.hasShot) {
                // if (ship.object.canShoot(elapsedTime)) {
                ship.object.setHasShotFalse();
                // add a beam to the objects array
                let beamSpec = {
                    center: { x: ship.object.center.x, y: ship.object.center.y - 5 },
                    size: { x: ship.object.size.x, y: ship.object.size.y },
                    rotation: 0,
                    moveRate: 1
                }
                let beam = MyGame.objects.Beam(beamSpec); // for collision detection
                beam.sphere = getSphere(beam.size.y / 2, beam.center);
                this.objectsArray.push({ type: 'beam', object: beam });
            }
        }
        if (this.objectsArray[i].type === 'beam') {
            this.objectsArray[i].object.moveUp(elapsedTime);
            // if the object went too high
            if (this.objectsArray[i].object.center.y < 0) {
                toDelete[i] = i;
            }
        }
    }
}
let handleShipCollisions = function (ship, secondCenter) {
    // console.log(ship.direction)
    // if(ship.direction.up){
    //     ship.setShouldMove('up', false);
    // }
    // else{
    //     ship.setShouldMove('up', true)
    // 
    let predMoves = ship.predMoves();
    // if the predicted move moves you closer to the object, you can't move that way
    // console.log(predMoves)
    // console.log(secondCenter)
    let currentDistance = getDistance(ship.center, secondCenter)
    if (getDistance(predMoves.moveDown, secondCenter) < currentDistance) {
        ship.setShouldMove('down', false)
    }
    else {
        ship.setShouldMove('down', true)
    }
    if (getDistance(predMoves.moveUp, secondCenter) < currentDistance) {
        ship.setShouldMove('up', false)
    }
    else {
        ship.setShouldMove('up', true)
    }
    if (getDistance(predMoves.moveLeft, secondCenter) < currentDistance) {
        ship.setShouldMove('left', false)
    }
    else {
        ship.setShouldMove('left', true)
    }
    if (getDistance(predMoves.moveRight, secondCenter) < currentDistance) {
        ship.setShouldMove('right', false)
    }
    else {
        ship.setShouldMove('right', true)
    }
}
MyGame.objects.handleCollisions = function (collisions) {
    // console.log(collisions);
    for (let i = 0; i < collisions.length; i++) {
        let obj = collisions[i];
        // console.log(obj);
        if (obj.first.type === 'ship') {
            if (obj.second.type === 'mushroom') {
                let ship = obj.first.object;
                let second = obj.second;
                handleShipCollisions(ship, second.object.center)
            }


        }
        else if (obj.second.type === 'ship') {
            if (obj.first.type === 'mushroom') {
                let ship = obj.second.object;
                let second = obj.first;
                handleShipCollisions(ship, second.object.center)
            }

        }
    }
}
MyGame.objects.update = function (elapsedTime) {
    this.handleUpdate(elapsedTime)
    this.handleCollisions(this.collisionDetection());
    // console.log(collisions)
    for (let i in toDelete) {
        this.objectsArray.splice(i, 1);
    }
    toDelete = {};
}