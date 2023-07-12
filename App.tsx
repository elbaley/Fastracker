import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import store, {persistor} from './src/app/store';
import {Provider} from 'react-redux';
import {
  Home,
  OnboardingNotification,
  OnboardingTime,
  Settings,
} from './src/screens/';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PersistGate} from 'redux-persist/integration/react';
import {clearPersistedState} from './src/utils/clearPersistedState';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
type RootTabStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabStackParamList>();
const Stack = createNativeStackNavigator(); // bunu import ettim kullanirsin

function App(): JSX.Element {
  useEffect(() => {
    // clearPersistedState();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OnboardingNotification"
              component={OnboardingNotification}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OnboardingTime"
              component={OnboardingTime}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AppScreen"
              component={AppScreen}
              options={{headerShown: false, gestureEnabled: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

function AppScreen(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        //@eslint/disable-next-line
        tabBarIcon: ({focused}) => {
          type Icon = {
            name: keyof RootTabStackParamList;
            inactiveIcon: string;
            activeIcon: string;
          };
          const icons: Icon[] = [
            {
              name: 'Home',
              inactiveIcon: 'ios-home-outline',
              activeIcon: 'ios-home',
            },
            {
              name: 'Settings',
              inactiveIcon: 'ios-settings-outline',
              activeIcon: 'ios-settings',
            },
          ];
          const icon = icons.find(item => item.name === route.name);
          return (
            <Ionicons
              name={focused ? icon!.activeIcon : icon!.inactiveIcon}
              size={24}
              color={'white'}
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
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
  );
}

export default App;
