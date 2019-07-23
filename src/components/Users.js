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

const Users = (props) => {
    const buildRow = ( user) =>{ 
        return <Text key={user.id}>{user.name}</Text>
    }

    return(
        <View>
            {props.users.map(buildRow)}
        </View>
    );
}

export default Users;