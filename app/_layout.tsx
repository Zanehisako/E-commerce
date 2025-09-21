import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import supabase from './supabaseClient';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [authState, setAuthState] = useState<string>()


  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        console.log("INITIAL_SESSION")
        setAuthState("INITIAL_SESSION")
        router.replace("/welcomeScreen")
      }
      if (event === "SIGNED_IN") {
        console.log("SIGNED_IN")
        setAuthState("SIGNED_IN")
        router.replace("/(tabs)")
      }
      if (event === "SIGNED_OUT") {
        console.log("SIGNED_OUT")
        setAuthState("SIGNED_OUT")
        router.replace("/welcomeScreen")
      }
    })
    return data.subscription.unsubscribe()
  }, [])


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName='(auth)'>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
