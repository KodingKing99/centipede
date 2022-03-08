MyGame.objects.objectsArray = [];
MyGame.objects.initialize = function(width, height, numCells){
    let cellSize = Math.floor(width / numCells);
    console.log(`cell size is ${cellSize}`)
    // i and j are those values because I want to render mushrooms at around
    // 1 - 32 on x and 1 - 24 on y (going from top left corner)
    for(let i = cellSize; i < width - cellSize; i += cellSize){
        for(let j = cellSize; j < height - cellSize; j += cellSize){
            let addMush = Math.random() < 0.05;
            if(addMush){
                x = i;
                y = j;
                console.log(`adding mushroom at x: ${x} y: ${y}`)
                let spec = {
                    center: {x: x, y: y},
                    size: {x: cellSize, y: cellSize},
                    rotation: 0
                }
                let mushie = MyGame.objects.Mushroom(spec)
                MyGame.objects.objectsArray.push({type: 'mushroom', object: mushie})
            }
        }
    }
    // add ship to bottom middle
    let shipSpec = {
        center: {x: width / 2, y: height - (cellSize * 2)},
        size: {x: cellSize, y: cellSize},
        rotation: 0,
        moveRate: 0.5,
    }
    let ship = MyGame.objects.Ship(shipSpec);
    MyGame.objects.objectsArray.push({type: 'ship', object: ship})
    console.log(MyGame.objects.objectsArray)
}