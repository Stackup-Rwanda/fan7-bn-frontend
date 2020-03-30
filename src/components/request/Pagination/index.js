import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';
import caret from '../../../assets/icons/icons8-chevron-left-30.png';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: undefined,
      page: 1,
      rowsPerPage: [],
      numberOfRows: 5,
    };

    this.selectRowsPerPage = this.selectRowsPerPage.bind(this);
    this.selectPageNumber = this.selectPageNumber.bind(this);
    this.renderRowsPerPage = this.renderRowsPerPage.bind(this);
    this.renderRowRange = this.renderRowRange.bind(this);
    this.numberOfPages = this.numberOfPages.bind(this);
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
  }

  // componentDidMount() {
  //   const { total, page, rowsPerPage, numberOfRows } = this.props;
  //   this.setState({
  //     total,
  //     page,
  //     rowsPerPage,
  //     numberOfRows,
  //   });
  // }

  selectRowsPerPage(event) {
    const { value } = event.target;
    const { total, page, onChangeRowsPerPage } = this.props;
    if (parseInt(value, 10) * page > total) {
      const updatedPage = Math.ceil(total / parseInt(value, 10), 10);
      onChangeRowsPerPage(parseInt(value, 10), updatedPage)
    } else {
      console.log(value, page);
      onChangeRowsPerPage(parseInt(value, 10), page)
    }
  }

  selectPageNumber(event) {
    const { value } = event.target;
    const { onChangePage, page,  ...rest } = this.props;
    onChangePage(event, value);
  }

  numberOfPages() {
    const { total, numberOfRows } = this.props;
    let numPages = [];
    for (let i = 0; i < Math.ceil(total / numberOfRows); i++) {
      numPages.push(i + 1);
    }

    return numPages.map((pageValue, index) => (
      <option key={index} value={pageValue}>
        {pageValue}
      </option>
    ));
  }

  incrementPage(event) {
    const { page, onChangePage, ...rest } = this.props;
    onChangePage(event, page + 1);
  }

  decrementPage(event) {
    const { page, onChangePage, ...rest } = this.props;
    onChangePage(event, page - 1);
  }

  renderRowsPerPage() {
    const { rowsPerPage } = this.props;
    return rowsPerPage.map((rowValue, index) => (
      <option key={index} value={rowValue}>
        {rowValue}
      </option>
    ));
  }

  renderRowRange() {
    const { total, page, numberOfRows } = this.props;
    return (
      <span>
        {total === 0 ? 0 : numberOfRows * page - numberOfRows + 1} -{' '}
        {numberOfRows * page < total ? numberOfRows * page : total}
      </span>
    );
  }

  render() {
    const { total, page, numberOfRows } = this.props;
    return (
      <div className="pagination-container">
        <div className="pagination-section">
          <div className="pagination-section__text">Page:</div>
          <select
            className="pagination-section__select"
            name="page"
            defaultValue={page}
            onChange={this.selectPageNumber}
          >
            {total === 1 ? null : this.numberOfPages()}
          </select>
        </div>
        <div className="pagination-section">
          <div className="pagination-section__text">Rows Per Page:</div>
          <select
            className="pagination-section__select"
            name="rowsPerPage"
            defaultValue={numberOfRows}
            onChange={this.selectRowsPerPage}
          >
            {this.renderRowsPerPage()}
          </select>
        </div>
        <div className="pagination-section">
          <div className="pagination-section__text">
            {this.renderRowRange()} of {total}
          </div>
        </div>
        <div className="pagination-section">
          <button
            className="pagination-section__navigation"
            type="button"
            name="decrement"
            disabled={page <= 1}
            onClick={this.decrementPage}
          >
            <img className="pagination-section__navigation___left" src={caret} />
          </button>
          <button
            className="pagination-section__navigation"
            type="button"
            name="increment"
            disabled={page >= total / numberOfRows} //rowsPerPage
            onClick={this.incrementPage}
          >
            <img className="pagination-section__navigation___right" src={caret} />
          </button>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  numberOfRows: PropTypes.number,
  rowsPerPage: PropTypes.array,
  updateRows: PropTypes.func,
};

Pagination.defaultProps = {
  total: 20,
  page: 1,
  rowsPerPage: [5, 10, 15, 20],
  numberOfRows: 5,
};

export default Pagination;
