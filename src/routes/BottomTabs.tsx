/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Text} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import Home from '../screens/Home';
import Favorite from '../screens/Favorite';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const screenOptions = ({route}: BottomTabScreenProps<any, any>) => ({
    headerShown: false,
    tabBarStyle: {
      height: 65,
    },
    tabBarIcon: ({
      focused,
      color,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }) => {
      let iconName;
      let name;

      if (route.name === 'Home') {
        iconName = 'home';
        name = 'Home';
      } else if (route.name === 'Favorite') {
        iconName = 'bookmark';
        name = 'Favorite';
      }

      return (
        <View style={styles.tabContainer}>
          <IconFeather name={iconName} size={24} color={color} />
          <Text
            type={'regular'}
            size={15}
            style={[styles.tabIconText, {color: focused ? 'green' : 'grey'}]}>
            {name}
          </Text>
        </View>
      );
    },
  });

  const tabBarOptions = {
    activeTintColor: 'green',
    inactiveTintColor: 'gray',
    showLabel: false,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorite" component={Favorite} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconCircleFocused: {
    borderWidth: 2,
    borderColor: 'white',
  },
  tabIconText: {
    marginTop: 5,
  },
  tabContainer: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;
