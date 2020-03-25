import React, { Component } from 'react';
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
          <div className="rest_pagination_items">
          <div className="rest_pagination_items_currentPage">
                  Page 
              <select
                  className="rest_pagination_items_dropdown"     
                  value={curPage}           
                  onChange={e => this.onChangePage(parseInt(e.target.value), rpg)}  
                  > 
                  { _.range(1, totalPages + 1).map(value => <option key={value} value={value}>{value}</option>) }
              </select>
          </div>
  
          <div className="rest_pagination_items_rowsPerPage">
              Rows per page
                  <select
                  className="rest_pagination_items_dropdown"                
                  onChange={e => this.onChangePage(curPage, parseInt(e.target.value))}  
                  >                            
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
              </select>
          </div>
          <div className="rest_pagination_items_allPages">
              <p>
                  {curPage} - {rowsPerPage || 5} of {totalPages}
              </p>
          </div>
          <div className="rest_pagination_items_nextPrev">
              <button
                  className="rest_pagination_items_nextPrev_prev"
                  disabled={curPage === 1 ? true : false}
                  onClick={() => this.onChangePage(curPage - 1, rowsPerPage || 5)}>
                    <img src={arrow} alt="previous" />                  
              </button>
                                  
              <button
                  className="rest_pagination_items_nextPrev_next"
                  disabled={currentPage === totalPages ? true : false}
                  onClick={() => this.onChangePage(curPage + 1, rowsPerPage || 5)}>
                    <img src={arrow} alt="previous" />
              </button>
          </div>
  
      </div>    
      )
  }  
}
export default ServerSidePagination;
