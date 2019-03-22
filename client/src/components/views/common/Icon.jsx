import React from 'react';
import PT from 'prop-types';

Icon.propTypes = {
    icon: PT.string.isRequired,
    size: PT.number,
    color: PT.string,
};

Icon.defaultProps = {
    size: 16,
    // color: 'inherit',
};

export function Icon(props) {
    const styles = {
        svg: {
            display: 'inline-block',
            verticalAlign: 'middle',
        },
        path: {
            fill: props.color,
        },
    };

    return (
        <svg style={styles.svg} width={`${props.size}px`} height={`${props.size}px`} stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024">
            <path style={styles.path} d={props.icon} />
        </svg>
    );
}
