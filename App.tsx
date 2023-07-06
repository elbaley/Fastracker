import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import store from './src/app/store';
import {Provider} from 'react-redux';
import {Home, Settings} from './src/screens/';
import Ionicons from 'react-native-vector-icons/Ionicons';
type RootTabStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabStackParamList>();

const HomeIcon = () => (
  <Ionicons name="ios-home-outline" size={24} color={'white'} />
);
const SettingsIcon = () => (
  <Ionicons name="ios-settings-outline" size={24} color={'white'} />
);

function App(): JSX.Element {
  useEffect(() => {
    // ## TODO GET permissions at initial screen!
    // const requestNotificationPermissions = async () => {
    //   const permissions = await PushNotificationIOS.requestPermissions();
    //   console.log('Notification Permissions:', permissions);
    // };
    // requestNotificationPermissions();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: () => {
              let iconComponent;

              if (route.name === 'Home') {
                iconComponent = <HomeIcon />;
              } else if (route.name === 'Settings') {
                iconComponent = <SettingsIcon />;
              }

              return iconComponent;
            },
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#2e2c30',
              borderTopWidth: 0,
              borderTopColor: 'transparent',
            },
          })}>
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
