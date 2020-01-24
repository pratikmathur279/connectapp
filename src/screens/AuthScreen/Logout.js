import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    AsyncStorage
  } from 'react-native';

const Logout = (props) => {
    const logout = async () => {
        let temp = await AsyncStorage.clear();
        props.navigation.navigate("Auth");
    }

    return(
        <TouchableOpacity onPress={logout}>
            <Text>Logout</Text>
        </TouchableOpacity>
    );
}

export default Logout;