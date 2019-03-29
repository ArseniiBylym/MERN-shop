import React, {useRef, useEffect, useState} from 'react';
import './style.scss';
import PT from 'prop-types';

export const Spinner = ({size, paddingTop}) => {
    const spinnerContainer = useRef(null);
    const [height, setHeight] = useState('auto');
    useEffect(() => {
        const parrentElem = spinnerContainer.current.parentNode;
        const fullHeight = getComputedStyle(parrentElem).height;
        const heightWithoutPaddings = `${parseFloat(fullHeight) -
            parseFloat(getComputedStyle(parrentElem).paddingTop) -
            parseFloat(getComputedStyle(parrentElem).paddingBottom)}px`;
        setHeight(heightWithoutPaddings);
    }, []);

    return (
        <div ref={spinnerContainer} className="Spinner__container" style={{height, paddingTop}}>
            <div className="Spinner" style={{width: size, height: size}} />
        </div>
    );
};

Spinner.propTypes = {
    size: PT.string,
    paddingTop: PT.string,
};

Spinner.defaultProps = {
    size: '64px',
    paddingTop: '0px',
};
