import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent />
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
