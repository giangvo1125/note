import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import noteAction from '../../actions/note_action'

import Modal from '../partials/modal'

class DetailComponent extends Component {
	constructor(props, context) {
		super(props);
        context.router
	}
	componentWillMount() {
	}
	componentDidUpdate() {

	}
	componentDidMount() {

	}
	_onCloseModal() {
		this.props.onOpenDetailModal(false)
	}
	_onUpdateValue(key, e) {
		let value = e.target.value;
		this.props.updateViewDetail(key, value);
	}
	_onSubmit(id) {
		if(!id) {
			this.props.createNote()
			.then(() => {
				this._onCloseModal();
				alert('Create Successfully')
			}, (err) => {
				alert('Create Error')
			})
		}
		else {
			this.props.updateNote()
			.then(() => {
				this._onCloseModal();
				alert('Update Successfully')
			}, (err) => {
				alert('Update Error')
			})
		}
	}
	_onAddCheckList() {
		this.props.addCheckList()
	}
	_onChangeValueCheckBox(e) {
		let value = e.target.value;
		this.props.updateValueCheckBox(value)
	}
	_onCheckNote(item, index, idNote) {
		this.props.checkInCheckList(item, index, idNote)
	}
	_onRemoveCheckList(index) {
		this.props.removeItemCheckList(index);
	}
	render() {
		let {
			viewDetail: {
				id, 
				name, 
				content, 
				type, 
			}, 
			valueCheckBox, 
		} = this.props;
		type = type == null ? [] : type;
		let list_checkbox = type.map((item, index) => {
			return (
				<tr key={`note-${id}checkbox-${index}`}>
					<td width="1">
						<label className="checkbox">
							<input 
								type="checkbox" 
								onClick={this._onCheckNote.bind(this, item, index, id)} 
								checked={item.ic == 1 ? true : false} 
							/>
							<span></span>
						</label>
					</td>
					<td>
						<div className="form-group">
							<span>{item.t}</span>
						</div>
					</td>
					<td width="1"> 
						<a className="X" onClick={this._onRemoveCheckList.bind(this, index)}>X</a>
					</td>
				</tr>
			)
		})
		return (
			<Modal isActive={this.props.isDetail == true ? true : false}>
				<div className="modal__header">
					<div className="title">Note details</div>
					<a className="close" onClick={this._onCloseModal.bind(this)}>X</a>
				</div>
				<div className="modal__body">
					<div className="form-group">
						<label className="control-label">Name</label>
						<input 
							type="text" 
							className="form-control" 
							value={name || ''} 
							onChange={this._onUpdateValue.bind(this, 'name')}
						/>
					</div>
					<div className="form-group">
						<label className="control-label">Content</label>
						<textarea 
							className="form-control" 
							value={content || ''} 
							onChange={this._onUpdateValue.bind(this, 'content')}
							rows="8">
						</textarea>
					</div>
					<table className="table">
					<tbody>
						{list_checkbox}
						<tr>
							<td width="1">
								<label className="checkbox">
									<input type="checkbox" checked="" />
									<span></span>
								</label>
							</td>
							<td>
								<div className="form-group">
									<input 
										type="text" 
										className="form-control" 
										placeholder="Enter item name" 
										value={valueCheckBox} 
										onChange={this._onChangeValueCheckBox.bind(this)}
									/>
								</div>
							</td>
							<td width="1"> 
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td colSpan="3">
								<a className="add-list-item" onClick={this._onAddCheckList.bind(this)}><span>+</span> Add item</a>
							</td>
						</tr>
					</tfoot>
				</table>
				</div>
				<div className="modal__footer">
					<a className="cancel" onClick={this._onCloseModal.bind(this)}>Cancel</a>
					<a 
						className="submit" 
						onClick={this._onSubmit.bind(this, id)}
					>
						{id ? 'Edit' : 'Create'}
					</a>
				</div>
			</Modal>
		)
	}
}

DetailComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		isDetail: state.note.isDetail, 
		viewDetail: state.note.viewDetail, 
		valueCheckBox: state.note.valueCheckBox, 
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...noteAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent)