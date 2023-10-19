import React from 'react';
import { ScrollView, Text } from 'react-native';
import { ReviewScreenProps } from '../models/screen';
import { connect, MapStateToProps } from 'react-redux';
import { RootState } from '../reducers';
import { Business } from '../models/yelp';

type Props = ReviewScreenProps & StateProps;

export const _ReviewScreen: React.FC<Props> = ({ restaurants }) => {
  return (
    <ScrollView>
      <Text>Review Screen</Text>
      <Text>{restaurants.length}</Text>
    </ScrollView>
  );
};

type StateProps = {
  restaurants: Business[]
}

const mapStateToProps: MapStateToProps<StateProps, ReviewScreenProps, RootState> = (state) => {
  return {
    restaurants: state.likedRestaurant.items
  }
};

export const ReviewScreen = connect(mapStateToProps)(_ReviewScreen);
