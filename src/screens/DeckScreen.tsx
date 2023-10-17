import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { DeckScreenProps } from '../models/screen';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { Business } from '../models/yelp';
import Swipe from '../components/Swipe';
import { Button, Card } from '@rneui/themed';

type Props = DeckScreenProps & StateProps;

const _DeckScreen: React.FC<Props> = ({ restaurants }) => {

  const renderCard = useCallback((item: Business) => {
    return (
      <Card key={item.id}>
        <Card.Title>{item.name}</Card.Title>
        <Card.Image style={{ padding: 0 }} source={{ uri: item.image_url, }}/>
        <Text>I can customize the card further.</Text>
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
      <Text>Deck Screen</Text>
      <Text>{restaurants.length}</Text>
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
