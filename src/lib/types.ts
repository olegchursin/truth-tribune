export type Slant = "left" | "right";

export interface NewsApiArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Database types
export interface Article {
  id: string;
  original_url: string;
  original_source: string;
  original_author: string | null;
  original_title: string;
  original_description: string | null;
  original_published_at: string;
  section: string;
  image_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleRewrite {
  id?: number;
  article_id: string;
  slant: Slant;
  title: string;
  description: string;
  full_content: string;
  created_at?: string;
}

export interface ArticleWithRewrite extends Article {
  rewrite: ArticleRewrite;
}

// Legacy interface for backwards compatibility during migration
export interface FeedArticle {
  id: string;
  source: string;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  imageUrl: string | null;
  publishedAt: string;
  category?: string;
}
