export default interface Phone {
  id: number;
  name: string;
  price: number;
  quantity: number;
  url: string;       // image URL from Supabase Storage
  description: string;
  created_at: Date; // ISO date string from Supabase (use Date if you plan to parse it)
}
