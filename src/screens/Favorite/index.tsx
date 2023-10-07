import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import {defaultColors} from '../../themes';

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent />
      <Text style={styles.title}>Favorite Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: defaultColors.secondary,
    fontSize: 24,
    fontFamily: 'Devil',
  },
});

export default FavoriteScreen;
