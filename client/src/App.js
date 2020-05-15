import React, { Component } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';

import NavBar from './components/layout/NavBar';
import Home from './components/pages/home/Home';
import Friends from './components/pages/friends/Friends';
import Profile from './components/pages/profile/Profile';
import Notifications from './components/pages/notifications/Notifications';
import Post from './components/pages/post/Post';
import PublicProfile from './components/pages/profile/PublicProfile';


import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Layout, Menu, Input, Button } from 'antd';

import './App.css';
import 'antd/dist/antd.css';
import '@aws-amplify/ui/dist/style.css';

require('dotenv').config()
Amplify.configure(aws_exports);
const { Header, Content, Footer, Sider } = Layout;


const signUpConfig = {
  hiddenDefaults: ["username"],
  defaultCountryCode: '1',
  signUpFields: [{
    label: 'Name',
    key: 'name',
    required: true,
    displayOrder: 1,
    type: 'string',
  },
  {
    label: 'Username',
    key: 'preferred_username',
    required: true,
    displayOrder: 2,
    type: 'string',
  },
  {
    label: 'Date of Birth',
    key: 'birthdate',
    required: true,
    displayOrder: 3,
    type: 'date',
  }]
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userSignedIn: false,
      username: "",
      name: '',
      email: '',
      phoneNumber: '',
      birthday: '',
      loaded: false
    }
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then((res) => { 
        this.setState({ 
          userSignedIn: true,
          username: res.username,
          name: res.attributes.name,
          email: res.attributes.email,
          birthday: res.attributes.birthdate,
          phoneNumber: res.attributes.phone_number
        }, res.username !== '' ? this.setState({ loaded: true }) : this.setState({ loaded: false }));
      })
      .catch(err => console.log(err))
  }



  getUserData() {
    const { userData } = this.state;
    var data = [];
    data.push(userData.username);
    data.push(userData.attributes.name);
    return data;
  }

  render() {
    const { name, username, loaded } = this.state;
    return (
      loaded === true ? 
      <React.Fragment>
        <div className="app-container">
          <Router>
            <Layout>
              <Sider breakpoint="lg" collapsedWidth="100" className="sider-navbar" theme={"light"} width={500}>
                  <NavBar />
              </Sider>
              <Layout className="a
              pp-content">
                <Layout>
                  <Content>
                    <Switch className="app-content-items">
                      <Route exact path="/"><Home username={username} name={name}/></Route>
                      <Route exact path="/friends"><Friends username={username} /></Route>
                      <Route exact path="/profile"><Profile username={username}/></Route>
                      <Route exact path="/notifications"><Notifications /></Route>
                      <Route exact path="/create-post"><Post name={name} username={username}/></Route>
                      {/* <Route path="/u/:username"> <PublicProfile username={username}/> </Route>   */}
                      <Route path="/u/:username" component={PublicProfile} />   
                    </Switch>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </Router>
        </div>
      </React.Fragment>
      :
      <h1> Loading </h1>

    )
  }
}

export default App;
// export default withAuthenticator(App, { signUpConfig });











