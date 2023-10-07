import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../../components';

const HomeScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text type="regular" size={24}>
          Sisa cuti anda : 10
        </Text>
        <Text type="semibold" size={30}>
          Ini halaman home
        </Text>
      </View>
    </>
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
