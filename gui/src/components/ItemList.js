import 'bootstrap/dist/css/bootstrap.css';

import {
	Card, Button, CardImg, CardTitle, CardText, CardDeck, CardColumns,
	CardSubtitle, CardBody
} from 'reactstrap';

const React = require('react');
const client = require('./client');

class ItemList extends React.Component {

	constructor(props) {
		super(props);
		this.state = { items: [] };
	}

	componentWillMount() {
		console.log('ItemList category' + this.props.category);
		client({ method: 'GET', path: this.props.category }).done(response => {
			this.setState({ items: response.entity._embedded.items });
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.category !== this.props.category) {
			console.log('ItemList componentDidUpdate' + this.props.category);
			client({ method: 'GET', path: this.props.category }).done(response => {
				this.setState({ items: response.entity._embedded.items });
			});
		}
	}

	render() {
		const items = this.state.items.map(item =>
			<Item key={item._links.self.href} item={item} />
		);
		return (
			<div>
				<hr></hr>
				<CardColumns>
					{items}
				</CardColumns>
			</div>
		)
	}
}
class Item extends React.Component {
	render() {
		return (
			<Card>
				<CardBody>
					<CardTitle>{this.props.item.title}</CardTitle>
					<CardText>{this.props.item.text}</CardText>
					<CardText className="text-right">{this.props.item.price.value}{this.props.item.price.currencyCode}</CardText>
					<Button>View</Button>
				</CardBody>
			</Card>
		)
	}
}

export default ItemList;
