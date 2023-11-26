import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { defaultColors } from '../../themes';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Pressable, Text } from '../../components';
import FastImage from 'react-native-fast-image';
import { BASE_URL_IMAGE } from '../../utils/helpers/constant';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

const DetailScreen = () => {
  const statusBarHeight = getStatusBarHeight();
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const item = route.params.movieData;

  const renderBackButton = useMemo(() => {
    return (
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          zIndex: 1,
          position: 'absolute',
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
    <ScrollView style={styles.container}>
      {renderBackButton}
      <FastImage
        style={{
          width: wp(100),
          height: 230,
          borderRadius: 12,
        }}
        source={{
          uri: `${BASE_URL_IMAGE}${item.backdrop_path}`,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View
        style={{
          width: wp(100) - 32,
          height: 140,
          marginHorizontal: 16,
          flexDirection: 'row',
        }}>
        <FastImage
          style={{
            width: 120,
            height: 180,
            backgroundColor: 'skyblue',
            borderRadius: 12,
            marginTop: -40,
          }}
          source={{
            uri: `${BASE_URL_IMAGE}${item.poster_path}`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View
          style={{
            width: wp(100) - 120 - 32,
            height: 140,
            padding: 16,
          }}>
          <Text type="medium" color={defaultColors.text} size={24}>
            {item.original_title}
          </Text>
          <Text
            type="regular"
            color={defaultColors.text}
            size={18}
            style={{ marginTop: 8 }}>
            {dayjs(item.release_date).format('MMM D, YYYY')}
          </Text>
        </View>
      </View>
      {/* <Text>Detail Screen</Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.grayBackground,
  },
});

export default DetailScreen;
