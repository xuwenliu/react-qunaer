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
import DateSelector from "../components/DateSelector";

import { exchangeFromTo, showCitySelector, hideCitySelector, fetchCityData, setSelectedCity,showDateSelector,hideDateSelector,setDepartDate,toggleHighSpeed} from "./actions";
import { h0 } from "../lib";

const App = function(props) {
    const { from, to, dispatch, isCitySelectorVisible,isDateSelectorVisible, cityData, isLoadingCityData, departDate,highSpeed } = props;
    

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
    

    const departDateCbs = useMemo(() => {
        return bindActionCreators({
            onClick: showDateSelector,
        }, dispatch)
    }, [dispatch])

    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideDateSelector,
        }, dispatch)
    }, [dispatch])

    const onSelectDate = useCallback((day) => {
        if (!day) return;
        if (day < h0()) return;
        dispatch(setDepartDate(day));
        dispatch(hideDateSelector());
    }, [dispatch])

    const hightSpeedCbs = useMemo(() => {
        return bindActionCreators({
            toggle: toggleHighSpeed
        },dispatch)
    },[dispatch])
    
	return (
		<div>
			<div className="header-wrapper">
				<Header title="火车票" onBack={onBack} />
			</div>
			<form action="/query.html" className="form">
				<Journey from={from} to={to} {...cbs} />
                <DepartDate time={departDate} {...departDateCbs}/>
                <HighSpeed highSpeed={highSpeed} {...hightSpeedCbs} />
                <CitySelector show={isCitySelectorVisible} cityData={cityData} isLoading={isLoadingCityData} {...citySelectorCbs} />
                <DateSelector show={isDateSelectorVisible} {...dateSelectorCbs} onSelect={onSelectDate}/>
                <Submit />
			</form>
			
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
