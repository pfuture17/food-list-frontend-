const initialState = {
    foods: [],
    feedbacks: [],
    comments:[],
    admins:[]
}
const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case "setFoods" :
            return {
                ...state,
                foods: action.payload
            }
        case "setFeedbacks" :
            return {
                ...state,
                feedbacks: action.payload
            }
        case "setComments" :
            return {
                ...state,
                comments: action.payload
            }
        case "setAdmins" :
            return {
                ...state,
                admins: action.payload
            }
        default:
            return state;
    }
}

export default reducer;