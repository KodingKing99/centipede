{
    'use strict';
    MyGame.objects.reInitializeFlag = false;
    let spiderSpec;
    function getSphere(radius, center) {
        return { radius: radius, center: center };
    }
    function spawnMushroom(spec) {
        let mushie = MyGame.objects.Mushroom(spec);
        mushie.sphere = getSphere((mushie.size.x / 2), mushie.center); // for collision detection
        MyGame.objects.objectsArray.push({ type: 'mushroom', object: mushie })
    }
    function spawnSpider(spec) {
        let spider = MyGame.objects.Spider(spec);
        spider.sphere = getSphere((spider.size.x / 2), spider.center); // for collision detection
        MyGame.objects.objectsArray.push({ type: 'spider', object: spider })
    }
    function spawnFlea(spec) {
        let flea = MyGame.objects.Flea(spec);
        flea.sphere = getSphere((flea.size.x / 2), flea.center); // for collision detection
        MyGame.objects.objectsArray.push({ type: 'flea', object: flea })
    }
    function spawnScorpion(spec) {
        let scorpion = MyGame.objects.Scorpion(spec);
        scorpion.sphere = getSphere((scorpion.size.x / 2), scorpion.center); // for collision detection
        MyGame.objects.objectsArray.push({ type: 'scorpion', object: scorpion })
    }
    function spawnExplosion(spec) {
        let explosion = MyGame.objects.Explosion(spec);
        // mushie.sphere = getSphere((mushie.size.x / 2), mushie.center); // for collision detection
        MyGame.objects.objectsArray.push({ type: 'explosion', object: explosion })
        MyGame.audio.playSound('explosion');
        // console.log('spawning explosion')
    }
    function spawnShipLife(spec) {
        let shipLife = MyGame.objects.shipLife(spec);
        // mushie.sphere = getSphere((mushie.size.x / 2), mushie.center); // for collision detection
        MyGame.objects.objectsArray.push({ type: 'shipLife', object: shipLife })
    }
    //////////
    // Generates ship lives to be rendered in the top left corner
    // numLives: int, number of ships to render
    //////////
    MyGame.objects.initializeShipLives = function (spec, numLives) {
        // change from 15 to not hard coded number

        let firstCenter = { x: MyGame.objects.board.width * 0.65, y: spec.size.y / 1.5 }
        for (let i = 0; i < numLives; i++) {
            let mSpec = {}
            // console.log(firstCenter.x + (i * spec.size.x))
            mSpec.size = spec.size;
            mSpec.center = { x: firstCenter.x + (i * spec.size.x), y: firstCenter.y },
                mSpec.rotation = 0;
            spawnShipLife(mSpec);
        }
        // console.log(this.objectsArray);
    }
    //////////
    // Score
    //////////
    let score = 0;
    MyGame.objects.addToScore = function (howMuch) {
        score += howMuch;
    }
    MyGame.objects.resetScore = function () {
        score = 0;
    }
    // ToDo: if the object is at the end, don't set any connections/disconnections
    //////////
    function disconnectSegments(index, objectsArray) {
        if (index < objectsArray.length) {
            if (index > 0) {
                // if (objectsArray[index - 1].type === 'centipedeSegment') {
                //     objectsArray[index - 1].object.setNotConnected();
                //     // objectsArray[index + 1].object.setNotConnected();

                // }
                if (objectsArray[index + 1] && objectsArray[index + 1].type === 'centipedeSegment') {
                    objectsArray[index + 1].object.setNotConnected();
                }
            }


        }
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
        // console.log(centSegs)
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
    let fleaCount = 0;
    let scorpionCount = 0;
    MyGame.objects.initialize = function (width, height, numCells) {
        MyGame.objects.objectsArray = [];
        let cellSize = Math.floor(width / numCells);
        // console.log(`cell size is ${cellSize}`)
        let sizeOffset = { x: 0.7, y: 1 }
        MyGame.objects.board = { width: width, height: height, numCells: numCells,
                                 cellSize: cellSize, sizeOffset: sizeOffset };
        // i and j are those values because I want to render mushrooms at around
        // 1 - 32 on x and 1 - 24 on y (going from top left corner)
        for (let i = cellSize; i < width - cellSize; i += cellSize) {
            for (let j = cellSize * 3; j < height - (cellSize * 7); j += cellSize) {
                let addMush = Math.random() < 0.06;
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
        let firstCenter = { x: width * 0.5, y: cellSize * 2 };
        let segCount = 10;
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
            // segment.setPrevDirection('right');
            // segment.setDirection('down')
            MyGame.objects.objectsArray.push({ type: 'centipedeSegment', object: segment })
        }
        /////////////
        // spider
        /////////////
        spiderSpec = {
            center: { x: (0 + 4 * cellSize), y: (height - (4 * cellSize)) },
            size: { x: ((2.5 * cellSize) * sizeOffset.x), y: (1.25 * cellSize) },
            rotation: 0,
            moveRate: 0.2,
        }
        spawnSpider(spiderSpec);
        MyGame.objects.scoreText = {
            text: String(score),
            font: '24pt Impact',
            fillStyle: 'rgba(255, 255, 255, 1)',
            strokeStyle: 'rgba(160, 32, 240, 1)',
            position: { x: width * 0.5, y: cellSize / 4 },
            rotation: 0,
        }
        fleaCount = 0;
        scorpionCount = 0;
        // console.log(MyGame.objects.objectsArray)
    }
    let toDelete = {};
    let segCount = 0;
    let spiderCount = 0;
    // tells the game to move to a new level if there are no more centipede segments
    MyGame.objects.outOfSegments = false;
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
                        MyGame.audio.playSound('ship_laser');
                    }
                }


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
            else if (this.objectsArray[i].type === 'flea') {
                let flea = this.objectsArray[i];
                flea.object.moveDown(elapsedTime);
                if(flea.object.shouldSpawnMushroom()){
                    let spec = {center: {...flea.object.center}, 
                                size: {
                                        x: this.board.cellSize * this.board.sizeOffset.x, 
                                        y: this.board.cellSize * this.board.sizeOffset.y
                                    },
                                rotation: 0,
                                }
                    spawnMushroom(spec);
                }
                // if the flea was shot
                if (flea.object.isDead){
                    toDelete[i] = i;
                    this.addToScore(200);
                    fleaCount--;
                    let spec = { center: { ...flea.object.center }, size: { ...flea.object.size }, rotation: 0 };
                    spawnExplosion(spec);
                    MyGame.audio.playSound('bonus');
                }
                // if the object went too low
                if (flea.object.center.y > this.board.height) {
                    toDelete[i] = i;
                    fleaCount--;
                }
            }
            else if (this.objectsArray[i].type === 'scorpion') {
                let scorpion = this.objectsArray[i];
                scorpion.object.moveRight(elapsedTime);
                // // if the flea was shot
                if (scorpion.object.isDead){
                    toDelete[i] = i;
                    this.addToScore(1000);
                    scorpionCount--;
                    let spec = { center: { ...scorpion.object.center }, size: { ...scorpion.object.size }, rotation: 0 };
                    spawnExplosion(spec);
                    MyGame.audio.playSound('bonus');
                }
                // if the object went too low
                if (scorpion.object.center.x > this.board.width) {
                    toDelete[i] = i;
                    scorpionCount--;
                }
            }
            else if (this.objectsArray[i].type === 'mushroom' || this.objectsArray[i].type === 'poisonMushroom') {
                if (this.objectsArray[i].object.isDead) {
                    this.addToScore(4);
                    toDelete[i] = i;
                }
            }
            else if (this.objectsArray[i].type === 'centipedeSegment') {
                segCount++;
                let seg = this.objectsArray[i];
                this.collisions.handleEdges(seg);
                seg.object.moveDirection(elapsedTime);
                if (this.objectsArray[i].object.isDead) {
                    let centObject = this.objectsArray[i].object;
                    toDelete[i] = i;
                    disconnectSegments(i, this.objectsArray);
                    let spec = { center: { ...centObject.center }, size: { ...centObject.size }, rotation: 0 }
                    spawnMushroom(spec);
                    spawnExplosion(spec);
                    //// change segment into head
                    ////// increment score
                    if (centObject.isHead) {
                        this.addToScore(100);
                    }
                    else {
                        this.addToScore(10);
                    }
                }
            }
            else if (this.objectsArray[i].type === 'explosion') {
                this.objectsArray[i].object.update(elapsedTime);
                if (this.objectsArray[i].object.isDead) {
                    toDelete[i] = i;
                }
            }
            else if (this.objectsArray[i].type === 'spider') {
                spiderCount++;
                let spider = this.objectsArray[i].object;
                this.collisions.handleEdges(this.objectsArray[i]);
                spider.moveDirection(elapsedTime);
                ///////////
                // random movement
                ///////////
                if (Math.random() < 0.02) {
                    spider.setVertDirection('up');
                }
                if (Math.random() < 0.02) {
                    spider.setVertDirection('down');
                }
                if (spider.sendSpiderRight) {
                    if (Math.random() < 0.3) {
                        spider.setHorizontalDirection('right');
                    }
                    if (Math.random() < 0.6) {
                        spider.setHorizontalDirection('none');
                    }
                }
                else {
                    if (Math.random() < 0.3) {
                        spider.setHorizontalDirection('left');
                    }
                    if (Math.random() < 0.6) {
                        spider.setHorizontalDirection('none');
                    }
                }
                if (spider.center.x > this.board.width + (this.board.width * 0.01)) {
                    spider.turnSpiderLeft();
                }
                else if (spider.center.x < 0 - (this.board.width * 0.01)) {
                    spider.turnSpiderRight();
                }
                if (spider.isDead) {
                    this.addToScore(300);
                    toDelete[i] = i;
                    let spec = { center: { ...spider.center }, size: { ...spider.size }, rotation: 0 };
                    spawnExplosion(spec);
                    MyGame.audio.playSound('bonus');
                }
            }
        }
        MyGame.objects.scoreText.text = String(score);
        if (segCount === 0) {
            MyGame.objects.outOfSegments = true;
        }
        else {
            MyGame.objects.outOfSegments = false;
        }
        /////////////
        // Respawn
        /////////////
        if (spiderCount <= 0) {
            let mSpiderSpec = { ...spiderSpec };
            mSpiderSpec.center = { x: (0 - (this.board.width * 0.04)), y: (this.board.height - (this.board.height * 0.1)) }
            spawnSpider(mSpiderSpec);
        }
        ////////////
        // Spawning fleas
        ////////////
        if (fleaCount < 1) {
            if (Math.random() < 0.005) {
                fleaCount++;
                let spec = {
                    center: { x: this.board.width - (Math.random() * this.board.width), y: -10 },
                    size: { x: this.board.cellSize, y: this.board.cellSize },
                    rotation: 0,
                    moveRate: 0.4
                }
                spawnFlea(spec);
            }
        }
        ///////////
        // Spawning Scorpion
        ///////////
        if(scorpionCount <= 0){
            if (Math.random() < 0.001) {
                scorpionCount++;
                // spawn left of screen, somewhere between the top and 7/10ths of the screen
                let spec = {
                    center: { x: -10, y: (Math.random() * (this.board.width * 0.6)) },
                    size: {...spiderSpec.size},
                    rotation: 0,
                    moveRate: 0.2
                }
                spawnScorpion(spec);
            } 
        }
        segCount = 0;
        spiderCount = 0;
        // fleaCount = 0;
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