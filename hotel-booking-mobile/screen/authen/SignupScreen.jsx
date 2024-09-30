import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Social from "react-native-vector-icons/SimpleLineIcons";
import { Picker } from "@react-native-picker/picker";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [firstnameFocused, setFirstnameFocused] = useState(false);
  const [lastnameFocused, setLastnameFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailType, setEmailType] = useState('email thường');
  const [emailtypeFocused, setEmailtypeFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="px-6 pt-6 flex-1 bg-white">
      <View className="flex flex-1">
        <View className="flex flex-col mt-28 space-y-3">
          <Text className="font-bold text-2xl text-black">Register Now!</Text>
          <Text className="text-sm text-gray-400">
            Enter your information below
          </Text>
        </View>

        {/* first name input */}
        <View
          className={`flex flex-row items-center border rounded-lg px-4 py-2 mt-4 ${
            emailFocused ? "border-[#A9B489]" : "border-gray-300"
          }`}
        >
          <Social
            name="user"
            size={20}
            color={firstnameFocused ? "#A9B489" : "#80868B"}
            className="mr-2"
          />
          <TextInput
            className="flex-1"
            placeholder="Enter first name"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFirstnameFocused(true)}
            onBlur={() => setFirstnameFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* last name input */}
        <View
          className={`flex flex-row items-center border rounded-lg px-4 py-2 mt-4 ${
            emailFocused ? "border-[#A9B489]" : "border-gray-300"
          }`}
        >
          <Social
            name="user"
            size={20}
            color={lastnameFocused ? "#A9B489" : "#80868B"}
            className="mr-2"
          />
          <TextInput
            className="flex-1"
            placeholder="Enter last name"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setLastnameFocused(true)}
            onBlur={() => setLastnameFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Username input */}
        <View
          className={`flex flex-row items-center border rounded-lg px-4 py-2 mt-4 ${
            emailFocused ? "border-[#A9B489]" : "border-gray-300"
          }`}
        >
          <Social
            name="user"
            size={20}
            color={usernameFocused ? "#A9B489" : "#80868B"}
            className="mr-2"
          />
          <TextInput
            className="flex-1"
            placeholder="Enter user name"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
          />
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

        {/* Email type input */}
        <View
          className={`flex flex-row items-center border rounded-lg px-4 py-2 mt-4 h-[60px] ${
            emailtypeFocused ? "border-[#A9B489]" : "border-gray-300"
          }`}
        >
          <Social
            name="envelope"
            size={20}
            color={emailtypeFocused ? "#A9B489" : "#80868B"}
            className="mr-2"
          />
          <Picker
            selectedValue={emailType}
            onValueChange={(itemValue) => setEmailType(itemValue)}
            onFocus={() => setEmailtypeFocused(true)}
            onBlur={() => setEmailtypeFocused(false)}
            style={{ flex: 1 }}
          >
            <Picker.Item label="email thường" value="email thường" />
            <Picker.Item label="email trường" value="email trường" />
            <Picker.Item label="email cơ quan" value="email cơ quan" />
          </Picker>
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

        {/* Register button */}
        <TouchableOpacity className="bg-[#A9B489] rounded-lg py-3 mt-6 items-center">
          <Text className="text-white">Register</Text>
        </TouchableOpacity>

        {/* Spacer to push the "Login now" section to the bottom */}
        <View className="flex-1" />
      </View>

      {/* Login now */}
      <View className="flex flex-row justify-center py-6">
        <Text className="text-gray-500">Already a member?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-[#A9B489]"> Login Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}