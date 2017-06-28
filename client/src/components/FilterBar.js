import React, { Component } from 'react';

import { ASCENDING, DESCENDING, SORTING_TYPES } from '../utility/SortingTypes';

export default class FilterBar extends Component {
	constructor(props) {
		super(props);

		this.renderArrow = this.renderArrow.bind(this);
	}

	renderArrow(sorting) {
		if (!sorting)
			return null;
		switch (SORTING_TYPES[sorting.rating_si]) {
			case ASCENDING:
				return <span className="arrow-up">&uarr;</span>;
			case DESCENDING:
				return <span className="arrow-down">&darr;</span>;
			default:
				return <span className="space-lg">&nbsp;</span>;
		}
	}

	render() {
		const { sorting, clickRating } = this.props;
		return (
			<div className="filter-list">
				<div className="rating-btn" onClick={clickRating}><span>Rating </span>{this.renderArrow(sorting)}</div>
				<ul className="price-filters">
					<li>Price</li>
				</ul>
			</div>
		)
	}
}
