import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { SignIn } from '../screens/SignIn';
import { AppRoutes } from './app.routes';

export function Routes() {

  const logged = true

  return (
    <NavigationContainer>
      {logged ? <AppRoutes/> : <SignIn/>}
    </NavigationContainer>
  )
}