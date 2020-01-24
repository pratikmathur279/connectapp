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


// import { SearchBar } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Actions from '../actions/actions';
import Users from '../components/Users';
import Search from '../components/common/search';

export default class CreateChatScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Chats',
        headerStyle: { backgroundColor: '#2196f3' },
          headerTintColor: '#fff',
      });

    constructor(props){
        super(props);
        this.state = {
            users: [],
            currentUser: '',
            search: '',
        };
        this.actions = new Actions();
        this.getAllUsers = this.getAllUsers.bind(this);
        this.logout = this.logout.bind(this);
        this.selectedUser = this.selectedUser.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.createChat = this.createChat.bind(this);
        this.search = this.search.bind(this);
    }

    async componentWillMount(){
        // let temp = await AsyncStorage.getItem('userId');
        let temp1 = await AsyncStorage.getItem('user');
        this.setState({ currentUser: JSON.parse(temp1)});
        this.getAllUsers();
    }

    getAllUsers(){
        this.actions.getUsers((data)=>{
            let users = [];
            data.forEach((el)=>{
                if(el.email !== this.state.currentUser.email){
                    users.push(el);
                }
            });
            this.setState({ users: users});
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

    selectedUser(user){
        let obj = {currentUser: this.state.currentUser, selectedUser: user};
        this.actions.createChat(obj, (res)=>{
            if(res.status === 200){
                this.props.navigation.navigate("chats", this.state.currentUser);
            }
            else{
                alert('error');
            }

        });
    }

    async logout(){
        let temp = await AsyncStorage.clear();
        this.props.navigation.navigate("Auth");
    }
    render(){
        return (
            <View style={styles.container}>
                
                <Search 
                    onChange={this.searchChange}
                    value={this.state.search}
                    keyUp={this.search}
                    name="search"
                />

                <Users 
                    users={this.state.users}
                    selectedUser={this.selectedUser} 
                />
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