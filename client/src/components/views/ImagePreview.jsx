import React from 'react';
import PT from 'prop-types';

ImagePreview.propTypes = {
    file: PT.string,
    width: PT.number,
    height: PT.number,
};

ImagePreview.defaultProps = {
    file: '',
    width: 300,
    height: 0,
};

export function ImagePreview(props) {
    const {file, width, height} = props;

    if (!file) return null;
    return (
        <div className="ImagePreview">
            <img src={file} alt="Preloader" width={width || 'auto'} height={height || 'auto'} />
        </div>
    );
}
