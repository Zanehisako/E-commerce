import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import supabase from "../supabaseClient";
import AnimatedButton from "@/components/AnimatedButton";
import { router } from "expo-router";

interface userResponse {
  firstName: string,
  lastName: string,
  address: string,
}

export default function ProfilePage() {
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [address, setAddress] = useState<string>()
  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    const user_data = data
    if (error) {
      console.log("error", error)
      alert(error)
    } else {
      const { data, error } = await supabase.from("users").select().eq('user_id', user_data.user?.id).limit(1)
      if (error) {
        console.log("error getting user info", error)
        alert(`error getting user info :\n${error.message}`)
      } else if (data) {
        const { first_name, last_name, address } = data[0]
        console.log("data[0]:", data[0])
        setFirstName(first_name)
        setLastName(last_name)
        setAddress(address)
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Profile Page</Text>
      <Text style={styles.text}>{firstName}</Text>
      <Text style={styles.text}>{lastName}</Text>
      <Text style={styles.text}>{address}</Text>
      <AnimatedButton
        text="Sign out"
        onPress={async () => {
          await supabase.auth.signOut()
        }}
        style={styles.signOutButton}
      />
    </View>)
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    gap: 20,
    justifyContent: "center",
    padding: 30,
  },
  text: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold"
  },
  signOutButton: {
    alignSelf: "center",
    backgroundColor: "red"
  },
});
