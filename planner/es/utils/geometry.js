var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/** @description Determines the distance between two points
 *  @param {number} x0 Vertex 0 x
 *  @param {number} y0 Vertex 0 y
 *  @param {number} x1 Vertex 1 x
 *  @param {number} y1 Vertex 1 y
 *  @return {number}
 */
import { toFixedFloat, fAbs } from './math.js';
import { EPSILON } from '../constants';
import { Line3, Vector3 } from "three";

export function compareVertices(v0, v1) {
  return v0.x === v1.x ? v0.y - v1.y : v0.x - v1.x;
}

export function minVertex(v0, v1) {
  return compareVertices(v0, v1) > 0 ? v1 : v0;
}

export function maxVertex(v0, v1) {
  return compareVertices(v0, v1) > 0 ? v0 : v1;
}

export function orderVertices(vertices) {
  return vertices.sort(compareVertices);
}

export function pointsDistance(x0, y0, x1, y1) {
  var diff_x = x0 - x1;
  var diff_y = y0 - y1;

  return Math.sqrt(diff_x * diff_x + diff_y * diff_y);
}

export function verticesDistance(v1, v2) {
  var x0 = v1.x,
      y0 = v1.y;
  var x1 = v2.x,
      y1 = v2.y;


  return pointsDistance(x0, y0, x1, y1);
}

export function horizontalLine(y) {
  return { a: 0, b: 1, c: -y };
}

export function verticalLine(x) {
  return { a: 1, b: 0, c: -x };
}

export function linePassingThroughTwoPoints(x1, y1, x2, y2) {
  if (x1 === x2 && y1 == y2) throw new Error('Geometry error');
  if (x1 === x2) return verticalLine(x);
  if (y1 === y2) return horizontalLine(y1);

  return {
    a: y1 - y2,
    b: x2 - x1,
    c: y2 * x1 - x2 * y1
  };
}

export function distancePointFromLine(a, b, c, x, y) {
  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  return fAbs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
}

export function closestPointFromLine(a, b, c, x, y) {
  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  var denom = a * a + b * b;
  return {
    x: (b * (b * x - a * y) - a * c) / denom,
    y: (a * -b * x + a * y - b * c) / denom
  };
}

/** @description Get point of intersection between two lines using ax+by+c line's equation
 *  @param {number} a x coefficent of first line
 *  @param {number} b y coefficent of first line
 *  @param {number} c costant of first line
 *  @param {number} j x coefficent of second line
 *  @param {number} k y coefficent of second line
 *  @param {number} l costant of second line
 *  @return {object} {x,y} point's coordinates
 */
export function twoLinesIntersection(a, b, c, j, k, l) {
  var angularCoefficientsDiff = b * j - a * k;

  if (angularCoefficientsDiff === 0) return undefined; //no intersection

  var y = (a * l - c * j) / angularCoefficientsDiff;
  var x = (c * k - b * l) / angularCoefficientsDiff;
  return { x: x, y: y };
}

export function twoLineSegmentsIntersection(p1, p2, p3, p4) {
  //https://github.com/psalaets/line-intersect/blob/master/lib/check-intersection.js

  var x1 = p1.x,
      y1 = p1.y;
  var x2 = p2.x,
      y2 = p2.y;
  var x3 = p3.x,
      y3 = p3.y;
  var x4 = p4.x,
      y4 = p4.y;


  var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  var numA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  var numB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

  if (fAbs(denom) <= EPSILON) {
    if (fAbs(numA) <= EPSILON && fAbs(numB) <= EPSILON) {

      var comparator = function comparator(pa, pb) {
        return pa.x === pb.x ? pa.y - pb.y : pa.x - pb.x;
      };
      var line0 = [p1, p2].sort(comparator);
      var line1 = [p3.toJS(), p4.toJS()].sort(comparator);

      var _sort = [line0, line1].sort(function (lineA, lineB) {
        return comparator(lineA[0], lineB[0]);
      }),
          _sort2 = _slicedToArray(_sort, 2),
          lineSX = _sort2[0],
          lineDX = _sort2[1];

      if (lineSX[1].x === lineDX[0].x) {
        return { type: lineDX[0].y <= lineSX[1].y ? 'colinear' : 'none' };
      } else {
        return { type: lineDX[0].x <= lineSX[1].x ? 'colinear' : 'none' };
      }
    }
    return { type: 'parallel' };
  }

  var uA = numA / denom;
  var uB = numB / denom;

  if (uA >= 0 - EPSILON && uA <= 1 + EPSILON && uB >= 0 - EPSILON && uB <= 1 + EPSILON) {
    var point = {
      x: x1 + uA * (x2 - x1),
      y: y1 + uA * (y2 - y1)
    };
    return { type: 'intersecting', point: point };
  }

  return { type: 'none' };
}

export function distancePointFromLineSegment(x1, y1, x2, y2, xp, yp) {
  //http://stackoverflow.com/a/6853926/1398836

  var A = xp - x1;
  var B = yp - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
    param = dot / len_sq;

  var xx = void 0,
      yy = void 0;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = xp - xx;
  var dy = yp - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 *
 * @param x1 {number} x for first vertex of the segment
 * @param y1 {number} y for first vertex of the segment
 * @param x2 {number} x for second vertex of the segment
 * @param y2 {number} y for second vertex of the segment
 * @param xp {number} x for point we want to verify
 * @param yp {number} y for point we want to verify
 * @param maxDistance {number} the epsilon value used for comparisons
 * @returns {boolean} true if the point lies on the line segment false otherwise
 */
export function isPointOnLineSegment(x1, y1, x2, y2, xp, yp) {
  var maxDistance = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : EPSILON;

  return distancePointFromLineSegment(x1, y1, x2, y2, xp, yp) <= maxDistance;
}

export function closestPointFromLineSegment(x1, y1, x2, y2, xp, yp) {
  if (x1 === x2) return { x: x1, y: yp };
  if (y1 === y2) return { x: xp, y: y1 };

  var m = (y2 - y1) / (x2 - x1);
  var q = y1 - m * x1;

  var mi = -1 / m;
  var qi = yp - mi * xp;

  var x = (qi - q) / (m - mi);
  var y = m * x + q;

  return { x: x, y: y };
}

export function pointPositionOnLineSegment(x1, y1, x2, y2, xp, yp) {
  var length = pointsDistance(x1, y1, x2, y2);
  var distance = pointsDistance(x1, y1, xp, yp);

  var offset = distance / length;
  if (x1 > x2) offset = mapRange(offset, 0, 1, 1, 0);

  return offset;
}

export function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export function angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2) {
  return -Math.atan2(y1 - y2, x2 - x1) * 180 / Math.PI;
}

export function angleBetweenTwoPoints(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

export function absAngleBetweenTwoPoints(x1, y1, x2, y2) {
  return Math.atan2(Math.abs(y2 - y1), Math.abs(x2 - x1));
}

export function samePoints(_ref, _ref2) {
  var x1 = _ref.x,
      y1 = _ref.y;
  var x2 = _ref2.x,
      y2 = _ref2.y;

  return fAbs(x1 - x2) <= EPSILON && fAbs(y1 - y2) <= EPSILON;
}

/** @description Extend line based on coordinates and new line length
 *  @param {number} x1 Vertex 1 x
 *  @param {number} y1 Vertex 1 y
 *  @param {number} x2 Vertex 2 x
 *  @param {number} y2 Vertex 2 y
 *  @param {number} newDistance New line length
 *  @return {object}
 */
export function extendLine(x1, y1, x2, y2, newDistance) {
  var precision = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 6;

  var rad = angleBetweenTwoPoints(x1, y1, x2, y2);

  return {
    x: toFixedFloat(x1 + Math.cos(rad) * newDistance, precision),
    y: toFixedFloat(y1 + Math.sin(rad) * newDistance, precision)
  };
}

export function roundVertex(vertex) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;

  vertex.set('x', toFixedFloat(vertex.get('x'), precision));
  vertex.set('y', toFixedFloat(vertex.get('y'), precision));

  return vertex;
}

//https://github.com/MartyWallace/PolyK
export function ContainsPoint(polygon, pointX, pointY) {
  var n = polygon.length >> 1;

  var ax = void 0,
      lup = void 0;
  var ay = polygon[2 * n - 3] - pointY;
  var bx = polygon[2 * n - 2] - pointX;
  var by = polygon[2 * n - 1] - pointY;

  if (bx === 0 && by === 0) return false; // point on edge

  // let lup = by > ay;
  for (var ii = 0; ii < n; ii++) {
    ax = bx;
    ay = by;
    bx = polygon[2 * ii] - pointX;
    by = polygon[2 * ii + 1] - pointY;
    if (bx === 0 && by === 0) return false; // point on edge
    if (ay === by) continue;
    lup = by > ay;
  }

  var depth = 0;
  for (var i = 0; i < n; i++) {
    ax = bx;
    ay = by;
    bx = polygon[2 * i] - pointX;
    by = polygon[2 * i + 1] - pointY;
    if (ay < 0 && by < 0) continue; // both 'up' or both 'down'
    if (ay > 0 && by > 0) continue; // both 'up' or both 'down'
    if (ax < 0 && bx < 0) continue; // both points on the left

    if (ay === by && Math.min(ax, bx) < 0) return true;
    if (ay === by) continue;

    var lx = ax + (bx - ax) * -ay / (by - ay);
    if (lx === 0) return false; // point on edge
    if (lx > 0) depth++;
    if (ay === 0 && lup && by > ay) depth--; // hit vertex, both up
    if (ay === 0 && !lup && by < ay) depth--; // hit vertex, both down
    lup = by > ay;
  }
  return (depth & 1) === 1;
}

export function cosWithThreshold(alpha, threshold) {
  var cos = Math.cos(alpha);
  return cos < threshold ? 0 : cos;
}

export function sinWithThreshold(alpha, threshold) {
  var sin = Math.sin(alpha);
  return sin < threshold ? 0 : sin;
}

export function midPoint(x1, y1, x2, y2) {
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
}

export function verticesMidPoint(verticesArray) {
  var res = verticesArray.reduce(function (incr, vertex) {
    return { x: incr.x + vertex.x, y: incr.y + vertex.y };
  }, { x: 0, y: 0 });
  return { x: res.x / verticesArray.length, y: res.y / verticesArray.length };
}

export function rotatePointAroundPoint(px, py, ox, oy, theta) {

  var thetaRad = theta * Math.PI / 180;

  var cos = Math.cos(thetaRad);
  var sin = Math.sin(thetaRad);

  var deltaX = px - ox;
  var deltaY = py - oy;

  return {
    x: cos * deltaX - sin * deltaY + ox,
    y: sin * deltaX + cos * deltaY + oy
  };
}

export function checkCrossProduct(linePoint1, linePoint2, currentPoint) {
  var v1 = [linePoint2.x - linePoint1.x, linePoint2.y - linePoint1.y];
  var v2 = [linePoint2.x - currentPoint.x, linePoint2.y - currentPoint.y]; // # Vector 1
  var xp = v1[0] * v2[1] - v1[1] * v2[0]; // Cross product

  // if (xp > 0){
  //   console.log('one side')
  // }
  // else if (xp < 0) {
  //   console.log('other side');
  // }
  // else {
  //   console.log('on the same line!')
  // }
  return xp;
}
/** @description Extend line based on coordinates and new line length
 *  @param {number} x Vertex  x
 *  @param {number} y Vertex  y
 *  @param {number} angle angle
 *  @param {number} newDistance New line length
 *  @return {object}
 */
export function findPointOnLineByPointAndAngle(x, y, angle, distance) {

  var result = {};
  result.x = Math.cos(angle * Math.PI / 180) * distance + x;
  result.y = Math.sin(angle * Math.PI / 180) * distance + y;

  return result;
}

/** @description Get distance from virtual line based on coordinates, angle of line and new point
 *  @return {object}
 * @param startingLinePointX
 * @param startingLinePointY
 * @param lineAngle
 * @param currentPointX
 * @param currentPointY
 */
export function calculatePointFromLineWithAngleAndPoint(startingLinePointX, startingLinePointY, lineAngle, currentPointX, currentPointY) {

  var extremeMaxPoint = findPointOnLineByPointAndAngle(startingLinePointX, startingLinePointY, lineAngle, 10000);
  var extremeMinPoint = findPointOnLineByPointAndAngle(startingLinePointX, startingLinePointY, lineAngle, -10000);

  var A = new Vector3(currentPointX, currentPointY, 0);
  var B = new Vector3(extremeMaxPoint.x, extremeMaxPoint.y, 0); // line base point 1
  var C = new Vector3(extremeMinPoint.x, extremeMinPoint.y, 0); // line base point 2

  var line = new Line3(B, C);
  var distance = line.closestPointToPoint(A).distanceTo(A);

  var checkCross = checkCrossProduct({ x: extremeMinPoint.x, y: extremeMinPoint.y }, { x: extremeMaxPoint.x, y: extremeMaxPoint.y }, { x: currentPointX, y: currentPointY });

  //above or below
  var relation = -1;
  if (checkCross < 0) relation = 1;

  return { distance: distance, relation: relation };
}