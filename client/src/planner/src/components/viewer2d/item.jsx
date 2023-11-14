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

export default function Item({ layer, item, scene, catalog }) {
  let { x, y, rotation } = item;

  let renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);

  const itemWidth = item.properties.getIn(['width', 'length']);
  const itemHeight = item.properties.getIn(['depth', 'length']);
  const pointerSize = 10;

  const resizePointers = [
    { x: 0, y: itemHeight / 2, side: 'top' },
    { x: 0, y: -itemHeight / 2, side: 'bottom' },
    { x: itemWidth / 2, y: 0, side: 'right' },
    { x: -itemWidth / 2, y: 0, side: 'left' },
  ];

  return (
    <g
      data-element-root
      data-prototype={item.prototype}
      data-id={item.id}
      data-selected={item.selected}
      data-layer={layer.id}
      style={item.selected ? { cursor: 'move' } : {}}
      transform={`translate(${x},${y}) rotate(${rotation})`}
    >
      {renderedItem}
      <If condition={item.selected}>
        <g data-element-root>
          <g
            data-element-root
            data-prototype={item.prototype}
            data-id={item.id}
            data-selected={item.selected}
            data-layer={layer.id}
            data-part="rotation-anchor"
          >
            <circle cx="0" cy="150" r="10" style={STYLE_CIRCLE} />
            <circle cx="0" cy="0" r="150" style={STYLE_CIRCLE2} />
          </g>
          {resizePointers.map((pointer, i) => {
            return (
              <g
                data-element-root
                data-prototype={item.prototype}
                data-id={item.id}
                data-selected={item.selected}
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

Item.propTypes = {
  item: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};
