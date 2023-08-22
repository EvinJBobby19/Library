import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import Details from './components/Details';

import TabNav from './components/TabNav';
import {Auth0Provider} from 'react-native-auth0';
import LoginScreen from './components/LoginScreen';
import Profile from './components/Profile';
import store from './Redux/store';
import {Provider} from 'react-redux';
const Stack = createNativeStackNavigator();

import {PersistGate} from 'redux-persist/integration/react';

import {persistStore} from 'redux-persist';

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auth0Provider
          domain={'dev-h7vke8jpgju5btky.us.auth0.com'}
          clientId={'C030qVya5Wmcr0ISjzgHl8ifLrmlxlJ6'}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="navigation"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TabNav"
                component={TabNav}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{title: 'Welcome'}}
              />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="Profile" component={Profile} />

              <Stack.Screen name="Details" component={Details} />
            </Stack.Navigator>
          </NavigationContainer>
        </Auth0Provider>
      </PersistGate>
    </Provider>
  );
};
export default App;
