import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import supabase from './supabaseClient';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  // undefined = still loading, null = not logged in

  useEffect(() => {
    // Get session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("session", session)
    if (session === undefined) return; // still loading
    if (session?.user) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/welcomeScreen");
    }
  }, [session]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="(auth)">
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
