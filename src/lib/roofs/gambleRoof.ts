const roofPoints = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 400,
  },
  {
    x: 238,
    y: 400,
  },
  {
    x: 238,
    y: 0,
  },
];

const gambleRoofLeftSurface = {
  type: "roof",
  points: roofPoints,
  cuts: [],
  settings: {
    position3d: {
      x: -0.225,
      y: 1.925,
      z: -4,
    },
    rotation3d: {
      x: 0,
      y: 0,
      z: Math.PI * 0.125,
    },
  },
};

const gambleRoofRightSurface = {
  type: "roof",
  points: roofPoints,
  cuts: [],
  settings: {
    position3d: {
      x: 1.97,
      y: 2.84,
      z: -4,
    },
    rotation3d: {
      x: 0,
      y: 0,
      z: Math.PI * -0.125,
    },
  },
};

export default [gambleRoofLeftSurface, gambleRoofRightSurface];
