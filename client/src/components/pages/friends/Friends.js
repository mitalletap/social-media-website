import React, { Component } from 'react';
import FriendCard from './FriendCard'

class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            userData: [],
            pageLoaded: false,
        }
    }


    componentDidMount() {
        const { username } = this.state;
        this.setState({ username: this.props.username });
        this.queryDatabaseForUser(this.props.username);
        this.setState({ pageLoaded: true })
    }


    queryDatabaseForUser = async username => {
        const API= `http://localhost:5000/user/${username}`;
        console.log(API)
        fetch(API, { method: 'GET' })
        .then(res => res.json())
        .then((result) => { this.setState({ userData: result[0] }, 
            () => { console.log(result) } )})
        .catch((err) => { console.log(err) } );
    }

    render() {
        const { userData, pageLoaded } = this.state;
        console.log(userData)
        if(pageLoaded === true) {
            return (
                <React.Fragment>
                    <div className="friends-container" style={{ paddingTop: "50px"}}>
                        {/* {userData.followers.map(function(follower, i) {
                            return (
                                <React.Fragment key={i}>
                                    <div className="profile-post-item" > 
                                        <h1> Hello </h1>
                                    </div>
                                </React.Fragment>
                            )
                        })} */}
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <h1> Loading.. </h1>
            )
        }
    }
}

export default Friends;



{/* <FriendCard name={"mital"} username={"@mitalletap"} description={"user bio"}/>
<FriendCard name={"chirag"} username={"@chiggy"} description={"asdasd"}/>
<FriendCard name={"ann"} username={"@annnnnn"} description={"user "}/> */}