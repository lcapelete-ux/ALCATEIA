import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Participant, RegistrationFormData } from '../types';

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase configuration missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local'
  );
}

// Initialize Supabase client
export const supabase: SupabaseClient = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

const PARTICIPANTS_TABLE = 'participants';

// Connection test
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from(PARTICIPANTS_TABLE)
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.warn('Supabase connection test error:', error.message);
    } else {
      console.log('Supabase connection successful');
    }
  } catch (error) {
    console.warn('Supabase connection test failed:', error);
  }
}

testConnection();

export const SupabaseService = {
  /**
   * Subscribe to real-time updates of participants from Supabase
   */
  subscribeParticipants(
    onData: (participants: Participant[]) => void,
    onError?: (error: Error) => void
  ) {
    const subscription = supabase
      .channel(`public:${PARTICIPANTS_TABLE}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: PARTICIPANTS_TABLE,
        },
        () => {
          // Fetch updated data when any change occurs
          SupabaseService.getParticipants()
            .then(onData)
            .catch((err) => {
              console.error('Error fetching participants after change:', err);
              if (onError) onError(err);
            });
        }
      )
      .subscribe();

    // Return unsubscribe function
    return () => {
      supabase.removeChannel(subscription);
    };
  },

  /**
   * Fetch all participants once from Supabase
   */
  async getParticipants(): Promise<Participant[]> {
    try {
      const { data, error } = await supabase
        .from(PARTICIPANTS_TABLE)
        .select('*')
        .order('bibNumber', { ascending: true });

      if (error) {
        console.error('Error fetching participants:', error.message);
        return [];
      }

      return data || [];
    } catch (e) {
      console.error('Error fetching participants from Supabase:', e);
      return [];
    }
  },

  /**
   * Save or update a participant in Supabase
   */
  async saveParticipant(participant: Participant): Promise<void> {
    try {
      const { error } = await supabase
        .from(PARTICIPANTS_TABLE)
        .upsert([participant]);

      if (error) {
        throw new Error(`Error saving participant: ${error.message}`);
      }
    } catch (e) {
      console.error('Error saving participant in Supabase:', e);
      throw e;
    }
  },

  /**
   * Update specific fields of a participant
   */
  async updateParticipant(id: string, updates: Partial<Participant>): Promise<void> {
    try {
      const { error } = await supabase
        .from(PARTICIPANTS_TABLE)
        .update(updates)
        .eq('id', id);

      if (error) {
        throw new Error(`Error updating participant: ${error.message}`);
      }
    } catch (e) {
      console.error('Error updating participant in Supabase:', e);
      throw e;
    }
  },

  /**
   * Delete a participant from Supabase
   */
  async deleteParticipant(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(PARTICIPANTS_TABLE)
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Error deleting participant: ${error.message}`);
      }
    } catch (e) {
      console.error('Error deleting participant in Supabase:', e);
      throw e;
    }
  },

  /**
   * Seed multiple participants to Supabase in batch
   */
  async seedInitialData(participants: Participant[]): Promise<void> {
    try {
      const { error } = await supabase
        .from(PARTICIPANTS_TABLE)
        .insert(participants);

      if (error) {
        throw new Error(`Error seeding participants: ${error.message}`);
      }
    } catch (e) {
      console.error('Error seeding participants in Supabase:', e);
    }
  },
};
