import React from 'react';
import { Router, Route, browserHistory } from 'react-router';


import App from '../ui/App.jsx';
import Login from '../ui/Login.jsx';
import Gallery from '../ui/Gallery.jsx';


export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="/gallery" component={Gallery}/>
    </Router>
);