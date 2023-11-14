import React, { useEffect, useState } from 'react';
import { checkIsJSON } from './helper';

const ReactPlannerWrapper = ({ children }, ...props) => {
    const [imageGuide, setImageGuide] = useState(null);
    const [sceneDimensions, setSceneDimensions] = useState({ width: 5000, length: 5000 });
    const [jsonData, setJsonData] = useState(null);
    const [svg, setSvg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const reformatData = (value) => (checkIsJSON(value) ? JSON.parse(value) : value);

    useEffect(() => {
        if (window.self !== window.top) {
            window.addEventListener('message', (event) => {
                const message = event.data && event.data.message;
                const value = event.data && event.data.value;
                if (message === 'getOnboardingData') {
                    setJsonData(value && value.threeDScene);
                    setSceneDimensions(value && value.sceneDimensions);
                    setImageGuide(value && value.imageCropped);
                    setSvg(value && value.svg && reformatData(value.svg));
                    setIsLoaded(true);
                }
            });
        } else {
            setJsonData({});
            setImageGuide(require('../../public/layout-kamery.png'));
            setSceneDimensions({ width: 3236, length: 3961 });
            setIsLoaded(true);
        }
    }, []);

    return (
        <React.Fragment>
            {isLoaded && (
                <React.Fragment>
                    {React.cloneElement(children, {
                        ...props,
                        imageGuide,
                        sceneDimensions,
                        jsonData,
                        svg,
                    })}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
export default ReactPlannerWrapper;
