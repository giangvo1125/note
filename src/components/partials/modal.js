import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ModalComponent extends Component {
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
			<div className={`modal ${this.props.isActive == true ? 'active' : ''}`}>
				<div className="modal__container">
					{this.props.children}
				</div>
			</div>
		)
	}
}

ModalComponent.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)