/*
** Main App 
** This originated as CMSC495 Final Project
** Date: Jan-Mar 2023
** Authors: Aaron G, Dalton C, Sean H, Chris T
*/
import logo from './logo.svg';
import './App.scss';
import SideBar from './components/SideBar/SideBar';
import MainContent from './components/MainContent/MainContent';
import "@aws-amplify/ui-react/styles.css";
import { API, Auth } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";

const App = ({ signOut }) => {
    return (
        <div className="App">
            <div className='nav-pane'>
                <SideBar signOut={ signOut } />
            </div>
            <div className='divider'></div>
            <div className='content-pane'>
                <MainContent />
            </div>
        </div>
    );
}

export default withAuthenticator(App);
