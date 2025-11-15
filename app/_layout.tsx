import { useColorScheme } from '@/hooks/use-color-scheme';
import { UserProfile } from '@/types/user';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Session } from '@supabase/supabase-js';
import { Stack, useRouter } from 'expo-router';
import { createContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import supabase from './supabaseClient';


export const UserContext = createContext({
  userProfile: undefined as UserProfile | undefined,
  setUserProfile: (_: any) => { },
});

export default function RootLayout() {



  const [userProfile, setUserProfile] = useState<UserProfile>();
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

  const getUserProfile = async () => {
    const user_id =  (await supabase.auth.getUser()).data.user?.id
    console.log("user_id:",user_id)
    const { data, error } = await supabase.from('users').select('*').eq('id',user_id ).single();
    if (error) {
      alert("Error fetching user profile:" + error.message);
    } else if (data) {
      const userData = data as UserProfile;
      console.log("Fetched user profile:", userData);
      setUserProfile(userData);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (session === undefined) return; // still loading
    if (session?.user) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/welcomeScreen");
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="(auth)">
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
