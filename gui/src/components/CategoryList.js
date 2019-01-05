import React from 'react';
import client from './client';
import { Button, Collapse, NavbarToggler, Navbar, Nav } from 'reactstrap';

class CategoryList extends React.Component {

	constructor(props) {
		super(props);
		this.state = { categories: [], isOpen: true };
		this.toggle = this.toggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	componentDidMount() {
		client({ method: 'GET', path: this.getURI() }).done(response => {
			this.setState({ categories: response.entity._embedded.categories }, () => {
				this.setDefaultCategory(this.state.categories[0]);
			});
		});
	}

	getURI(){
		return this.props.host + '/api/categories';
	}

	setDefaultCategory(category) {
		this.props.onCategoryChange(this.getCategoryId(category._links.self.href));
	}

	handleChange(e) {
		this.props.onCategoryChange(this.getCategoryId(e.target.id));
	}

	getCategoryId(input){
		return input.split("/").pop();
	}

	render() {
		const categories = this.state.categories.map(category =>
				<Button color='white' id={category._links.self.href} onClick={this.handleChange}> {category.title}</Button>
		);
		return (
			<div>
				<br></br>
				<Navbar light>
					<h5>Products</h5>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<hr></hr>
						<Nav>
							{categories}
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		)
	}
}

export default CategoryList;