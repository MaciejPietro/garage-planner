import { mToCm } from "../../planner/helpers";

export const getGambleRoof = ({ wallHeight, dimension }: any) => {
  const length = mToCm(dimension.length);
  const width = mToCm(dimension.width);

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
          y: length + 40,
        },
        {
          x: width * 0.5 + 40,
          y: length + 40,
        },
        {
          x: width * 0.5 + 40,
          y: 0,
        },
      ],
      cuts: [],
      settings: {
        position3d: {
          x: -0.2,
          y: wallHeight,
          z: 0.2,
        },
        rotation3d: {
          x: Math.PI * -0.5,
          y: 0,
          z: 0,
        },
      },
    },
  ];
};
