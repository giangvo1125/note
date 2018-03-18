import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import List from './note/list'
import CreateNote from './note/create_note'
import Detail from './note/detail'

class ContentComponent extends Component {
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
	render() {
		return (
			<div className="container">
				<CreateNote/>
				<List/>
				<Detail/>
			</div>
		)
	}
}

ContentComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentComponent)