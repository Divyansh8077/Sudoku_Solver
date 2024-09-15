var arr = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);
        if (!arr[i][j]) {
            console.error(`Element with id ${i * 9 + j} not found.`);
        }
    }
}

var board = Array.from({ length: 9 }, () => Array(9).fill(0));

function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (arr[i][j]) {
                if (board[i][j] != 0) {
                    arr[i][j].innerText = board[i][j];
                } else {
                    arr[i][j].innerText = '';
                }
            }
        }
    }
}

let GetPuzzle = document.getElementById('GetPuzzle');

if (GetPuzzle) {
    console.log("GetPuzzle button found and ready!");
} else {
    console.error("GetPuzzle button not found!");
}

GetPuzzle.onclick = function () {
    console.log("GetPuzzle button clicked!");
    var xhrRequest = new XMLHttpRequest();

    xhrRequest.onload = function () {
        if (xhrRequest.status === 200) {
            try {
                var response = JSON.parse(xhrRequest.responseText);
                console.log('API response:', response);
                board = response.board;
                FillBoard(board);
            } catch (e) {
                console.error('Error parsing the response:', e);
            }
        } else {
            console.error('Request failed with status:', xhrRequest.status);
        }
    };

    xhrRequest.onerror = function () {
        console.error('Network error occurred.');
    };

    xhrRequest.open('GET', 'https://sugoku.onrender.com/board?difficulty=easy');

    xhrRequest.send();
};

let SolvePuzzle = document.getElementById('SolvePuzzle');

if (SolvePuzzle) {
    console.log("SolvePuzzle button found and ready!");
    SolvePuzzle.onclick = () => {
        SudokuSolver(board, 0, 0, 9);
    };
} else {
    console.error("SolvePuzzle button not found!");
}

function SudokuSolver(board, i, j, n) {
    if (i == n) {
        FillBoard(board);
        return true;
    }

    if (j == n) {
        return SudokuSolver(board, i + 1, 0, n);
    }

    if (board[i][j] != 0) {
        return SudokuSolver(board, i, j + 1, n);
    }

    for (let num = 1; num <= 9; num++) {
        if (IsValid(board, i, j, num, n)) {
            board[i][j] = num;

            let subAns = SudokuSolver(board, i, j + 1, n);
            if (subAns) {
                return true;
            }

            board[i][j] = 0; // Backtrack
        }
    }

    return false;
}

function IsValid(board, i, j, num, n) {
    for (let x = 0; x < n; x++) {
        if (board[i][x] == num || board[x][j] == num) {
            return false;
        }
    }
    let rn = 3;
    let si = i - i % rn;
    let sj = j - j % rn;
    for (let x = si; x < si + rn; x++) {
        for (let y = sj; y < sj + rn; y++) {
            if (board[x][y] == num) {
                return false;
            }
        }
    }
    return true;
}
