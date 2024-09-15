#include<iostream>
#include<math.h>
using namespace std;

void Print(int board[][9], int n){
    for(int i = 0; i < n; i++){
        for(int j = 0; j < n; j++){
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl;
}

bool IsValid(int board[][9], int i, int j, int num, int n){
    for(int x = 0; x < n; x++){
        if(board[i][x] == num || board[x][j] == num){
            return false;
        }
    }
    int rn = sqrt(n);
    int si = i - i % rn;
    int sj = j - j % rn;
    for(int x = si; x < si + rn; x++){
        for(int y = sj; y < sj + rn; y++){
            if(board[x][y] == num){
                return false;
            }
        }
    }
    return true;
}

bool SudokuSolver(int board[][9], int i, int j, int n){
    if(i == n){
        // If we have filled the entire board, print the result
        Print(board, n);
        return true;
    }

    if(j == n){
        // Move to the next row
        return SudokuSolver(board, i + 1, 0, n);
    }

    if(board[i][j] != 0){
        // Skip already filled cells
        return SudokuSolver(board, i, j + 1, n);
    }

    for(int num = 1; num <= 9; num++){
        if(IsValid(board, i, j, num, n)){
            board[i][j] = num;

            bool subAns = SudokuSolver(board, i, j + 1, n);
            if(subAns){
                return true;
            }

            board[i][j] = 0;
        }
    }
    
    return false; 
}

int main(){
    int n = 9;
    int board[9][9] = {
        {0,0,7,1,0,0,0,6,0},
        {1,0,5,2,0,8,0,0,0},
        {6,0,0,0,0,7,1,2,0},
        {3,1,2,4,0,5,0,0,8},
        {0,0,6,0,9,0,2,0,0},
        {0,0,0,0,0,3,0,0,1},
        {0,0,1,0,0,4,9,8,6},
        {8,0,3,9,0,6,0,0,0},
        {0,6,0,0,8,2,7,0,3},
    };

   SudokuSolver(board,0,0,n);

    return 0;
}
