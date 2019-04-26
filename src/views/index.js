import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

// 这里用 react-router-dom，这个模块有几个接口：NavLink 、Route 、BrowserRouter、HashRouter、Swith、Redirect 等 
import {NavLink,Route,BrowserRouter,HashRouter as Router, Swith,Redirect} from 'react-router-dom';

import RouteConfig from '../router/router.jsx';
import Store from '../store/store.jsx';


ReactDom.render(
    <Provider store={Store}>
        <Router>
            {RouteConfig}
        </Router>
    </Provider>,
    document.getElementById('root')
)

