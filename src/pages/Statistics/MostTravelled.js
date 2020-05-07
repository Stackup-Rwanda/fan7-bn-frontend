import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './mostTravelled.scss'
import { mostTravelled } from '../../store/modules/request/view/actions';

class MostTravelled extends Component {

    async componentDidMount() {
        const { mostTravelledDestination } = this.props;
        await mostTravelledDest();
      }

    render() {
        const { mostTravelledplace } = this.props;

        return (
            <div className="component_section"> 
            <div className="component_section_container">
                    <h3><i className="sl sl-icon-user"></i> Most Travelled Destinaton</h3>
                  </div>        
            <div className="row with-forms">        
            <div className="col-md-12">
              <div className="form-group lis-relative">
                {mostTravelledplace}
              </div>
            </div>
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    mostTravelledplace: state.viewRequests.mostVisited,
  });
  
  const mapDispatchToProps = {
    mostTravelledDestination: mostTravelled,
  };
  
  MostTravelled.propTypes = {
    mostTravelledDestination: PropTypes.func.isRequired,
    // mostTravelledMsg: PropTypes.string.isRequired,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MostTravelled);