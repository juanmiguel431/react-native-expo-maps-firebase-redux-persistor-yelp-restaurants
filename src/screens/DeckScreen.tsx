import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
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
        <Map
          scrollEnabled={false}
          cacheEnabled={true}
          provider="default"
          height={300}
          initialRegion={{
            longitude: parseFloat(item.coordinates.longitude),
            latitude: parseFloat(item.coordinates.latitude),
            longitudeDelta: 0.0045,
            latitudeDelta: 0.002,
          }}
        />
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

type StateProps = {
  restaurants: Business[]
}

const mapStateToProps: MapStateToProps<StateProps, DeckScreenProps, RootState> = ({ yelp }) => {
  return {
    restaurants: yelp.items
  }
}

export const DeckScreen = connect(mapStateToProps)(_DeckScreen);
