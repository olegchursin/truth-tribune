-- One-off migration: remap politics and international articles to general
-- (Categories were updated to News API top-headlines: business, entertainment, general, health, science, sports, technology)
-- Run in Supabase SQL Editor or via scripts/migrate-sections.ts

UPDATE articles
SET section = 'general'
WHERE section IN ('politics', 'international');
