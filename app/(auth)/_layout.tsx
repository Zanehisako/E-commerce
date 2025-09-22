import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcomeScreen"></Stack.Screen>
      <Stack.Screen name="loginPage"></Stack.Screen>
    </Stack >
  );
}
