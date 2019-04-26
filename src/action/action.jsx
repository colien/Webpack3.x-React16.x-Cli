const actions = {
	changeText : function(num){
		console.log("调用actions");
		switch(num){
			case 1:
				return {type:'AlterMain',payload:"mainContainer had been changed"};
			case 2:
				return {type:'AlterTopic',payload:"topicContainer had been changed"};
			default:
				return action;
		}
	},
};
export default actions;
