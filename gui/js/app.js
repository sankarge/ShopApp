'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
// end::vars[]

// tag::app[]
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
// end::app[]

// tag::item-list[]
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
// end::item-list[]

// tag::item[]
class Item extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.item.title}</td>
				<td>{this.props.item.text}</td>
				<td>{this.props.item.price.value} {this.props.item.price.currencyCode}</td>
			</tr>
		)
	}
}
// end::item[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]