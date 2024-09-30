import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screen/LoadingScreen.jsx';
import WellcomeScreen from './screen/OnboardingScreen.jsx';
import LoginScreen from './screen/authen/SigninScreen.jsx';
import SignupScreen from './screen/authen/SignupScreen.jsx';
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading time
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Introduction" component={WellcomeScreen} /> */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}