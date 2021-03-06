import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// components
import {MainRouter, Login, Signup} from './routes/public';

// store
import {UserStore} from './stores';
import {UserAction} from './actions';

const App = () => {
    useEffect(() => {
        UserAction.getUser();
    }, []);
    return (
        <div className="wrapper">
            <Router>
                <Switch>
                    <Route exact path="/login" render={() => <Login store={UserStore} />} />
                    <Route exact path="/signup" render={() => <Signup store={UserStore} />} />
                    <Route path="/" component={MainRouter} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
