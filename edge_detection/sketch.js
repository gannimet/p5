let inputImage;
let outputImage;

const KernelX = [
  [1, 0, -1],
  [2, 0, -2],
  [1, 0, -1]
];

const KernelY = [
  [1, 2, 1],
  [0, 0, 0],
  [-1, -2, -1]
];

const THRESHOLD = 0;
const BINARY = false;

function preload() {
  inputImage = loadImage('images/mcdonald.png');
  // inputImage = loadImage('images/mountain-lake.jpeg');
}

function setup() {
  createCanvas(1400, 700);
  background(0);
}

function draw() {
  noLoop();

  image(inputImage, 0, 0, width / 2, height);
  stroke(color(0, 255, 0));
  line(width / 2, 0, width / 2, height);
  outputImage = createImage(inputImage.width, inputImage.height);

  inputImage.loadPixels();
  outputImage.loadPixels();

  for (let x = 0; x < inputImage.width; x++) {
    for (let y = 0; y < inputImage.height; y++) {
      let Gx = 0;
      let Gy = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          Gx += KernelX[i + 1][j + 1] * brightnessAt(inputImage, x + i, y + j);
          Gy += KernelY[i + 1][j + 1] * brightnessAt(inputImage, x + i, y + j);
        }
      }

      const G = Math.sqrt(Gx * Gx + Gy * Gy);
      let GwithThreshold = G > THRESHOLD ? G : 0;

      if (BINARY) {
        GwithThreshold = GwithThreshold > 0 ? 255 : 0;
      }

      outputImage.set(x, y, GwithThreshold);
    }
  }

  outputImage.updatePixels();
  image(outputImage, width / 2, 0, width / 2, height);
}

function brightnessAt(image, x, y) {
  const origColor = image.get(x, y);
  return 0.299 * red(origColor) + 0.587 * green(origColor) + 0.114 * blue(origColor);
}