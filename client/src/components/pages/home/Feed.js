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
        console.log(process.env.REACT_APP_TEST)
        this.getAllPosts();
    }

    getAllPosts() {
        const { envState } = this.state;
        var envVar = HelperFunctions.getEnvironmentStatus();
        this.setState({ envState: envVar });
        console.log(envVar)
        const API=`http://${envVar}/`;
        fetch(API)
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