import AnimatedButton from "@/components/AnimatedButton";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated from "react-native-reanimated";
import supabase from "../supabaseClient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function LoginPage() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  return (
    <Animated.View style={styles.main}>
      <Ionicons name="arrow-back" onPress={() => router.back()} size={20} style={styles.backIcon} />
      <TextInput placeholder="Enter your email:" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.textInput}></TextInput>
      <TextInput placeholder="Enter your password:" value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.textInput}></TextInput>
      <AnimatedButton
        text="Login"
        style={styles.loginButton}
        onPress={async () => {
          if (email && password) {
            const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password, })
            if (error) {
              alert(error);
            }
            console.log('data', data)
          }
        }} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    position: "relative",
    flex: 1,
    flexDirection: "column",
    padding: 30,
    gap: 20,
    backgroundColor: "white",
    justifyContent: "center"
  },
  backIcon: {
    position: "absolute",
    top: 10,
    left: 5,
  },
  textInput: {
    width: "100%",
    height: 50,
    fontWeight: "normal",
    fontSize: 12,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#EFF1F3"
  },
  loginButton: {
    alignSelf: "center",
    backgroundColor: "#2165EC",
  }
})
