import React from "react";
import { connect } from "react-redux";

import "./App.css";
import Header from "../components/Header";
import DepartDate from "./DepartDate/DepartDate";
import HighSpeed from "./HighSpeed/HighSpeed";
import Journey from "./Journey/Journey";
import Submit from "./Submit/Submit";

const App = function(props) {
	return (
		<div>
			<Header />
			<Journey />
			<DepartDate />
			<HighSpeed />
			<Submit />
		</div>
	);
};

const mapStateToProps = state => { return {}};
const mapStateToDispatch = dispatch => { return {} };

export default connect(
	mapStateToProps,
	mapStateToDispatch
)(App);
