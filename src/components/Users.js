import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Button,
    View,
  } from 'react-native';

const Users = ({users, selectedUser}) => {
    const buildRow = ( user) =>{ 
        let id = user.id;
        return (
            <TouchableOpacity key={user.id} id={user.id} style={styles.User} onPress={()=>selectedUser(user)}>
                <Image source={require('../assets/images/robot-dev.png')} style={styles.Image} />
                <Text style={styles.Name}>{user.name}</Text>
            </TouchableOpacity>
        );
    }

    return(
        <ScrollView>
            {users.map(buildRow)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    User: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 5,
        justifyContent: 'center'
    },
    Image: {
        width: 50, 
        height: 50
    },
    Name: {
        width: 300, 
        height: 50,
        paddingVertical: 15,
        justifyContent: 'center'
    }
});

export default Users;