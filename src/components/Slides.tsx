import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { Text } from '@rneui/themed'
import { Slide } from '../models';

type SlidesProps = {
  data: Slide[];
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const Slides: React.FC<SlidesProps> = ({ data }) => {
  return (
    <ScrollView
      horizontal
      style={styles.view}
      pagingEnabled
    >
      {data.map(d => (
        <View key={d.text} style={styles.slide}>
          <Text style={styles.text}>{d.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: SCREEN_WIDTH,
  },
  text: {
    fontSize: 30
  },
  view: {
    height: '100%'
  }
});

export default Slides;
