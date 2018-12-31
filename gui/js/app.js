'use strict';

import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {items: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/items'}).done(response => {
			this.setState({items: response.entity._embedded.items});
		});
	}

	render() {
		return (
			<ItemList items={this.state.items}/>
		)
	}
}
class ItemList extends React.Component{
	render() {
		const items = this.props.items.map(item =>
			<Item key={item._links.self.href} item={item}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>Title</th>
						<th>Text</th>
						<th>Price</th>
					</tr>
					{items}
				</tbody>
			</table>
		)
	}
}
class Item extends React.Component{
	render() {
		return (
			<tr>
				<td><Button color="primary">{this.props.item.title}</Button>{' '}</td>
				<td>{this.props.item.text}</td>
				<td>{this.props.item.price.value} {this.props.item.price.currencyCode}</td>
			</tr>
		)
	}
}
ReactDOM.render(
	<App />,
	document.getElementById('react')
)