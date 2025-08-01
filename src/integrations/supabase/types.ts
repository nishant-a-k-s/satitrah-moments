export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      goals: {
        Row: {
          achieved_at: string | null
          category: string | null
          created_at: string
          current_amount: number
          deadline: string | null
          description: string | null
          goal_name: string
          id: string
          is_achieved: boolean | null
          target_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          achieved_at?: string | null
          category?: string | null
          created_at?: string
          current_amount?: number
          deadline?: string | null
          description?: string | null
          goal_name: string
          id?: string
          is_achieved?: boolean | null
          target_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          achieved_at?: string | null
          category?: string | null
          created_at?: string
          current_amount?: number
          deadline?: string | null
          description?: string | null
          goal_name?: string
          id?: string
          is_achieved?: boolean | null
          target_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      loans: {
        Row: {
          amount: number
          application_reason: string | null
          approval_notes: string | null
          created_at: string
          due_date: string | null
          id: string
          interest_rate: number | null
          issued_at: string | null
          monthly_emi: number | null
          repaid_at: string | null
          status: Database["public"]["Enums"]["loan_status"] | null
          tenure_months: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          application_reason?: string | null
          approval_notes?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          interest_rate?: number | null
          issued_at?: string | null
          monthly_emi?: number | null
          repaid_at?: string | null
          status?: Database["public"]["Enums"]["loan_status"] | null
          tenure_months?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          application_reason?: string | null
          approval_notes?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          interest_rate?: number | null
          issued_at?: string | null
          monthly_emi?: number | null
          repaid_at?: string | null
          status?: Database["public"]["Enums"]["loan_status"] | null
          tenure_months?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sos_logs: {
        Row: {
          authorities_notified: boolean | null
          emergency_contact_notified: boolean | null
          id: string
          location: Json | null
          metadata: Json | null
          notes: string | null
          resolved_at: string | null
          status: string | null
          triggered_at: string
          type: Database["public"]["Enums"]["sos_type"]
          user_id: string
        }
        Insert: {
          authorities_notified?: boolean | null
          emergency_contact_notified?: boolean | null
          id?: string
          location?: Json | null
          metadata?: Json | null
          notes?: string | null
          resolved_at?: string | null
          status?: string | null
          triggered_at?: string
          type: Database["public"]["Enums"]["sos_type"]
          user_id: string
        }
        Update: {
          authorities_notified?: boolean | null
          emergency_contact_notified?: boolean | null
          id?: string
          location?: Json | null
          metadata?: Json | null
          notes?: string | null
          resolved_at?: string | null
          status?: string | null
          triggered_at?: string
          type?: Database["public"]["Enums"]["sos_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sos_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      squirrels: {
        Row: {
          created_at: string
          earned_from: string
          expires_at: string | null
          id: string
          points: number
          redeemed: boolean | null
          redeemed_at: string | null
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          earned_from: string
          expires_at?: string | null
          id?: string
          points?: number
          redeemed?: boolean | null
          redeemed_at?: string | null
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          earned_from?: string
          expires_at?: string | null
          id?: string
          points?: number
          redeemed?: boolean | null
          redeemed_at?: string | null
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "squirrels_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "squirrels_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number | null
          auto_renew: boolean | null
          billing_cycle: string | null
          created_at: string
          end_date: string | null
          id: string
          plan: string
          start_date: string
          status: Database["public"]["Enums"]["subscription_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          auto_renew?: boolean | null
          billing_cycle?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          plan: string
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number | null
          auto_renew?: boolean | null
          billing_cycle?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          plan?: string
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          reference_id: string | null
          status: string | null
          to_wallet_id: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          status?: string | null
          to_wallet_id?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          status?: string | null
          to_wallet_id?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_to_wallet_id_fkey"
            columns: ["to_wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_user_id: string
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"] | null
        }
        Insert: {
          auth_user_id: string
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Update: {
          auth_user_id?: string
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          currency: string
          id: string
          is_active: boolean | null
          updated_at: string
          user_id: string
          wallet_type: Database["public"]["Enums"]["wallet_type"]
        }
        Insert: {
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id: string
          wallet_type: Database["public"]["Enums"]["wallet_type"]
        }
        Update: {
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id?: string
          wallet_type?: Database["public"]["Enums"]["wallet_type"]
        }
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      initialize_user_wallets: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      update_wallet_balance: {
        Args: {
          wallet_uuid: string
          amount_change: number
          trans_type: Database["public"]["Enums"]["transaction_type"]
          description_text?: string
        }
        Returns: string
      }
    }
    Enums: {
      loan_status: "pending" | "approved" | "active" | "repaid" | "rejected"
      sos_type:
        | "ambulance"
        | "walk_with_me"
        | "emergency_credit"
        | "panic_button"
      subscription_status: "active" | "inactive" | "cancelled" | "expired"
      transaction_type: "add" | "withdraw" | "transfer" | "payment" | "refund"
      user_type: "student" | "professional" | "homemaker" | "other"
      wallet_type: "sati" | "maternity" | "savings" | "emergency"
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
    Enums: {
      loan_status: ["pending", "approved", "active", "repaid", "rejected"],
      sos_type: [
        "ambulance",
        "walk_with_me",
        "emergency_credit",
        "panic_button",
      ],
      subscription_status: ["active", "inactive", "cancelled", "expired"],
      transaction_type: ["add", "withdraw", "transfer", "payment", "refund"],
      user_type: ["student", "professional", "homemaker", "other"],
      wallet_type: ["sati", "maternity", "savings", "emergency"],
    },
  },
} as const
