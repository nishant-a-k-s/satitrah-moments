export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      agent_actions: {
        Row: {
          action_details: Json | null
          action_type: string
          agent_id: string
          id: string
          reason: string | null
          sos_event_id: string | null
          timestamp: string
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          agent_id: string
          id?: string
          reason?: string | null
          sos_event_id?: string | null
          timestamp?: string
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          agent_id?: string
          id?: string
          reason?: string | null
          sos_event_id?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_actions_sos_event_id_fkey"
            columns: ["sos_event_id"]
            isOneToOne: false
            referencedRelation: "sos_events"
            referencedColumns: ["id"]
          },
        ]
      }
      escalation_records: {
        Row: {
          agent_id: string | null
          created_at: string
          escalation_status: string
          escalation_type: string
          id: string
          metadata: Json | null
          reason: string | null
          recipient_info: Json | null
          sos_event_id: string | null
          updated_at: string
          webhook_response: Json | null
        }
        Insert: {
          agent_id?: string | null
          created_at?: string
          escalation_status: string
          escalation_type: string
          id?: string
          metadata?: Json | null
          reason?: string | null
          recipient_info?: Json | null
          sos_event_id?: string | null
          updated_at?: string
          webhook_response?: Json | null
        }
        Update: {
          agent_id?: string | null
          created_at?: string
          escalation_status?: string
          escalation_type?: string
          id?: string
          metadata?: Json | null
          reason?: string | null
          recipient_info?: Json | null
          sos_event_id?: string | null
          updated_at?: string
          webhook_response?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "escalation_records_sos_event_id_fkey"
            columns: ["sos_event_id"]
            isOneToOne: false
            referencedRelation: "sos_events"
            referencedColumns: ["id"]
          },
        ]
      }
      heartbeats: {
        Row: {
          battery_level: number | null
          connectivity_status: string | null
          device_status: string | null
          id: string
          location: Json
          metadata: Json | null
          timestamp: string
          user_id: string
          walk_session_id: string | null
        }
        Insert: {
          battery_level?: number | null
          connectivity_status?: string | null
          device_status?: string | null
          id?: string
          location: Json
          metadata?: Json | null
          timestamp?: string
          user_id: string
          walk_session_id?: string | null
        }
        Update: {
          battery_level?: number | null
          connectivity_status?: string | null
          device_status?: string | null
          id?: string
          location?: Json
          metadata?: Json | null
          timestamp?: string
          user_id?: string
          walk_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "heartbeats_walk_session_id_fkey"
            columns: ["walk_session_id"]
            isOneToOne: false
            referencedRelation: "walk_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      media_files: {
        Row: {
          duration_seconds: number | null
          encryption_key_id: string | null
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          metadata: Json | null
          retention_expires_at: string | null
          sequence_number: number | null
          sos_event_id: string | null
          uploaded_at: string
        }
        Insert: {
          duration_seconds?: number | null
          encryption_key_id?: string | null
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          metadata?: Json | null
          retention_expires_at?: string | null
          sequence_number?: number | null
          sos_event_id?: string | null
          uploaded_at?: string
        }
        Update: {
          duration_seconds?: number | null
          encryption_key_id?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          metadata?: Json | null
          retention_expires_at?: string | null
          sequence_number?: number | null
          sos_event_id?: string | null
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_files_sos_event_id_fkey"
            columns: ["sos_event_id"]
            isOneToOne: false
            referencedRelation: "sos_events"
            referencedColumns: ["id"]
          },
        ]
      }
      misuse_flags: {
        Row: {
          flag_count: number | null
          flag_type: string
          id: string
          last_flagged_at: string
          metadata: Json | null
          notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          user_id: string
        }
        Insert: {
          flag_count?: number | null
          flag_type: string
          id?: string
          last_flagged_at?: string
          metadata?: Json | null
          notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          user_id: string
        }
        Update: {
          flag_count?: number | null
          flag_type?: string
          id?: string
          last_flagged_at?: string
          metadata?: Json | null
          notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      product_company_mappings: {
        Row: {
          brand_name: string | null
          company_name: string
          created_at: string
          exchange: string | null
          id: string
          product_name: string
          stock_ticker: string | null
          updated_at: string
        }
        Insert: {
          brand_name?: string | null
          company_name: string
          created_at?: string
          exchange?: string | null
          id?: string
          product_name: string
          stock_ticker?: string | null
          updated_at?: string
        }
        Update: {
          brand_name?: string | null
          company_name?: string
          created_at?: string
          exchange?: string | null
          id?: string
          product_name?: string
          stock_ticker?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          auth_user_id: string | null
          created_at: string
          full_name: string | null
          id: string
          is_mpin_setup: boolean | null
          mobile_number: string
          mpin_hash: string
          updated_at: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_mpin_setup?: boolean | null
          mobile_number: string
          mpin_hash: string
          updated_at?: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_mpin_setup?: boolean | null
          mobile_number?: string
          mpin_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      sos_events: {
        Row: {
          agent_id: string | null
          closed_at: string | null
          created_at: string
          escalation_timer_duration: number | null
          escalation_timer_started_at: string | null
          handled: boolean | null
          id: string
          location: Json | null
          metadata: Json | null
          risk_score: number | null
          status: string
          updated_at: string
          user_id: string
          walk_session_id: string | null
        }
        Insert: {
          agent_id?: string | null
          closed_at?: string | null
          created_at?: string
          escalation_timer_duration?: number | null
          escalation_timer_started_at?: string | null
          handled?: boolean | null
          id?: string
          location?: Json | null
          metadata?: Json | null
          risk_score?: number | null
          status: string
          updated_at?: string
          user_id: string
          walk_session_id?: string | null
        }
        Update: {
          agent_id?: string | null
          closed_at?: string | null
          created_at?: string
          escalation_timer_duration?: number | null
          escalation_timer_started_at?: string | null
          handled?: boolean | null
          id?: string
          location?: Json | null
          metadata?: Json | null
          risk_score?: number | null
          status?: string
          updated_at?: string
          user_id?: string
          walk_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sos_events_walk_session_id_fkey"
            columns: ["walk_session_id"]
            isOneToOne: false
            referencedRelation: "walk_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_consent: {
        Row: {
          background_location: boolean | null
          battery_saver_mode: boolean | null
          consent_timestamp: string
          consent_version: string
          id: string
          location_sharing: boolean | null
          location_update_interval: number | null
          media_capture: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          background_location?: boolean | null
          battery_saver_mode?: boolean | null
          consent_timestamp?: string
          consent_version: string
          id?: string
          location_sharing?: boolean | null
          location_update_interval?: number | null
          media_capture?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          background_location?: boolean | null
          battery_saver_mode?: boolean | null
          consent_timestamp?: string
          consent_version?: string
          id?: string
          location_sharing?: boolean | null
          location_update_interval?: number | null
          media_capture?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_spends: {
        Row: {
          amount: number
          category: string | null
          created_at: string
          id: string
          mapped_company: string | null
          mapped_ticker: string | null
          merchant_name: string | null
          product_name: string
          spend_date: string
          user_id: string | null
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string
          id?: string
          mapped_company?: string | null
          mapped_ticker?: string | null
          merchant_name?: string | null
          product_name: string
          spend_date?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string
          id?: string
          mapped_company?: string | null
          mapped_ticker?: string | null
          merchant_name?: string | null
          product_name?: string
          spend_date?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_spends_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      walk_sessions: {
        Row: {
          battery_saver_mode: boolean | null
          created_at: string
          end_location: Json | null
          ended_at: string | null
          id: string
          location_sharing_enabled: boolean | null
          media_capture_enabled: boolean | null
          risk_score: number | null
          sampling_interval: number | null
          session_metadata: Json | null
          start_location: Json | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          battery_saver_mode?: boolean | null
          created_at?: string
          end_location?: Json | null
          ended_at?: string | null
          id?: string
          location_sharing_enabled?: boolean | null
          media_capture_enabled?: boolean | null
          risk_score?: number | null
          sampling_interval?: number | null
          session_metadata?: Json | null
          start_location?: Json | null
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          battery_saver_mode?: boolean | null
          created_at?: string
          end_location?: Json | null
          ended_at?: string | null
          id?: string
          location_sharing_enabled?: boolean | null
          media_capture_enabled?: boolean | null
          risk_score?: number | null
          sampling_interval?: number | null
          session_metadata?: Json | null
          start_location?: Json | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_risk_score: {
        Args: {
          p_location?: Json
          p_phone_offline?: boolean
          p_recent_sos_count?: number
          p_sos_triggered?: boolean
          p_time_of_day?: string
          p_user_flagged?: boolean
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
