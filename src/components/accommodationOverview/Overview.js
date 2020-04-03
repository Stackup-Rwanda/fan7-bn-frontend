import React, { Component } from 'react'
import ImageViewer from 'react-images-viewer'
import ScrollBar from 'react-scrollbars-custom'
import Amenities from '../amenities'
import Popup from '../../components/PhotoViewerPopup';
import FetchText from '../TextArea/FetchText'
import Botton from '../Button'
import './style.scss'
import Button from '../Button';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
          remainingAmenities: 0,
          isOpen: false,
          currImg: 0
        }
        this.setTheState = this.setTheState.bind(this)
        this.togglePopup = this.togglePopup.bind(this);
        this.closeImgsViewer = this.closeImgsViewer.bind(this);
    }
    
    setTheState = async (number) => {
        console.log(number)
        await this.setState({
            remainingAmenities: number
        })
    }
  closeImgsViewer() {
    this.setState({
      isOpen: !this.state.isOpen,
      data: null,
    });
  }
  gotoPrevImg = async () =>{
    await this.setState({
      currImg: this.state.currImg - 1
    })
  }
  gotoNextImg = async () =>{
    await this.setState({
      currImg: this.state.currImg + 1
    })
  }

    async togglePopup() {
        await this.setState({
          isOpen: !this.state.isOpen,
            data: null,
        });
    }

    render() {
      let newImageArray = []
        // let allAmenities;
        // const allAmenities = ['Free wifi', 'free breakfast', 'free tv', 'free magazine', 'karaoke']
        const { currentAccommodation } = this.props;
        const { accommodation } = currentAccommodation;
        
        (accommodation.image).forEach(element => {
          newImageArray.push({src: element})
        });
        return (
          <ScrollBar style={{ height: '100%' }}>
            {this.state.showPopup ? (
              <Popup
                closePopup={this.togglePopup}
                // isAddRoom={this.state.isAddRoom}
              />
            ) : null}
            <div className="hotel_overview_card">
              <div className="hotel_overview_card_flame">
                <div className="hotel_overview_card_flame_top">
                  <div className="hotel_overview_card_flame_top_left">
                    <div className="hotel_overview_card_flame_top_left_rating"></div>
                    <div className="hotel_overview_card_flame_top_left_amenities">
                      <Amenities
                        accAmenities={accommodation.amenities}
                        amenityNumber={4}
                        setTheState={() => this.setTheState}
                      />
                    </div>
                    <div className="hotel_overview_card_flame_top_left_allAmenities">
                      <Button
                        type="submit"
                        className="btn hotel_overview_card_flame_top_left_allAmenities_button"
                        value='All amenities'
                        onClick={
                          this.props.AllAmenities
                        }
                      />
                    </div>
                  </div>
                  <div className="hotel_overview_card_flame_top_right">
                    <ImageViewer
                      imgs={newImageArray}
                      isOpen={this.state.isOpen}
                      currImg={this.state.currImg}
                      onClickPrev={this.gotoPrevImg}
                      onClickNext={this.gotoNextImg}
                      onClose={this.closeImgsViewer}
                    />
                    <img id="hotel_overview_card_flame_top_right_image" src={accommodation.image[0]} onClick={this.togglePopup} />
                  </div>
                </div>
                <div className="hotel_overview_card_flame_buttom">
                  <div className="hotel_overview_card_flame_buttom_div">
                    <h4 className="hotel_overview_card_flame_buttom_div_title">
                      Description
                    </h4>
                    <p className="hotel_overview_card_flame_buttom_div_description">
                      <FetchText description={accommodation.description} charCount={100} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollBar>
        );
    }
}

export default Overview;

