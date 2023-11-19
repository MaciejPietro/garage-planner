export const windowCut = {
  type: "window",
  points: [
    {
      x: 0,
      y: 0,
    },
    {
      x: 55,
      y: 0,
    },
    {
      x: 55,
      y: 100,
    },
    {
      x: 0,
      y: 100,
    },
  ],
  settings: {
    position: {
      x: 0,
      y: 0,
    },
  },
};

const surfacePoints = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 400,
  },
  {
    x: 200,
    y: 400,
  },
  {
    x: 200,
    y: 0,
  },
];

const firstSurface = {
  type: "wall",
  points: surfacePoints,
  cuts: [],
  settings: {
    position3d: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation3d: {
      x: 0,
      y: Math.PI * 0.5,
      z: Math.PI * 0.5,
    },
  },
};

const secondSurface = {
  type: "wall",
  points: surfacePoints,
  cuts: [windowCut],
  settings: {
    position3d: {
      x: 0,
      y: 0,
      z: -4,
    },
    rotation3d: {
      x: 0,
      y: 0,
      z: Math.PI * 0.5,
    },
  },
};

const thirdSurface = {
  type: "wall",
  points: surfacePoints,
  cuts: [],
  settings: {
    position3d: {
      x: 0,
      y: 0,
      z: -4,
    },
    rotation3d: {
      x: 0,
      y: Math.PI * 0.5,
      z: Math.PI * 0.5,
    },
  },
};

const fourthSurface = {
  type: "wall",
  points: surfacePoints,
  cuts: [],
  settings: {
    position3d: {
      x: 4,
      y: 0,
      z: -4,
    },
    rotation3d: {
      x: 0,
      y: 0,
      z: Math.PI * 0.5,
    },
  },
};

export const surfaces = [
  firstSurface,
  secondSurface,
  thirdSurface,
  fourthSurface,
];

export const roofs = {};
