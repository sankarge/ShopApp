import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CategoryList from './components/CategoryList';
import Filters from './components/Filters';
import Header from './components/Header';
import ItemList from './components/ItemList';



class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { categoryId: '', host: 'http://localhost:8080', minMax: { min: 0, max: 5000 } };
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleMinMaxChange = this.handleMinMaxChange.bind(this);
	}

	handleCategoryChange(newCategoryId) {
		this.setState({ categoryId: newCategoryId });
	}

	handleMinMaxChange(minMax) {
		this.setState({ minMax: minMax });
	}

	render() {
		return (
			<div>
				<Header />
				<Container fluid>
					<Row>
						<Col md='2'>
							<CategoryList host={this.state.host} onCategoryChange={this.handleCategoryChange} />
							<Filters minMax={this.state.minMax} onMinMaxChange={this.handleMinMaxChange}/>
						</Col>
						<Col>
							<ItemList host={this.state.host} categoryId={this.state.categoryId} minMax={this.state.minMax}/>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

export default App;