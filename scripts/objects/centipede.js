//---------------------------------------
//spec = {
//    size: {x: int, y: int} size of one segment
//    center: {x: int, y: int}: center of the first segment (head)
//    rotation: int
//    segments: int, number of segments
//  }
//---------------------------------------
{
    MyGame.objects.CentipedeSegment = function(mSpec) {
        let lives = 4;
        let isHead = false;
        let direction = {
            left: false,
            right: false,
            up: false,
            down: false
        }
        let duration = 500;
        let cellDuration = duration;
        let downRate = mSpec.size.y / 10;
        let ammount = mSpec.size.y;
        function setAsHead() { isHead = true; }
        function subLife() { lives-- };
        function moveDown(){
            // while()
            mSpec.center.y += downRate;
            // setDirection()
        }
        function moveDownLeft(){
            // setDirection('down');
            // moveDown();
            ammount -= downRate;
            if(ammount <= 0){
                setDirection('left')
                ammount = mSpec.size.y;
            }
        }
        function moveDownRight(){
            // setDirection('down');
            // moveDown();
            ammount -= downRate;
            // console.log(ammount)
            // console.log(downRate)
            if(ammount <= 0){
                setDirection('right')
                ammount = mSpec.size.y;
            }
        }
        
        function moveDirection(elapsedTime){
            // if(direction.up){
            //     mSpec.center.y -= (elapsedTime * mSpec.moveRate);
            // }
            if(direction.down){
                moveDownRight();
                mSpec.center.y += downRate;
                // mSpec.center.y += (elapsedTime * mSpec.moveRate);
            }
            if(direction.left){
                // mSpec.center.x -= (elapsedTime * mSpec.moveRate);
                mSpec.center.x -= mSpec.size.y / 10;
            }
            if(direction.right){
                // mSpec.center.x += (elapsedTime * mSpec.moveRate);
                mSpec.center.x += mSpec.size.y / 10;
            }
        }
        function setDirection(dir){
            for(let mDir in direction){
                direction[mDir] = false;
            }
            direction[dir] = true;
            // console.log(direction)
        }
        function subCellDuration(ammount){
            cellDuration -= ammount;
        }
        function resetCellDuration() {
            cellDuration = duration;
        }
        // function setCellDuration(){}
        return {
            get center() { return mSpec.center; },
            get size() { return mSpec.size; },
            get rotation() { return mSpec.rotation; },
            get cellDuration() { return cellDuration},
            get index() { return mSpec.index; },
            get segCount() { return mSpec.segCount; },
            get direction() {return direction },
            get isDead() { return lives === 0; },
            get isHead() { return isHead; },
            subLife: subLife,
            setDirection: setDirection,
            moveDirection: moveDirection,
            subCellDuration: subCellDuration,
            setAsHead: setAsHead,
            resetCellDuration: resetCellDuration,
            moveDown: moveDown,
            moveDownLeft: moveDownLeft,
            moveDownRight: moveDownRight,
        }
    }
    // MyGame.objects.Centipede = function (spec) {
    //     /////////////////
    //     // spec = {
    //     //       center{}
    //     //  }
    //     /////////////////

    //     let segmentList = [];
    //     // console.log(spec)
    //     for (let i = 0; i < spec.segments; i++) {
    //         // debugger;
    //         let mSpec = {}
    //         mSpec.moveRate = spec.moveRate;
    //         // each segment is one segment apart
    //         mSpec.center = { x: (spec.center.x + i * spec.size.x), y: spec.center.y };
    //         mSpec.moveRate = spec.moveRate;
    //         mSpec.size = spec.size;
    //         mSpec.rotation = spec.rotation;
    //         console.log(mSpec)
    //         segmentList.push(CentipedeSegment(mSpec));
    //     }
    //     // set the first segment as head
    //     segmentList[0].setAsHead();
    //     // moveup a segment
    //     function moveUp(elapsedTime, index) {
    //         segmentList[index].moveUp(elapsedTime);
    //     }
    //     function moveDown(elapsedTime, index) {
    //         segmentList[index].moveDown(elapsedTime);
    //     }
    //     function moveRight(elapsedTime) {
    //         // spec.center.x += (elapsedTime * spec.moveRate);
    //         for (let i = 0; i < segmentList.length; i++) {
    //             segmentList[i].moveRight(elapsedTime)
    //         }
    //     }
    //     function moveLeft(elapsedTime) {
    //         for (let i = 0; i < segmentList.length; i++) {
    //             segmentList[i].moveLeft(elapsedTime)
    //         }
    //     }
    //     return {
    //         get center() { return spec.center; },
    //         get size() { return spec.size; },
    //         get rotation() { return spec.rotation; },
    //         get segmentList() { return segmentList; },
    //         moveRight: moveRight,
    //         moveLeft: moveLeft,
    //         moveUp: moveUp,
    //         moveDown: moveDown,
    //     }

    // }
}