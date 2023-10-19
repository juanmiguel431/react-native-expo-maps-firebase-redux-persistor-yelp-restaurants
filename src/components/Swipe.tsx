import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  GestureResponderEvent, PanResponderGestureState, PanResponderInstance
} from 'react-native';

type DeckProps<T> = {
  data: T[];
  renderCard: (item: T) => React.ReactNode;
  onSwipeRight?: (item: T) => void;
  onSwipeLeft?: (item: T) => void;
  onSwipe?: (item: T) => void;
  renderNoMoreCard?: () => React.ReactNode;
  keyExtractor: (item: T) => React.Key;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.65 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const defaultEmptySwipe = () => {};

const Swipe = <T,>(
  {
    data,
    renderCard,
    renderNoMoreCard,
    onSwipeLeft = defaultEmptySwipe,
    onSwipeRight = defaultEmptySwipe,
    onSwipe = defaultEmptySwipe,
    keyExtractor
  }: DeckProps<T>) => {
  const [index, setIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    setIndex(0);
  }, [data]);

  const onSwipeComplete = useCallback((direction: 'left' | 'right') => {
    LayoutAnimation.spring();
    setIndex((value) => value + 1);
    pan.setValue({ x: 0, y: 0 });
    const item = data[index];
    if (direction === 'left') {
      onSwipeLeft(item);
    } else {
      onSwipeRight(item);
    }
    onSwipe(item);
  }, [data, index, onSwipe, onSwipeLeft, onSwipeRight, pan]);

  const forceSwipe = useCallback((direction: 'left' | 'right') => {
    const dir = direction === 'left' ? -1 : 1;
    Animated.timing(pan, {
      toValue: { x: SCREEN_WIDTH * dir, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false
    }).start(() => {
      onSwipeComplete(direction);
    });
  }, [pan, onSwipeComplete]);

  const onPanResponderRelease = useCallback((e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    if (gestureState.dx > SWIPE_THRESHOLD) {
      forceSwipe('right');
    } else if (gestureState.dx < -SWIPE_THRESHOLD) {
      forceSwipe('left');
    } else {
      // pan.extractOffset(); // Keep the object in the place that you want.
      Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start(); // Return to the original position.
    }
  }, [forceSwipe, pan]);

  const panResponderRef = useRef<PanResponderInstance | null>(null);

  useEffect(() => {
    panResponderRef.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (e, gestureState) => {
        // pan.setValue({ x: gestureState.dx, y: gestureState.dy });
        const event = Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false });
        event(e, gestureState);
      },

      onPanResponderRelease: onPanResponderRelease
    })
  }, [onPanResponderRelease, pan.x, pan.y]);

  const getCardStyle = useCallback(() => {
    const width = SCREEN_WIDTH * 1.5;

    const rotate = pan.x.interpolate({
      inputRange: [-width, 0, width],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return { left: pan.x, transform: [{ rotate }] }; // This will prevent the movement in Y axis.
  }, [pan]);

  if (index >= data.length) {
    return renderNoMoreCard && renderNoMoreCard();
  }

  return (
    <View>
      {data.map((item, i) => {
        if (i < index) return;
        const key = keyExtractor(item);
        if (i === index) {
          return (
            <Animated.View
              key={key}
              style={[getCardStyle(), styles.cardStyle]}
              {...panResponderRef.current?.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={key}
            style={[
              styles.cardStyle,
              {
                zIndex: i * -1,
                top: 10 * (i - index)
              }
            ]}>
            {renderCard(item)}
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    // left: 0, right: 0 // Don't use this because will conflict with the card animation.
  }
})

export default Swipe;
