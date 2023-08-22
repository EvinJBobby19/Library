import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';

import {useAuth0} from 'react-native-auth0';

import {Image} from 'react-native';
import Profile from './Profile';
import BookMarks from './BookMarks';

const Tab = createBottomTabNavigator();

export default function TabNav() {
  const {user} = useAuth0();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {backgroundColor: 'white'},
          tabBarIcon: () => {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('Library/images/home-1-svgrepo-com.png')}
              />
            );
          },
          tabBarStyle: {
            backgroundColor: 'black',

            width: 360,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => {
            return (
              <>
                {user && (
                  <Image
                    style={{width: 30, height: 30, borderRadius: 15}}
                    source={{uri: user?.picture}}
                  />
                )}
                {!user && (
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('Library/images/edit-user-left-4-svgrepo-com.png')}
                  />
                )}
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="BookMarks"
        component={BookMarks}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('Library/images/gui-bookmark-svgrepo-com.png')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
