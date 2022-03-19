//---------------------------------------
//spec = {
//    size: {x: int, y: int} size of one segment
//    center: {x: int, y: int}: center of the first segment (head)
//    rotation: int
//    segments: int, number of segments
//  }
//---------------------------------------
{
    MyGame.objects.CentipedeSegment = function (mSpec) {
        let lives = 4;
        let isHead = false;
        let isConnected = false;
        let direction = {
            left: false,
            right: false,
            up: false,
            down: false
        }
        let prevDirection = {
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
        function setIsConnected() { isConnected = true; }
        function setNotConnected() { isConnected = false; }
        function subLife() { lives-- };
        function moveDown() {
            // while()
            mSpec.center.y += downRate;
            // setDirection()
        }
        function moveDownLeft() {
            // setDirection('down');
            // moveDown();
            ammount -= downRate;
            if (ammount <= 0) {
                setDirection('left')
                ammount = mSpec.size.y;
            }
        }
        function moveDownDir() {
            // setDirection('down');
            // moveDown();
            if(downRate < 0){
                ammount -= Math.abs(downRate);
            }
            else{

                ammount -= downRate;
            }
            if (ammount <= 0) {
                if (prevDirection.left) {
                    setDirection('right')
                }
                else if (prevDirection.right) {

                    setDirection('left')
                }
                ammount = mSpec.size.y;
            }
        }

        function moveDirection(elapsedTime) {
            // if(direction.up){
            //     mSpec.center.y -= (elapsedTime * mSpec.moveRate);
            // }
            if (direction.down) {
                moveDownDir();
                mSpec.center.y += downRate;
                // mSpec.center.y += (elapsedTime * mSpec.moveRate);
            }
            if (direction.left) {
                // mSpec.center.x -= (elapsedTime * mSpec.moveRate);
                mSpec.center.x -= mSpec.size.y / 10;
            }
            if (direction.right) {
                // mSpec.center.x += (elapsedTime * mSpec.moveRate);
                mSpec.center.x += mSpec.size.y / 10;
            }
        }
        function setDirection(dir) {
            // console.log(direction)
            for (let mDir in direction) {
                direction[mDir] = false;
            }
            direction[dir] = true;
            // console.log(direction)
        }
        function setPrevDirection(dir) {
            // console.log(direction)
            for (let mDir in prevDirection) {
                prevDirection[mDir] = false;
            }
            prevDirection[dir] = true;
            // console.log(direction)
        }
        function subCellDuration(ammount) {
            cellDuration -= ammount;
        }
        function resetCellDuration() {
            cellDuration = duration;
        }
        function flipDownDirection(){
            downRate = -downRate;
        }
        return {
            get center() { return mSpec.center; },
            get size() { return mSpec.size; },
            get rotation() { return mSpec.rotation; },
            get cellDuration() { return cellDuration },
            get index() { return mSpec.index; },
            get segCount() { return mSpec.segCount; },
            get direction() { return direction },
            get isDead() { return lives === 0; },
            get isHead() { return isHead; },
            get isConnected() { return isConnected; },
            subLife: subLife,
            setDirection: setDirection,
            setPrevDirection: setPrevDirection,
            moveDirection: moveDirection,
            subCellDuration: subCellDuration,
            setAsHead: setAsHead,
            setIsConnected: setIsConnected,
            setNotConnected: setNotConnected,
            resetCellDuration: resetCellDuration,
            flipDownDirection: flipDownDirection,
            // moveDown: moveDown,
            // moveDownLeft: moveDownLeft,
            // moveDownRight: moveDownRight,
        }
    }
}