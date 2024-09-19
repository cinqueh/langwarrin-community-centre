import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

export default class BaseRepository {
    // Private static variable to hold the single instance of SupabaseClient
    private static supabase: SupabaseClient;

    // Static method to get the instance of SupabaseClient
    protected getSupabaseClient(): SupabaseClient {
        if (!BaseRepository.supabase) {
            BaseRepository.supabase = createClient(supabaseUrl, supabaseAnonKey);
        }
        return BaseRepository.supabase;
    }
}