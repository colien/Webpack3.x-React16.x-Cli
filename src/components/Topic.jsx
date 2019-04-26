import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink as Link} from 'react-router-dom';
import {connect} from 'react-redux';

import actions from '../action/action.jsx';

const mapStoreStateToProps = (state) =>(
    {
         topicText:state.app.topicText,
    }
)

const mapDispatchToProps = (dispatch,ownProps)=> ({
   fn:{
       changeText:(num)=> dispatch(actions.changeText(num))
   }
});

class Topic extends React.Component{
    render(){
      return(
          <div>
              <h1>topicText:{this.props.topicText}</h1>
              <button onClick={()=>this.props.fn.changeText(2)}>修改topicText的值</button>       
              <Link to="/">jumpe to Main</Link>         
          </div>
      );  
    }
}

export default connect(mapStoreStateToProps,mapDispatchToProps)(Topic);


