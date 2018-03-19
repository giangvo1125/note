const onOpenDetailModal = (isDetail = true) => (dispatch) => {
	var obj = {
		isDetail: isDetail
	}
	if(isDetail == false) {
		obj.viewDetail = {type: []}
	}
	dispatch({
		type: types.OPEN_DETAIL_VIEW, 
		payload: obj
	})
}

const getListNote = () => (dispatch, getState) => {
	axios.post('https://blogs-ibcurt.herokuapp.com/get-list-note', {})
	.then((response) => {
		let { data: {data} } = response
		if(response.data.data.rows) {
			for(let i = 0; i < response.data.data.rows.length; i++) {
				var item = response.data.data.rows[i];
				if(item.type) {
					var replaceString1  = item.type.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
					var jsonstring = replaceString1.replace(/'/g, '"');
					item.type = JSON.parse(jsonstring)
					if(typeof item.type == 'string') {
						item.type = JSON.parse(item.type)
					}
				}
			}
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
	dispatch({
		type: types.UPDATE_VIEW_DETAIL_DATA, 
		payload: {viewDetail: newVal}
	})
}

const createNote = () => (dispatch, getState) => {
	return new Promise((a, b) => {
		let { viewDetail } = getState().note
		if(viewDetail.type) {
			viewDetail.type = JSON.stringify(viewDetail.type)
		}
		axios.post('https://blogs-ibcurt.herokuapp.com/create-note', viewDetail)
		.then((response) => {
			let {data: {status}} = response
			if(status == 0) {
				dispatch({
					type: types.CREATE_NOTE, 
					payload: {viewDetail: {type: []}}
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

const updateNote = (obj = {}) => (dispatch, getState) => {
	return new Promise((a, b) => {
		let { viewDetail } = getState().note
		if(!_.isEmpty(obj)) {
			viewDetail = obj
		}
		if(viewDetail.type) {
			viewDetail.type = JSON.stringify(viewDetail.type)
		}
		axios.post('https://blogs-ibcurt.herokuapp.com/edit-note', viewDetail)
		.then((response) => {
			let {data: {status}} = response
			if(status == 0) {
				let payload = {viewDetail: {type: []}}
				if(_.isEmpty(obj)) {
					payload.list = []
				}
				dispatch({
					type: types.EDIT_NOTE, 
					payload: payload
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

const updateValueCheckBox = (value) => (dispatch) => {
	dispatch({
		type: types.UPDATE_VALUE_CHECKBOX, 
		payload: {valueCheckBox : value}
	})
}
const addCheckList = () => (dispatch, getState) => {
	let { viewDetail, valueCheckBox } = getState().note;
	let newDetail = JSON.parse(JSON.stringify(viewDetail))
	newDetail.type.push({t: valueCheckBox, ic: 0})
	dispatch({
		type: types.ADD_CHECK_LIST, 
		payload: {viewDetail: newDetail, valueCheckBox: ''}
	})
}
const checkInCheckList = (item, index, idNote) => (dispatch, getState) => {
	let { viewDetail, valueCheckBox, list } = getState().note;
	let newDetail = JSON.parse(JSON.stringify(viewDetail))
	if(newDetail.type[index]) {
		newDetail.type[index].ic = item.ic == 0 ? 1 : 0;
		dispatch({
			type: types.CHECK_IN_CHECK_LIST, 
			payload: {viewDetail: newDetail}
		})
		if(idNote) {
			let indexList = _.findIndex(list, (i) => {
				return i.id == idNote
			})
			if(indexList != -1) {
				dispatch(checkInCheckListOnListNote(indexList, index))
			}
		}
	}
}

const removeItemCheckList = (index) => (dispatch, getState) => {
	let { viewDetail, valueCheckBox } = getState().note;
	let newDetail = JSON.parse(JSON.stringify(viewDetail))
	if(newDetail.type[index]) {
		newDetail.type.splice(index, 1)
		dispatch({
			type: types.REMOVE_ITEM_CHECK_LIST, 
			payload: {viewDetail: newDetail}
		})	
	}
}

const checkInCheckListOnListNote = (indexList, indexType) => (dispatch, getState) => {
	return new Promise((a, b) => {
		let { list } = getState().note;
		let newList = JSON.parse(JSON.stringify(list))
		for(let i = 0; i < newList.length; i++) {
			if(newList[indexList]) {
				if(newList[indexList].type && newList[indexList].type[indexType]) {
					newList[indexList].type[indexType].ic = newList[indexList].type[indexType].ic == 0 ? 1 : 0;
					// dispatch(updateNote(newList[indexList]))
					dispatch({
						type: types.CHECK_IN_CHECK_LIST, 
						payload: {list: newList}
					})
					var newNote = JSON.parse(JSON.stringify(newList[indexList]))
					a(newNote);
					break;
				}
			}
		}
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
	updateValueCheckBox, 
	addCheckList, 
	checkInCheckList, 
	removeItemCheckList, 
	checkInCheckListOnListNote, 
}