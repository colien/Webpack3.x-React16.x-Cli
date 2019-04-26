import {createStore,combineReducers,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';			//中间件

import RootReducer from '../reducer/reducer.jsx';	//引入reduce

var store = createStore(	// 自动生成 store 的函数
    RootReducer,		// reduce ,修改 state 状态的函数集合
    applyMiddleware(ReduxThunk)	// 中间件
);

export default store;
