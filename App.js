import React from 'react';
import {LoginScreen, CryptoDetail} from './screens';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ContextProvider from './context';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'LoginScreen'}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;
