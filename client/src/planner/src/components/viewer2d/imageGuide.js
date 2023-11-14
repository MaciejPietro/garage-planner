import React, {useEffect, useState} from 'react';

export default function ImageGuide({src, sceneDimensions}) {

    return (
        <image href={src} width={sceneDimensions.width} height={sceneDimensions.length}/>
    );
}