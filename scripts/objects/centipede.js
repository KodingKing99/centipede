//---------------------------------------
//spec = {
//    size: {x: int, y: int} size of one segment
//    center: {x: int, y: int}: center of the first segment (head)
//    rotation: int
//    segments: int, number of segments
//  }
//---------------------------------------
{
    function CentipedeSegment(mSpec) {
        console.log('hello')
        let lives = 4;
        let isHead = false;
        function setAsHead() { isHead = true; }
        function subLife() { lives-- };
        function moveUp(elapsedTime) {
            mSpec.center.y -= (elapsedTime * mSpec.moveRate);
        }
        function moveDown(elapsedTime) {
            mSpec.center.y += (elapsedTime * mSpec.moveRate);
        }
        function moveRight(elapsedTime) {
            mSpec.center.x += (elapsedTime * mSpec.moveRate);
        }
        function moveLeft(elapsedTime) {
            mSpec.center.x -= (elapsedTime * mSpec.moveRate);
        }

        return {
            get center() { return mSpec.center; },
            get size() { return mSpec.size; },
            get rotation() { return mSpec.rotation; },
            get isDead() { return lives === 0; },
            get isHead() { return isHead; },
            subLife: subLife,
            moveUp: moveUp,
            moveDown: moveDown,
            moveRight: moveRight,
            moveLeft: moveLeft,
            setAsHead: setAsHead,
        }
    }
    MyGame.objects.Centipede = function (spec) {
        /////////////////
        // spec = {
        //       center{}
        //  }
        /////////////////

        let segmentList = [];
        // console.log(spec)
        for (let i = 0; i < spec.segments; i++) {
            // debugger;
            let mSpec = {}
            mSpec.moveRate = spec.moveRate;
            // each segment is one segment apart
            mSpec.center = { x: (spec.center.x + i * spec.size.x), y: spec.center.y };
            mSpec.moveRate = spec.moveRate;
            mSpec.size = spec.size;
            mSpec.rotation = spec.rotation;
            console.log(mSpec)
            segmentList.push(CentipedeSegment(mSpec));
        }
        // set the first segment as head
        segmentList[0].setAsHead();
        // moveup a segment
        function moveUp(elapsedTime, index) {
            segmentList[index].moveUp(elapsedTime);
        }
        function moveDown(elapsedTime, index) {
            segmentList[index].moveDown(elapsedTime);
        }
        function moveRight(elapsedTime) {
            // spec.center.x += (elapsedTime * spec.moveRate);
            for (let i = 0; i < segmentList.length; i++) {
                segmentList[i].moveRight(elapsedTime)
            }
        }
        function moveLeft(elapsedTime) {
            for (let i = 0; i < segmentList.length; i++) {
                segmentList[i].moveLeft(elapsedTime)
            }
        }
        return {
            get center() { return spec.center; },
            get size() { return spec.size; },
            get rotation() { return spec.rotation; },
            get segmentList() { return segmentList; },
            moveRight: moveRight,
            moveLeft: moveLeft,
            moveUp: moveUp,
            moveDown: moveDown,
        }

    }
}