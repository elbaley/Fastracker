import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  History,
  Home,
  OnboardingNotification,
  OnboardingTime,
  Settings,
} from './src/screens/';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {clearPersistedState} from './src/utils/clearPersistedState';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {signInAnonymously} from './src/auth';
import SaveFastingModal from './src/components/SaveFastingModal';
import {useAppSelector} from './src/app/store';
import {CustomToast} from './src/lib/ToastConfig';

type RootTabStackParamList = {
  Home: undefined;
  Settings: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<RootTabStackParamList>();
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  const {showSaveFastingModal} = useAppSelector(state => state.app);
  useEffect(() => {
    // clearPersistedState();
    signInAnonymously();
  }, []);
  return (
    <>
      <NavigationContainer>
        {showSaveFastingModal && <SaveFastingModal />}
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
      <CustomToast />
    </>
  );
}

function AppScreen(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
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
              name: 'History',
              inactiveIcon: 'ios-calendar-outline',
              activeIcon: 'ios-calendar',
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
              color="white"
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#1a1d20',
          borderTopWidth: 0,
          borderTopColor: 'transparent',
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1a1d20',
            borderWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTitleAlign: 'center',
        }}
        name="History"
        component={History}
      />
      <Tab.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1a1d20',
            borderWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTitleAlign: 'center',
        }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
}

export default App;
