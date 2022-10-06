import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';

export function Routas() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}