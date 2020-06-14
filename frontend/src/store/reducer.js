const initialState = {
    user:{
        name:'',
        email:'',
        mobileNo:'',
        status:'',
    }
}
const reducer = (state = initialState,action) => {
    if(action.type === 'SELECT_CONTACT'){
        let newState = {...state};
        newState.user = action.val;
        return newState;
    }
    return state;
}

export default reducer;