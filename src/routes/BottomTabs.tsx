/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { defaultColors } from '../themes';
import IconFeather from 'react-native-vector-icons/Feather';
import Home from '../screens/Home';
import Favorite from '../screens/Favorite';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const screenOptions = ({ route }: any) => ({
    tabBarIcon: ({ focused, color, size }: any) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Favorite') {
        iconName = 'bookmark';
      }

      // You can return any component that you like here!
      return <IconFeather name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: defaultColors.secondary,
    tabBarInactiveTintColor: defaultColors.grayText,
    tabBarStyle: { paddingBottom: 0 },
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorite" component={Favorite} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
