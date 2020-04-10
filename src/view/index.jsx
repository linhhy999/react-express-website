import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loadable from 'react-loadable';
import Loading from './components/common/Loading.jsx';
import './css/index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


const routes = [
    <Route key="/" exact path='/' component={Loadable({ loading: Loading, loader: () => import('./components/Login') })} />,
    <Route key="/login" exact path='/login' component={Loadable({ loading: Loading, loader: () => import('./components/Login') })} />,
    <Route key="/signup" exact path='/signup' component={Loadable({ loading: Loading, loader: () => import('./components/Signup') })} />,
    <Route key="*" path='*' component={Loadable({ loading: Loading, loader: () => import('./components/404') })} />,
].sort((i,j) => i.key < j.key ? 1 : -1)

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                {routes}
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();