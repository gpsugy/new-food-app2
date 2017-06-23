import { connect } from 'react-redux';

import { fetchBusinesses } from '../actions/Results';
import FoodTypeList from '../components/FoodTypeList';

const mapStateToProps = (state, ownProps) => {
	return {
		fetched: state.businesses.fetched,
		foodTypes: state.user.foodTypes,
		location: state.user.location
	};
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return {
		fetched: stateProps.fetched,
		handleClick: () => {
			dispatchProps.dispatch(fetchBusinesses(stateProps.foodTypes, stateProps.location));
		}
	};
}

const FoodTypeListContainer = connect(
	mapStateToProps,
	null,
	mergeProps
)(FoodTypeList)

export default FoodTypeListContainer