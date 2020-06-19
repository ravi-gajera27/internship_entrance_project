const initialState = {
    user:{
        _id:'',
        uname:'',
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
    if(action.type === 'EDIT_CONYTACT'){
        return state;
    }
    return state;
}

export default reducer;