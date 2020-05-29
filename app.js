document.addEventListener ( 'DOMContentLoaded', () => {
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

    for (let i =0; i < 60; i++ ){
        let div = document.createElement('div');
        document.querySelector('.minigrid').appendChild(div);
    }
    
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelectorAll('#score');
    const StartBtn = document.querySelectorAll('#start-button');
    const width = 10;
    let nextRandom = 0;
    let timerId;

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
    let random1 = Math.floor (Math.random() * theTetrominoes.length);
    //console.log(randomTetromino);
    
    let current = theTetrominoes[random1][currentRotation];
    
    //console.log(squares);
    //console.log(current);
    
    //drawing up the 1st rotation in 1st tetromino

    function draw () {
        current.forEach (index => {
             squares[currentPosition + index]
            .classList
            .add('tetromino')
        })
    }
    
    function removeDraw () {
        current.forEach ( index => {
            squares[currentPosition + index].classList.remove('tetromino')
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
        
        random = nextRandom;
        nextRandom = Math.floor (Math.random() * theTetrominoes.length);
        //random = nextRandom;
        current = theTetrominoes[random][currentRotation];
        currentPosition = 4;
        draw();
        displayShape();
        gameOver();
        }
    }
    
    function control(e) {
        if( e.keyCode === 37) { moveLeft(); }

        else if( e.keyCode === 38) { moveUp(); }  //Rotate
        
        else if( e.keyCode === 39) { moveRight(); }
        
        else if( e.keyCode === 40) { moveDown(); }

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

    
    const displaySquares = document.querySelectorAll('.minigrid div');
    const displayWidth = 5;
    let displayIndex = 0;

    console.log(displaySquares);
    

    //Tetrominoes without Rotations

    const upNextShapes = 
        [ l_Tetromino[0], s_Tetromino[0], t_Tetromino[0], o_Tetromino[0], i_Tetromino[0],z_Tetromino[0]  ];

        console.log(upNextShapes[0]);
        

    function displayShape () {
         displaySquares.forEach(square => {
            square.classList.remove('tetromino');
            square.style.backgroundColor = '';
         })
         upNextShapes[random].forEach ( index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
       })
         
    }    


    function addScore () {
        //for (let i = 0; i < 199)
    }    
    
    
    
    
    
    
    
    
    
    
    
    
    //GAME--OVER

    function gameOver () {
        if (current.some (index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }

    



    

    
















})