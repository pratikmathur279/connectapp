import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
  } from 'react-native';

const Logout = (props) => {
    return(
        <TouchableOpacity onPress={props.logout}>
            <Text>Logout</Text>
        </TouchableOpacity>
    );
}

export default Logout;