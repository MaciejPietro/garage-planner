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

export default function Camera360({ layer, camera360, scene, catalog }) {
  let { x, y, rotation } = camera360;

  let renderedCamera360 = catalog
    .getElement(camera360.type)
    .render2D(camera360, layer, scene);

  const camera360Width = camera360.properties.getIn(['width', 'length']) / 2;
  const camera360Depth = camera360.properties.getIn(['depth', 'length']) / 2;

  const pointerSize = 10;

  const resizePointers = [
    { x: 0, y: camera360Depth, side: 'top' },
    { x: camera360Width + camera360Depth / 2, y: camera360Depth, side: 'right' },
    { x: -camera360Width - camera360Depth / 2, y: camera360Depth, side: 'left' },
  ];

  return (
    <g
      data-element-root
      data-prototype={camera360.prototype}
      data-id={camera360.id}
      data-selected={camera360.selected}
      data-layer={layer.id}
      style={camera360.selected ? { cursor: 'move' } : {}}
      transform={`translate(${x},${y}) rotate(${rotation})`}
    >
      {renderedCamera360}
      <If condition={camera360.selected}>
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
                data-prototype={camera360.prototype}
                data-id={camera360.id}
                data-selected={camera360.selected}
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

Camera360.propTypes = {
  camera360: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};
