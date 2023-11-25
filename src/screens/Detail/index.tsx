import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { defaultColors } from '../../themes';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { Pressable } from '../../components';

const DetailScreen = () => {
  const statusBarHeight = getStatusBarHeight();
  const navigation = useNavigation();

  const renderBackButton = useMemo(() => {
    return (
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          width: 40,
          height: 40,
          backgroundColor: defaultColors.white,
          elevation: 2,
          borderRadius: 20,
          marginTop: statusBarHeight + 8,
          marginLeft: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IconIonicons
          name="arrow-back"
          size={24}
          color={defaultColors.primary}
        />
      </Pressable>
    );
  }, [navigation, statusBarHeight]);

  return (
    <View style={styles.container}>
      {renderBackButton}
      {/* <Text>Detail Screen</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.grayBackground,
  },
});

export default DetailScreen;
