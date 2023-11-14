import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemAttributesEditor from './item-attributes-editor';
import LineAttributesEditor from './line-attributes-editor';
import HoleAttributesEditor from './hole-attributes-editor';
import CameraAttributesEditor from './camera-attributes-editor';
import Camera360AttributesEditor from './camera360-attributes-editor';


export default function AttributesEditor({element, onUpdate, onValid, attributeFormData, state, ...rest}) {

  switch (element.prototype) {
    case 'items':
      return <ItemAttributesEditor
              element={element}
              onUpdate={onUpdate}
              onValid={onValid}
              attributeFormData={attributeFormData}
              state={state}
              {...rest}
            />;
    case 'cameras':
      return <CameraAttributesEditor
              element={element}
              onUpdate={onUpdate}
              onValid={onValid}
              attributeFormData={attributeFormData}
              state={state}
              {...rest}
            />;
      case 'cameras360':
      return <Camera360AttributesEditor
              element={element}
              onUpdate={onUpdate}
              onValid={onValid}
              attributeFormData={attributeFormData}
              state={state}
              {...rest}
            />;
    case 'lines':
      return <LineAttributesEditor
              element={element}
              onUpdate={onUpdate}
              onValid={onValid}
              attributeFormData={attributeFormData}
              state={state}
              {...rest}
            />;
    case 'holes':
      return <HoleAttributesEditor
              element={element}
              onUpdate={onUpdate}
              onValid={onValid}
              attributeFormData={attributeFormData}
              state={state}
              {...rest}
            />;
    case 'areas':
      return null;

  }

  return null;
}

AttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};
