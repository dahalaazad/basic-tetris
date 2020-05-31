for (let i = 0; i < 200; i++) {                         // Create 200 <div> elements
    let div = document.createElement('div');                 
    //div.id = i;  
    document.querySelector('.grid').appendChild(div);
}

for (let i =0; i < 10; i++ ){
    let div = document.createElement('div');
    div.classList.add('taken');
    document.querySelector('.grid').appendChild(div);
}

for (let i =0; i < 40; i++ ){
    let div = document.createElement('div');
    document.querySelector('.minigrid').appendChild(div);
}

document.addEventListener ( 'DOMContentLoaded', () => {
    
    
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelectorAll('#start-button');
    const width = 10;
    let nextRandom = [];
    //let miniDisplay_Array = [];
    let score = 0;
    let timerId;

    const colors = ['orange','blue','red','green','brown','purple']

    //The Tetrominoes
    const l_Tetromino = [                                //0
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    const s_Tetromino = [                                        //1 LOOK LATER
        [width*2,width+1,width*2+1,width+2],
        [0,width,width+1,width*2+1],
        [width*2,width+1,width*2+1,width+2],
        [0,width,width+1,width*2+1],
    ];

    const t_Tetromino = [                                                    //2
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ];

    const o_Tetromino = [                                //3
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ];

    const i_Tetromino = [                                                    //4
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ];

    const z_Tetromino = [                                                        //5
        [width,width+1, width*2+1,width*2+2],
        [width,width*2,1,width+1],
        [width,width+1, width*2+1,width*2+2],
        [width,width*2,1,width+1]
    ]; 

    const theTetrominoes = [l_Tetromino, s_Tetromino, t_Tetromino, o_Tetromino, i_Tetromino,z_Tetromino];

    let currentPosition = 4;
    let currentRotation = 0;
    //let random = Math.floor (Math.random() * theTetrominoes.length);
    let a = Math.floor (Math.random() * theTetrominoes.length);
    let nextRandom1 = a;
    let b = Math.floor (Math.random() * theTetrominoes.length);
    let nextRandom2 = b;
    let c = Math.floor (Math.random() * theTetrominoes.length);
    let nextRandom3 = c;
    nextRandom.push(nextRandom1,nextRandom2,nextRandom3);
    let random = nextRandom[0];
    //console.log(randomTetromino);
    
    let current = theTetrominoes[random][currentRotation];
    
     //console.log(squares);
    //console.log(current);
    
    //drawing up the 1st rotation in 1st tetromino

    function draw () {
        current.forEach (index => {
             squares[currentPosition + index]
            .classList
            .add('tetromino')
            squares[currentPosition + index].style.backgroundColor = colors[random];
        })
    }
    
    function removeDraw () {
        current.forEach ( index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = '';
        })
    }
    
    

    function freeze () {
        if( current.some(
            index => squares[currentPosition + index + width]
                    .classList
                    .contains('taken'))) {
                        current
                        .forEach(index => squares[currentPosition+index]
                                         .classList.add('taken'))
                                         
        
        
        //miniDisplay_Array.push(nextRandom0,nextRandom1,nextRandom2,nextRandom3);
        console.log(nextRandom);
        nextRandom.shift();
        random = nextRandom[0];
        
        let newRandom = Math.floor(Math.random() * theTetrominoes.length)
        nextRandom.push(newRandom);
        console.log(nextRandom);
        current = theTetrominoes[random][currentRotation];
        //console.log(random);
        
        
        currentPosition = 4;
        
        draw();
        displayShape();
        addScore();
        gameOver();
        }
    }

    
    
    function control(e) {
        if( e.keyCode === 37) { moveLeft(); }

        else if( e.keyCode === 38) { moveUp(); }  //Rotate
        
        else if( e.keyCode === 39) { moveRight(); }
        
        else if( e.keyCode === 40) { 
            moveDown();
            if (scoreDisplay.innerHTML != 'END'){
                score += 1 ;
                scoreDisplay.innerHTML = score;
            } 
        }

    }

    document.addEventListener('keydown', control)


    function moveDown () {
        removeDraw()
        currentPosition += width;
        draw()
        freeze()
    }

    timerId = setInterval(moveDown, 1000);

    function moveLeft () {
        removeDraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if(!isAtLeftEdge)  {currentPosition -= 1}  //move left untill at left edge 

        if (current.some( index => squares[currentPosition + index].classList.contains('taken'))) {  //for shape collision
            currentPosition += 1 ; 
        }

        draw();
    }

    function moveRight () {
        removeDraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        if(!isAtRightEdge)  {currentPosition += 1}  //move right untill at right edge 

        if (current.some( index => squares[currentPosition + index].classList.contains('taken'))) {  //for shape collision
            currentPosition -= 1 ; 
        }
        draw();
    }

    function moveUp () {
        removeDraw();
        currentRotation ++;
        if( currentRotation === current.length) { 
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw();

    }    

    
    const displaySquares = Array.from(document.querySelectorAll('.minigrid div'));
    const displayWidth = 4;
    //let displayIndex = 8;

    //console.log(displaySquares);
    

    //Tetrominoes without Rotations

    const upNextShapes = [
        [1, displayWidth+1, displayWidth*2+1, 2],                           //const l_Tetromino
        [displayWidth*2,displayWidth+1,displayWidth*2+1,displayWidth+2],    //const s_Tetromino
        [1,displayWidth,displayWidth+1,displayWidth+2],                     //const t_Tetromino
        [0,1,displayWidth,displayWidth+1],                                  //const o_Tetromino
        [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1],               //const i_Tetromino
        [displayWidth,displayWidth+1, displayWidth*2+1,displayWidth*2+2]    // const z_Tetromino
    ];
                                                                 
    //console.log(upNextShapes);
        

    function displayShape () {
         displaySquares.forEach(square => {
            square.classList.remove('tetromino');
            square.style.backgroundColor = '';
         })
         //console.log(miniDisplay_Array);
         //console.log(miniDisplay_Array.length());
        
         
        
        upNextShapes[nextRandom[1]].forEach ( index => {
        displaySquares[index].classList.add('tetromino')
        displaySquares[index].style.backgroundColor = colors[nextRandom[1]]
        })

        upNextShapes[nextRandom[2]].forEach ( index => {
            displaySquares[index+21].classList.add('tetromino')
            displaySquares[index+21].style.backgroundColor = colors[nextRandom[2]]
        })

        // upNextShapes[nextRandom[2]].forEach ( index => {
        //     displaySquares[index+40].classList.add('tetromino')
        // })
    }
    
    

    timerId = setInterval(moveDown, 500);


    function  addScore () {
        for (let i = 0; i < 199; i+= width)    {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

            if(row.every (index => squares[index].classList.contains('taken'))) {
                score +=10 ;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i,width);
                //console.log(squaresRemoved);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
            
        }
    }  
    
    
    
    
      //GAME--OVER

    function gameOver () {
        if (current.some (index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'END'
            clearInterval(timerId)
        }
    }

    



    
})