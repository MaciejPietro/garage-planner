const roofPoints = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 440,
  },
  {
    x: 440,
    y: 440,
  },
  {
    x: 440,
    y: 0,
  },
];

const backDropSurface = {
  type: "roof",
  points: roofPoints,
  cuts: [],
  settings: {
    position3d: {
      x: -0.225,
      y: 2,
      z: -4.25,
    },
    rotation3d: {
      x: Math.PI * -0.025,
      y: 0,
      z: 0,
    },
  },
};

export default [backDropSurface];
