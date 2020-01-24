import React, {PropTypes} from 'react';

import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    AsyncStorage,
    View,
  } from 'react-native';
import TabBarIcon from '../TabBarIcon';

const Search = props => {
    return (
        <View style={styles.Search}>
            <View  style={styles.Input}>
            <TabBarIcon
                    style={styles.Magnify}
                    name={
                        Platform.OS === 'ios'
                        ? `ios-search` : 'md-search'
                    }
                />

                <TextInput style={styles.Text} type="text" name={props.name} onChangeText={(text)=>props.onChange(text)} value={props.value} onEndEditing={props.keyUp} placeholder='Search People' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Search: {
        paddingHorizontal: 14,
        // paddingBottom: 10,
        marginHorizontal: 10,
        paddingVertical: 14,
        backgroundColor: '#E9EBEE',
        borderRadius: 10
    },
    Input: {
        backgroundColor: '#fff',
        fontSize: 18,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        // flex: 1,
        flexDirection: "row"
    },
    Magnify: {
        flex: 0.1
    },
    Text: {
        marginLeft: 5,
        paddingTop: 2,
        flex: 1 
    }
});
export default Search;

