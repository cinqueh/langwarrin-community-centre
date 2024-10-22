import { createClient, PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { NotImplementedError } from '../util/errors';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

export abstract class BaseRepository {
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

export default abstract class FormRepository extends BaseRepository {
    public async get(id: number): Promise<PostgrestSingleResponse<any[]>> {
        throw new NotImplementedError('Missing get implementation');
    }

    public async getAll(): Promise<PostgrestSingleResponse<any[]>> {
        throw new NotImplementedError('Missing get all implementation');
    }
}