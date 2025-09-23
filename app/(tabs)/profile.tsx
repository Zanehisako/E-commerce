import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import supabase from "../supabaseClient";
import { User } from "@supabase/supabase-js";
import AnimatedButton from "@/components/AnimatedButton";
import { router } from "expo-router";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [user, setUser] = useState<User>()
  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      alert(error)
    } else {
      setUser(data.user)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  useEffect(() => {
    console.log('user:', user)
  }, [user])

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Profile Page</Text>
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
