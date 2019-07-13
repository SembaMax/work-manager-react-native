import React from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import DevelopersList from './components/DevelopersList';
import ProjectsList from './components/ProjectsList';
import ProjectDiscussion from './components/ProjectDiscussion';
import {Actions} from 'react-native-router-flux'

const RouterComponent = () =>
{
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth" hideNavBar>
                    <Scene key = "login" component = {LoginForm} />
                </Scene>
                <Scene key="main">
                    <Scene key = "developersList" component = {DevelopersList} title="Developers" initial 
                    rightTitle='LogOut'
                    onRight={() => Actions.pop()}
                    />
                    <Scene key = "projectsList" component = {ProjectsList} title="Projects" />
                    <Scene key = "projectDiscussion" component = {ProjectDiscussion} title="Discussion" />
                </Scene>
            </Scene>
        </Router>
    )
} 

export default RouterComponent;