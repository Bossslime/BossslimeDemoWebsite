let board =
    [
        [ null, null, null ],
        [ null, null, null ],
        [ null, null, null ]
    ];

const settings = {
    finishedGame: false,
    lastWinner: null,

    ai: false,
    started: false,

    startTime: null
}

let turn = Math.floor(Math.random() * 2) === 0 ? 'X' : 'O';

const getTime = () => {
    if (settings.started) {
        let time = Math.floor((new Date().getTime() - settings.startTime) / 1000);
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        let text = '';

        if (minutes > 0) {
            text += minutes + 'm ';
        }
        text += seconds + 's';
        document.getElementById('time').innerHTML = 'The game has been running for ' + text;
    }else {
        document.getElementById('time').innerHTML = '';
    }
}

const getWinner = () => {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== null) {
            return board[i][0];
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== null) {
            return board[0][i];
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== null) {
        return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== null) {
        return board[0][2];
    }
    return null;
}

const isWinner = () => {
    return getWinner() !== null;
}

const isDraw = () => {
    if (isWinner()) {
        return false;
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === null) {
                return false;
            }
        }
    }
    return true;
}

const play = (x, y) => {
    if (settings.started) {
        if (!settings.ai) {
            if (board[x][y] === null) {
                board[x][y] = turn;
                document.getElementById('cell-' + x + '-' + y).innerHTML = turn === 'X' ? xSVG : oSVG;
                document.getElementById('cell-' + x + '-' + y).setAttribute('disabled', 'true');
                if (isWinner()) {
                    settings.started = false;
                    settings.finishedGame = true;
                    settings.lastWinner = 'Player ' + turn + ' wins!';
                }
                if (isDraw()) {
                    settings.started = false;
                    settings.finishedGame = true;
                    settings.lastWinner = 'Draw!';
                }
                turn = turn === 'X' ? 'O' : 'X';
            }
        }else {
            if (turn === 'X') {
                if (board[x][y] === null) {
                    board[x][y] = turn;
                    document.getElementById('cell-' + x + '-' + y).innerHTML = xSVG;
                    document.getElementById('cell-' + x + '-' + y).setAttribute('disabled', 'true');
                    if (isWinner()) {
                        settings.started = false;
                        settings.finishedGame = true;
                        settings.lastWinner = 'Player ' + turn + ' wins!';
                    }
                    if (isDraw()) {
                        settings.started = false;
                        settings.finishedGame = true;
                        settings.lastWinner = 'Draw!';
                    }
                    turn = turn === 'X' ? 'O' : 'X';
                }
            }
        }
    }
}

const startGame = (buttonId) => {
   if (buttonId === 1 && !settings.finishedGame) {
        return;
   }

    board =
        [
            [ null, null, null ],
            [ null, null, null ],
            [ null, null, null ]
        ];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById('cell-' + i + '-' + j).innerHTML = '';
            document.getElementById('cell-' + i + '-' + j).removeAttribute('disabled');
        }
    }

    if (document.getElementById('radio-1').checked) {
        settings.ai = false;
    }else {
        settings.ai = true;
    }

    settings.startTime = Date.now();
    settings.finishedGame = false;
    settings.started = true;
}



setInterval(() => {
    if (settings.started) {
        document.getElementById('button-play-again').setAttribute('disabled', 'true');

        document.getElementById('radio-1').setAttribute('disabled', 'true');
        document.getElementById('radio-2').setAttribute('disabled', 'true');

        document.getElementById('turn').innerHTML = 'It is ' + turn + '\'s turn!';
        getTime();
    }else {
        if (!settings.finishedGame) {
            document.getElementById('button-play-again').setAttribute('disabled', 'true');
        }else {
            document.getElementById('button-play-again').removeAttribute('disabled');
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                document.getElementById('cell-' + i + '-' + j).setAttribute('disabled', 'true')
            }
        }

        document.getElementById('radio-1').removeAttribute('disabled');
        document.getElementById('radio-2').removeAttribute('disabled');

        document.getElementById('time').innerHTML = '';
        if (settings.lastWinner) {
            document.getElementById('turn').innerHTML = settings.lastWinner;
        }else {
            document.getElementById('turn').innerHTML = 'The game has not started yet!';
        }
    }

    if (settings.started && settings.ai && turn === 'O') {
        let x = Math.floor(Math.random() * 3);
        let y = Math.floor(Math.random() * 3);

        while (board[x][y] !== null) {
            x = Math.floor(Math.random() * 3);
            y = Math.floor(Math.random() * 3);
        }

        board[x][y] = turn;
        document.getElementById('cell-' + x + '-' + y).innerHTML = oSVG;
        document.getElementById('cell-' + x + '-' + y).setAttribute('disabled', 'true');
        if (isWinner()) {
            settings.started = false;
            settings.finishedGame = true;
            settings.lastWinner = 'Player ' + turn + ' wins!';
        }
        if (isDraw()) {
            settings.started = false;
            settings.finishedGame = true;
            settings.lastWinner = 'Draw!';
        }
        turn = turn === 'X' ? 'O' : 'X';
    }
}, 100)


const xSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>';
const oSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 96a160 160 0 1 0 0 320 160 160 0 1 0 0-320zM448 256A224 224 0 1 1 0 256a224 224 0 1 1 448 0z"/></svg>';