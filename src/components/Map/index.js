import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
// import './style.css'
export default class LeafletMap extends Component {
    constructor() {
        super()
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13
        }
  }
    render() {
    const coordinates = (this.props.coordinates).split(',')

      const position = [Number(coordinates[0]), Number(coordinates[1])];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}
