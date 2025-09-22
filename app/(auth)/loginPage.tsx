import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";

export default function LoginPage() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  return (
    <Animated.View style={styles.main}>
      <TextInput placeholder="Enter your email:" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.textInput}></TextInput>
      <TextInput placeholder="Enter your password:" value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.textInput}></TextInput>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    padding: 30,
    gap: 20,
    backgroundColor: "white"
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
})
