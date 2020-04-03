import React, { Component } from 'react';
import _ from 'lodash';
import arrow from '../../assets/icons/icons8-chevron-left-30.png';
import './ServerSidePagination.scss';

class ServerSidePagination extends Component {
  constructor(props) {
      super(props);
      this.state = {
          currentPage: "",
          rowsPerPage: "",
      }

  }
  onChangePage = (page, limit) => {
      const { handleChangePage } = this.props;
      handleChangePage(page, limit);
      this.setState({
          currentPage: page,
          rowsPerPage: limit,
        });
  }
  
  render() {
      const {
        rowsPerPage,
        currentPage,
      } = this.state;

      const curPage = currentPage || 1;
      const rpg = rowsPerPage || 5;
      const { totalRows } = this.props;
      const totalPages = Math.ceil(totalRows / rpg);
      
      return (
          <div className="pagination-container">
          <div className="pagination-section">
            <div className="pagination-section__text">Page:</div>
              <select
                  className="pagination-section__select"   
                  name="page"  
                  value={curPage}           
                  onChange={e => this.onChangePage(parseInt(e.target.value), rpg)}  
                  > 
                  { _.range(1, totalPages + 1).map(value => <option key={value} value={value}>{value}</option>) }
              </select>
          </div>
  
          <div className="pagination-section">
          <div className="pagination-section__text">Rows Per Page:</div>
                  <select
                  name="rowsPerPage"
                  className="pagination-section__select"                
                  onChange={e => this.onChangePage(curPage, parseInt(e.target.value))}  
                  >                            
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
              </select>
          </div>
          <div className="pagination-section">
          <div className="pagination-section__text">
            {curPage} - {rowsPerPage || 5} of {totalPages}
          </div>
          </div>
          <div className="pagination-section">
              <button
                name="decrement"
                className="pagination-section__navigation"
                disabled={curPage === 1 ? true : false}
                onClick={() => this.onChangePage(curPage - 1, rowsPerPage || 5)}>
                <img src={arrow} className="pagination-section__navigation___left" alt="previous" />                  
              </button>
                                  
              <button
                name="increment"
                className="pagination-section__navigation"
                disabled={currentPage === totalPages ? true : false}
                onClick={() => this.onChangePage(curPage + 1, rowsPerPage || 5)}>
                <img src={arrow} className="pagination-section__navigation___right" alt="next" />
              </button>
          </div>
  
      </div>    
      )
  }  
}
export default ServerSidePagination;
