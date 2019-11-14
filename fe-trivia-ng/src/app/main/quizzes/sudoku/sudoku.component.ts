import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {
  fullGrid = [];
  readOnly = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 81; i++) {
      this.fullGrid.push('1');
    }
  }

}
