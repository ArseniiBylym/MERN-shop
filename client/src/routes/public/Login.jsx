import React, {useState, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import './style.scss';
import {Redirect, NavLink} from 'react-router-dom';
import {UserAction} from '../../actions';
import {NotificationStore} from '../../stores';
import {Input} from '../../components/form/Input';

export const Login = observer(({store}) => {
    const [form, setForm] = useState({email: '', password: ''});
    const notificationStore = useContext(NotificationStore);

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onKeyUpHandler = e => {
        if (e.keyCode === 13) {
            loginHandler();
            return false;
        }
    };

    const loginHandler = () => {
        UserAction.loginUser(form);
    };

    const formInvalid = () => {
        return !form.email || !form.password;
    };

    const getError = fieldName => {
        if (!store.loginError) return '';

        const error = store.loginError.find(item => {
            return item.field === fieldName;
        });
        return error ? error.errorMessage : '';
    };

    if (!store.dataFetched) return null;
    if (store.user) {
        notificationStore.addNotification(`You loged in as ${store.user.name}`, 'success');
        return <Redirect to="/" />;
    }
    return (
        <div className="Login container d-flex align-items-center justify-content-center">
            <div className="card px-5 py-3">
                <div className="card-header text-center bg-primary text-primary_black">
                    <h4>Login form</h4>
                </div>
                <div className="card-body">
                    <Input value={form.email} type="email" name="email" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Email" error={getError('email')} />
                    <Input
                        value={form.password}
                        type="password"
                        name="password"
                        onChange={onChangeHandler}
                        onKeyUp={onKeyUpHandler}
                        labelText="Password"
                        error={getError('password')}
                    />
                </div>
                <div className="text-center mb-2">
                    <button onClick={loginHandler} className="btn btn-info px-4 mb-2" disabled={formInvalid()}>
                        Login
                    </button>
                    <NavLink to="/signup">
                        <p>Haven't yet account? Register</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
});
