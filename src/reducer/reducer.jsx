import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

const defaultState = {	//设定state的默认值
   mainText:"mainContainer",
   topicText:"topicContainer"
};
const reducer = (state = defaultState, action) => {
    switch (action.type) {	//通过action的返回值来选择更新哪个state的状态
        case 'AlterMain':
            return  Object.assign({},state,{ mainText:action.payload});
        case 'AlterTopic':
            return  Object.assign({},state,{ topicText:action.payload});
        default:
            return state;
    }
};
const RootReducer = combineReducers({	//可以定义多个reducer，然后通过combineReducers来合并
    routing : routerReducer,		//redux和router处理函数
    app : reducer			//app 需要与组件里面上传的state一致
});
export default RootReducer;


