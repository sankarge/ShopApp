import 'bootstrap/dist/css/bootstrap.css';

import {
	Card, Button, CardImg, CardTitle, CardText, CardDeck, CardGroup, CardColumns,
	CardSubtitle, CardBody, Container, Row, Col
} from 'reactstrap';

const React = require('react');
const client = require('./client');

class ItemList extends React.Component {

	constructor(props) {
		super(props);
		this.state = { items: [] };
	}

	componentWillMount() {
		if (this.props.category != '') {
			client({ method: 'GET', path: this.props.category }).done(response => {
				this.setState({ items: response.entity._embedded.items });
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.category !== this.props.category) {
			client({ method: 'GET', path: this.props.category }).done(response => {
				this.setState({ items: response.entity._embedded.items });
			});
		}
	}

	render() {
		if (this.state.items && this.state.items.length > 0) {

			var itemArray = this.state.items;
			var itemPerRow = 4;
			var itemGrouped = itemArray.map((item, index) => {
				return index % itemPerRow === 0 ? itemArray.slice(index, index + itemPerRow) : null;
			}).filter(function (item) {
				return item;
			});


			const items = itemGrouped.map(group =>
				<GroupItem group={group} />
			);
			return (
				<div>
					<hr></hr>
					{items}
				</div>
			)
		}
		return null;
	}
}

class GroupItem extends React.Component {

	render() {
		const items = this.props.group.map(item =>
			<Item key={item._links.self.href} item={item} />
		);

		return (
			<div>
				<CardDeck>
					{items}
				</CardDeck>
				<br></br>
			</div>
		)

	}
}

class Item extends React.Component {
	render() {
		return (
			<Card>
				{/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" /> */}
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