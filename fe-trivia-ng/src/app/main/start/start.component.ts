import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  private start(): void {
    alert('New tests coming soon!');
  }
}
