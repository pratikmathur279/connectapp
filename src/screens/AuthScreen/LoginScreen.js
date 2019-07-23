import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    View,
    AsyncStorage
  } from 'react-native';
  import { Input } from 'react-native-elements';
import Actions from '../../actions/actions';

export default class LoginScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        // title: 'Login',
        headerStyle: { backgroundColor: '#2196f3' },
          headerTintColor: '#fff',
      });

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            error: '',
            title: 'Login',
            Login: {
                username: '',
                password: ''
            },
            isLoggedIn: false
        };
        this.actions = new Actions();
        this.onLoginChange = this.onLoginChange.bind(this);
    }

    async componentWillMount(){
        let temp = await AsyncStorage.getItem('userId') ? true : false;
        if(temp){
            this.props.navigation.navigate("Home", { onRefresh: this.refresh })
        }
    }
    

    onLoginChange = (value, key) => {
        let state = Object.assign({}, this.state);
        if(key=='username'){
          state.Login.username = value;
        }
        else {
          state.Login.password = value;
        }
        this.setState(state);
    }
    
    onLogin = () => {
        let state = Object.assign({}, this.state);
    
        console.log(this.state.Login);
        this.actions.checkUserAuth(this.state.Login, async (res)=>{
            if(res.status === 200){
                let isAdmin = (res.data.isAdmin === 1 ? true : false);
                console.log(isAdmin);
                let temp = await AsyncStorage.setItem('userId', (this.state.Login.username));
                this.props.navigation.navigate("Home", { onRefresh: this.refresh });
            }
            else{
                state.error = "Check your credentials"; 
                console.log('here');
                this.setState(state);
            }
        }); 
      };

    render(){
        return (
            <View style={styles.Container}>
                <Image style={styles.Logo} source={require('../../assets/images/whatsapp.png')} />
                <Text style={styles.Heading}>Sign in with...</Text>
                <Text style={styles.ErrorMessage}>{this.state.error}</Text>
            <View style={styles.LoginInput}>
                <Input onChangeText={(text)=>this.onLoginChange(text, 'username')} placeholder="Username" name="username" style={styles.LoginInput} autoCapitalize='none' />
            </View>
            <View>
                <Input secureTextEntry={true} placeholder="Password" name="password" onChangeText={(text)=>this.onLoginChange(text, 'password')} style={styles.LoginInput} autoCapitalize='none' />
            </View>
            
            <View style={styles.LoginButton}>
                <TouchableOpacity onPress={this.onLogin}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>

            </View>

        </View>
        )
    }
}

const styles=StyleSheet.create({
    Container: {
        // alignItems: 'center',
        backgroundColor: '#A9A9A9',
        marginHorizontal: 30,
        marginVertical: 40,
        paddingHorizontal: 30,
        paddingVertical: 40,
        borderRadius: 30
    },
    Logo: {
        alignSelf: "center",
        width: 120,
        height: 120,
        marginBottom: 40
    },
    Heading: {
        textAlign: 'center',
        fontSize: 28
    },
    LoginButton: {
        marginTop: 30,
        width: "75%",
        marginHorizontal: 5,
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#428AF8",
        paddingVertical: 12,
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.7)",
        borderWidth: StyleSheet.hairlineWidth
    },
    text: {
        textAlign: 'center',
        color: "white"
    },
    LoginInput: {
        marginBottom: 25
    },
    ErrorMessage: {
        paddingTop: 20,
        paddingBottom: 10,
        color: "red",
        textAlign: "center"
      }
    
});