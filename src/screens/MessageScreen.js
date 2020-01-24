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
    KeyboardAvoidingView, 
    Keyboard,
    View,
} from 'react-native';

import KeyboardListener from 'react-native-keyboard-listener';
const socketIO = require('socket.io-client');  

import * as Icon from '@expo/vector-icons'
import { Input } from 'react-native-elements';
import Logout from './AuthScreen/Logout';
import Messages from '../components/Messages';
import Actions from '../actions/actions';

let socket =  {}; 
        
export default class ChatsScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Chats',
        headerStyle: { backgroundColor: '#2196f3' },
          headerTintColor: '#fff',
      });

    constructor(props){
        super(props);
        this.state = {
            height: 1,
            Message: {
                name: 'Pratik Mathur',
                message: '',
                user: ''
            },
            messages: [],
            currentUser: ''
        };
        this.logout = this.logout.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.onChange = this.onChange.bind(this);
        this.keyboardClosed = this.keyboardClosed.bind(this);
        this.keyboardOpen = this.keyboardOpen.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.actions = new Actions();
    }

    async componentWillMount(){
        let socket1 = this.props.navigation.getParam('socket');
        let chat = this.props.navigation.getParam('chat');
        console.log(chat);
        socket = socket1;
        let temp = await AsyncStorage.getItem('userId');
        this.setState({currentUser: temp});
        this.getMessages();
         
        var self = this;

        socket.on('turn', function(data) {
            console.log(data);
            self.getMessages();
        });
    }

    componentWillReceiveProps(props){
        console.log(props);
    }

    getMessages(){
        this.actions.getMessages((res)=>{
            this.setState({messages: res})
        });
    }
    
    keyboardOpen(){
        let state = Object.assign({}, this.state);
        state.height = 0.7;
        this.setState(state);
      }
  
      keyboardClosed(){
        let state = Object.assign({}, this.state);
        state.height = 1;
        this.setState(state);
      }
  
    sendMessage(){
        let msg = { name: this.state.Message.name, message: this.state.Message.message, user: this.state.currentUser};
        this.actions.sendMessage(msg, (res)=>{
            this.actions.getMessages((res)=>{
                Keyboard.dismiss();
                this.setState({messages: res});
                this.getInitialState();
                socket.emit('message', true);
            });
        });
    }

    getInitialState(){
        let state = Object.assign({}, this.state.Message);
        state = {
            name: 'Pratik Mathur',
            message: '',
            user: ''
        },
        this.setState(state);
    }
    async logout(){
        let temp = await AsyncStorage.clear();
        this.props.navigation.navigate("Auth");
    }

    onChange = (value) => {
        let state = Object.assign({}, this.state);
        state.Message.message = value;
        this.setState(state);
    }

    render(){
        return (
            <View style={{flex: this.state.height}}>
              <View>
                  <Text>Chats</Text>
                  <Logout logout={this.logout} />
              </View>
              
                <Messages scroll={this.scroll} currentUser={this.state.currentUser} messages={this.state.messages}/>

                <View style={styles.tabBarInfoContainer}>
                        <KeyboardListener
                            onWillShow={this.keyboardOpen}
                            onWillHide={this.keyboardClosed}
                        />
                    <View style={styles.Message}>
                        <Input id = "message" class="form-control" placeholder="Your Message Here" onChangeText={(text)=>this.onChange(text)} multiline = {true} numberOfLines = {5} style={styles.MessageBox}></Input>

                        <Icon.Ionicons
                            name="md-send"
                            size={30}
                            style={{ marginBottom: -3, marginLeft: -3}}
                            color="#2196f3"
                            onPress={this.sendMessage}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        backgroundColor: '#fff',
    },
    Message: {
        flexDirection: 'row',
        flex: 0.9
      },
      MessageBox: {
        height: 0.6,
        flex: 0.7,
      },
      tabBarInfoContainer: {
        position: 'absolute',
        marginBottom: 10,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        left: 0,
        right: 0,
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          android: {
            elevation: 20,
          },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
      },
    
});