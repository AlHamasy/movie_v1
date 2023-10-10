import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { defaultColors } from '../../../../themes';

const Loading = () => {
  return (
    <View style={styles.container}>
      {[0, 1, 2, 3, 4, 5].map(index => (
        <View style={styles.item} key={index}>
          <View>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              width={100}
              height={150}
              style={{ borderRadius: 12 }}
            />
          </View>
          <View style={styles.viewShimmerText}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              height={20}
              width={wp(50) + 16}
              style={{ borderRadius: 8 }}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              height={15}
              width={wp(30)}
              style={{ marginTop: 8, borderRadius: 8 }}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              height={15}
              width={wp(50) + 16}
              style={{ marginTop: 16, borderRadius: 8 }}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              height={15}
              width={wp(50) + 16}
              style={{ marginTop: 6, borderRadius: 8 }}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              height={15}
              width={wp(50) + 16}
              style={{ marginTop: 6, borderRadius: 8 }}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              height={15}
              width={wp(50) + 16}
              style={{ marginTop: 6, borderRadius: 8 }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 24,
    backgroundColor: defaultColors.white,
    elevation: 3,
    flexDirection: 'row',
  },
  viewShimmerText: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'column',
  },
});

export default Loading;
