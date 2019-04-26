import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink,Route,BrowserRouter as Router,HashRouter,Switch,Redirect}  from 'react-router-dom';

import MainComponent from '../components/Main.jsx';//引进组件
import Topic from '../components/Topic.jsx';//引进组件

const routes =[
    {
        path:'/',
        exact:true,
        component: MainComponent
    },
    {
        path:'/topic',
        exact:false,
        component:Topic
    },
];
const RouteConfig = (
    <Switch>
    {
	routes.map((route,index)=>(
	    <Route
                key ={index}
                path={route.path}
                exact={route.exact}
                component={route.component}                
            />
        ))
    }
    </Switch>
);

export default RouteConfig;
