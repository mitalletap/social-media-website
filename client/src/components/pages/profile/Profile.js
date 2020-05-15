import React, { Component } from 'react';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() { 
        return ( 
            <React.Fragment>
                <div className="private-profile-container" style={{ paddingTop: "50px"}}>
                    <h1> {`${this.props.username}'s Profile`} </h1>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Profile;