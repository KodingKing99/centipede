
MyGame.objects.collisions = (function(objects){
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
    function atEdges(obj) {
        let edges = {
            left: false,
            right: false,
            up: false,
            down: false
        }
        if (obj.center.x - (obj.size.x / 2) < 0) {
            edges.left = true;
        }
        if (obj.center.x + (obj.size.x / 2) > MyGame.objects.board.width) {
            edges.right = true;
        }
        if (obj.center.y - (obj.size.y / 2) < 0) {
            edges.up = true;
        }
        if (obj.center.y + (obj.size.y / 2) > MyGame.objects.board.height) {
            edges.down = true;
        }
        return edges;
    }
    function handleEdges(obj) {
        let atEdge = atEdges(obj.object);
        if (obj.type === 'ship') {
            if (atEdge.left) {
                obj.object.setShouldMove('left', false);
            }
            if (atEdge.right) {
                obj.object.setShouldMove('right', false);
            }
            if (atEdge.up) {
                obj.object.setShouldMove('up', false);
            }
            if (atEdge.down) {
                obj.object.setShouldMove('down', false);
            }
            return atEdge;
        }
        else if (obj.type === 'centipedeSegment') {
            if (atEdge.left) {
                obj.object.setPrevDirection('left')
                obj.object.setDirection('down');
            }
            if (atEdge.right) {
                obj.object.setPrevDirection('right')
                obj.object.setDirection('down');
            }
            if (atEdge.up) {
                obj.object.setDirection('down');
            }
            if (atEdge.down) {
                obj.object.setDirection('up');
            }
            return atEdge;
        }
    }
    function collisionDetection(objectsArray){
        let colissions = [];
        for (let i = 0; i < objectsArray.length; i++) {
            for (let j = 0; j < objectsArray.length; j++) {
                if (i != j) {
                    if (objectsArray[i].object.sphere && objectsArray[j].object.sphere) {
                        if (theyCollide(objectsArray[i].object.sphere, objectsArray[j].object.sphere)) {
                            colissions.push({ 'first': objectsArray[i], 'second': objectsArray[j] })
                        }
                    }
                }
            }
        }
        return colissions;
    };
    let handleShipCollisions = function (ship, secondCenter) {
        //////////////
        // These are for mushroom collisions
        //////////////
        let predMoves = ship.predMoves();
        // if the predicted move moves you closer to the object, you can't move that way
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
    function handleCollisions(collisions) {
        for (let i = 0; i < collisions.length; i++) {
            let obj = collisions[i];
            /////////////
            // ship collisions
            /////////////
            if (obj.first.type === 'ship') {
                if (obj.second.type !== 'beam') { // ship can't collide with it's beam
                    let ship = obj.first.object;
                    let second = obj.second;
                    handleShipCollisions(ship, second.object.center)
                }
            }

            else if (obj.second.type === 'ship') {
                if (obj.first.type != 'beam') {
                    let ship = obj.second.object;
                    let second = obj.first;
                    handleShipCollisions(ship, second.object.center)
                }

            }
            /////////////
            // beam collisions
            /////////////
            if (obj.first.type === 'beam') {
                if (obj.second.type === 'mushroom') {
                    obj.second.object.subLife();
                    obj.first.object.setHasCollided();
                    // console.log(obj.second.object.getRenderIndex())
                }
            }
            else if (obj.second.type === 'beam') {
                if (obj.first.type === 'mushroom') {
                    obj.first.object.subLife();
                    obj.second.object.setHasCollided();
                    // console.log(obj.first.object.getRenderIndex())
                }
            }
            /////////////
            // Centipede detection
            // /////////////
            if (obj.first.type === 'centipedeSegment') {
                if (obj.second.type === 'mushroom') {
                    if (obj.first.object.direction.left) {
                        // console.log()
                        obj.first.object.setPrevDirection('left')
                        obj.first.object.setDirection('down');
                    }
                    else if (obj.first.object.direction.right) {
                        obj.first.object.setPrevDirection('right')
                        obj.first.object.setDirection('down');
                    }
                    // console.log(obj.second.object.getRenderIndex())
                }
            }
            else if (obj.second.type === 'centipedeSegment') {
                if (obj.first.type === 'mushroom') {
                    if (obj.second.object.direction.left) {
                        obj.second.object.setPrevDirection('left')
                        obj.second.object.setDirection('down');

                    }
                    else if (obj.second.object.direction.right) {
                        obj.second.object.setPrevDirection('right')
                        obj.second.object.setDirection('down');
                    }

                }
            }
        }
    }
    return{
        handleCollisions: handleCollisions,
        collisionDetection: collisionDetection,
        handleEdges: handleEdges
    }
}());