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
      ambulance_requests: {
        Row: {
          created_at: string
          dispatch_details: Json | null
          id: string
          location: Json
          status: string | null
          time: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dispatch_details?: Json | null
          id?: string
          location: Json
          status?: string | null
          time?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dispatch_details?: Json | null
          id?: string
          location?: Json
          status?: string | null
          time?: string
          user_id?: string
        }
        Relationships: []
      }
      bill_payments: {
        Row: {
          amount: number
          auto_pay: boolean | null
          bill_name: string
          bill_type: string
          created_at: string
          due_date: string | null
          id: string
          last_paid: string | null
          provider_name: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          auto_pay?: boolean | null
          bill_name: string
          bill_type: string
          created_at?: string
          due_date?: string | null
          id?: string
          last_paid?: string | null
          provider_name: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          auto_pay?: boolean | null
          bill_name?: string
          bill_type?: string
          created_at?: string
          due_date?: string | null
          id?: string
          last_paid?: string | null
          provider_name?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      broker_accounts: {
        Row: {
          access_token: string | null
          broker_name: string
          created_at: string
          id: string
          is_active: boolean | null
          linked_on: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          broker_name: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          linked_on?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          broker_name?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          linked_on?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      company_stocks: {
        Row: {
          company_name: string
          created_at: string
          currency: string | null
          current_price: number | null
          exchange: string | null
          id: string
          is_active: boolean | null
          last_updated: string | null
          logo_url: string | null
          merchant_keywords: string[] | null
          sector: string | null
          stock_symbol: string
        }
        Insert: {
          company_name: string
          created_at?: string
          currency?: string | null
          current_price?: number | null
          exchange?: string | null
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          logo_url?: string | null
          merchant_keywords?: string[] | null
          sector?: string | null
          stock_symbol: string
        }
        Update: {
          company_name?: string
          created_at?: string
          currency?: string | null
          current_price?: number | null
          exchange?: string | null
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          logo_url?: string | null
          merchant_keywords?: string[] | null
          sector?: string | null
          stock_symbol?: string
        }
        Relationships: []
      }
      goal_wallets: {
        Row: {
          created_at: string
          current_amount: number | null
          due_date: string | null
          goal_name: string
          id: string
          is_achieved: boolean | null
          monthly_commitment: number | null
          target_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_amount?: number | null
          due_date?: string | null
          goal_name: string
          id?: string
          is_achieved?: boolean | null
          monthly_commitment?: number | null
          target_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_amount?: number | null
          due_date?: string | null
          goal_name?: string
          id?: string
          is_achieved?: boolean | null
          monthly_commitment?: number | null
          target_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
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
          borrowed_amount: number | null
          created_at: string
          due_date: string | null
          id: string
          interest_rate: number | null
          issued_at: string | null
          monthly_emi: number | null
          repaid_at: string | null
          repayment_due_date: string | null
          squirrel_points_used: number | null
          status: Database["public"]["Enums"]["loan_status"] | null
          tenure_months: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          application_reason?: string | null
          approval_notes?: string | null
          borrowed_amount?: number | null
          created_at?: string
          due_date?: string | null
          id?: string
          interest_rate?: number | null
          issued_at?: string | null
          monthly_emi?: number | null
          repaid_at?: string | null
          repayment_due_date?: string | null
          squirrel_points_used?: number | null
          status?: Database["public"]["Enums"]["loan_status"] | null
          tenure_months?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          application_reason?: string | null
          approval_notes?: string | null
          borrowed_amount?: number | null
          created_at?: string
          due_date?: string | null
          id?: string
          interest_rate?: number | null
          issued_at?: string | null
          monthly_emi?: number | null
          repaid_at?: string | null
          repayment_due_date?: string | null
          squirrel_points_used?: number | null
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
      motivational_quotes: {
        Row: {
          author: string | null
          category: string | null
          created_at: string
          id: string
          is_active: boolean | null
          quote_text: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          quote_text: string
        }
        Update: {
          author?: string | null
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          quote_text?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      otp_verifications: {
        Row: {
          attempts: number | null
          created_at: string
          expires_at: string
          id: string
          otp_code: string
          phone: string
          verified: boolean | null
        }
        Insert: {
          attempts?: number | null
          created_at?: string
          expires_at: string
          id?: string
          otp_code: string
          phone: string
          verified?: boolean | null
        }
        Update: {
          attempts?: number | null
          created_at?: string
          expires_at?: string
          id?: string
          otp_code?: string
          phone?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      reminders: {
        Row: {
          created_at: string
          id: string
          is_completed: boolean | null
          note: string | null
          recurring: boolean | null
          reminder_time: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_completed?: boolean | null
          note?: string | null
          recurring?: boolean | null
          reminder_time: string
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_completed?: boolean | null
          note?: string | null
          recurring?: boolean | null
          reminder_time?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sos_events: {
        Row: {
          created_at: string
          emergency_contacts_notified: boolean | null
          id: string
          location: Json | null
          response_status: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emergency_contacts_notified?: boolean | null
          id?: string
          location?: Json | null
          response_status?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          created_at?: string
          emergency_contacts_notified?: boolean | null
          id?: string
          location?: Json | null
          response_status?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: []
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
      spend_categories: {
        Row: {
          amount: number
          category: string
          created_at: string
          date: string
          id: string
          transaction_id: string | null
          user_id: string
          wallet_type: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          date?: string
          id?: string
          transaction_id?: string | null
          user_id: string
          wallet_type?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          id?: string
          transaction_id?: string | null
          user_id?: string
          wallet_type?: string | null
        }
        Relationships: []
      }
      squirrel_rewards: {
        Row: {
          created_at: string
          date: string
          id: string
          points_earned: number
          points_redeemed: boolean | null
          reason: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          points_earned: number
          points_redeemed?: boolean | null
          reason: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          points_earned?: number
          points_redeemed?: boolean | null
          reason?: string
          user_id?: string
        }
        Relationships: []
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
      stock_watchlist: {
        Row: {
          company_name: string
          created_at: string
          id: string
          is_invested: boolean | null
          linked_broker_account_id: string | null
          price_at_addition: number | null
          symbol: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          is_invested?: boolean | null
          linked_broker_account_id?: string | null
          price_at_addition?: number | null
          symbol: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          is_invested?: boolean | null
          linked_broker_account_id?: string | null
          price_at_addition?: number | null
          symbol?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
          current_stock_price: number | null
          description: string | null
          id: string
          invest_prompt_shown: boolean | null
          matched_company_name: string | null
          matched_stock_symbol: string | null
          merchant_name: string | null
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
          current_stock_price?: number | null
          description?: string | null
          id?: string
          invest_prompt_shown?: boolean | null
          matched_company_name?: string | null
          matched_stock_symbol?: string | null
          merchant_name?: string | null
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
          current_stock_price?: number | null
          description?: string | null
          id?: string
          invest_prompt_shown?: boolean | null
          matched_company_name?: string | null
          matched_stock_symbol?: string | null
          merchant_name?: string | null
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
      user_otps: {
        Row: {
          attempts: number | null
          created_at: string | null
          email: string
          expires_at: string | null
          is_verified: boolean | null
          otp: string
        }
        Insert: {
          attempts?: number | null
          created_at?: string | null
          email: string
          expires_at?: string | null
          is_verified?: boolean | null
          otp: string
        }
        Update: {
          attempts?: number | null
          created_at?: string | null
          email?: string
          expires_at?: string | null
          is_verified?: boolean | null
          otp?: string
        }
        Relationships: []
      }
      user_security: {
        Row: {
          created_at: string
          id: string
          last_login: string | null
          last_mpin_attempt: string | null
          mpin_attempts: number | null
          mpin_hash: string | null
          mpin_locked_until: string | null
          phone_verified: boolean | null
          pin_hash: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_login?: string | null
          last_mpin_attempt?: string | null
          mpin_attempts?: number | null
          mpin_hash?: string | null
          mpin_locked_until?: string | null
          phone_verified?: boolean | null
          pin_hash?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_login?: string | null
          last_mpin_attempt?: string | null
          mpin_attempts?: number | null
          mpin_hash?: string | null
          mpin_locked_until?: string | null
          phone_verified?: boolean | null
          pin_hash?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
          is_mpin_setup: boolean | null
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
          is_mpin_setup?: boolean | null
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
          is_mpin_setup?: boolean | null
          name?: string
          phone?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: []
      }
      walk_sessions: {
        Row: {
          created_at: string
          emergency_triggered: boolean | null
          end_time: string | null
          id: string
          path_coordinates: Json | null
          start_time: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emergency_triggered?: boolean | null
          end_time?: string | null
          id?: string
          path_coordinates?: Json | null
          start_time?: string
          user_id: string
        }
        Update: {
          created_at?: string
          emergency_triggered?: boolean | null
          end_time?: string | null
          id?: string
          path_coordinates?: Json | null
          start_time?: string
          user_id?: string
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
      withdrawals: {
        Row: {
          amount: number
          bank_details: Json | null
          created_at: string
          id: string
          processed_at: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          bank_details?: Json | null
          created_at?: string
          id?: string
          processed_at?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          bank_details?: Json | null
          created_at?: string
          id?: string
          processed_at?: string | null
          status?: string | null
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
      generate_otp: {
        Args: { p_email: string; p_otp_length?: number }
        Returns: string
      }
      hash_mpin: {
        Args: { mpin_plain: string }
        Returns: string
      }
      initialize_user_wallets: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      is_otp_verified: {
        Args: { p_email: string }
        Returns: boolean
      }
      match_merchant_to_stock: {
        Args: { merchant_text: string }
        Returns: {
          company_name: string
          stock_symbol: string
          current_price: number
          currency: string
        }[]
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
      update_wallet_balance_with_stock_matching: {
        Args: {
          wallet_uuid: string
          amount_change: number
          trans_type: Database["public"]["Enums"]["transaction_type"]
          description_text?: string
          merchant_name_text?: string
        }
        Returns: string
      }
      verify_mpin: {
        Args: { user_email: string; mpin_plain: string }
        Returns: {
          user_id: string
          is_valid: boolean
          auth_user_id: string
        }[]
      }
      verify_otp: {
        Args: { p_email: string; p_otp: string }
        Returns: boolean
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
