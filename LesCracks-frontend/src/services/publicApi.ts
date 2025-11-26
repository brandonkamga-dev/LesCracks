// src/services/publicApi.ts
import { ENV } from '@/config/env';
const API_BASE_URL = ENV.API_BASE_URL;

class PublicApiService {
  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: this.getHeaders(),
    };

    const response = await fetch(url, config);
    let data: any;

    try {
      data = await response.json();
    } catch {
      data = { success: false, message: 'Invalid JSON' };
    }

    if (!response.ok) {
      console.warn('Public API Error (non bloquant):', { endpoint, status: response.status });
      return data as T;
    }

    return data as T;
  }

  // === COURS ===
  async getCourses(filters?: { category?: number; tag?: number; search?: string }) {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category.toString());
    if (filters?.tag) params.append('tag', filters.tag.toString());
    if (filters?.search) params.append('search', filters.search);

    const url = `/courses${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<{ success: true; data: { courses: any[] } }>(url);
  }

  async getCourse(id: number) {
    return this.request(`/courses/${id}`);
  }

  async trackCourseClick(id_course: number) {
    try {
      await this.request(`/courses/${id_course}/click`, { method: 'POST' });
    } catch (error) {
      console.warn('Tracking échoué (non bloquant):', error);
    }
  }

  // === ÉVÉNEMENTS ===
  async getEvents(filters?: { category?: number; tag?: number; search?: string; date?: string }) {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category.toString());
    if (filters?.tag) params.append('tag', filters.tag.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.date) params.append('date', filters.date);

    const url = `/events${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<{ success: true; data: { events: any[] } }>(url);
  }

  async getEvent(id: number) {
    return this.request(`/events/${id}`);
  }

  async trackEventClick(id: number) {
    try {
      await this.request(`/events/${id}/click`, { method: 'POST' });
    } catch (error) {
      console.warn('Tracking échoué (non bloquant):', error);
    }
  }

  // === CATÉGORIES ===
  async getCategories() {
    return this.request<{ success: true; data: { categories: { id_category: number; name: string }[] } }>('/categories');
  }

  async getCategory(id: number) {
    return this.request(`/categories/${id}`);
  }

  // === TAGS ===
  async getTags() {
    return this.request<{ success: true; data: { tags: { id_tag: number; name: string }[] } }>('/tags');
  }

  async getTag(id: number) {
    return this.request(`/tags/${id}`);
  }
}

// Export singleton
export const publicApi = new PublicApiService();