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
  x; // ball position axes
  y;
  dx = 4; // ball velocity
  dy = 3;
  ballRadius = 10; // ball

  paddleHeight = 20;
  paddleWidth = 100;
  paddleX;
  paddleY;
  rightPressed = false;
  leftPressed = false;

  bricks = [];
  brickRowCount = 5;
  brickColumnCount = 10;
  brickWidth = 75;
  brickHeight = 20;
  brickPadding = 10;
  brickOffsetTop = 50;
  brickOffsetLeft = 60;

  score = 0;
  lives = 2;
  gameMessage: string;
  difficulty: number;

  gameDefaults = {
    xLocation: 0,
    yLocation: 0,
    paddleX: 0,
    paddleY: 0
  };

  easyLevelDefaults = {
    brickRowCount: 3,
    brickColumnCount: 10,
    dx: 4,
    dy: -3,
    lives: 3,
    brickWidth: 75,
    brickHeight: 20,
    brickPadding: 10,
    brickOffsetTop: 50,
    brickOffsetLeft: 60
  };

  mediumLevelDefaults = {
    brickRowCount: 5,
    brickColumnCount: 8,
    dx: 9,
    dy: -6,
    lives: 2,
    brickWidth: 75,
    brickHeight: 15,
    brickPadding: 30,
    brickOffsetTop: 40,
    brickOffsetLeft: 70
  };

  hardLevelDefaults = {
    brickRowCount: 3,
    brickColumnCount: 5,
    dx: 18,
    dy: -10,
    lives: 1,
    brickWidth: 50,
    brickHeight: 20,
    brickPadding: 125,
    brickOffsetTop: 60,
    brickOffsetLeft: 100
  };

  anim: any;
  gameOver = false;
  gameRunning = false;

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

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(ev: MouseEvent) {
    const relativeX = ev.clientX - this.canvas.nativeElement.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.nativeElement.width) {
      this.paddleX = relativeX - this.paddleWidth / 2;
    }
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext(
      '2d'
    );

    this.gameDefaults = {
      xLocation: this.canvas.nativeElement.width / 2,
      yLocation: this.canvas.nativeElement.height - 55,
      paddleX: (this.canvas.nativeElement.width - this.paddleWidth) / 2,
      paddleY: this.canvas.nativeElement.height - this.paddleHeight - 25
    };

    this.x = this.gameDefaults.xLocation;
    this.y = this.gameDefaults.yLocation;
    this.paddleX = this.gameDefaults.paddleX;
    this.paddleY = this.gameDefaults.paddleY;

    this.makeBricks();
    this.drawBall();
    this.drawPaddle();
    this.drawScore();
    this.drawLives();
    this.drawBricks();
  }

  makeBricks() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  draw() {
    this.anim = requestAnimationFrame(this.draw.bind(this));
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.drawBall();
    this.drawPaddle();
    this.drawScore();
    this.drawLives();
    this.drawBricks();
    this.collisionDetection();

    this.x += this.dx;
    this.y += this.dy;

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
      if (
        this.x > this.paddleX &&
        this.x < this.paddleX + this.paddleWidth
        // this.y + this.dy >
        //   this.canvas.nativeElement.height - this.ballRadius - 30
      ) {
        this.dy = -this.dy;
      } else {
        console.log(this.y);

        this.lives--;
        if (this.lives < 1) {
          const gameMessage = 'GAME OVER';
          this.endGame(gameMessage);
        } else {
          this.paddleX = this.gameDefaults.paddleX;
          this.x = this.gameDefaults.xLocation;
          this.y = this.gameDefaults.yLocation;
          switch (this.difficulty) {
            case 0:
              this.dx = this.easyLevelDefaults.dx;
              this.dy = this.easyLevelDefaults.dy;
              break;
            case 1:
              this.dx = this.mediumLevelDefaults.dx;
              this.dy = this.mediumLevelDefaults.dy;
              break;
            case 2:
              this.dx = this.hardLevelDefaults.dx;
              this.dy = this.hardLevelDefaults.dy;
              break;
            default:
              break;
          }
        }
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
      this.paddleY,
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
        if (this.bricks[c][r].status === 1) {
          const brickX =
            c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          const brickY =
            r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          this.ctx.fillStyle = '#0095DD';
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        const b = this.bricks[c][r];
        if (b.status === 1) {
          if (
            this.x > b.x &&
            this.x < b.x + this.brickWidth &&
            this.y > b.y &&
            this.y < b.y + this.brickHeight
          ) {
            this.dy = -this.dy;
            b.status = 0;
            this.score++;
            if (this.score >= this.brickRowCount * this.brickColumnCount) {
              const gameMessage = 'YOU WIN, CONGRATULATIONS!';
              this.endGame(gameMessage);
            }
          }
        }
      }
    }
  }

  drawScore() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fillText('Score: ' + this.score, 8, 20);
  }

  drawLives() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fillText(
      'Lives: ' + this.lives,
      this.canvas.nativeElement.width - 65,
      20
    );
  }

  begin(difficulty: string) {
    this.gameOver = false;
    this.gameRunning = true;
    switch (difficulty) {
      case 'easy':
        this.setEasy();
        break;
      case 'medium':
        this.setMedium();
        break;
      case 'hard':
        this.setHard();
        break;
      default:
        break;
    }
    this.x = this.gameDefaults.xLocation;
    this.y = this.gameDefaults.yLocation;
    this.paddleX = this.gameDefaults.paddleX;
    this.score = 0;
    this.makeBricks();
    this.draw();
  }

  setEasy() {
    this.difficulty = 0;
    this.lives = this.easyLevelDefaults.lives;
    this.dx = this.easyLevelDefaults.dx;
    this.dy = this.easyLevelDefaults.dy;
    this.brickRowCount = this.easyLevelDefaults.brickRowCount;
    this.brickColumnCount = this.easyLevelDefaults.brickColumnCount;
    this.brickWidth = this.easyLevelDefaults.brickWidth;
    this.brickHeight = this.easyLevelDefaults.brickHeight;
    this.brickPadding = this.easyLevelDefaults.brickPadding;
    this.brickOffsetTop = this.easyLevelDefaults.brickOffsetTop;
    this.brickOffsetLeft = this.easyLevelDefaults.brickOffsetLeft;
  }

  setMedium() {
    this.difficulty = 1;
    this.lives = this.mediumLevelDefaults.lives;
    this.dx = this.mediumLevelDefaults.dx;
    this.dy = this.mediumLevelDefaults.dy;
    this.brickRowCount = this.mediumLevelDefaults.brickRowCount;
    this.brickColumnCount = this.mediumLevelDefaults.brickColumnCount;
    this.brickWidth = this.mediumLevelDefaults.brickWidth;
    this.brickHeight = this.mediumLevelDefaults.brickHeight;
    this.brickPadding = this.mediumLevelDefaults.brickPadding;
    this.brickOffsetTop = this.mediumLevelDefaults.brickOffsetTop;
    this.brickOffsetLeft = this.mediumLevelDefaults.brickOffsetLeft;
  }

  setHard() {
    this.difficulty = 2;
    this.lives = this.hardLevelDefaults.lives;
    this.dx = this.hardLevelDefaults.dx;
    this.dy = this.hardLevelDefaults.dy;
    this.brickRowCount = this.hardLevelDefaults.brickRowCount;
    this.brickColumnCount = this.hardLevelDefaults.brickColumnCount;
    this.brickWidth = this.hardLevelDefaults.brickWidth;
    this.brickHeight = this.hardLevelDefaults.brickHeight;
    this.brickPadding = this.hardLevelDefaults.brickPadding;
    this.brickOffsetTop = this.hardLevelDefaults.brickOffsetTop;
    this.brickOffsetLeft = this.hardLevelDefaults.brickOffsetLeft;
  }

  bump() {
    this.dx *= 2;
    this.dy *= 2;
  }

  endGame(msg: string) {
    this.gameMessage = msg;
    this.gameOver = true;
    this.gameRunning = false;
    window.cancelAnimationFrame(this.anim);
  }
}
