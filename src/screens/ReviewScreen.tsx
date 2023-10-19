import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ReviewScreenProps } from '../models/screen';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { Business } from '../models/yelp';
import { Button, Card } from '@rneui/themed';
import Map from '../components/Map';

type Props = ReviewScreenProps & StateProps;

export const _ReviewScreen: React.FC<Props> = ({ restaurants }) => {
  return (
    <FlatList
      data={restaurants}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
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
          <Card.Divider/>
          <Card.Title>{item.name}</Card.Title>
          <Button
            title="View Now!"
            icon={{ color: 'white' }}
            buttonStyle={{ backgroundColor: '#03A9F4' }}
          />
        </Card>
      )}
    />
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

const mapStateToProps: MapStateToProps<StateProps, ReviewScreenProps, RootState> = (state) => {
  return {
    restaurants: state.likedRestaurant.items
  }
};

export const ReviewScreen = connect(mapStateToProps)(_ReviewScreen);
