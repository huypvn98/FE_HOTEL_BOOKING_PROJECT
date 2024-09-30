import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "../screen/authen/SigninScreen";
import SignupScreen from "../screen/authen/SignupScreen";
const Stack = createStackNavigator();

const AuthenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={SigninScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenNavigation;