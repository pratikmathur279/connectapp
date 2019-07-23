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

const Messages = (props) => {
    const buildRow = ( message) =>{ 
        return (
            <View key={message.id} style={[ message.user === props.currentUser ? styles.CurrentForumItem: styles.ForumItem]}>
                <Text>{message.name}</Text>
                <Text>{message.message}</Text>
            </View>
        );
    }
    if(props.messages.length > 0){
        return(
            <ScrollView style={styles.ChatMessages}>
                {props.messages.map(buildRow)}
            </ScrollView>
        );
    }
    else{
        return null;
    }
}

const styles = StyleSheet.create({
    ChatMessages: {
        marginBottom: 100
    },
    MessageContainer: {
        maxWidth: '60%',
        marginLeft: '40%'
    },
    ForumItem: {
        marginBottom: 10,
        paddingVertical: 10,
        backgroundColor: "#B3B3B3",
        color: '#3B83C4',
        paddingLeft: 10,
        borderRadius: 10,
        flexDirection:'column',
        paddingRight: 10,
        maxWidth: '60%',
        marginRight: '40%',
        alignSelf: 'flex-start'
    },
    CurrentForumItem: {
        paddingVertical: 10,
        marginLeft: "40%",
        marginBottom: 10,
        color: '#fbfbfb',
        backgroundColor: '#3B83C4',
        maxWidth: '60%',
        marginRight: 10,
        alignSelf: 'flex-end',
        paddingLeft: 10,
        borderRadius: 10,
        flexDirection:'column',
        paddingRight: 10,
    },
    userHeading: {
        fontSize: 16,
    }

});
export default Messages;