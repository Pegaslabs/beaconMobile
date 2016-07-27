import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';


import App from '../ui/App.jsx';
import Login from '../ui/Login.jsx';
import Gallery from '../ui/Gallery.jsx';


export const renderMobileRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        </Route>
        <Route path="/gallery" component={Gallery} />
        <Route path="/main" component={Login} />

    </Router>
);