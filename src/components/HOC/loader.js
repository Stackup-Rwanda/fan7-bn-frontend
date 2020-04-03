import React, { Component } from 'react'
import './LoadingHOC.css';

const LoaderHoc = (propName) => (WrappedComponent) => {
    return class loader extends Component {
        render() {
            console.log(this.props[propName])
            return this.props[propName].isLoading == true ? <div className="loader" />: <WrappedComponent {... this.props} />
        }
    }
}

export default LoaderHoc;

