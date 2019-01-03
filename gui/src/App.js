import React from'react';
import 'bootstrap/dist/css/bootstrap.css';

import Header from'./components/Header';
import CategoryList from'./components/CategoryList';
import ItemList from'./components/ItemList';
import Filters from './components/Filters'

import { Container, Row, Col } from 'reactstrap';

class App extends React.Component {

	render() {
		return (
			<div>
				<Header/>
				<hr color='white'></hr>
				<Container fluid>
					<Row>
						<Col md='2'>
							<CategoryList/>
							<Filters/>
						</Col>
						<Col>
							<ItemList category='SmartPhones'/>
						</Col>
					</Row>					
				</Container>
			</div>
		)
	}
}

export default App;