import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Text} from '../../components';
import {defaultColors} from '../../themes';

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent />
      <Text type="regular" size={20}>
        Hello!
      </Text>
      <Text type="medium" size={22}>
        Selamat datang Asadullah Al Hamasy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.grayBackground,
  },
  title: {
    color: defaultColors.secondary,
    fontSize: 24,
    fontFamily: 'Devil',
  },
});

export default FavoriteScreen;
