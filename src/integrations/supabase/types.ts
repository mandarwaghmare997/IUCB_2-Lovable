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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
        }
        Relationships: []
      }
      certificate_history: {
        Row: {
          acted_by: string | null
          action: string
          certificate_id: string
          created_at: string
          id: string
          new_value_json: Json | null
          old_value_json: Json | null
          remarks: string | null
        }
        Insert: {
          acted_by?: string | null
          action: string
          certificate_id: string
          created_at?: string
          id?: string
          new_value_json?: Json | null
          old_value_json?: Json | null
          remarks?: string | null
        }
        Update: {
          acted_by?: string | null
          action?: string
          certificate_id?: string
          created_at?: string
          id?: string
          new_value_json?: Json | null
          old_value_json?: Json | null
          remarks?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificate_history_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
        ]
      }
      certificate_templates: {
        Row: {
          created_at: string
          created_by: string | null
          css_content: string
          html_content: string
          id: string
          is_active: boolean
          name: string
          preview_sample_json: Json | null
          template_type: string
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          css_content?: string
          html_content?: string
          id?: string
          is_active?: boolean
          name: string
          preview_sample_json?: Json | null
          template_type?: string
          updated_at?: string
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          css_content?: string
          html_content?: string
          id?: string
          is_active?: boolean
          name?: string
          preview_sample_json?: Json | null
          template_type?: string
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_number: string
          certificate_type: string
          created_at: string
          created_by: string | null
          expiry_date: string | null
          generated_at: string | null
          id: string
          issue_date: string | null
          organization_id: string
          pdf_file_url: string | null
          publication_state: Database["public"]["Enums"]["cert_publication_state"]
          published_at: string | null
          qr_token: string | null
          scope_summary: string | null
          status: Database["public"]["Enums"]["cert_status"]
          template_id: string | null
          updated_at: string
          updated_by: string | null
          verification_slug: string | null
        }
        Insert: {
          certificate_number: string
          certificate_type?: string
          created_at?: string
          created_by?: string | null
          expiry_date?: string | null
          generated_at?: string | null
          id?: string
          issue_date?: string | null
          organization_id: string
          pdf_file_url?: string | null
          publication_state?: Database["public"]["Enums"]["cert_publication_state"]
          published_at?: string | null
          qr_token?: string | null
          scope_summary?: string | null
          status?: Database["public"]["Enums"]["cert_status"]
          template_id?: string | null
          updated_at?: string
          updated_by?: string | null
          verification_slug?: string | null
        }
        Update: {
          certificate_number?: string
          certificate_type?: string
          created_at?: string
          created_by?: string | null
          expiry_date?: string | null
          generated_at?: string | null
          id?: string
          issue_date?: string | null
          organization_id?: string
          pdf_file_url?: string | null
          publication_state?: Database["public"]["Enums"]["cert_publication_state"]
          published_at?: string | null
          qr_token?: string | null
          scope_summary?: string | null
          status?: Database["public"]["Enums"]["cert_status"]
          template_id?: string | null
          updated_at?: string
          updated_by?: string | null
          verification_slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "certificate_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          received_at: string
          related_certificate_number: string | null
          status: Database["public"]["Enums"]["complaint_status"]
          subject: string | null
          type: Database["public"]["Enums"]["complaint_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          received_at?: string
          related_certificate_number?: string | null
          status?: Database["public"]["Enums"]["complaint_status"]
          subject?: string | null
          type?: Database["public"]["Enums"]["complaint_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          received_at?: string
          related_certificate_number?: string | null
          status?: Database["public"]["Enums"]["complaint_status"]
          subject?: string | null
          type?: Database["public"]["Enums"]["complaint_type"]
          updated_at?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          category: Database["public"]["Enums"]["doc_category"]
          created_at: string
          created_by: string | null
          effective_date: string | null
          file_url: string | null
          html_content: string | null
          id: string
          is_public: boolean
          slug: string
          status: Database["public"]["Enums"]["doc_status"]
          summary: string | null
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["doc_category"]
          created_at?: string
          created_by?: string | null
          effective_date?: string | null
          file_url?: string | null
          html_content?: string | null
          id?: string
          is_public?: boolean
          slug: string
          status?: Database["public"]["Enums"]["doc_status"]
          summary?: string | null
          title: string
          updated_at?: string
          version?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["doc_category"]
          created_at?: string
          created_by?: string | null
          effective_date?: string | null
          file_url?: string | null
          html_content?: string | null
          id?: string
          is_public?: boolean
          slug?: string
          status?: Database["public"]["Enums"]["doc_status"]
          summary?: string | null
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          city: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          country: string | null
          created_at: string
          id: string
          legal_name: string
          notes: string | null
          public_name: string | null
          registration_number: string | null
          status: Database["public"]["Enums"]["org_status"]
          updated_at: string
          website: string | null
        }
        Insert: {
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          id?: string
          legal_name: string
          notes?: string | null
          public_name?: string | null
          registration_number?: string | null
          status?: Database["public"]["Enums"]["org_status"]
          updated_at?: string
          website?: string | null
        }
        Update: {
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          id?: string
          legal_name?: string
          notes?: string | null
          public_name?: string | null
          registration_number?: string | null
          status?: Database["public"]["Enums"]["org_status"]
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          last_login_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          last_login_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          last_login_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "certificate_manager"
      cert_publication_state: "unpublished" | "published" | "withdrawn"
      cert_status:
        | "draft"
        | "generated"
        | "published"
        | "suspended"
        | "revoked"
        | "expired"
        | "archived"
      complaint_status: "new" | "in_progress" | "closed"
      complaint_type:
        | "complaint"
        | "appeal"
        | "support"
        | "general"
        | "accreditation_application"
      doc_category:
        | "policy"
        | "procedure"
        | "manual"
        | "deck"
        | "guidance"
        | "generated_certificate"
      doc_status: "draft" | "published" | "archived"
      org_status: "active" | "inactive" | "archived"
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
      app_role: ["super_admin", "admin", "certificate_manager"],
      cert_publication_state: ["unpublished", "published", "withdrawn"],
      cert_status: [
        "draft",
        "generated",
        "published",
        "suspended",
        "revoked",
        "expired",
        "archived",
      ],
      complaint_status: ["new", "in_progress", "closed"],
      complaint_type: [
        "complaint",
        "appeal",
        "support",
        "general",
        "accreditation_application",
      ],
      doc_category: [
        "policy",
        "procedure",
        "manual",
        "deck",
        "guidance",
        "generated_certificate",
      ],
      doc_status: ["draft", "published", "archived"],
      org_status: ["active", "inactive", "archived"],
    },
  },
} as const
