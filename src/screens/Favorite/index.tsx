import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Text } from '../../components';
import { defaultColors } from '../../themes';
import { SafeAreaView } from 'react-native-safe-area-context';

const FavoriteScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <View style={styles.greetingText}>
        <Text type="semibold" size={24} color={defaultColors.secondary}>
          Favorite
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.grayBackground,
  },
  greetingText: {
    padding: 12,
    alignItems: 'center',
  },
});

export default FavoriteScreen;
