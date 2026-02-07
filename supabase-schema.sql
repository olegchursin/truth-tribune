-- Truth Tribune Database Schema
-- Run this in your Supabase SQL Editor after creating the project

-- Articles table
CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  original_url TEXT NOT NULL,
  original_source TEXT NOT NULL,
  original_author TEXT,
  original_title TEXT NOT NULL,
  original_description TEXT,
  original_published_at TIMESTAMP NOT NULL,
  section TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Rewritten versions (one row per slant)
CREATE TABLE article_rewrites (
  id SERIAL PRIMARY KEY,
  article_id TEXT REFERENCES articles(id) ON DELETE CASCADE,
  slant TEXT NOT NULL CHECK (slant IN ('left', 'right')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(article_id, slant)
);

-- Indexes for fast queries
CREATE INDEX idx_articles_section ON articles(section);
CREATE INDEX idx_articles_published ON articles(original_published_at DESC);
CREATE INDEX idx_rewrites_lookup ON article_rewrites(article_id, slant);

-- Enable RLS (optional, for security)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_rewrites ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public read rewrites" ON article_rewrites FOR SELECT USING (true);
