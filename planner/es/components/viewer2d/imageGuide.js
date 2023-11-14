import React, { useEffect, useState } from 'react';

export default function ImageGuide(_ref) {
    var src = _ref.src,
        sceneDimensions = _ref.sceneDimensions;


    return React.createElement('image', { href: src, width: sceneDimensions.width, height: sceneDimensions.length });
}