import React from 'react';
import PropTypes from 'prop-types';
import If from '../../utils/react-if';

const STYLE_LINE = {
  fill: '#0096fd',
  stroke: '#0096fd',
};

const STYLE_CIRCLE = {
  fill: '#0096fd',
  stroke: '#0096fd',
  cursor: 'move',
};

const STYLE_CIRCLE2 = {
  fill: 'none',
  stroke: '#0096fd',
  cursor: 'move',
};

export default function Camera({ layer, camera, scene, catalog }) {
  let { x, y, rotation } = camera;

  let renderedCamera = catalog.getElement(camera.type).render2D(camera, layer, scene);

  const cameraWidth = camera.properties.getIn(['width', 'length']) / 2;
  const cameraDepth = camera.properties.getIn(['depth', 'length']) / 2;

  let maxValue = 500 - cameraWidth / (Math.PI / 2);

  let maxCameraDepth = cameraDepth > maxValue ? maxValue : cameraDepth;

  const pointerSize = 10;

  const resizePointers = [
    { x: 0, y: cameraDepth, side: 'top' },
    { x: cameraWidth, y: maxCameraDepth, side: 'right' },
    { x: -cameraWidth, y: maxCameraDepth, side: 'left' },
  ];

  return (
    <g
      data-element-root
      data-prototype={camera.prototype}
      data-id={camera.id}
      data-selected={camera.selected}
      data-layer={layer.id}
      style={camera.selected ? { cursor: 'move' } : {}}
      transform={`translate(${x},${y}) rotate(${rotation})`}
    >
      {renderedCamera}
      <If condition={camera.selected}>
        <g data-element-root>
          {/* <g
            data-element-root
            data-prototype={camera.prototype}
            data-id={camera.id}
            data-selected={camera.selected}
            data-layer={layer.id}
            data-part="rotation-anchor"
          >
        <circle cx="0" cy="150" r="10" style={STYLE_CIRCLE} />
        <circle cx="0" cy="0" r="150" style={STYLE_CIRCLE2} />
        </g> */}

          {/* <circle cx="0" cy="0" r={cameraHeight / 2} style={STYLE_CIRCLE2} /> */}

          {resizePointers.map((pointer, i) => {
            return (
              <g
                data-element-root
                data-prototype={camera.prototype}
                data-id={camera.id}
                data-selected={camera.selected}
                data-layer={layer.id}
                data-part="resize-anchor"
                data-side={pointer.side}
                key={i}
              >
                <circle
                  cx={pointer.x}
                  cy={pointer.y}
                  r={pointerSize}
                  style={STYLE_CIRCLE}
                  data-id={pointer.id}
                />
              </g>
            );
          })}
        </g>
      </If>
    </g>
  );
}

Camera.propTypes = {
  camera: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};
