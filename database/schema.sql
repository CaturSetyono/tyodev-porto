-- ==========================================
-- PORTFOLIO WEBSITE DATABASE SCHEMA
-- ==========================================

-- Enable RLS (Row Level Security)
-- This should be run in Supabase SQL Editor

-- 1. PROJECTS TABLE
-- ==========================================
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  technologies TEXT[], -- Array of technologies
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, draft
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SKILLS TABLE
-- ==========================================
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50), -- frontend, backend, tools, etc.
  level INTEGER CHECK (level >= 1 AND level <= 5), -- 1-5 skill level
  icon_name VARCHAR(50), -- for icon components
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. EXPERIENCES TABLE
-- ==========================================
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE, -- NULL for current position
  location VARCHAR(255),
  is_current BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ABOUT INFO TABLE
-- ==========================================
CREATE TABLE about_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bio TEXT,
  profile_image_url TEXT,
  cv_url TEXT,
  location VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. HERO SECTION TABLE
-- ==========================================
CREATE TABLE hero_section (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  greeting VARCHAR(100),
  name VARCHAR(100),
  title VARCHAR(255),
  subtitle TEXT,
  description TEXT,
  cta_text VARCHAR(100),
  cta_url TEXT,
  background_image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CONTACT MESSAGES TABLE
-- ==========================================
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread', -- unread, read, replied
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. SITE SETTINGS TABLE
-- ==========================================
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. ADMIN USERS TABLE
-- ==========================================
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- CREATE INDEXES FOR PERFORMANCE
-- ==========================================
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_order ON projects(order_index);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_active ON skills(is_active);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created ON contact_messages(created_at);

-- ==========================================
-- INSERT DEFAULT DATA
-- ==========================================

-- Default Hero Section
INSERT INTO hero_section (greeting, name, title, subtitle, description, cta_text, cta_url) VALUES
('Hello, I''m', 'Your Name', 'Full Stack Developer', 'Building amazing web experiences', 'I create modern, responsive, and user-friendly web applications using cutting-edge technologies.', 'View My Work', '#projects');

-- Default About Info
INSERT INTO about_info (bio, email, location) VALUES
('I am a passionate full stack developer with experience in building web applications.', 'your.email@example.com', 'Your City, Country');

-- Default Site Settings
INSERT INTO site_settings (key, value, description) VALUES
('site_title', 'Your Portfolio', 'Website title'),
('site_description', 'Full Stack Developer Portfolio', 'Website description'),
('site_keywords', 'developer, portfolio, web development', 'SEO keywords'),
('google_analytics_id', '', 'Google Analytics ID'),
('maintenance_mode', 'false', 'Maintenance mode toggle');

-- Sample Skills
INSERT INTO skills (name, category, level, icon_name, order_index) VALUES
('React', 'frontend', 5, 'react', 1),
('Next.js', 'frontend', 5, 'nextjs', 2),
('TypeScript', 'frontend', 4, 'typescript', 3),
('Node.js', 'backend', 4, 'nodejs', 4),
('PostgreSQL', 'database', 4, 'postgresql', 5),
('Git', 'tools', 5, 'git', 6);

-- ==========================================
-- ENABLE ROW LEVEL SECURITY
-- ==========================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- CREATE RLS POLICIES
-- ==========================================

-- Public read access for portfolio data
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access for experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read access for about_info" ON about_info FOR SELECT USING (true);
CREATE POLICY "Public read access for hero_section" ON hero_section FOR SELECT USING (true);
CREATE POLICY "Public read access for site_settings" ON site_settings FOR SELECT USING (true);

-- Public insert for contact messages
CREATE POLICY "Public insert access for contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin-only access for modifications (you'll need to set up authentication)
-- These policies will be updated when you implement authentication

-- ==========================================
-- CREATE FUNCTIONS FOR AUTOMATIC TIMESTAMPS
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_info_updated_at BEFORE UPDATE ON about_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_section_updated_at BEFORE UPDATE ON hero_section FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();