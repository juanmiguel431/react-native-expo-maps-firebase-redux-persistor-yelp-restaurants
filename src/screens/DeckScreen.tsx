import React from 'react';
import { Text, View } from 'react-native';
import { DeckScreenProps } from '../models/screen';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { Business } from '../models/yelp';

type Props = DeckScreenProps & StateProps;

const _DeckScreen: React.FC<Props> = ({ restaurants }) => {
  return (
    <View>
      <Text>Deck Screen</Text>
      <Text>{restaurants.length}</Text>
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
