const initState = {
	list: [], 
	viewDetail: {}, 
	isDetail: false, 
	count: 0, 
}

function writeBlog(state = initState, action) {
	switch(action.type) {
		case types.OPEN_DETAIL_VIEW:
			return {
				...state, 
				...action.payload
			}
		case types.GET_LIST_NOTE:
			return {
				...state, 
				...action.payload
			}
		case types.REMOVE_NOTE:
			return {
				...state, 
				...action.payload
			}
		case types.UPDATE_VIEW_DETAIL_DATA:
			return {
				...state, 
				...action.payload
			}
		case types.CREATE_NOTE:
			return {
				...state, 
				...action.payload
			}
		case types.VIEW_DETAIL_NOTE:
			return {
				...state, 
				...action.payload
			}
		case types.EDIT_NOTE:
			return {
				...state, 
				...action.payload
			}
		default:
			return state;

	}
	return state;
}

module.exports = writeBlog;
