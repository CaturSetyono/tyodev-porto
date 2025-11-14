// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Project, "id" | "created_at" | "updated_at">>;
      };
      skills: {
        Row: Skill;
        Insert: Omit<Skill, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Skill, "id" | "created_at" | "updated_at">>;
      };
      experiences: {
        Row: Experience;
        Insert: Omit<Experience, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Experience, "id" | "created_at" | "updated_at">>;
      };
      about_info: {
        Row: AboutInfo;
        Insert: Omit<AboutInfo, "id" | "updated_at">;
        Update: Partial<Omit<AboutInfo, "id" | "updated_at">>;
      };
      hero_section: {
        Row: HeroSection;
        Insert: Omit<HeroSection, "id" | "updated_at">;
        Update: Partial<Omit<HeroSection, "id" | "updated_at">>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, "id" | "created_at">;
        Update: Partial<Omit<ContactMessage, "id" | "created_at">>;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: Omit<SiteSetting, "id" | "updated_at">;
        Update: Partial<Omit<SiteSetting, "id" | "updated_at">>;
      };
      admin_users: {
        Row: AdminUser;
        Insert: Omit<AdminUser, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<AdminUser, "id" | "created_at" | "updated_at">>;
      };
    };
  };
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  technologies?: string[];
  featured: boolean;
  status: "active" | "inactive" | "draft";
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  level?: number;
  icon_name?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  is_current: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface AboutInfo {
  id: string;
  bio?: string;
  profile_image_url?: string;
  cv_url?: string;
  location?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  updated_at: string;
}

export interface HeroSection {
  id: string;
  greeting?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  cta_text?: string;
  cta_url?: string;
  cv_url?: string;
  profile_image_url?: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "unread" | "read" | "replied";
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value?: string;
  description?: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash?: string;
  full_name?: string;
  role: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

// Form types
export interface ProjectForm {
  title: string;
  description: string;
  image_url: string;
  demo_url: string;
  github_url: string;
  technologies: string[];
  featured: boolean;
  status: "active" | "inactive" | "draft" | "archived";
}

export interface SkillForm {
  name: string;
  category: string;
  level: number;
  icon_name: string;
}

export interface ExperienceForm {
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  is_current: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AdminLoginForm {
  email: string;
  password: string;
}
