import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Button,
    AsyncStorage,
    View,
  } from 'react-native';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

const socketIO = require('socket.io-client');  
import { Input } from 'react-native-elements';
import Logout from './AuthScreen/Logout';
import Actions from '../actions/actions';
import Users from '../components/Users';
import MessageScreen from './MessageScreen';

export default class ChatsScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Chats',
        headerStyle: { backgroundColor: '#2196f3' },
          headerTintColor: '#fff',
      });

    constructor(props){
        super(props);
        this.state = {
            users: [],
            currentUser: ''
        };
        this.actions = new Actions();
        this.logout = this.logout.bind(this);
    }

    async componentWillMount(){
        let temp = await AsyncStorage.getItem('userId');
        
        this.actions.getUsers((data)=>{
            this.setState({ users: data});
        });
    }

    async logout(){
        let temp = await AsyncStorage.clear();
        this.props.navigation.navigate("Auth");
    }
    render(){
        return (
            <View style={styles.container}>
                <MessageScreen />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});