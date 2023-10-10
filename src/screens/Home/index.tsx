import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Text, Loading, Error } from '../../components';
import { defaultColors } from '../../themes';
import {
  BASE_URL_API,
  TOKEN,
  BASE_URL_IMAGE,
  endpointMovieNowPlaying,
} from '../../utils/helpers/constant';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

const HomeScreen = () => {
  dayjs.locale('id');
  const [moviesData, setMoviesData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchMovieData = useCallback(async () => {
    const url = `${BASE_URL_API}${endpointMovieNowPlaying}?language=en-US&page=1`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: TOKEN,
        },
      });

      if (response.status === 200) {
        setMoviesData(response.data.results);
      } else {
        setMoviesData([]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  const fetchMoreMovieData = useCallback(async () => {
    const url = `${BASE_URL_API}${endpointMovieNowPlaying}?language=en-US&page=${currentPage}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: TOKEN,
        },
      });

      if (response.status === 200) {
        setMoviesData([...moviesData, ...response.data.results]);
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [currentPage, moviesData]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const renderMovieItems = useCallback(({ item }: { item: any }) => {
    return (
      <View
        style={{
          marginHorizontal: 16,
          marginVertical: 8,
          backgroundColor: defaultColors.white,
          borderRadius: 24,
          overflow: 'hidden',
          padding: 12,
          flexDirection: 'row',
        }}>
        <FastImage
          style={{
            width: 100,
            height: 150,
            backgroundColor: 'skyblue',
            borderRadius: 12,
          }}
          source={{
            uri: `${BASE_URL_IMAGE}${item.poster_path}`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text type="semibold" size={20} color={defaultColors.primary}>
            {item.original_title}
          </Text>
          <Text type="regular" size={16} style={{ marginTop: 4 }}>
            {'Release'} : {dayjs(item.release_date).format('D MMMM YYYY')}
          </Text>
          <Text
            type="regular"
            size={18}
            numberOfLines={4}
            style={{ marginTop: 6 }}>
            {item.overview}
          </Text>
        </View>
      </View>
    );
  }, []);

  const renderFlashlist = useMemo(() => {
    return (
      <FlashList
        data={moviesData}
        renderItem={renderMovieItems}
        keyExtractor={(_, idx: number) => idx.toString()}
        estimatedItemSize={20}
        // onEndReached={fetchMoreMovieData}
      />
    );
  }, [moviesData, renderMovieItems]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <View style={styles.greetingText}>
        <Text type="semibold" size={24} color={defaultColors.secondary}>
          Movie
        </Text>
      </View>
      {renderFlashlist}
      {/* <Loading /> */}
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
  image: {
    width: 200,
    height: 200,
  },
});

export default HomeScreen;
