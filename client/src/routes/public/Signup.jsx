import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import './style.scss';
import {Redirect} from 'react-router-dom';
import {UserAction} from '../../actions';
import {Input} from '../../components/form/Input';

export const Signup = observer(({store}) => {
    const [form, setForm] = useState({name: '', email: '', password: '', confirmPassword: ''});

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onKeyUpHandler = e => {
        if (e.keyCode === 13) {
            signupHandler();
            return false;
        }
    };

    const signupHandler = () => {
        UserAction.registerUser(form);
    };

    const formInvalid = () => {
        return !form.name || !form.email || !form.password || !form.confirmPassword;
    };

    const getError = fieldName => {
        if (!store.registerError) return '';

        const error = store.registerError.find(item => {
            return item.field === fieldName;
        });
        return error ? error.errorMessage : '';
    };

    if (!store.dataFetched) return null;
    if (store.user) {
        return <Redirect to="/" />;
    }
    return (
        <div className="Login container d-flex align-items-center justify-content-center">
            <div className="card px-5 py-3">
                <div className="card-header text-center bg-primary text-white">
                    <h4>Create a new account</h4>
                </div>
                <div className="card-body">
                    <Input value={form.name} type="text" name="name" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Name" error={getError('name')} />
                    <Input value={form.email} type="email" name="email" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Email" error={getError('email')} />
                    <Input value={form.password} type="password" name="password" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Password" error={getError('password')} />
                    <Input
                        value={form.confirmPassword}
                        type="password"
                        name="confirmPassword"
                        onChange={onChangeHandler}
                        onKeyUp={onKeyUpHandler}
                        labelText="Confirm password"
                        error={getError('confirmPassword')}
                    />
                </div>
                <div className="text-center mb-2">
                    <button onClick={signupHandler} className="btn btn-info px-3" disabled={formInvalid()}>
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
});
