import React from 'react';
import {IoIosClose} from 'react-icons/io';
import './styles.scss';

export const Notification = props => {
    return (
        <div className={`Notification ${props.active ? 'show' : 'hide'} bg-${props.type}`}>
            <div className="text mr-2">{props.text}</div>
            <div className="close-button h5 mb-0 cursor-pointer" onClick={() => props.closeNotification(props.id)}>
                <IoIosClose />
            </div>
        </div>
    );
};
