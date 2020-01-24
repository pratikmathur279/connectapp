import React from "react";
import { View, Text, Platform, Image, StyleSheet } from "react-native";
import Logout from '../screens/AuthScreen/Logout';
import TabBarIcon from '../components/TabBarIcon';

const CustomHeader = props => {
  return (
    <View
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.element}>Hi</Text>
        <Logout {...props} style={styles.element}/>       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#2196f3',
    // marginTop: Platform.OS == "ios" ? 0 : 0
  },
  header: {
    paddingTop: 45,
    textAlignVertical: "center",
    flexDirection: 'row',
    flex: 1
  },
  element: {
    flex: 1
  }
})
export default CustomHeader;
