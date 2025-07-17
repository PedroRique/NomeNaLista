import type { List } from "../models/List";
import supabase from "../utils/supabase";

export const fetchListBySlug = async (slug: string): Promise<List | null> => {
    try {
        const response = await supabase.from('lists').select().eq('slug', slug);
        if (response.data && response.data.length === 1) {
            return response.data[0];
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}