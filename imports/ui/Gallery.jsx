import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

class Gallery extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <p>Gallery</p>
            </div>
        );
    }
}

Gallery.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
    time: PropTypes.object,
};

export default Gallery;