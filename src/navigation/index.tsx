import React from 'react';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Alert } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { HomeScreen, IntroScreen } from '../screens';
import { navigationRef, storeLocalData } from '../utils/helper';


// Stack Navigator
const Stack = createStackNavigator<AppStackParamList>();

// Tab Navigator
const Tab = createBottomTabNavigator<MainTabsParamList>();

// Profile Screen
const ProfileScreen = () => {
  return (
    <View>
      <Text>My Profile Screen</Text>
    </View>
  );
};

// Settings Screen
const SettingsScreen = () => {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
};

const LogoutScreen = () => null;

const handleLogout = () => {

  Alert.alert('Logout', 'Are you Sure?', [
    {
      text: 'No',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
      // Navigate to the Intro screen
    {text: 'Yes', onPress: () =>   {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Auth' },
          ],
        })
      );
      storeLocalData('universityName','');
    }
    },
  ]);
}



const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { paddingTop: 20, height: 80, paddingBottom: 10 },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-man-profile" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          tabBarLabel: 'Logout',
          
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" size={size} color={color} onPress={handleLogout}/>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
// App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { marginTop: 0 }
        }}
      >
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
