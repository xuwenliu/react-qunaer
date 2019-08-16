import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./App.css";
import Header from "../components/Header";
import DepartDate from "./DepartDate/DepartDate";
import HighSpeed from "./HighSpeed/HighSpeed";
import Journey from "./Journey/Journey";
import Submit from "./Submit/Submit";
import CitySelector from "../components/CitySelector";

import { exchangeFromTo, showCitySelector, hideCitySelector, fetchCityData, setSelectedCity } from "./actions";

const App = function(props) {
	const { from, to, dispatch, isCitySelectorVisible, cityData, isLoadingCityData } = props;

	const onBack = useCallback(() => {
		window.history.back();
	}, []);

	// const doExchangeFromTo = useCallback(() => {
	// 	dispatch(exchangeFromTo());
	// }, []);

	// const doShowCitySelector = useCallback(m => {
	// 	dispatch(showCitySelector(m));
	// }, []);

	const cbs = useMemo(() => {
		return bindActionCreators(
			{
				exchangeFromTo,
				showCitySelector,
			},
			dispatch
		);
	}, [dispatch]);

	const citySelectorCbs = useMemo(() => {
		return bindActionCreators(
			{
				onBack: hideCitySelector,
				fetchCityData,
				onSelect: setSelectedCity,
			},
			dispatch
		);
	}, [dispatch]);
	return (
		<div>
			<div className="header-wrapper">
				<Header title="火车票" onBack={onBack} />
			</div>
			<form className="form">
				<Journey from={from} to={to} {...cbs} />
				<DepartDate />
				<HighSpeed />
			</form>
			<CitySelector show={isCitySelectorVisible} cityData={cityData} isLoading={isLoadingCityData} {...citySelectorCbs} />

			<Submit />
		</div>
	);
};

const mapStateToProps = state => {
	return {
		...state,
	};
};
const mapStateToDispatch = dispatch => {
	return {
		dispatch,
	};
};

export default connect(
	mapStateToProps,
	mapStateToDispatch
)(App);
