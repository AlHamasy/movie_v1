import React from 'react';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './_types';
import { fadeTransition } from './transitions';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

//screens
import BottomTabs from './BottomTabs';
import Home from '../screens/Home';
import Favorite from '../screens/Favorite';
import Login from '../screens/Login';
import Detail from '../screens/Detail';
import { defaultColors } from '../themes';

const Stack = createStackNavigator<RootStackParamList>();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator initialRouteName={'BottomTabs'}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          ...fadeTransition,
        }}
      />
    </Stack.Navigator>
  );
};

const UnauthenticatedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return <AuthenticatedStack />;
};

export default RootNavigator;
