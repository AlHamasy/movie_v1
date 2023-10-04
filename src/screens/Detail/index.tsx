import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Detail Screen</Text>
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

export default DetailScreen;
