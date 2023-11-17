export const degToRad = (angle: number) => (angle * Math.PI) / 180;

export const radToDeg = (radians: number) =>
  (Math.atan(radians) * 180) / Math.PI;

export const radToDeg2 = (x: number, y: number) => radToDeg(Math.atan2(y, x));

export const degToPercent = (angle: number) => Math.tan(degToRad(angle)) * 100;

export const percentToDeg = (percent: number) =>
  Math.atan(percent / 100) * (180 / Math.PI);

export const cmToM = (cm: number) => cm / 100;

export const mToCm = (cm: number) => cm * 100;

export function applyAngle(angle: any, point: any) {
  var newPoint = false;

  if (angle && point) {
    // y is negative, so we use Math.floor instead of Math.ceil
    newPoint = {
      ...point,
      x: point.x,
      y: Math.round(point.y / Math.cos(degToRad(angle))),
    };
  }

  return newPoint;
}
