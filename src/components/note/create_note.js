import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import noteAction from '../../actions/note_action'

class CreateNoteComponent extends Component {
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
	_onOpenCreateNote() {
		this.props.onOpenDetailModal();
	}
	render() {
		return (
			<div className="controller">
				<h1 className="title">Notes</h1>
				<a className="btn-add" onClick={this._onOpenCreateNote.bind(this)}>+</a>
			</div>
		)
	}
}

CreateNoteComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...noteAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNoteComponent)