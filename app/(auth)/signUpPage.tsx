import AnimatedButton from "@/components/AnimatedButton";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated from "react-native-reanimated";
import supabase from "../supabaseClient";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [confirmePassword, setConfirmePassword] = useState<string>()
  const [phone, setPhone] = useState<string>()
  return (
    <Animated.View style={styles.main}>
      <Ionicons name="arrow-back" onPress={() => router.back()} size={20} style={styles.backIcon} />
      <TextInput placeholder="Enter your email:" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.textInput}></TextInput>
      <TextInput placeholder="Enter your phone:" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.textInput}></TextInput>
      <TextInput placeholder="Enter your password:" value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.textInput}></TextInput>
      <TextInput placeholder="Confirme your password:" value={confirmePassword} onChangeText={setConfirmePassword} secureTextEntry={true} style={styles.textInput}></TextInput>
      <AnimatedButton
        text="Sign-Up"
        style={styles.loginButton}
        onPress={async () => {
          if (email) {
            if ((password && confirmePassword) && (password === confirmePassword)) {
              const { data, error } = await supabase.auth.signUp({ email: email, password: password, phone: phone })
              if (error) {
                alert(error);
              }
              console.log('data', data)
            } else {
              throw "password is empty or dosent match"
            }
          } else {
            throw "email is empty"
          }
        }} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    position: "relative",
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
