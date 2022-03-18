{
    function getSphere(radius, center) {
        return { radius: radius, center: center };
    }
    function spawnMushroom(spec) {
        let mushie = MyGame.objects.Mushroom(spec);
        mushie.sphere = getSphere((mushie.size.x / 2), mushie.center); // for collision detection
        MyGame.objects.objectsArray.push({ type: 'mushroom', object: mushie })
    }
    //////////
    // ToDo: if the object is at the end, don't set any connections/disconnections
    //////////
    function disconnectSegments(index, objectsArray) {
        if (index < objectsArray.length) {
            if (index > 0) {
                // if (objectsArray[index - 1].type === 'centipedeSegment') {
                //     objectsArray[index - 1].object.setNotConnected();
                //     // objectsArray[index + 1].object.setNotConnected();

                // }
                if (objectsArray[index + 1].type === 'centipedeSegment') {
                    objectsArray[index + 1].object.setNotConnected();
                }
            }


        }
        // if (index > 0) {

        // }
    }
    MyGame.objects.handleDisconnectedSegments = function () {
        let centSegs = {}
        connections = 0;
        centSegs[connections] = {
            mArray: [],
            hasAHead: false,
        };
        for (let i = 0; i < this.objectsArray.length; i++) {
            if (this.objectsArray[i].type === 'centipedeSegment') {
                if (this.objectsArray[i].object.isConnected) {
                    // let mObj = {
                    //     centSeg: objectsArray[i], index: i
                    // }
                    centSegs[connections].mArray.push(i)
                }
                else {
                    connections += 1;
                    centSegs[connections] = {
                        mArray: [],
                        hasAHead: false,
                    };
                    // let mObj = {
                    //     centSeg: objectsArray[i], index: i
                    // }
                    centSegs[connections].mArray.push(i)
                    // centSegs[connections].mArray.push(objectsArray[i]);
                }
                if (this.objectsArray[i].object.isHead) {
                    centSegs[connections].hasAHead = true;
                }
            }
        }
        //////// 
        // Loop through, if there is a disconnected segment without a head, set the first one as a head
        ////////
        console.log(centSegs)
        for (let key in centSegs) {
            if (centSegs[key].mArray && centSegs[key].mArray.length > 0) {
                if (!centSegs[key].hasAHead) {
                    // let segment = this.objectsArray[centSegs[key].mArray[centSegs[key].mArray.length - 1]].object; 
                    let segment = this.objectsArray[centSegs[key].mArray[0]].object;
                    // if(segment.direction.left){
                    //     segment = this.objectsArray[centSegs[key].mArray[0]].object;
                    // }
                    // if(!segment.direction.left){
                    //     segment = this.objectsArray[centSegs[key].mArray[centSegs[key].mArray.length - 1]].object;
                    // }
                    segment.setAsHead();
                }
            }
        }
    }
    MyGame.objects.initialize = function (width, height, numCells) {
        MyGame.objects.objectsArray = [];
        MyGame.objects.board = { width: width, height: height, numCells: numCells };
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
                    spawnMushroom(spec);
                }
            }
        }
        // add ship to bottom middle
        let shipSpec = {
            center: { x: width / 2, y: height - (cellSize * 2) },
            size: { x: cellSize * sizeOffset.x, y: cellSize },
            rotation: 0,
            moveRate: 0.4,
        }
        let ship = MyGame.objects.Ship(shipSpec);
        ship.sphere = getSphere(((Math.sqrt(ship.size.y ** 2 + ship.size.x ** 2)) / 2), ship.center); // for collision detection
        MyGame.objects.objectsArray.push({ type: 'ship', object: ship })
        //////////////
        //// Centipede 
        //////////////

        // add centipede to top right
        let firstCenter = { x: width * 0.7, y: cellSize };
        let segCount = 8;
        for (let i = 0; i < segCount; i++) {
            let segmentSpec = {
                size: { x: cellSize * sizeOffset.x, y: cellSize },
                rotation: 0,
                moveRate: 0.25,
                cellSize: 33,
                index: i,
                segCount: segCount
            }
            segmentSpec.center = { x: firstCenter.x + (i * segmentSpec.size.x), y: firstCenter.y };
            let segment = MyGame.objects.CentipedeSegment(segmentSpec);
            segment.setDirection('left');
            /// - 5 to make the hit box a bit tighter
            segment.sphere = getSphere((segment.size.y / 2), segment.center);
            if (i === 0) {
                segment.setAsHead();
            }
            segment.setIsConnected();
            MyGame.objects.objectsArray.push({ type: 'centipedeSegment', object: segment })
        }
        // console.log(MyGame.objects.objectsArray)
    }
    let toDelete = {};
    MyGame.objects.handleUpdate = function (elapsedTime) {
        this.handleDisconnectedSegments(this.objectsArray);
        for (let i = 0; i < this.objectsArray.length; i++) {
            if (this.objectsArray[i].type === 'ship') {
                let ship = this.objectsArray[i];
                ship.object.setAllDirShouldMove();
                // handle edges of screen for ship movement
                this.collisions.handleEdges(ship);
                if (ship.object.hasShot) {
                    if (ship.object.canShoot(elapsedTime)) {
                        ship.object.setHasShotFalse();
                        // add a beam to the objects array
                        let beamSpec = {
                            center: { x: ship.object.center.x, y: ship.object.center.y - 5 },
                            size: { x: ship.object.size.x, y: ship.object.size.y },
                            rotation: 0,
                            moveRate: 1
                        }
                        let beam = MyGame.objects.Beam(beamSpec); // for collision detection
                        beam.sphere = getSphere(beam.size.x / 2, beam.center);
                        this.objectsArray.push({ type: 'beam', object: beam });
                    }
                }


            }
            if (this.objectsArray[i].type === 'centipedeSegment') {
                let seg = this.objectsArray[i];
                this.collisions.handleEdges(seg);
                // handleCentipedeMovement(seg, atEdge, elapsedTime);
                // if(seg.object.cellDuration )
                seg.object.moveDirection(elapsedTime);
            }
            /////////////
            // deletions
            ////////////
            if (this.objectsArray[i].type === 'beam') {
                let beam = this.objectsArray[i];
                beam.object.moveUp(elapsedTime);
                // if the object went too high
                if (beam.object.center.y < 0 || beam.object.hasCollided) {
                    toDelete[i] = i;
                }
            }
            else if (this.objectsArray[i].type === 'mushroom') {
                if (this.objectsArray[i].object.isDead) {
                    toDelete[i] = i;
                }
            }
            else if (this.objectsArray[i].type === 'centipedeSegment') {
                if (this.objectsArray[i].object.isDead) {
                    let centObject = this.objectsArray[i].object;
                    disconnectSegments(i, this.objectsArray);
                    let spec = { center: centObject.center, size: centObject.size, rotation: 0 }
                    // console.log(this.objectsArray)
                    spawnMushroom(spec);
                    //// change segment into head
                    toDelete[i] = i;
                }
            }
        }
    }

    MyGame.objects.update = function (elapsedTime) {
        this.handleUpdate(elapsedTime)
        this.collisions.handleCollisions(this.collisions.collisionDetection(this.objectsArray));
        /////////
        // Deletions
        /////////
        for (let i in toDelete) {
            this.objectsArray.splice(i, 1);
        }
        toDelete = {};
    }
}