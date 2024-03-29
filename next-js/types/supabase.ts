export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ads: {
        Row: {
          ad_images: string[] | null
          body: string
          created_at: string
          id: string
          is_hidden: boolean
          public_user_id: string
          title: string
          user_id: string
        }
        Insert: {
          ad_images?: string[] | null
          body: string
          created_at?: string
          id?: string
          is_hidden?: boolean
          public_user_id: string
          title: string
          user_id?: string
        }
        Update: {
          ad_images?: string[] | null
          body?: string
          created_at?: string
          id?: string
          is_hidden?: boolean
          public_user_id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_ads_public_user_id_fkey"
            columns: ["public_user_id"]
            isOneToOne: false
            referencedRelation: "users_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_ads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      objects: {
        Row: {
          created_at: string
          id: string
          individual_number: string
          type: Database["public"]["Enums"]["Object types"]
        }
        Insert: {
          created_at?: string
          id?: string
          individual_number: string
          type: Database["public"]["Enums"]["Object types"]
        }
        Update: {
          created_at?: string
          id?: string
          individual_number?: string
          type?: Database["public"]["Enums"]["Object types"]
        }
        Relationships: []
      }
      ownerships: {
        Row: {
          created_at: string
          id: string
          object: string
          owner: string
          owner_since: string
          owner_until: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          object: string
          owner: string
          owner_since: string
          owner_until?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          object?: string
          owner?: string
          owner_since?: string
          owner_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_ownerhips_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ownerships_object_fkey"
            columns: ["object"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          }
        ]
      }
      publications: {
        Row: {
          body: string
          created_at: string
          id: string
          is_hidden: boolean
          public_user_id: string
          publication_images: string[] | null
          title: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          is_hidden?: boolean
          public_user_id: string
          publication_images?: string[] | null
          title: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          is_hidden?: boolean
          public_user_id?: string
          publication_images?: string[] | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_publications_public_user_id_fkey"
            columns: ["public_user_id"]
            isOneToOne: false
            referencedRelation: "users_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_publications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      services: {
        Row: {
          body: string
          created_at: string
          custom_contact: string | null
          id: string
          phone: string
          phone_country_code: Database["public"]["Enums"]["Phone country codes"]
          public_user_id: string
          service_images: string[]
          telegram: string | null
          title: string
          user_id: string
          whatsapp: boolean
        }
        Insert: {
          body: string
          created_at?: string
          custom_contact?: string | null
          id?: string
          phone: string
          phone_country_code: Database["public"]["Enums"]["Phone country codes"]
          public_user_id?: string
          service_images: string[]
          telegram?: string | null
          title: string
          user_id?: string
          whatsapp: boolean
        }
        Update: {
          body?: string
          created_at?: string
          custom_contact?: string | null
          id?: string
          phone?: string
          phone_country_code?: Database["public"]["Enums"]["Phone country codes"]
          public_user_id?: string
          service_images?: string[]
          telegram?: string | null
          title?: string
          user_id?: string
          whatsapp?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "public_services_public_user_id_fkey"
            columns: ["public_user_id"]
            isOneToOne: true
            referencedRelation: "users_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_services_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users_profiles: {
        Row: {
          created_at: string
          name: string | null
          patronymic: string | null
          profile_image: string | null
          public_role: Database["public"]["Enums"]["Role tags"][] | null
          surname: string | null
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          name?: string | null
          patronymic?: string | null
          profile_image?: string | null
          public_role?: Database["public"]["Enums"]["Role tags"][] | null
          surname?: string | null
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          name?: string | null
          patronymic?: string | null
          profile_image?: string | null
          public_role?: Database["public"]["Enums"]["Role tags"][] | null
          surname?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      "Object types": "garage" | "parking_space"
      "Phone country codes": "+7"
      "Role tags": "member" | "master"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
