import React, {Fragment, useState} from 'react';

export const SearchInput = props => {
    const [input, setInput] = useState('');

    const clickHandler = () => {};

    const keyUpHandler = e => {
        if (e.keyCode === 13) {
            clickHandler();
            return false;
        }
    };

    const onChange = e => {
        setInput(e.target.value);
    };

    return <Fragment>{props.children(input, onChange, keyUpHandler, clickHandler)}</Fragment>;
};
