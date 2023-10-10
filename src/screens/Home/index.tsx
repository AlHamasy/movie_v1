import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Text, Loading, Error, Pressable, EmptyList } from '../../components';
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
import { debounce } from 'lodash';

const HomeScreen = () => {
  dayjs.locale('id');
  const [moviesData, setMoviesData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const sizeListMovie = 20;

  const fetchMovieData = useCallback(async () => {
    setIsLoading(true);
    const url = `${BASE_URL_API}${endpointMovieNowPlaying}?language=en-US&page=1`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: TOKEN,
        },
      });

      if (response.status === 200) {
        setIsError(false);
        if (response.data.results.length !== 0) {
          setMoviesData(response.data.results);
          setCurrentPage(2);
        } else {
          setMoviesData([]);
        }
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMoreMovieData = useCallback(async () => {
    setIsLoading(true);
    const url = `${BASE_URL_API}${endpointMovieNowPlaying}?language=en-US&page=${currentPage}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: TOKEN,
        },
      });

      if (response.status === 200) {
        setIsError(false);
        if (response.data.results.length !== 0) {
          setMoviesData([...moviesData, ...response.data.results]);
          setCurrentPage(currentPage + 1);
        }
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, moviesData]);

  const handleStatusView = useCallback((): string => {
    if (isLoading && moviesData.length === 0) {
      return 'loading';
    } else if (isError) {
      return 'error';
    } else if (moviesData.length === 0) {
      return 'empty';
    } else if (moviesData.length >= 0) {
      return 'show';
    } else {
      return 'show';
    }
  }, [isError, isLoading, moviesData.length]);

  const handleEndReached = debounce(() => {
    if (!isLoading) {
      if (moviesData.length >= sizeListMovie) {
        fetchMoreMovieData();
      }
    }
  }, 300);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const renderMovieItems = useCallback(({ item }: { item: any }) => {
    return (
      <Pressable
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
      </Pressable>
    );
  }, []);

  const ListFooterComponent = useMemo(() => {
    return (
      <View style={{ height: 100, alignItems: 'center' }}>
        {moviesData.length >= sizeListMovie && (
          <Text color={defaultColors.grayText} type="regular" size={19}>
            {isLoading ? 'Memuat data...' : ''}
          </Text>
        )}
      </View>
    );
  }, [isLoading, moviesData.length]);

  const renderFlashlist = useMemo(() => {
    return (
      <FlashList
        data={moviesData}
        extraData={moviesData}
        renderItem={renderMovieItems}
        keyExtractor={(_, idx: number) => idx.toString()}
        onEndReached={() => {
          handleEndReached();
        }}
        estimatedItemSize={1000}
        ListFooterComponent={ListFooterComponent}
      />
    );
  }, [ListFooterComponent, handleEndReached, moviesData, renderMovieItems]);

  const renderStatusView = useCallback(
    (status: string) => {
      switch (status) {
        case 'loading':
          return <Loading />;
        case 'error':
          return <Error onPress={() => fetchMovieData()} />;
        case 'empty':
          return <EmptyList message={'Tidak ada list Movie'} />;
        case 'show':
          return renderFlashlist;
        default:
          return <View style={{ flex: 1 }} />;
      }
    },
    [fetchMovieData, renderFlashlist],
  );

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
      {renderStatusView(handleStatusView())}
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
