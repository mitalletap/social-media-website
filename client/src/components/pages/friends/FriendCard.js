import React, { Component } from 'react';
import { Avatar, Button, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

class FriendCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            longDescription: false
        }
    }

    componentDidMount() {
        this.props.description.length >= 30 ? this.setState({ longDescription: true }) : this.setState({ longDescription: false })
    }

    render() { 
        return (  
            <React.Fragment>
                <div className="friend-card-container">
                    <div className="friend-card-avatar"> 
                        <Avatar size={64} icon={<UserOutlined />} />
                        <h1> {this.props.name} </h1>
                    </div>
                    <div className="friend-card-data">
                        <p> {this.props.username} </p>
                        <Paragraph ellipsis={{ rows: 4, expandable: this.state.longDescription }}>
                            <p> {this.props.description} </p>
                        </Paragraph>
                    </div>
                    <div className="friend-card-follow">
                        <Button> Following </Button>
                    </div>
                </div>
                <br />
            </React.Fragment>
        );
    }
}
 
export default FriendCard;