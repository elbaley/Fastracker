import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import store from './src/app/store';
import {Provider} from 'react-redux';
import {Home, Settings} from './src/screens/';

type RootTabStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabStackParamList>();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#2e2c30',
              borderTopWidth: 0,
              borderTopColor: 'transparent',
            },
          }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#2e2c30',
                borderWidth: 0,
                borderColor: 'red',
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTitleStyle: {
                color: 'white',
              },
            }}
            name="Settings"
            component={Settings}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
