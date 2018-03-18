const onOpenDetailModal = (isDetail = true) => (dispatch) => {
	dispatch({
		type: types.OPEN_DETAIL_VIEW, 
		payload: { isDetail: isDetail }
	})
}

const getListNote = () => (dispatch, getState) => {
	axios.post('https://blogs-ibcurt.herokuapp.com/get-list-note', {})
	.then((response) => {
		let { data: {data} } = response
		if(data) {
			dispatch({
				type: types.GET_LIST_NOTE, 
				payload: {
					count: response.data.data.count, 
					list: response.data.data.rows, 
				}
			})
		}
	}, (err) => {
		console.log('err ',err)
	})
}

const removeNote = (note) => (dispatch) => {
	return new Promise((a, b) => {
		axios.get(`https://blogs-ibcurt.herokuapp.com/remove-note/${note.id}`)
		.then((response) => {
			let {data: {status}} = response
			if(status == 0) {
				dispatch({
					type: types.REMOVE_NOTE, 
					payload: {}, 
				})
				dispatch(getListNote())
				a()
			}
			else {
				b()
			}
		}, (err) => {
			console.log('err ',err)
		})
	})
}

const updateViewDetail = (key, value) => (dispatch, getState) => {
	let {viewDetail} = getState().note;
	let newVal = JSON.parse(JSON.stringify(viewDetail))
	newVal[key] = value;
	console.log('newVal ',newVal)
	dispatch({
		type: types.UPDATE_VIEW_DETAIL_DATA, 
		payload: {viewDetail: newVal}
	})
}

const createNote = () => (dispatch, getState) => {
	return new Promise((a, b) => {
		let { viewDetail } = getState().note
		axios.post('https://blogs-ibcurt.herokuapp.com/create-note', viewDetail)
		.then((response) => {
			let {data: {status}} = response
			if(status == 0) {
				dispatch({
					type: types.CREATE_NOTE, 
					payload: {viewDetail: {}}
				})
				dispatch(getListNote())
				a()
			}
			else {
				b()
			}
		}, (err) => {
			console.log('err ',err)
			b()
		})
	})
}

const viewDetailNote = (note) => (dispatch) => {
	return new Promise((a, b) => {
		dispatch({
			type: types.VIEW_DETAIL_NOTE, 
			payload: {viewDetail: JSON.parse(JSON.stringify(note))}
		})
		a();
	})
}

const updateNote = () => (dispatch, getState) => {
	return new Promise((a, b) => {
		let { viewDetail } = getState().note
		axios.post('https://blogs-ibcurt.herokuapp.com/edit-note', viewDetail)
		.then((response) => {
			let {data: {status}} = response
			if(status == 0) {
				dispatch({
					type: types.EDIT_NOTE, 
					payload: {viewDetail: {}}
				})
				dispatch(getListNote())
				a()
			}
			else {
				b()
			}
		}, (err) => {
			console.log('err ',err)
			b()
		})
	})
}

module.exports = {
	onOpenDetailModal, 
	getListNote, 
	removeNote, 
	updateViewDetail, 
	createNote, 
	viewDetailNote, 
	updateNote, 
}