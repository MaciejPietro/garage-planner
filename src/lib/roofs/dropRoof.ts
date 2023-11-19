import { mToCm } from "../../planner/helpers";

export const DROP_ROTATION = Math.PI * 0.03;

export const CANOPY_OFFSET = 40;

export const getdropRoof = ({ name, wallHeight, dimension }: any) => {
  const length = mToCm(dimension.length);
  const width = mToCm(dimension.width);

  const isBack = name === "dropBack";
  const isLeft = name === "dropLeft";
  const isRight = name === "dropRight";

  return [
    {
      type: "roof",
      points: [
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: length + CANOPY_OFFSET,
        },
        {
          x: width + CANOPY_OFFSET,
          y: length + CANOPY_OFFSET,
        },
        {
          x: width + CANOPY_OFFSET,
          y: 0,
        },
      ],
      cuts: [],
      settings: {
        position3d: {
          x: (width / 100) * 0.5,
          y: wallHeight,
          z: (-length / 100) * 0.5,
        },
        rotation3d: {
          x: Math.PI * -0.5 + (isBack ? -DROP_ROTATION : 0),
          y: 0 + (isLeft ? -DROP_ROTATION : isRight ? DROP_ROTATION : 0),
          z: 0,
        },
      },
    },
  ];
};
