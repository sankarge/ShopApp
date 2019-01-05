import React from 'react';
import { Badge, Button, Card, CardBody, CardDeck, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import client from './client';
import PaginationHandler from './PaginationHandler';
import SortHandler from './SortHandler';

class ItemList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			currentLink: '',
			size: '8',
			sort: '',
			links: {}			
		};
		this.onNavigate = this.onNavigate.bind(this);
		this.updateAll = this.updateAll.bind(this);
		this.updateLinks = this.updateLinks.bind(this);
		this.onSort = this.onSort.bind(this);
		this.onMinMaxChange = this.onMinMaxChange.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.categoryId !== this.props.categoryId ||
			prevProps.minMax !== this.props.minMax || 
			prevState.sort !== this.state.sort) {
			this.onUpdateCategoryOrSortOrMinMax();
		}
		if (prevState.currentLink != this.state.currentLink) {
			this.onUpdatePaging();
		}
		window.scrollTo(0, 0);
	}

	onUpdateCategoryOrSortOrMinMax() {
		client({ method: 'GET', path: this.getItemsURI() }).done(this.updateAll);
	}

	onUpdatePaging() {
		client({ method: 'GET', path: this.state.currentLink }).done(this.updateLinks);
	}

	getItemsURI() {
		var baseURI = this.props.host + '/api/items/search/findByPriceBetween?';
		var withMinMax = baseURI + 'min=' + this.props.minMax.min + '&max=' + this.props.minMax.max;
		var withSort = withMinMax + '&sort=' + this.state.sort;
		var finalURI = withSort + '&size=' + this.state.size;
		return finalURI;
	}

	updateAll(response) {
		this.setState({
			items: response.entity._embedded.items,
			links: response.entity._links,
		});
	}

	updateLinks(response) {
		this.setState({
			items: response.entity._embedded.items,
			links: response.entity._links,
		});
	}

	onNavigate(newLink) {
		this.setState({ currentLink: newLink });
	}

	onSort(sortBy) {
		this.setState({ sort: sortBy });
	}

	onMinMaxChange(minMax) {
		this.setState({ minMax: minMax });
	}

	getGroupedItem() {
		var itemArray = this.state.items;
		var itemPerRow = 4;
		var itemGrouped = itemArray.map((item, index) => {
			return index % itemPerRow === 0 ? itemArray.slice(index, index + itemPerRow) : null;
		}).filter(function (item) {
			return item;
		});
		return itemGrouped;
	}

	render() {
		if (this.state.items && this.state.items.length > 0) {
			const cardDeckGroup = this.getGroupedItem().map((group, i) => {
				return <CardDeckGroup key={'card-deck-group' + i} group={group} />
			});
			return (
				<div>
					<br></br>
					<Container fluid>
						<Row>
							<Col>
								<SortHandler onSort={this.onSort} />
							</Col>
						</Row>
						<Row>
							<Col>
								{cardDeckGroup}
							</Col>
						</Row>
						<Row>
							<Col>
								<PaginationHandler onNavigate={this.onNavigate} links={this.state.links} />
							</Col>
						</Row>
					</Container>
				</div>
			)
		}
		return null;
	}
}

class CardDeckGroup extends React.Component {
	render() {
		const items = this.props.group.map(item => <Item key={item._links.self.href} item={item} />);
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
					<h5><Badge color="info">{this.props.item.price}  'EUR</Badge></h5>
					<Button>View</Button>
				</CardBody>
			</Card>
		)
	}
}

export default ItemList;