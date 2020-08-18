class Canvas {
  constructor(props) {
    this.canvas = document.createElement("canvas");
    this.fillColor = "transparent";
    this.canvas.width = window.innerWidth * 0.75;
    this.canvas.height = this.canvas.width / 2;
    this.ctx = this.canvas.getContext("2d");
  }

  createCanvas() {
    document.body.append(this.canvas);
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Canvas;
