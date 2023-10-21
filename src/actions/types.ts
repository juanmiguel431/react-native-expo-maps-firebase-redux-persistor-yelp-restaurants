enum Type {
  SetLoading = 'SetLoading',
  LoginUserFail = 'LoginUserFail',
  LoginUserSuccess = 'LoginUserSuccess',
  NavigateToSignup = 'NavigateToSignup',
  NavigateToSignin = 'NavigateToSignin',
  SignOutUser = 'SignOutUser',
  SetError = 'SetError',
  ResolveAuth = 'ResolveAuth',
  YelpFetchRestaurants = 'YelpFetchRestaurants',
  YelpLoading = 'YelpLoading',
  YelpError = 'YelpError',
  LikeRestaurant = 'LikeRestaurant',
  ResetLikedRestaurant = 'ResetLikedRestaurant',
  persistPURGE = 'persist/PURGE',
  SetPushNotificationToken = 'SetPushNotificationToken',
  SetPushNotification = 'SetPushNotification',
  SendPushNotification = 'SendPushNotification'
}

export default Type;
