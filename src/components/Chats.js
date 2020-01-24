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

const Chats = ({chats, currentUser, selectedChat}) => {
    const buildRow = ( chat) =>{ 
        if(currentUser.email === chat.user1_email){
            console.log(chat.user2_email);
            return (
                <TouchableOpacity key={chat.id} id={chat.id} style={styles.User} onPress={()=>selectedChat(chat)} >
                    <Image source={require('../assets/images/robot-dev.png')} style={styles.Image} />
                    <Text style={styles.Name}>{chat.user2_name}</Text>
                </TouchableOpacity>
            );
        }else{
            return (
                <TouchableOpacity key={chat.id} id={chat.id} style={styles.User} onPress={()=>selectedChat(chat)}>
                    <Image source={require('../assets/images/robot-dev.png')} style={styles.Image} />
                    <Text style={styles.Name}>{chat.user1_name}</Text>
                </TouchableOpacity>
            );
        }
        
    }

    return(
        <ScrollView>
            {chats.map(buildRow)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    User: {
        // flex: 1,
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

export default Chats;