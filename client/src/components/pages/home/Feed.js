import React, { Component } from 'react';
import FeedItem from './FeedItem';
import HelperFunctions from '../../../helpers/helper';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feed: [],
            envState: ''
        }
    }


    componentDidMount() {
        const { envState } = this.state;
        console.log("Node ENV: " + process.env.NODE_ENV);
        var envVar = HelperFunctions.getEnvironmentStatus();
        this.setState({ envState: envVar }, () => {
            this.getAllPosts();
        });
    }

    getAllPosts() {
        const { envState } = this.state;
        const API=`http://${envState}/`;
        fetch(API, {
            headers: {
                "access-control-allow-origin" : "*",
                "Content-type": "application/json; charset=UTF-8"
              }
        })
        .then(res => res.json())
        .then((result) => this.setState({ feed: result.reverse() }))
        .catch(err => console.log(err));
    }

    render() { 
        const { feed } = this.state;
        if(feed.length > 0) {
            return ( 
                <div className="feed-container">
                    {feed.map(function(item, i) {
                        return (
                            <React.Fragment key={`key-${i}`}>
                                <div className="feed-item" > 
                                    <FeedItem username={item.username} message={item.message} created={item.createdAt}/>
                                </div>
                                <br/>
                            </React.Fragment>
                        )
                    })}
                </div>
         );
        } else {
            return (
                <h1> There are no active posts </h1>
            )
        }
    }
}
 
export default Feed;
