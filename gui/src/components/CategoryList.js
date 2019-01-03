import { ButtonGroup, Button, ListGroup, ListGroupItem, Collapse, NavbarToggler, Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const React = require('react');
const client = require('./client');

class CategoryList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {categories: [],  isOpen: true};
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
		  isOpen: !this.state.isOpen
		});
	  }

	componentDidMount() {
		client({method: 'GET', path: 'http://localhost:8080/api/categories'}).done(response => {
			this.setState({categories: response.entity._embedded.categories});
		});
	}

	render() {
		const categories = this.state.categories.map(category =>
			<Category key={category._links.self.href} category={category}/>
		);
		return (
			<div>				
				<Navbar light>
				<h5 >Categories</h5>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav>
						{categories}
					</Nav>
				</Collapse>
				</Navbar>
			</div>
		)
	}
}
class Category extends React.Component{
	render() {
		return (
			 <NavItem >
			  	<NavLink>{this.props.category.title}</NavLink>			 	
			 </NavItem>
		)
	}
}

export default CategoryList;