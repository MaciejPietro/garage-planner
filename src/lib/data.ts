import GambleRoof from "./roofs/gambleRoof";
import BackDropRoof from "./roofs/backDropRoof";

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
  cuts: [
    {
      type: "window",
      points: [
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: 55,
        },
        {
          x: 100,
          y: 55,
        },
        {
          x: 100,
          y: 0,
        },
      ],
      settings: {
        position: {
          x: 233,
          y: 50,
        },
      },
    },
  ],
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

const gatePoints = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 166,
  },
  {
    x: 160,
    y: 166,
  },
  {
    x: 160,
    y: 0,
  },
];

const gateSurface = {
  type: "gate",
  points: gatePoints,
  cuts: [],
  settings: {
    position3d: {
      x: 1.15,
      y: 0,
      z: 0.02,
    },
    rotation3d: {
      x: 0,
      y: Math.PI * 0.5,
      z: Math.PI * 0.5,
    },
  },
};

export const surfaces = [
  firstSurface,
  secondSurface,
  thirdSurface,
  fourthSurface,
  gateSurface,
];

export const roofs = {
  gamble: GambleRoof,
  backDrop: BackDropRoof,
};
