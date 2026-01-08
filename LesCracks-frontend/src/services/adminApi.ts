import { ENV } from '@/config/env';
const API_BASE_URL = ENV.API_BASE_URL;


class AdminApiService {
  private token: string | null = null;

  constructor() {
    this.refreshToken();
  }

  refreshToken() {
    this.token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  }

  private getHeaders(includeAuth = true): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    this.refreshToken();

    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: this.getHeaders(true), // TOUJOURS AUTH POUR LES ROUTES PROTÉGÉES
    };

    const response = await fetch(url, config);
    let data: any;

    try {
      data = await response.json();
    } catch {
      data = { success: false, message: 'Invalid JSON' };
    }

    if (!response.ok) {
      console.error('API Error:', { endpoint, status: response.status, data });
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return data as T;
  }

  // === AUTH ===
  async login(email: string, password: string) {
    const data = await this.request<{ success: true; data: { token: string; admin: any } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.token = data.data.token;
    localStorage.setItem('adminToken', data.data.token);
    this.refreshToken();

    console.log('LOGIN OK → Token:', this.token);
    return data;
  }

  async verifyToken() {
    this.refreshToken();
    if (!this.token) return null;

    try {
      return await this.request<{ success: true; data: { admin: any } }>('/auth/verify', {
        method: 'GET',
      });
    } catch {
      this.token = null;
      localStorage.removeItem('adminToken');
      return null;
    }
  }

  async logout() {
    this.refreshToken();
    try {
      if (this.token) await this.request('/auth/logout', { method: 'POST' });
    } catch { }
    this.token = null;
    localStorage.removeItem('adminToken');
  }

  // === CATEGORIES ===
  async getCategories() {
    return this.request<{ success: true; data: { categories: { id_category: number; name: string }[] } }>('/categories');
  }

  async createCategory(name: string) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  async updateCategory(id: number, name: string) {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
  }

  async deleteCategory(id: number) {
    return this.request(`/categories/${id}`, { method: 'DELETE' });
  }

  // === TAGS ===
  async getTags() {
    return this.request<{ success: true; data: { tags: { id_tag: number; name: string }[] } }>('/tags');
  }

  async createTag(name: string) {
    return this.request('/tags', {
      method: 'POST',
      body: JSON.stringify({ name }), // ← ENVOIE UN OBJET
    });
  }

  async updateTag(id: number, name: string) {
    return this.request(`/tags/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }), // ← ENVOIE UN OBJET
    });
  }

  async deleteTag(id: number) {
    return this.request(`/tags/${id}`, { method: 'DELETE' });
  }

  // === COURSES ===
  async getCourses(filters?: { category?: number; tag?: number; search?: string }) {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category.toString());
    if (filters?.tag) params.append('tag', filters.tag.toString());
    if (filters?.search) params.append('search', filters.search);

    const url = `/videoCourses${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<{ success: true; data: { courses: any[] } }>(url);
  }

  async getCourse(id: number) {
    return this.request(`/videoCourses/${id}`);
  }

  async createCourse(courseData: {
    title: string;
    description: string;
    video_url: string;
    id_category: number;
    id_image?: number;
    tagIds?: number[];
  }) {
    return this.request('/videoCourses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async updateCourse(id: number, courseData: Partial<{
    title: string;
    description: string;
    video_url: string;
    id_category: number;
    id_image?: number;
    tagIds?: number[];
  }>) {
    return this.request(`/videoCourses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(id: number) {
    return this.request(`/videoCourses/${id}`, { method: 'DELETE' });
  }

  // === EVENTS ===
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

  async createEvent(eventData: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    id_category: number;
    id_image?: number;
    tagIds?: number[];
  }) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateEvent(id: number, eventData: Partial<{
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    id_category: number;
    id_image?: number;
    tagIds?: number[];
  }>) {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteEvent(id: number) {
    return this.request(`/events/${id}`, { method: 'DELETE' });
  }

  // === DOCUMENTS ===
  async getDocuments(filters?: { category?: number; tag?: number; search?: string }) {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category.toString());
    if (filters?.tag) params.append('tag', filters.tag.toString());
    if (filters?.search) params.append('search', filters.search);

    const url = `/documents${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<{ success: true; data: { documents: any[] } }>(url);
  }

  async getDocument(id: string) {
    return this.request(`/documents/${id}`);
  }

  async createDocument(documentData: {
    title: string;
    description: string;
    file_url: string;
    file_name?: string;
    file_size?: number;
    mime_type?: string;
    id_image?: number;
    categoryIds?: number[];
    tagIds?: number[];
  }) {
    return this.request('/documents', {
      method: 'POST',
      body: JSON.stringify(documentData),
    });
  }

  async updateDocument(id: string, documentData: Partial<{
    title: string;
    description: string;
    file_url: string;
    file_name?: string;
    file_size?: number;
    mime_type?: string;
    id_image?: number;
    categoryIds?: number[];
    tagIds?: number[];
  }>) {
    return this.request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(documentData),
    });
  }

  async deleteDocument(id: string) {
    return this.request(`/documents/${id}`, { method: 'DELETE' });
  }

  // === UPLOAD ===
  async uploadImage(file: File) {
    this.refreshToken();
    if (!this.token) throw new Error('Non authentifié');

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.token}` },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Upload failed');
    return data;
  }

  async uploadDocument(file: File) {
    this.refreshToken();
    if (!this.token) throw new Error('Non authentifié');

    const formData = new FormData();
    formData.append('document', file);

    const response = await fetch(`${API_BASE_URL}/upload/document`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.token}` },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Upload failed');
    return data;
  }
}

export const adminApi = new AdminApiService();