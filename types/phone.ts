export default interface Phone {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_at: Date; // ISO date string from Supabase (use Date if you plan to parse it)
  url: string;       // image URL from Supabase Storage
}
