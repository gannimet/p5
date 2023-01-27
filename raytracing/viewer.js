class Viewer {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.lookingAngle = radians(45);
    this.initRays();
  }

  initRays() {
    this.rays = [];

    for (let a = degrees(this.lookingAngle) - config.fieldOfViewDegrees / 2; a < degrees(this.lookingAngle) + config.fieldOfViewDegrees / 2; a += config.rayAngleStepDegrees) {
      this.rays.push(new Ray(this.position, radians(a)));
    }
  }

  updateRays() {
    let index = 0;
    for (let a = degrees(this.lookingAngle) - config.fieldOfViewDegrees / 2; a < degrees(this.lookingAngle) + config.fieldOfViewDegrees / 2; a += config.rayAngleStepDegrees) {
      this.rays[index] && this.rays[index].setAngle(radians(a));
      index++;
    }
  }

  moveTo(x, y) {
    this.position.set(x, y);
  }

  rotate(angle) {
    this.lookingAngle += angle;
    this.updateRays();
  }

  move(d) {
    const dirVector = p5.Vector.fromAngle(this.lookingAngle);
    dirVector.setMag(d);

    this.position.add(dirVector);
  }

  rayTrace(walls) {
    const scene = [];

    for (let ray of this.rays) {
      let closestPoint = null;
      let closestDistance = Infinity;

      for (let wall of walls) {
        const hitPoint = ray.cast(wall);

        if (hitPoint) {
          const d = p5.Vector.dist(this.position, hitPoint);

          if (d < closestDistance) {
            closestDistance = d;
            closestPoint = hitPoint;
          }
        }
      }

      if (closestPoint) {
        stroke(255, 255, 0, 100);
        line(this.position.x, this.position.y, closestPoint.x, closestPoint.y);
      }

      scene.push({
        d: closestDistance,
        angle: ray.direction.heading()
      });
    }

    return scene;
  }

  draw() {
    fill(255);
    noStroke();
    ellipse(this.position.x, this.position.y, 10);
  }
}