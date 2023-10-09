import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './_types';
import { fadeTransition } from './transitions';

//screens
import BottomTabs from './BottomTabs';
import Home from '../screens/Home';
import Favorite from '../screens/Favorite';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator initialRouteName={'BottomTabs'}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
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
