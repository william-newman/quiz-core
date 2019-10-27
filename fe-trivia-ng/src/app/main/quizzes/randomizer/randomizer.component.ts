import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.css']
})
export class RandomizerComponent implements OnInit {
  @ViewChild('itemForm') formValues;
  itemToAdd: string;
  itemsToSort = [];
  sortedItems = [];
  itemIndex = 0;

  constructor() {}

  ngOnInit() {}

  validateItem() {
    if (!!this.itemToAdd) {
      this.itemsToSort.push({ item: this.itemToAdd, index: this.itemIndex });
      this.itemIndex++;
      this.formValues.resetForm();
    }
  }

  deleteItem(index) {
    // this.itemsToSort.splice(index, 1); bleh
    this.itemsToSort.pop();
  }

  randomize() {
    const newArr = [];
    this.itemsToSort.forEach(item => {
      newArr.push(item);
    });

    newArr.sort(this.randomSort);
    this.sortedItems = newArr;
  }

  randomSort(a, b) {
    return 0.5 - Math.random();
  }
}
