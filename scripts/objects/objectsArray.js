MyGame.objects.objectsArray = [];
MyGame.objects.initialize = function(width, height, numCells){
    let cellSize = Math.floor(width / numCells);
    for(let i = 0; i < numCells; i++){
        for(let j = 0; j < numCells; j++){
            let addMush = Math.random() < 0.05;
            if(addMush){
                let x = Math.floor((i * cellSize) / 2);
                let y = Math.floor((j * cellSize) / 2);
                console.log(`adding mushroom at x: ${x} y: ${y}`)
                let spec = {
                    center: {x: x, y: y},
                    size: {x: cellSize, y: cellSize},
                    rotation: 0
                }
                let mushie = MyGame.objects.Mushroom(spec)
                MyGame.objects.objectsArray.push({'mushroom': mushie})
            }
        }
    }
    console.log(MyGame.objects.objectsArray)

}