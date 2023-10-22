import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DeckScreenProps, SCREEN } from '../models/screen';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { Business } from '../models/yelp';
import Swipe from '../components/Swipe';
import { Button, Card } from '@rneui/themed';
import Map from '../components/Map';
import { likeRestaurant } from '../actions/likedRestaurantsActions';

type Props = DeckScreenProps & StateProps & DispatchProps;

const _DeckScreen: React.FC<Props> = ({ restaurants, navigation, likeRestaurant }) => {
  const renderCard = useCallback((item: Business, index: number, currentIndex: number) => {
    const show = (index - currentIndex) < 4;

    return (
      <Card key={item.id}>
        <View style={styles.mapContainer}>
          <View style={styles.mapBottomLayer}>
            {show &&
              <Map
                cacheEnabled={true}
                scrollEnabled={false}
                zoomEnabled={false}
                rotateEnabled={false}
                provider="google"
                mapStyle={styles.map}
                initialRegion={{
                  longitude: parseFloat(item.coordinates.longitude),
                  latitude: parseFloat(item.coordinates.latitude),
                  longitudeDelta: 0.0045,
                  latitudeDelta: 0.002,
                }}
              />
            }
          </View>
          <View style={styles.mapTopLayer}/>
        </View>
        <Card.Divider/>
        <Card.Title>{item.name}</Card.Title>
        <Button
          title="View Now!"
          icon={{ color: 'white' }}
          buttonStyle={{ backgroundColor: '#03A9F4' }}
        />
      </Card>
    );
  }, []);

  const renderNoMoreCard = useCallback(() => {
    return (
      <Card>
        <Card.Title>All done!</Card.Title>
        <Text>There is no more content here!</Text>
        <Card.Divider/>
        <Button
          title="Select a different place"
          icon={{ name: 'my-location', color: 'white' }}
          onPress={() => navigation.navigate(SCREEN.Map)}
        />
      </Card>
    );
  }, [navigation]);

  return (
    <View>
      <Swipe
        data={restaurants}
        renderCard={renderCard}
        keyExtractor={item => item.id}
        renderNoMoreCard={renderNoMoreCard}
        onSwipeRight={likeRestaurant}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  mapBottomLayer: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
  },
  mapTopLayer: {
    height: 300,
    opacity: 0,
    position: 'absolute',
    width: '100%'
  }
});

type StateProps = {
  restaurants: Business[]
}

const mapStateToProps: MapStateToProps<StateProps, DeckScreenProps, RootState> = ({ restaurant }) => {
  return {
    restaurants: restaurant.items
  }
}

type DispatchProps = {
  likeRestaurant: (item: Business) => void;
}

export const DeckScreen = connect(mapStateToProps, {
  likeRestaurant
})(_DeckScreen);
