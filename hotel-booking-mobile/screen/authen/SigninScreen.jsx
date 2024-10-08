import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Social from "react-native-vector-icons/SimpleLineIcons";
import googlelogo from "../../assets/Google__G__logo.svg.png";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="px-6 pt-6 flex-1 bg-white">
      <View className="flex flex-1">
        <View className="flex flex-col mt-28 space-y-3">
          <Text className="font-bold text-2xl text-black">
            Let's get you Login!
          </Text>
          <Text className="text-sm text-gray-400">
            Enter your information below
          </Text>
        </View>

        {/* Google and Facebook login buttons */}
        <View className="flex flex-row justify-around mt-8 space-x-5">
          <TouchableOpacity className="flex flex-row items-center justify-center bg-white border border-gray-300 rounded-lg  py-2 shadow w-full h-[50px]">
            <Image
              source={require("../../assets/Google__G__logo.svg.png")}
              style={{ width: 30, height: 30, marginRight: 8 }}
            />
            <Text className="text-black font-medium text-lg">Google</Text>
          </TouchableOpacity>
        </View>

        {/* Or login with divider */}
        <View className="flex flex-row justify-center items-center mt-6">
          <View className="h-px bg-gray-300 flex-1" />
          <Text className="mx-2 text-black text-sm">Or login with</Text>
          <View className="h-px bg-gray-300 flex-1" />
        </View>

        {/* Email input */}
        <View
          className={`flex flex-row items-center border rounded-lg px-4 py-2 mt-4 ${
            emailFocused ? "border-[#A9B489]" : "border-gray-300"
          }`}
        >
          <Social
            name="envelope"
            size={20}
            color={emailFocused ? "#A9B489" : "#80868B"}
            className="mr-2"
          />
          <TextInput
            className="flex-1"
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Password input */}
        <View
          className={`flex flex-row items-center border rounded-lg px-4 py-2 mt-4 ${
            passwordFocused ? "border-[#A9B489]" : "border-gray-300"
          }`}
        >
          <Social
            name="lock"
            size={20}
            color={passwordFocused ? "#A9B489" : "#80868B"}
            className="mr-2"
          />
          <TextInput
            className="flex-1"
            secureTextEntry={!isPasswordVisible}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot password */}
        <TouchableOpacity className="flex items-end mt-2">
          <Text className="text-[#A9B489] text-sm">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity className="bg-[#A9B489] rounded-lg py-3 mt-6 items-center">
          <Text className="text-white font-medium text-md">Login</Text>
        </TouchableOpacity>
        
        {/* Spacer to push the "Login now" section to the bottom */}
        <View className="flex-1" />
      </View>

      {/* Register now */}
      <View className="flex flex-row justify-center py-6">
        <Text className="text-gray-500">Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-[#A9B489]"> Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
