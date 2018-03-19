import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import noteAction from '../../actions/note_action'

class ListComponent extends Component {
	constructor(props, context) {
		super(props);
        context.router
	}
	componentWillMount() {
		this.props.getListNote();
	}
	componentDidUpdate() {
		
	}
	componentDidMount() {
	}
	_onCheckNote(indexList, indexType) {
		this.props.checkInCheckListOnListNote(indexList, indexType)
		.then((noteUpdate) => {
			this.props.updateNote(noteUpdate)
		})
	}
	_onRemoveNote(item) {
		this.props.removeNote(item)
		.then(() => {
			alert('Delete Successfully')
		}, (err) => {
			alert('Delete Error')
		})
	}
	_onViewDetail(item) {
		this.props.viewDetailNote(item)
		.then(() => {
			this.props.onOpenDetailModal()
		})
		
	}
	render() {
		let { list } = this.props;
		let list_elem = list.map((item, index) => {
			if(item.type == null || item.type.length == 0) {
				return (
					<li key={`note-${item.id}`}>
						<a>
							<span className="title" onClick={this._onViewDetail.bind(this, item)}>{item.name}</span> 
							<span className="" onClick={this._onViewDetail.bind(this, item)}>edit</span>
							<span className="btn-delete" onClick={this._onRemoveNote.bind(this, item)}>X</span>
						</a>
					</li>
				)
			}
			else {
				let list_checklist = item.type.map((i, inx) => {
					return (
						<label 
							key={`note-${item.id}-checklist-${inx}`} 
							className="checkbox" 
							style={{width: '60%', float: 'left'}}
						>
							<input 
								type="checkbox" 
								defaultChecked={i.ic == 1 ? true : false}
								onClick={this._onCheckNote.bind(this, index, inx)}
							/>
							<span></span>
							<span>{i.t}</span>
						</label>
					)
				})
				return (
					<li key={`note-${item.id}`}>
						<a>
							<span className="title">
								{list_checklist}
							</span>
							<span className="" onClick={this._onViewDetail.bind(this, item)}>edit</span>
							<span className="btn-delete" onClick={this._onRemoveNote.bind(this, item)}>X</span>
						</a>
					</li>
				)
			}
		})
		return (
			<ul className="list">
				{list_elem}
			</ul>
		)
	}
}

ListComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		list: state.note.list, 
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...noteAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent)