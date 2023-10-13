import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { Button, Text } from '@rneui/themed'
import { Slide } from '../models';

type SlidesProps = {
  data: Slide[];
  onComplete: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const Slides: React.FC<SlidesProps> = ({ data, onComplete }) => {
  return (
    <ScrollView
      horizontal
      style={styles.view}
      pagingEnabled
    >
      {data.map((slide, index) => (
        <View key={slide.text} style={[styles.slide, { backgroundColor: slide.color }]}>
          <Text style={styles.text}>{slide.text}</Text>
          {index === data.length - 1 &&
            <>
              <Button
                title="Onwards!"
                raised
                titleStyle={styles.buttonTitle}
                containerStyle={styles.buttonContainer}
                style={styles.buttonStyle}
                onPress={onComplete}
              />
            </>
          }
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // backgroundColor: '#0288D1',
    backgroundColor: '#02d12b',
    marginTop: 85,
  },
  buttonStyle: {
    backgroundColor: '#d10258',
  },
  buttonTitle: {
    // backgroundColor: '#d18f02',
  },
  slide: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: SCREEN_WIDTH,
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30
  },
  view: {
    height: '100%'
  }
});

export default Slides;
