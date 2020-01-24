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

let socket =  {}; 

const socketIO = require('socket.io-client'); 
import Logout from './AuthScreen/Logout';
import Actions from '../actions/actions';
import Chats from '../components/Chats';
import MessageScreen from './MessageScreen';

export default class ChatsScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Chats',
        headerStyle: { backgroundColor: '#2196f3' },
        headerTintColor: '#fff',
        // header: props => <CustomHeader {...props} />
      });

    constructor(props){
        super(props);
        this.state = {
            users: [],
            chats: [],
            isOnline: false,
            currentUser: {},
            search: ''
        };
        this.actions = new Actions();
        this.handler = this.handler.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.logout = this.logout.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.selectedChat = this.selectedChat.bind(this);
        this.createChat = this.createChat.bind(this);
        this.search = this.search.bind(this);
    }

    async componentWillMount(){
        let temp1 = await AsyncStorage.getItem('user');
        this.setState({ currentUser: JSON.parse(temp1)});
        this.getAllChats();

        var self = this;

        socket = socketIO('https://d58351bc.ngrok.io', {      
            transports: ['websocket'], jsonp: false }); 
        socket.connect(); 
        socket.on('connect', () => { 
            console.log('connected to socket server');
        });

        socket.on('available', (data)=>{
            // alert(data);
        })

        socket.on('userConnect', (socket_id)=>{
            console.log('id is '+socket_id);
            let obj = {isOnline: true, user_id: this.state.currentUser.id, socket_id: socket_id }
            this.actions.userOnline(obj, (res)=>{
                console.log('here1');
                this.setState({ isOnline: true});
            });
        })

        socket.on('turn', function(data) {
            console.log(data);
            self.getMessages();
        });

        socket.on('disconnect', function(data){
            console.log(data);
        })
    }

    componentWillReceiveProps(props){
        this.getAllChats();
    }

    componentWillUnmount(){
        console.log('unmounted');
        socket.on('disconnect', function(data){
            console.log(data);
        })
    }

    handler(){
        console.log('handler');
    }

    getAllChats(){
        this.actions.getChats((data)=>{
            let chats = [];
            data.forEach((el)=>{
                if(el.user1_email === this.state.currentUser.email || el.user2_email === this.state.currentUser.email){
                    chats.push(el);
                }
            });
            this.setState({ chats: chats});
        });
    }

    getAllUsers(){
        this.actions.getUsers((data)=>{
            this.setState({ users: data});
        });
    }

    searchChange(value){
        if(value.length === 0){
            this.getAllUsers();
        }
        this.setState({search: value});
    }

    search(e){
        console.log(this.state.search);
        // if(e.keyCode === 13){
        //     this.actions.search(this.state.search);
        // }
    }

    createChat(){
        this.props.navigation.navigate("addChat");
    }

    selectedChat(chat){
        console.log(chat);
        this.props.navigation.navigate("messages", {
            socket: socket,
            chat: chat
        })
    }

    async logout(){
        let temp = await AsyncStorage.clear();
        this.props.navigation.navigate("Auth");
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.UserHeader}>Welcome, {this.state.currentUser.name}</Text>
                <Logout {...this.props} />
                <TouchableOpacity onPress={this.createChat}><Text>Create Chat</Text></TouchableOpacity>

                {this.state.isOnline ? <Text>Online</Text> : null}
                <Chats {...this.state} selectedChat={this.selectedChat} />
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
    UserHeader: {
        textAlign: 'center',
        fontSize: 20
    }
});