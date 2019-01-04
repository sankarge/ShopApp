import React from'react';
import 'bootstrap/dist/css/bootstrap.css';

import Header from'./components/Header';
import CategoryList from'./components/CategoryList';
import ItemList from'./components/ItemList';
import Filters from './components/Filters'

import { Container, Row, Col } from 'reactstrap';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {category: ''};
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
	}

	handleCategoryChange(newCategory) {
		this.setState({category : newCategory+'/items'});
	}

	render() {
		console.log('Updating category' + this.state.category);
		return (
			<div>
				<Header/>
				<Container fluid>
					<Row>
						<Col md='2'>
							<CategoryList onCategoryChange={this.handleCategoryChange}/>
							<Filters/>
						</Col>
						<Col>
							<ItemList category={this.state.category}/>
						</Col>
					</Row>					
				</Container>
			</div>
		)
	}
}

export default App;