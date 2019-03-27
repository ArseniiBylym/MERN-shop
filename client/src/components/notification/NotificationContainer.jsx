import React, {useEffect, useContext} from 'react';
import './styles.scss';
import {observer} from 'mobx-react-lite';
import {NotificationStore} from '../../stores';
import {Notification} from '.';

export const NotificationContainer = observer(() => {
    const store = useContext(NotificationStore);
    return (
        <div className="NotificationContainer position-absolute">
            {store.notifications.map(item => {
                return <Notification key={item.text} {...item} closeNotification={store.closeNotification} />;
            })}
        </div>
    );
});
