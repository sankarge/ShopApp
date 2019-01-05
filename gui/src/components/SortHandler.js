import React from 'react';
import { Col, Row, Label, Input, Container } from 'reactstrap';

class SortHandler extends React.Component {

	constructor(props) {
		super(props);
		this.handleSortBy = this.handleSortBy.bind(this);
	}

	handleSortBy(e) {
		e.preventDefault();
		this.props.onSort(e.target.value);
	}

	render() {
		return (
			<div class='float-right'>
				<Container>
					<Row>
						<Col>
							<Label>Sort by</Label>
						</Col>
						<Col sm='7.5' >
							<Input type="select" id="sortBy" name="customSelect" bsSize="sm" onChange={this.handleSortBy}>
								<option value='price'>Price: Low to High</option>
								<option value='price,desc'>Price: High to Low</option>
							</Input>
						</Col>
					</Row>
				</Container>
				<br></br>
			</div>
		)
	}
}

export default SortHandler;