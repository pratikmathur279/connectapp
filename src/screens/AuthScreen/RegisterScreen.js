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
  } from 'react-native';
import { Input } from 'react-native-elements';

import Actions from '../../actions/actions';

export default class LoginScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Register',
        headerStyle: { backgroundColor: '#2196f3' },
          headerTintColor: '#fff',
      });

    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false,
            text: 'Register',
            loading: false,
            error: '',
            title: props.title,
            Register: {
              name: '',
              email: '',
              username: '',
              password: '',
              favorite_team: ''
            },
            showLogin: true,
            isLoggedIn: false
          };
          this.actions = new Actions();
          this.onRegister = this.onRegister.bind(this);
          this.onRegisterChange = this.onRegisterChange.bind(this);
    }

    componentWillMount(){

    }

    onRegister(){
        console.log(this.state.Register);
        this.actions.createUser(this.state.Register, (data)=> {
          this.setState({ showLogin: true, error: 'Registration Successful!' });
        });
    
    }

    onRegisterChange = (value, key) => {
        let state = Object.assign({}, this.state);
        if(key=='name'){
          state.Register.name = value;
        }
        if(key=='email'){
          state.Register.email = value;
        }
        if(key=='username'){
          state.Register.username = value;
        }
        if(key=='password'){
          state.Register.password = value;
        }
        if(key=='favorite_team'){
          state.Register.favorite_team = value;
        }
        this.setState(state);
      }

    render(){
        return (
            <View style={styles.Container}>
            <Image style={styles.Logo} source={require('../../assets/images/whatsapp.png')} />
                <Text style={styles.Heading}>Create Account</Text>
                {this.state.error ? <Text style={styles.ErrorMessage}>{this.state.error}</Text> : null}
                
            <View style={styles.RegisterInput}>
                <Input onChangeText={(text)=>this.onRegisterChange(text, 'name')} placeholder="Name" name="name" style={styles.RegisterInput} />
            </View>
            <View style={styles.RegisterInput}>
                <Input onChangeText={(text)=>this.onRegisterChange(text, 'email')} placeholder="Email" name="email" style={styles.RegisterInput} autoCapitalize='none' />
            </View>
            <View style={styles.RegisterInput}>
                <Input onChangeText={(text)=>this.onRegisterChange(text, 'username')} placeholder="Username" name="Username" style={styles.RegisterInput} autoCapitalize='none' />
            </View>
            <View style={styles.RegisterInput}>
                <Input secureTextEntry={true} placeholder="Password" name="password" onChangeText={(text)=>this.onRegisterChange(text, 'password')} style={styles.RegisterInput} autoCapitalize='none' />
            </View>
            <View style={styles.RegisterInput}>
                <Input onChangeText={(text)=>this.onRegisterChange(text, 'favorite_team')} placeholder="Favorite Team" name="favorite_team" style={styles.RegisterInput}/>
            </View>

            <View style={styles.LoginButton}>
                <TouchableOpacity onPress={this.onRegister}>
                    <Text style={styles.text}>Register</Text>
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
      width: 100,
      height: 100,
      marginBottom: 20
  },
  Heading: {
      textAlign: 'center',
      fontSize: 28,
      marginBottom: 10
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
      paddingTop: 10,
      paddingBottom: 10,
      color: "red",
      textAlign: "center"
    }
  
});