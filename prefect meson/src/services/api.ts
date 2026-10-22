// PERFECT MASON DIRECT POSTGRESQL API SERVICE
// Direct communication with PostgreSQL backend (perfe392 / 127.0.0.1:5432)

import { GalleryProject } from '../data/galleryData';
import { BlogPost } from '../data/blogsData';
import { EnquirySubmission } from '../data/contactData';
import {
  CommercialItem,
  ResidentialItem,
  TurnkeyItem,
  InteriorItem,
  WebsiteSettings,
  AdminActivityLog,
} from '../context/DataContext';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export interface StorageUploadResponse {
  success: boolean;
  fileId: string;
  url: string;
  directUrl: string;
  filename: string;
  size: number;
  mimeType: string;
  bucketId: string;
}

export interface StorageFileItem {
  id: string;
  bucketId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  createdAt: string;
}

export interface PageContentRecord {
  pageId: string;
  pageTitle: string;
  data: any;
  draftData?: any;
  hasDraft?: boolean;
  status: string;
  updatedAt: string;
  draftUpdatedAt?: string | null;
}

export interface TestimonialRecord {
  id: string;
  type: 'standard' | 'featured';
  clientName: string;
  service: string;
  category: string;
  location: string;
  quote: string;
  rating: number;
  avatar?: string;
  image?: string;
  featured?: boolean;
  displayOrder?: number;
  createdAt?: string;
}

export interface AiChatSessionRecord {
  id: string;
  visitorName?: string;
  visitorPhone?: string;
  projectType?: string;
  location?: string;
  budget?: string;
  timeline?: string;
  summary?: string;
  messages: Array<{ role: string; content: string }>;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const apiService = {
  // Health & DB Connection
  async checkHealth(): Promise<any> {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('PostgreSQL backend health check failed');
    return res.json();
  },

  // Direct PostgreSQL Storage Upload
  async uploadFile(file: File, bucketId: string = 'general'): Promise<StorageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucketId', bucketId);

    const res = await fetch(`${API_BASE}/storage/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to upload image to PostgreSQL storage');
    }
    return res.json();
  },

  // Gallery Projects
  async getProjects(): Promise<GalleryProject[]> {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects from PostgreSQL');
    return res.json();
  },

  async createProject(project: Partial<GalleryProject>): Promise<{ success: boolean; id: string; slug: string }> {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error('Failed to create project in PostgreSQL');
    return res.json();
  },

  async updateProject(id: string, updated: Partial<GalleryProject>): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/projects/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!res.ok) throw new Error('Failed to update project in PostgreSQL');
    return res.json();
  },

  async deleteProject(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/projects/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete project from PostgreSQL');
    return res.json();
  },

  async reorderProjects(items: { id: string; displayOrder: number }[]): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/projects/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    if (!res.ok) throw new Error('Failed to persist project reordering in PostgreSQL');
    return res.json();
  },

  // Commercial Items
  async getCommercial(): Promise<CommercialItem[]> {
    const res = await fetch(`${API_BASE}/commercial`);
    if (!res.ok) throw new Error('Failed to fetch commercial items');
    return res.json();
  },

  async createCommercial(item: Partial<CommercialItem>): Promise<{ success: boolean; id: string }> {
    const res = await fetch(`${API_BASE}/commercial`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to create commercial item');
    return res.json();
  },

  async updateCommercial(id: string, item: Partial<CommercialItem>): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/commercial/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to update commercial item');
    return res.json();
  },

  async deleteCommercial(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/commercial/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete commercial item');
    return res.json();
  },

  // Residential Items
  async getResidential(): Promise<ResidentialItem[]> {
    const res = await fetch(`${API_BASE}/residential`);
    if (!res.ok) throw new Error('Failed to fetch residential items');
    return res.json();
  },

  async createResidential(item: Partial<ResidentialItem>): Promise<{ success: boolean; id: string }> {
    const res = await fetch(`${API_BASE}/residential`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to create residential item');
    return res.json();
  },

  async updateResidential(id: string, item: Partial<ResidentialItem>): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/residential/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to update residential item');
    return res.json();
  },

  async deleteResidential(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/residential/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete residential item');
    return res.json();
  },

  // Turnkey Items
  async getTurnkey(): Promise<TurnkeyItem[]> {
    const res = await fetch(`${API_BASE}/turnkey`);
    if (!res.ok) throw new Error('Failed to fetch turnkey items');
    return res.json();
  },

  async createTurnkey(item: Partial<TurnkeyItem>): Promise<{ success: boolean; id: string }> {
    const res = await fetch(`${API_BASE}/turnkey`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to create turnkey item');
    return res.json();
  },

  async updateTurnkey(id: string, item: Partial<TurnkeyItem>): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/turnkey/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to update turnkey item');
    return res.json();
  },

  async deleteTurnkey(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/turnkey/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete turnkey item');
    return res.json();
  },

  // Interior Items
  async getInteriors(): Promise<InteriorItem[]> {
    const res = await fetch(`${API_BASE}/interiors`);
    if (!res.ok) throw new Error('Failed to fetch interior items');
    return res.json();
  },

  async createInterior(item: Partial<InteriorItem>): Promise<{ success: boolean; id: string }> {
    const res = await fetch(`${API_BASE}/interiors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to create interior item');
    return res.json();
  },

  async updateInterior(id: string, item: Partial<InteriorItem>): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/interiors/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to update interior item');
    return res.json();
  },

  async deleteInterior(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/interiors/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete interior item');
    return res.json();
  },

  // Blogs
  async getBlogs(): Promise<BlogPost[]> {
    const res = await fetch(`${API_BASE}/blogs`);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
  },

  async createBlog(blog: Partial<BlogPost>): Promise<{ success: boolean; id: string; slug: string }> {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error('Failed to create blog');
    return res.json();
  },

  async updateBlog(id: string, blog: Partial<BlogPost>): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error('Failed to update blog');
    return res.json();
  },

  async deleteBlog(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete blog');
    return res.json();
  },

  // Enquiries / Leads
  async getEnquiries(): Promise<EnquirySubmission[]> {
    const res = await fetch(`${API_BASE}/enquiries`);
    if (!res.ok) throw new Error('Failed to fetch enquiries');
    return res.json();
  },

  async createEnquiry(enquiry: Omit<EnquirySubmission, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; id: string }> {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
    });
    if (!res.ok) throw new Error('Failed to submit quote enquiry');
    return res.json();
  },

  async updateEnquiryStatus(id: string, status: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/enquiries/${encodeURIComponent(id)}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update enquiry status');
    return res.json();
  },

  async deleteEnquiry(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/enquiries/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete enquiry');
    return res.json();
  },

  // Settings
  async getSettings(): Promise<WebsiteSettings> {
    const res = await fetch(`${API_BASE}/settings`);
    if (!res.ok) throw new Error('Failed to fetch website settings');
    return res.json();
  },

  async updateSettings(settings: Partial<WebsiteSettings>): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error('Failed to update settings in PostgreSQL');
    return res.json();
  },

  // Activity Logs
  async getActivityLogs(): Promise<AdminActivityLog[]> {
    const res = await fetch(`${API_BASE}/activity`);
    if (!res.ok) throw new Error('Failed to fetch activity logs');
    return res.json();
  },

  // Master Catalog Reset
  async resetMaster(): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/reset-master`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to reset master catalog');
    return res.json();
  },

  // Media Library Files
  async getStorageFiles(bucket: string = 'all'): Promise<StorageFileItem[]> {
    const queryParam = bucket !== 'all' ? `?bucket=${encodeURIComponent(bucket)}` : '';
    const res = await fetch(`${API_BASE}/storage/files${queryParam}`);
    if (!res.ok) throw new Error('Failed to fetch storage media files');
    return res.json();
  },

  async deleteStorageFile(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/storage/file/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete media file from storage');
    return res.json();
  },

  // Visual Website Page Contents
  async getPageContents(): Promise<PageContentRecord[]> {
    const res = await fetch(`${API_BASE}/pages`);
    if (!res.ok) throw new Error('Failed to fetch page contents');
    return res.json();
  },

  async getPageContent(pageId: string): Promise<PageContentRecord> {
    const res = await fetch(`${API_BASE}/pages/${encodeURIComponent(pageId)}`);
    if (!res.ok) throw new Error(`Failed to fetch content for page: ${pageId}`);
    return res.json();
  },

  async updatePageContent(pageId: string, pageTitle: string, data: any, status: string = 'Published'): Promise<{ success: boolean; pageId: string }> {
    const res = await fetch(`${API_BASE}/pages/${encodeURIComponent(pageId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageTitle, data, status, action: status === 'Draft' ? 'draft' : 'publish' }),
    });
    if (!res.ok) throw new Error(`Failed to save content for page: ${pageId}`);
    return res.json();
  },

  async savePageDraft(pageId: string, pageTitle: string, draftData: any): Promise<{ success: boolean; pageId: string; draftUpdatedAt: string }> {
    const res = await fetch(`${API_BASE}/pages/${encodeURIComponent(pageId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageTitle, draftData, action: 'draft', status: 'Draft' }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to save draft for page: ${pageId}`);
    }
    return res.json();
  },

  async publishPageContent(pageId: string, pageTitle: string, data: any): Promise<{ success: boolean; pageId: string; updatedAt: string; status: string }> {
    const res = await fetch(`${API_BASE}/pages/${encodeURIComponent(pageId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageTitle, data, action: 'publish', status: 'Published' }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to publish page: ${pageId}`);
    }
    return res.json();
  },

  async discardPageDraft(pageId: string): Promise<{ success: boolean; pageId: string }> {
    const res = await fetch(`${API_BASE}/pages/${encodeURIComponent(pageId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'discard_draft' }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to discard draft for page: ${pageId}`);
    }
    return res.json();
  },

  // Testimonials / Client Reviews
  async getTestimonials(): Promise<TestimonialRecord[]> {
    const res = await fetch(`${API_BASE}/testimonials`);
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
  },

  async createTestimonial(testimonial: Partial<TestimonialRecord>): Promise<{ success: boolean; id: string }> {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial),
    });
    if (!res.ok) throw new Error('Failed to create testimonial');
    return res.json();
  },

  async updateTestimonial(id: string, testimonial: Partial<TestimonialRecord>): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/testimonials/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial),
    });
    if (!res.ok) throw new Error('Failed to update testimonial');
    return res.json();
  },

  async deleteTestimonial(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/testimonials/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete testimonial');
    return res.json();
  },

  // AI Chat Conversations
  async getAiConversations(): Promise<AiChatSessionRecord[]> {
    const res = await fetch(`${API_BASE}/ai/conversations`);
    if (!res.ok) throw new Error('Failed to fetch AI chat conversations');
    return res.json();
  },

  async saveAiConversation(session: Partial<AiChatSessionRecord>): Promise<{ success: boolean; id: string }> {
    const res = await fetch(`${API_BASE}/ai/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });
    if (!res.ok) throw new Error('Failed to save AI chat conversation');
    return res.json();
  },

  async updateAiConversationStatus(id: string, status: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/ai/conversations/${encodeURIComponent(id)}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update AI conversation status');
    return res.json();
  },
};
