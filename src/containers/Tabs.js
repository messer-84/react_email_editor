import React from 'react';
import { connect } from 'react-redux';
import { setVisible } from '../actions';

const mapStateToProps = (state) => {
	return {
		tabs: state.tabs
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setVisible: (tab) => {
			dispatch(setVisible(tab));
		}
	};
};

const Tabs = connect(
	mapStateToProps,
	mapDispatchToProps
)(({ tabs, setVisible }) => {
	const tabsStyle = {
		'display': 'flex',
		'color': '#FAFAFA',
		'fontWeight': 'bold',
		'justifyContent': 'center',
		'backgroundColor': 'darkcyan',
	};
	const tabStyle = {
		'width': '33.3%',
		'height': '2rem',
		'display': 'flex',
		'cursor': 'pointer',
		'alignItems': 'center',
		'justifyContent': 'center',
	};
	const active = {
		'backgroundColor': '#3ACADA'
	};
	return (
		<div style={tabsStyle}>
			<span
			style={tabs.blocks?Object.assign({},tabStyle,active):tabStyle}
			onClick={()=> setVisible('blocks')}
			>BLOCKS</span>
			<span
			style={tabs.common?Object.assign({},tabStyle,active):tabStyle}
			onClick={()=> setVisible('common')}
			>COMMON</span>
			<span
			style={tabs.options?Object.assign({},tabStyle,active):tabStyle}
			onClick={()=> setVisible('options')}
			>OPTIONS</span>
		</div>
		);
});

export default Tabs;