import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_YELP_API_KEY}`,
    Accept: 'application/json'
  }
});
