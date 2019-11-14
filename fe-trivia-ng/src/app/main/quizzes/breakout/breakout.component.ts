import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-breakout',
  templateUrl: './breakout.component.html',
  styleUrls: ['./breakout.component.css']
})
export class BreakoutComponent implements OnInit, AfterViewInit {
  @ViewChild('breakoutCanvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  x;
  y;
  dx = 2;
  dy = -2;
  ballRadius = 10;

  paddleHeight = 10;
  paddleWidth = 75;
  paddleX;
  rightPressed = false;
  leftPressed = false;

  interval: any;

  bricks = [];
  brickRowCount = 3;
  brickColumnCount = 5;
  brickWidth = 75;
  brickHeight = 20;
  brickPadding = 10;
  brickOffsetTop = 30;
  brickOffsetLeft = 30;

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (ev.key === 'Right' || ev.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (ev.key === 'Left' || ev.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Right' || ev.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (ev.key === 'Left' || ev.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  constructor() {
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext(
      '2d'
    );
    this.x = this.canvas.nativeElement.width / 2;
    this.y = this.canvas.nativeElement.height - 30;
    this.paddleX = (this.canvas.nativeElement.width - this.paddleWidth) / 2;

    for (let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r] = { x: 0, y: 0 };
      }
    }
  }

  draw() {
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.drawBall();
    this.drawPaddle();
    this.drawBricks();

    if (
      this.x + this.dx > this.canvas.nativeElement.width - this.ballRadius ||
      this.x + this.dx < this.ballRadius
    ) {
      this.dx = -this.dx;
    }

    if (this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    } else if (
      this.y + this.dy >
      this.canvas.nativeElement.height - this.ballRadius
    ) {
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
        this.dy = -this.dy;
      } else {
        alert('GAME OVER');
        clearInterval(this.interval);
      }
    }

    if (this.rightPressed) {
      this.paddleX += 7;
      if (this.paddleX + this.paddleWidth > this.canvas.nativeElement.width) {
        this.paddleX = this.canvas.nativeElement.width - this.paddleWidth;
      }
    } else if (this.leftPressed) {
      this.paddleX -= 7;
      if (this.paddleX < 0) {
        this.paddleX = 0;
      }
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.paddleX,
      this.canvas.nativeElement.height - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight
    );
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawBricks() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        const brickX =
          c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
        const brickY =
          r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
        this.bricks[c][r].x = 0;
        this.bricks[c][r].y = 0;
        this.ctx.beginPath();
        this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
        this.ctx.fillStyle = '#0095DD';
        this.ctx.fill();
        this.ctx.closePath();
      }
    }
  }

  begin() {
    this.interval = setInterval(() => this.draw(), 10);
  }
}
