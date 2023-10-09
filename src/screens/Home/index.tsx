import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Text} from '../../components';
import {defaultColors} from '../../themes';
import {
  BASE_URL_API,
  TOKEN,
  endpointMovieNowPlaying,
} from '../../utils/helpers/dataDummy';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [moviesData, setMoviesData] = useState<any[]>([]);

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
        console.log('movies', 'it works');
      } else {
        console.log('movies', 'not works');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <View style={styles.greetingText}>
        <Text type="regular" size={20}>
          Hello!
          <Text type="medium" size={22}>
            {' '}
            Asad
          </Text>
        </Text>
        <Text type="regular" size={20}>
          Select your favorite movie
        </Text>
      </View>
      {moviesData.map(movie => (
        <Text type="regular" key={movie.id}>
          {movie.title}
        </Text>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.grayBackground,
  },
  greetingText: {
    marginHorizontal: 16,
  },
});

export default HomeScreen;
