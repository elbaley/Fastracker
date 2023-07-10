import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import store, {persistor} from './src/app/store';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
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

const HomeIcon = () => (
  <Ionicons name="ios-home-outline" size={24} color={'white'} />
);
const SettingsIcon = () => (
  <Ionicons name="ios-settings-outline" size={24} color={'white'} />
);

function App(): JSX.Element {
  useEffect(() => {
    // clearPersistedState();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View>
            <Text>Yukleniyor agamm</Text>
          </View>
        }
        persistor={persistor}>
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
  );
}

export default App;
