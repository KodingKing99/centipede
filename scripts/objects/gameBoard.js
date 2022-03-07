// MyGame.objects['gameBoard'] = (function(cellSize, Mushroom){
//     // each cell knows what it contains, it's size, if it's empty
//     function Cell(size){
//         let that = {}
//         let contains = {}
//         that.getContents = function(){
//             return contains;
//         }
//         that.addContent = function(key, value){
//             contains[key] = value
//         }
//         that.getSize = function(){
//             return size
//         }
//         that.isEmpty = function(){
//             // console.log(contains.keys())
//             return Object.keys(contains).length === 0;
//         }
//         return that;
//     }

//     let myBoard = [];
//     function printBoard(myBoard){
//         let myString = "";
//         console.log(myBoard)
//         for(let i = 0; i < myBoard.length; i++){
//             myString += "______________________________";
//             myString += "\n"
//             // console.log(myBoard[i].length)
//             for(let j = 0; j < myBoard[i].length; j++){
//                 // console.log(myBoard[i][j].isEmpty())
//                 if(myBoard[i][j].isEmpty()){
//                     myString += "|   |";
//                 }
//                 else{
//                     myString += "| X |"
//                 }
//             }
//         }
//         console.log(myString)
//     }
//     // initialize game board. TODO: pass in objects for initialization
//     function initialize(){

//         for(let i = 0; i < 30; i += 1){
//             myBoard.push([])
//             for(let j = 0; j < 30; j += 1){
//                 myBoard[i].push(Cell(cellSize))
                
//             }
//         }
//         // console.log(myBoard)
//         for(let i = 0; i < 30;  i += 1){
//             for(let j = 10; j < 29; j += 1 ){
//                 let addMushroom = Math.random() < 0.1;
//                 if(addMushroom){
//                     let spec = {
//                         size : {x: cellSize, y: cellSize},
//                         center: {x: i, y: j}
//                     }
//                     let mushie = Mushroom(spec)
//                     myBoard[i][j].addContent('mushroom', mushie)
//                 }
//             }
//         }
//         // console.log(boardToString(myBoard))
//         printBoard(myBoard)
//         // console.log(myBoard)
//     }
//     return {
//         initialize: initialize,
//         get getBoard() { return myBoard },
//         getCell(i, j) { return myBoard[i][j] }
//     }
    
// }(10, MyGame.objects.Mushroom));