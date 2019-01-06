import React from 'react';
import { Pagination, PaginationItem, PaginationLink, Col, Row, Label, Input, CustomInput, Container } from 'reactstrap';

class PaginationHandler extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
	}

	handleNavFirst(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.first.href);
	}

	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}

	handleNavLast(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.last.href);
	}

	handlePageSizeChange(e) {
		e.preventDefault();
		this.props.onPageSizeChange(e.target.value);
	}

	getDynamicNavLinks() {
		const navLinks = [];
		if ("first" in this.props.links) {
			navLinks.push(<PaginationItem>
				<PaginationLink href="#" onClick={this.handleNavFirst}>&lt;&lt;</PaginationLink>
			</PaginationItem>);
		}
		if ("prev" in this.props.links) {
			navLinks.push(<PaginationItem>
				<PaginationLink href="#" onClick={this.handleNavPrev}>&lt;</PaginationLink>
			</PaginationItem>);
		}
		if ("next" in this.props.links) {
			navLinks.push(<PaginationItem>
				<PaginationLink href="#" onClick={this.handleNavNext}>&gt;</PaginationLink>
			</PaginationItem>);
		}
		if ("last" in this.props.links) {
			navLinks.push(<PaginationItem>
				<PaginationLink href="#" onClick={this.handleNavLast}>&gt;&gt;</PaginationLink>
			</PaginationItem>);
		}
		return navLinks;
	}

	render() {
		return (
			<div class='float-right'>
				<Container>
					<Row>
						<Col>
							<Label>Items</Label>
						</Col>
						<Col sm='3.5'>
							<CustomInput type="select" id="itemSize" name="customSelect" bsSize="sm" onChange={this.handlePageSizeChange}>
								<option value='6'>6</option>
								<option value='12'>12</option>
								<option value='24'>24</option>
								<option value='48'>48</option>
							</CustomInput>
						</Col>
						<Col>
							<Pagination>
								{this.getDynamicNavLinks()}
							</Pagination>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

export default PaginationHandler;