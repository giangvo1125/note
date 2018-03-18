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
	render() {
		let {
			viewDetail: {
				id, 
				name, 
				content
			}
		} = this.props;
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
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...noteAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent)