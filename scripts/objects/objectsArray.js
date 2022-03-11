MyGame.objects.objectsArray = [];
function getSphere(radius, center){
    return {radius: radius, center: center};
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
                mushie.sphere = getSphere(mushie.size.y / 2, mushie.center); // for collision detection
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
    ship.sphere = getSphere(ship.size.y / 2, ship.center); // for collision detection
    MyGame.objects.objectsArray.push({ type: 'ship', object: ship })
    console.log(MyGame.objects.objectsArray)
}
let toDelete = {};
function theyCollide(sphere1, sphere2){
    let radi1 = sphere1.radius ** 2;
    let radi2 = sphere2.radius ** 2;
    let distance = (sphere1.center.x - sphere2.center.x) ** 2 + (sphere1.center.y - sphere2.center.y) ** 2;
    if(distance <= radi1 + radi2){
        return true;
    }
    return false;
}
MyGame.objects.collisionDetection = function() {
    let colissions = [];
    for(let i = 0; i < this.objectsArray.length; i ++){
        for(let j = 0; j < this.objectsArray.length; j++){
            if(i != j ){
                if(theyCollide(this.objectsArray[i].object.sphere, this.objectsArray[j].object.sphere)){
                    colissions.push({'first': this.objectsArray[i], 'second': this.objectsArray[j]})
                }
            }
        }
    }
    return colissions;
};
MyGame.objects.update = function (elapsedTime) {


    for (let i = 0; i < this.objectsArray.length; i++) {
        if (this.objectsArray[i].type === 'ship') {
            let ship = this.objectsArray[i];
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
    let collisions = this.collisionDetection();
    console.log(collisions)
    for (let i in toDelete) {
        this.objectsArray.splice(i, 1);
    }
    toDelete = {};
}