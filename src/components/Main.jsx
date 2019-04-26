import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink as Link} from 'react-router-dom';
import {connect} from 'react-redux';
import P from 'prop-types';

import actions from '../action/action.jsx';//引入actions

//mapstoreStateToProps 这里指定Main控件需要上传的state
const mapStoreStateToProps = (state) =>(
    {
         mainText:state.app.mainText, //mainText是变量，值对应的state.app.mainText的存储空间，其中app与reducers里面定义的一致。
    }
);

//mapDispatchToProps 这里上传处理state函数，即action里面定义的函数
const mapDispatchToProps = (dispatch,ownProps)=> ({
   fn:{
       changeText:(num)=> dispatch(actions.changeText(num))
   }
});

//这样state一致上传到store，需要取值用props取就ok
class MainComponent extends React.Component{
    render(){
      return(
          <div>
             <h1>mainText:{this.props.mainText}</h1>        
             <button onClick={()=>this.props.fn.changeText(1)}>修改mainText的值</button>

             <Link to="/topic">jumpe to Topic</Link>         
          </div>
      );  
    }
}
//最后调用connect函数，把组件和store连接起来
export default connect(mapStoreStateToProps,mapDispatchToProps)(MainComponent);
