import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ssthcpfsnprlrmbfmswn.supabase.co";
const supabaseAnonKey = " sb_publishable_WFWe7kPxqSx6zmpNtD5bNQ_8PFoUqrV";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  storage: {
  }
});
export default (supabase)
