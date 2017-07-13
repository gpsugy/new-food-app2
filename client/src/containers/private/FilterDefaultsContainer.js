import { connect } from 'react-redux';

import {
  sortBusinesses,
  toggleDistanceFilter,
  toggleRatingSort,
  updatePrices,
} from '../../actions/FilterBar';
import FilterBar from '../../components/FilterBar';

const mapStateToProps = (state, ownProps) => {
	return {
		sorting: state.user.account.sorting
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		clickRating: () => {
			dispatch(toggleRatingSort());
			dispatch(sortBusinesses());
		},
		clickPrice: (price) => {
			dispatch(updatePrices(price));
		},
		clickDistance: () => {
			// console.log('clicked distance');
			dispatch(toggleDistanceFilter());
		}
	};
}

const FilterDefaultsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterBar)

export default FilterDefaultsContainer