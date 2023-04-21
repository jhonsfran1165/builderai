export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      organization: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image: string | null
          name: string
          slug: string
          stripe_id: string | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name: string
          slug?: string
          stripe_id?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name?: string
          slug?: string
          stripe_id?: string | null
          type?: string
          updated_at?: string
        }
      }
      organization_profiles: {
        Row: {
          created_at: string
          id: number
          is_default: boolean
          org_id: number
          profile_id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_default?: boolean
          org_id: number
          profile_id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          is_default?: boolean
          org_id?: number
          profile_id?: string
          role?: string
          updated_at?: string
        }
      }
      organization_subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          currency: string | null
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          interval: Database["public"]["Enums"]["subscription_interval"] | null
          interval_count: number | null
          metadata: Json | null
          org_id: number | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          currency?: string | null
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          interval?: Database["public"]["Enums"]["subscription_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          org_id?: number | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          currency?: string | null
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["subscription_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          org_id?: number | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
        }
      }
      page: {
        Row: {
          content: Json | null
          created_at: string
          description: string
          id: number
          image_url: string | null
          org_id: number | null
          project_id: number | null
          published: boolean
          slug: string
          title: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          description: string
          id?: number
          image_url?: string | null
          org_id?: number | null
          project_id?: number | null
          published?: boolean
          slug?: string
          title: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          description?: string
          id?: number
          image_url?: string | null
          org_id?: number | null
          project_id?: number | null
          published?: boolean
          slug?: string
          title?: string
        }
      }
      profile: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name: string
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          updated_at?: string
          username?: string
        }
      }
      project: {
        Row: {
          created_at: string
          custom_domain: string | null
          description: string | null
          id: number
          logo: string | null
          name: string
          org_id: number | null
          slug: string
          subdomain: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          custom_domain?: string | null
          description?: string | null
          id?: number
          logo?: string | null
          name: string
          org_id?: number | null
          slug?: string
          subdomain: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          custom_domain?: string | null
          description?: string | null
          id?: number
          logo?: string | null
          name?: string
          org_id?: number | null
          slug?: string
          subdomain?: string
          updated_at?: string
        }
      }
    }
    Views: {
      data_orgs: {
        Row: {
          is_default: boolean | null
          org_id: number | null
          org_image: string | null
          org_slug: string | null
          org_stripe_id: string | null
          org_type: string | null
          profile_id: string | null
          profiles_org_id: number | null
          role: string | null
          status_subscription:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          subscription_canceled_at: string | null
          subscription_ended_at: string | null
          subscription_interval:
            | Database["public"]["Enums"]["subscription_interval"]
            | null
          subscription_interval_count: number | null
          subscription_metadata: Json | null
          subscription_period_ends: string | null
          subscription_period_starts: string | null
          subscription_trial_ends: string | null
          subscription_trial_starts: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_interval: "day" | "week" | "month" | "year"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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
