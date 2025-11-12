// src/pages/admin/AdminCourses.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, PlayCircle, Tag, BookOpen, MousePointer, X, Upload, Loader2 } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

interface Course {
  id_course: number;
  title: string;
  description: string;
  youtube_link: string;
  id_category: number;
  id_image?: number;
  click_count: number;
  createdAt?: string;
  category?: { id_category: number; name: string };
  image?: { id_image: number; image_url: string };
  tags?: Array<{ id_tag: number; name: string }>;
}

const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtube_link: '',
    id_category: '',
    tagIds: [] as number[],
    imageFile: null as File | null
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Charger données
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes, tagsRes] = await Promise.all([
          adminApi.getCourses(),
          adminApi.getCategories(),
          adminApi.getTags()
        ]);

        setCourses(coursesRes.data?.courses || []);
        setCategories(categoriesRes.data?.categories || []);
        setTags(tagsRes.data?.tags || []);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = courses;
    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(lower) ||
        c.description.toLowerCase().includes(lower)
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(c => c.id_category === Number(selectedCategory));
    }
    setFilteredCourses(filtered);
  }, [courses, search, selectedCategory]);

  // Ouvrir modal
  const openModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        youtube_link: course.youtube_link,
        id_category: course.id_category.toString(),
        tagIds: course.tags?.map(t => t.id_tag) || [],
        imageFile: null
      });
      setImagePreview(course.image?.image_url || null);
    } else {
      setEditingCourse(null);
      setFormData({
        title: '',
        description: '',
        youtube_link: '',
        id_category: '',
        tagIds: [],
        imageFile: null
      });
      setImagePreview(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCourse(null);
    setImagePreview(null);
  };

  // Gestion image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.youtube_link || !formData.id_category) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setUploading(true);
    try {
      let id_image = editingCourse?.id_image;

      if (formData.imageFile) {
        const uploadRes = await adminApi.uploadImage(formData.imageFile);
        id_image = uploadRes.data.image.id_image;
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        youtube_link: formData.youtube_link,
        id_category: Number(formData.id_category),
        id_image,
        tagIds: formData.tagIds
      };

      if (editingCourse) {
        await adminApi.updateCourse(editingCourse.id_course, payload);
      } else {
        await adminApi.createCourse(payload);
      }

      // Rafraîchir
      const res = await adminApi.getCourses();
      setCourses(res.data?.courses || []);
      closeModal();
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce cours ?')) return;
    try {
      await adminApi.deleteCourse(id);
      setCourses(prev => prev.filter(c => c.id_course !== id));
    } catch {
      alert('Erreur suppression');
    }
  };

  const totalClicks = courses.reduce((s, c) => s + c.click_count, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Cours</h1>
          <p className="text-gray-600">Créer, modifier et suivre vos cours</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouveau Cours
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat.id_category} value={cat.id_category}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Cours</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clics Totaux</p>
              <p className="text-2xl font-bold text-gray-900">{totalClicks}</p>
            </div>
            <MousePointer className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Moyenne</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.length ? Math.round(totalClicks / courses.length) : 0}
              </p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xs font-bold">Ø</span>
            </div>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clics</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id_course} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {course.image?.image_url ? (
                        <img src={course.image.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <PlayCircle className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{course.title}</p>
                        <p className="text-xs text-gray-500">
                          {course.createdAt ? new Date(course.createdAt).toLocaleDateString('fr-FR') : '—'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{course.category?.name || '—'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <MousePointer className="w-4 h-4 text-orange-600" />
                      <span className="font-medium">{course.click_count}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {course.tags?.length ? (
                        course.tags.map(t => (
                          <span key={t.id_tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {t.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openModal(course)} className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(course.id_course)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <PlayCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun cours</h3>
            <p className="mt-1 text-sm text-gray-500">
              {search || selectedCategory ? 'Aucun résultat.' : 'Créez votre premier cours.'}
            </p>
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingCourse ? 'Modifier le cours' : 'Nouveau cours'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image (optionnel)</label>
                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-lg object-cover" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 border-2 border-dashed rounded-lg flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              {/* Titre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Lien YouTube */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien YouTube *</label>
                <input
                  type="url"
                  value={formData.youtube_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, youtube_link: e.target.value }))}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                <select
                  value={formData.id_category}
                  onChange={(e) => setFormData(prev => ({ ...prev, id_category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner...</option>
                  {categories.map(cat => (
                    <option key={cat.id_category} value={cat.id_category}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div className="space-y-2">
                  {tags.map(tag => (
                    <label key={tag.id_tag} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.tagIds.includes(tag.id_tag)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({ ...prev, tagIds: [...prev.tagIds, tag.id_tag] }));
                          } else {
                            setFormData(prev => ({ ...prev, tagIds: prev.tagIds.filter(id => id !== tag.id_tag) }));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Boutons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    editingCourse ? 'Mettre à jour' : 'Créer'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;