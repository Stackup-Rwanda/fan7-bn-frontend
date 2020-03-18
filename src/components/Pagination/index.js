import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './pagination.scss';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalRecords: "",
            pageLimit: "",
            totalPages: "",
            currentPage: "",
            initialPage: "",
            pagesToShow: ""
        };
    }

    componentDidMount() {
        this.setState({
            totalRecords: this.props.totalRecords,
            pageLimit: this.props.pageLimit || 10,
            totalPages: Math.ceil(this.props.totalRecords / this.props.pageLimit),
            pagesToShow: this.props.pagesToShow || 5,
            currentPage: this.props.initialPage || 1
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            totalRecords: nextProps.totalRecords,
            pageLimit: nextProps.pageLimit || 10,
            totalPages: Math.ceil(nextProps.totalRecords / nextProps.pageLimit),
            pagesToShow: nextProps.pagesToShow || 5
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.totalRecords !== prevState.totalRecords ||
            this.state.pageLimit !== prevState.pageLimit
        ) {
            this.setPage(this.state.currentPage);
        }
    }

    setPage(page) {
        const { totalRecords, pageLimit, totalPages } = this.state;

        if (page < 1) {
            page = 1;
        } else if (page > totalPages) {
            page = totalPages;
        }

        this.setState({
            currentPage: page
        });

        const startIndex = (page - 1) * pageLimit;
        const endIndex = Math.min(startIndex + pageLimit - 1, totalRecords - 1);

        this.props.onChangePage({
            pageLimit,
            totalPages,
            page,
            startIndex,
            endIndex
        });
    }

    getPager() {
        const {  currentPage, totalPages } = this.state;
        const pages = [];
           let startFromNumber;
           let pagesToShow = this.state.pagesToShow;
        if (totalPages <= pagesToShow) {
            startFromNumber = 1;
            pagesToShow = totalPages;
        } else {
            if (currentPage <= Math.ceil(pagesToShow / 2)) {
                startFromNumber = 1;
            } else if (
                currentPage + Math.floor((pagesToShow - 1) / 2) >=
                totalPages
            ) {
                startFromNumber = totalPages - (pagesToShow - 1);
            } else {
                startFromNumber = currentPage - Math.floor(pagesToShow / 2);
            }
        }

        for (let i = 1; i <= pagesToShow; i++) {
            pages.push(startFromNumber++);
        }

        return {
            currentPage,
            totalPages,
            pages
        };
    }

    render() {
        if (!this.state.totalRecords || this.state.totalPages === 1) return null;
        const {
            totalPages,
            currentPage,
            pageLimit,
          } = this.state;
        const pager = this.getPager();
        
        return (
            <div className="body_display_pagination_items">
                <div className="body_display_pagination_items_currentPage">
                    <p>
                        Page {currentPage}
                    </p>
                </div>

                <div className="body_display_pagination_items_rowsPerPage">
                    Rows per page
                        <select
                        className="form-control"
                        value={pageLimit}                        
                        onChange={e =>
                            this.setState({ pageLimit: parseInt(e.target.value) })
                        }>                            
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className="body_display_pagination_items_allPages">
                    <p>
                        {currentPage} - {pageLimit} of {totalPages}
                    </p>
                </div>
                <div className="body_display_pagination_items_nextPrev">
                    <button
                        className="body_display_pagination_items_nextPrev_prev"
                        disabled={pager.currentPage === 1 ? true : false}
                        onClick={() => this.setPage(pager.currentPage - 1)}>
                        Prev
                    </button>
                    <button
                        className="body_display_pagination_items_nextPrev_next"
                        disabled={pager.currentPage === pager.totalPages ? true : false}
                        onClick={() => this.setPage(pager.currentPage + 1)}>
                        Next
                    </button>
                </div>

            </div>
        );
    }
}

Pagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    initialPage: PropTypes.number,
    pagesToShow: PropTypes.number,
    onChangePage: PropTypes.func
};

export default Pagination;

