import React from 'react';
import { Badge, Button, Card, CardImg, CardBody, CardDeck, CardText, CardHeader, Col, Container, Row, CardFooter } from 'reactstrap';
import client from './client';
import PaginationHandler from './PaginationHandler';
import SortHandler from './SortHandler';

class ItemList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			currentLink: '',
			size: '6',
			sort: '',
			links: {}
		};
		this.onNavigate = this.onNavigate.bind(this);
		this.updateState = this.updateState.bind(this);
		this.onSort = this.onSort.bind(this);
		this.onMinMaxChange = this.onMinMaxChange.bind(this);
		this.onPageSizeChange = this.onPageSizeChange.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.categoryId !== this.props.categoryId ||
			prevProps.minMax !== this.props.minMax ||
			prevState.sort !== this.state.sort ||
			prevState.size !== this.state.size) {
			this.updateItemList();
		}
		if (prevState.currentLink != this.state.currentLink) {
			this.updatePaging();
		}
		window.scrollTo(0, 0);
	}

	updateItemList() {
		client({ method: 'GET', path: this.getItemsURI() }).done(this.updateState);
	}

	updatePaging() {
		client({ method: 'GET', path: this.state.currentLink }).done(this.updateState);
	}

	updateState(response) {
		this.setState({
			items: response.entity._embedded.items,
			links: response.entity._links,
		});
	}

	getItemsURI() {
		var baseURI = this.props.host + '/api/items/search/findByCategory_IdAndPriceBetween';
		var withCategory = baseURI + '?id=' + this.props.categoryId;
		var withMinMax = withCategory + '&min=' + this.props.minMax.min + '&max=' + this.props.minMax.max;
		var withSort = withMinMax + '&sort=' + this.state.sort;
		var finalURI = withSort + '&size=' + this.state.size;
		return finalURI;
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

	onPageSizeChange(pageSize) {
		this.setState({ size: pageSize });
	}

	getGroupedItem() {
		var itemArray = this.state.items;
		var itemPerRow = 3;
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
								<PaginationHandler onNavigate={this.onNavigate} onPageSizeChange={this.onPageSizeChange} links={this.state.links} />
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
				<CardHeader tag="h5">
					{this.props.item.title}
				</CardHeader>
				<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
				<CardBody>
					<CardText>
						{this.props.item.text}
					</CardText>
				</CardBody>
				<CardFooter className="text-muted">
					<Col>
						<Row>
							<Col>
								<div class='float-left'>
									<h5><Badge color="info">{this.props.item.price}  &euro;</Badge></h5>
								</div>
							</Col>
							<Col>
								<div class='float-right'>
									<Button>View</Button>
								</div>
							</Col>
						</Row>
					</Col>
				</CardFooter>
			</Card>
		)
	}
}

export default ItemList;