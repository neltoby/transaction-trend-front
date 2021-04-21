import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, err: '' };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ err: error.message });
		console.log(error, errorInfo, JSON.stringify(errorInfo));
	}

	render() {
		if (this.state.hasError) {
			return (
				<>
					{this.props.fallback}
					<p>{this.state.err}</p>
				</>
			);
		}
		return this.props.children;
	}
}
