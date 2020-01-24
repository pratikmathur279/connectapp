import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ChatsScreen from '../screens/ChatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MessageScreen from '../screens/MessageScreen';
import CreateChatScreen from '../screens/CreateChatScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ChatStack = createStackNavigator({
    chats: ChatsScreen,
    addChat: CreateChatScreen,
    messages: MessageScreen
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-chatbubbles${focused ? '' : ''}`
          : 'md-chatbubbles'
      }
    />
  ),
};

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ChatStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
