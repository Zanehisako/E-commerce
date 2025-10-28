import AnimatedButton from "@/components/AnimatedButton";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated from "react-native-reanimated";
import supabase from "../supabaseClient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import InfoTextInput from "@/components/InfoInput";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [confirmePassword, setConfirmePassword] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [validate, setValidate] = useState<boolean>(false)
  const params = useLocalSearchParams();
  const { firstName, lastName, address } = params; // Destructure the parameters you expect
  return (
    <Animated.View style={styles.main}>
      <Ionicons name="arrow-back" onPress={() => router.back()} size={20} style={styles.backIcon} />
      <InfoTextInput validate={validate} placeholder="Enter your email:" value={email} setValue={setEmail} keyboardType="email-address" ></InfoTextInput>
      <InfoTextInput validate={validate} placeholder="Enter your phone:" value={phone} setValue={setPhone} keyboardType="phone-pad" ></InfoTextInput>
      <InfoTextInput validate={validate} placeholder="Enter your password:" value={password} setValue={setPassword} secureTextEntry={true} ></InfoTextInput>
      <InfoTextInput validate={validate} placeholder="Confirme your password:" value={confirmePassword} setValue={setConfirmePassword} secureTextEntry={true} ></InfoTextInput>
      <AnimatedButton
        text="Sign-Up"
        style={styles.loginButton}
        onPress={async () => {
          setValidate(true)
          if (email) {
            if ((password && confirmePassword) && (password === confirmePassword)) {

              const { data, error } = await supabase.auth.signUp({ email: email, password: password, phone: phone })
              if (error) {
                alert(`error sign-in:\n${error.message}`);
              }
              const { status, statusText } = await supabase.from('users').insert({ first_name: firstName, last_name: lastName, address: address })
              console.log('status:', status)
              console.log('statusText:', statusText)
              if (status !== 201) {
                alert(`error:\n${statusText}`);
              }
              //console.log('data', data)
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
