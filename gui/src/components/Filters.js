import { Button, Col, Collapse, Container, Form, Input, Nav, Navbar, NavbarToggler, NavItem, Row } from 'reactstrap';

const React = require('react');
const client = require('./client');

class Filters extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isOpen: true, min: 0, max: 5000 };
		this.toggle = this.toggle.bind(this);
		this.handleMinUpdate = this.handleMinUpdate.bind(this);
		this.handleMaxUpdate = this.handleMaxUpdate.bind(this);
		this.onFilterApply = this.onFilterApply.bind(this);
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	handleMinUpdate(e) {
		e.preventDefault();
		this.setState({ min: e.target.value });
	}

	handleMaxUpdate(e) {
		e.preventDefault();
		this.setState({ max: e.target.value });
	}

	onFilterApply(event) {
		this.props.onMinMaxChange({ min: this.state.min, max: this.state.max });
	}

	render() {
		return (
			<div>
				<hr></hr>
				<Navbar light>
					<h5 >Filters</h5>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<hr></hr>
						<Nav>
							<NavItem>
								<Form>
									<Container fluid>
										<Row>
											<Col>
												<label>Price min </label>
												<Input name='priceMin' ref='priceMin' bsSize='sm' type="text" onChange={this.handleMinUpdate} value={this.state.min} />
											</Col>
										</Row>
										<Row>
											<Col>
												<label>Price max </label>
												<Input name='priceMax' bsSize='sm' type="text" onChange={this.handleMaxUpdate} value={this.state.max} />
											</Col>
										</Row>
										<Row>
											<Col>
												<hr></hr>
												<Button outline color="secondary" onClick={this.onFilterApply}>Apply</Button>
											</Col>
										</Row>
									</Container>
								</Form>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
				<hr></hr>
			</div>
		)
	}
}

export default Filters;