import {observable, action, runInAction, decorate, computed} from 'mobx';

export class Notification {
    // observables
    notifications = [];
    timer = 5000;

    // computed
    get notificationsLength() {
        return this.notifications.length;
    }

    // actions
    addNotification = (text, type) => {
        const id = Date.now() + Math.random();
        setTimeout(() => {
            runInAction(() => {
                this.notifications = this.notifications.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            active: false,
                        };
                    }
                    return item;
                });
            });
        }, this.timer);

        setTimeout(() => {
            runInAction(() => {
                this.notifications = this.notifications.filter(item => {
                    return item.id !== id;
                });
            });
        }, this.timer + 1000);

        this.notifications.push({
            text,
            type,
            id,
            active: true,
        });
    };

    closeNotification = id => {
        this.notifications = this.notifications.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    active: !item.active,
                };
            }
            return item;
        });
    };
}

decorate(Notification, {
    notifications: observable,
    timer: observable,
    notificationsLength: computed,
    addNotification: action,
    closeNotification: action,
});
