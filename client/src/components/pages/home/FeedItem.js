import React, { Component } from 'react';
import moment from 'moment';

class FeedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feed: []
        }
    }

    
    render() { 
        var time = moment(this.props.created).format('LLL')  //'MMMM Do YYYY, h:mm:ss'
        return ( 
            <React.Fragment>
                <div className="feed-elements">
                    <h1> {this.props.username} </h1>
                    <h1> {this.props.message} </h1>
                    <h1> {time} </h1>
                </div>
            </React.Fragment>
         );
    }
}
 
export default FeedItem;