import {
	Container, Row, Col, ButtonGroup, Button, ListGroup, ListGroupItem, Collapse, NavbarToggler, Navbar, Nav, NavItem,
	Form, FormGroup, Label, Input, NavLink
} from 'reactstrap';

const React = require('react');
const client = require('./client');

class Filters extends React.Component {

	constructor(props) {
		super(props);
		this.state = { filters: [], isOpen: true };
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		const filters = this.state.filters.map(filter =>
			<Filter key={filter._links.self.href} filter={filter} />
		);
		return (
			<div>
				<hr></hr>
				<Navbar light>
					<h5 >Filters</h5>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<hr></hr>
						<Nav>
							<Filter />
						</Nav>
					</Collapse>
				</Navbar>
				<hr></hr>
			</div>
		)
	}
}

class Filter extends React.Component {
	render() {
		return (
			<NavItem>
				<Form>
					<Container fluid>
						<Row>
							<Col>
								<label>Price </label>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup check inline>
									<Label check>
										<Input type="checkbox" /> 0 - 100
										</Label>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup check inline>
									<Label check>
										<Input type="checkbox" /> 100 - 200
										</Label>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup check inline>
									<Label check>
										<Input type="checkbox" /> 200 - 500
										</Label>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup check inline>
									<Label check>
										<Input type="checkbox" /> 500 - max
											</Label>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<hr></hr>
								<label>Rating</label>
							</Col>
						</Row>
						<Row>
							<Col>
								<button type="button" class="btn btn-warning btn-sm" aria-label="Left Align">
									<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
								</button>
								<button type="button" class="btn btn-warning btn-sm" aria-label="Left Align">
									<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
								</button>
								<button type="button" class="btn btn-warning btn-sm" aria-label="Left Align">
									<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
								</button>
								<button type="button" class="btn btn-warning btn-sm" aria-label="Left Align">
									<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
								</button>
								<button type="button" class="btn btn-warning btn-sm" aria-label="Left Align">
									<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
								</button>
							</Col>
						</Row>
						<Row>
							<Col>
								<hr></hr>
								<Button outline color="secondary">Apply</Button>
							</Col>
						</Row>
					</Container>
				</Form>
			</NavItem>
		)
	}
}

export default Filters;