import React, { Component } from 'react';
import { Input, Button, Progress } from 'antd';
import { Auth } from 'aws-amplify';
import HelperFunctions from '../../../helpers/helper';


const { TextArea } = Input;

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charactersUsed: 0,
            message: "",
            email: this.props.email,
            username: this.props.username,
            envState: ''
        }
    }


    componentDidMount() {
        var envVar = HelperFunctions.getEnvironmentStatus();
        this.setState({ envState: envVar });
        Auth.currentAuthenticatedUser()
        .then((res) => this.setState({ 
            userSignedIn: true,
            username: res.username,
            email: res.attributes.email,
        }))
        .catch(err => console.log(err))
    }

    handlePost = (e) => {
        const { message, username } = this.state;
        console.log(message, username)
        const object = {
            username,
            message,
        }
        console.log(object);
        this.sendPOSTRequest(object);
    }

    handlePostCharacters = (e) => {
        const { message } = this.state;
        if(e.target.value.length === 0) {
            this.setState({ message: "", charactersUsed: 0})
        } else {
            this.setState({ message: e.target.value, charactersUsed: 0 + e.target.value.length, typing: true })
        }
    }

    sendPOSTRequest(message) {
        const { envState } = this.state;
        const API = `http://${envState}/post`;
        fetch(API, {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
        .catch(err => console.log(err));
    }
    

    render() {
        const { charactersUsed, message, username } = this.state;
        return (
            <React.Fragment>
                <div className="post-container" style={{ paddingTop: "50px"}}>
                    <div className="post-input-area">
                        <TextArea allowClear maxLength={250} rows={4} style={{ width: "50vw" }}  onChange={this.handlePostCharacters}></TextArea>  
                        <Progress percent={this.state.charactersUsed * .4} size="small" showInfo={false} strokeColor={{ from: '#63cdda', to: '#0984e3'}} style={{ maxWidth: "50vw"}}/>
                    </div>
                    <div className="post-button">
                        <Button className="primary-button" disabled={this.state.charactersUsed === 0} onClick={() => this.handlePost(this.state.message)}> {this.state.charactersUsed === 0 ? `WHATS ON YOUR MIND?` : `POST WITH ${charactersUsed} CHARACTERS`} </Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Post;

//'#1B9CFC', to: '#182C61'