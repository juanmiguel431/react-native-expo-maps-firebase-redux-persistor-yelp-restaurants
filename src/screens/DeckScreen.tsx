import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DeckScreenProps } from '../models/screen';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { Business } from '../models/yelp';
import Swipe from '../components/Swipe';
import { Button, Card } from '@rneui/themed';
import Map from '../components/Map';

type Props = DeckScreenProps & StateProps;

const _DeckScreen: React.FC<Props> = ({ restaurants }) => {

  const renderCard = useCallback((item: Business) => {
    return (
      <Card key={item.id}>
        <View style={styles.mapContainer}>
          <View style={styles.mapBottomLayer}>
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
          </View>
          <View style={styles.mapTopLayer}/>
        </View>
        <Card.Title>{item.name}</Card.Title>
        <Button
          title="View Now!"
          icon={{ name: 'code', color: 'white' }}
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
        <Button title="Get More!"/>
      </Card>
    );
  }, []);

  return (
    <View>
      <Swipe
        data={restaurants}
        renderCard={renderCard}
        keyExtractor={item => item.id}
        renderNoMoreCard={renderNoMoreCard}
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

export const DeckScreen = connect(mapStateToProps)(_DeckScreen);
