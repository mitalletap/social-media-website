import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Avatar, Modal, AutoComplete, Input } from 'antd';
import { Auth } from 'aws-amplify';
import { UserOutlined, BellOutlined, TeamOutlined, HomeOutlined, FormOutlined, ThunderboltOutlined, SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // this.getAllUsers();
    }
    
    handleSignout = () => {
        Auth.signOut()
    };

    render() { 
        const { searchValue } = this.state;
        return ( 
        <React.Fragment> 
            <div className="navbar-contaner">
                <div className="navbar-profile-banner">
                    <Link to="/profile"> <Avatar size={60} icon={<UserOutlined />} /> </Link>
                </div>
                <Menu className="navbar-menu-items" selectedKeys={[this.state.current]} mode={"vertical"}>
                    <Menu.Item key="post" className="navbar-title"> <Link to="/"> <HomeOutlined style={{ color: "white" }}/> <span className="navbar-title"> HOME </span> </Link> </Menu.Item>
                    <Menu.Item key="friends"> <Link to="/friends"> <TeamOutlined style={{ color: "white" }}/> <span className="navbar-title"> FRIENDS </span> </Link> </Menu.Item>
                    <Menu.Item key="notifications"> <Link to="/notifications"> <BellOutlined style={{ color: "white" }}/> <span className="navbar-title"> NOTIFICATIONS </span> </Link> </Menu.Item>
                    <Menu.Item key="create-post"> <Link to="/create-post"> <FormOutlined style={{ color: "white" }}/> <span className="navbar-title"> POST </span> </Link> </Menu.Item>
                    <Menu.Item key="sign-out" onClick={this.handleSignout} style={{ bottom: "-45vh" }}> <Link to="/"> <ThunderboltOutlined style={{ color: "white" }}/> <span className="navbar-title"> SIGN OUT </span> </Link> </Menu.Item>
                </Menu>
            </div>
          </React.Fragment>
         );
    }
}

export default NavBar;
