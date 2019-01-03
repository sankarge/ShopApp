import {
	ButtonGroup, Button, ListGroup, ListGroupItem,
	Collapse, NavbarToggler, Navbar, Nav, NavItem, NavLink
} from 'reactstrap';

const React = require('react');
const client = require('./client');

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
		client({ method: 'GET', path: 'http://localhost:8080/api/categories' }).done(response => {
			this.setState({ categories: response.entity._embedded.categories }, () => {
				this.setDefaultCategory(this.state.categories[0]);
			});
		});
	}

	setDefaultCategory(category) {
		this.props.onCategoryChange(category._links.self.href);
	}

	handleChange(e) {
		this.props.onCategoryChange(e.target.id);
	}

	render() {
		const categories = this.state.categories.map(category =>
			<ButtonGroup>
				<Button color='orange' id={category._links.self.href} onClick={this.handleChange}> {category.title} </Button>
			</ButtonGroup>
		);
		return (
			<div>
				<hr></hr>
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