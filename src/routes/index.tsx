import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { SignIn } from '../screens/SignIn';
import { AppRoutes } from './app.routes';

 const logged = true

export function Routes() {
  return (
    <NavigationContainer>
      {logged ? <AppRoutes/> : <SignIn/>}
    </NavigationContainer>
  )
}