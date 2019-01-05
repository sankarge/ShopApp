import React from 'react';
import { Pagination, PaginationItem, PaginationLink, Col, Row, Label, CustomInput, Container } from 'reactstrap';

class PaginationHandler extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
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
				<Pagination>
					{this.getDynamicNavLinks()}
				</Pagination>
			</div>
		)
	}
}

export default PaginationHandler;