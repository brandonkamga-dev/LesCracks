import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, PlayCircle, Tag, BookOpen, MousePointer, X, Upload, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
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
    video_url: '',
    id_category: '',
    tagIds: [] as number[],
    imageFile: null as File | null
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

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
        video_url: course.youtube_link,
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
        video_url: '',
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
    if (!formData.title || !formData.description || !formData.video_url || !formData.id_category) {
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
        video_url: formData.video_url,
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

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await adminApi.createCategory(newCategory.trim());
      setNewCategory('');
      // Refresh categories
      const res = await adminApi.getCategories();
      setCategories(res.data?.categories || []);
    } catch (error) {
      alert('Erreur création catégorie');
      console.error(error);
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    try {
      await adminApi.createTag(newTag.trim());
      setNewTag('');
      // Refresh tags
      const res = await adminApi.getTags();
      setTags(res.data?.tags || []);
    } catch (error) {
      alert('Erreur création tag');
      console.error(error);
    }
  };

  const totalClicks = courses.reduce((s, c) => s + c.click_count, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Gestion des Cours</h1>
          <p className="text-gray-400">Créer, modifier et suivre vos cours</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5" />
          Nouveau Cours
        </button>
      </motion.div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-slate-800 rounded-xl border border-white/10 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-400/50"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat.id_category} value={cat.id_category}>{cat.name}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-800 rounded-xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Cours</p>
              <p className="text-3xl font-bold text-white">{courses.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-yellow-400" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-slate-800 rounded-xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Clics Totaux</p>
              <p className="text-3xl font-bold text-white">{totalClicks}</p>
            </div>
            <MousePointer className="w-8 h-8 text-yellow-400" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-slate-800 rounded-xl border border-white/10 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Moyenne</p>
              <p className="text-3xl font-bold text-white">
                {courses.length ? Math.round(totalClicks / courses.length) : 0}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
              <span className="text-yellow-400 text-xs font-bold">Ø</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Liste */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-slate-800 rounded-xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Cours</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Catégorie</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Clics</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Tags</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredCourses.map((course) => (
                <tr key={course.id_course} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {course.image?.image_url ? (
                        <img src={course.image.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                          <PlayCircle className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-white truncate max-w-xs">{course.title}</p>
                        <p className="text-xs text-gray-400">
                          {course.createdAt ? new Date(course.createdAt).toLocaleDateString('fr-FR') : '—'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{course.category?.name || '—'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-300">
                      <MousePointer className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium">{course.click_count}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {course.tags?.length ? (
                        course.tags.map(t => (
                          <span key={t.id_tag} className="px-2 py-1 text-xs bg-yellow-400/20 text-yellow-300 rounded-full flex items-center gap-1">
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
                      <button onClick={() => openModal(course)} className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(course.id_course)} className="text-red-400 hover:text-red-300 transition-colors">
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
            <PlayCircle className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-300">Aucun cours</h3>
            <p className="mt-1 text-sm text-gray-400">
              {search || selectedCategory ? 'Aucun résultat.' : 'Créez votre premier cours.'}
            </p>
          </div>
        )}
      </motion.div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingCourse ? 'Modifier le cours' : 'Nouveau cours'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Image (optionnel)</label>
                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-lg object-cover" />
                  ) : (
                    <div className="w-24 h-24 bg-slate-700 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
                  />
                </div>
              </div>

              {/* Titre */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
                  required
                />
              </div>

              {/* Lien YouTube */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Lien YouTube *</label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
                  required
                />
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie *</label>
                <select
                  value={formData.id_category}
                  onChange={(e) => setFormData(prev => ({ ...prev, id_category: e.target.value }))}
                  className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-400/50"
                  required
                >
                  <option value="">Sélectionner...</option>
                  {categories.map(cat => (
                    <option key={cat.id_category} value={cat.id_category}>{cat.name}</option>
                  ))}
                </select>
                {/* Ajouter nouvelle catégorie */}
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nouvelle catégorie"
                    className="flex-1 px-3 py-2 bg-slate-700 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="px-3 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 text-sm font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {tags.map(tag => (
                    <label key={tag.id_tag} className="flex items-center cursor-pointer">
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
                        className="mr-2 w-4 h-4 rounded bg-slate-700 border-white/10 text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-300">{tag.name}</span>
                    </label>
                  ))}
                </div>
                {/* Ajouter nouveau tag */}
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nouveau tag"
                    className="flex-1 px-3 py-2 bg-slate-700 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 text-sm font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-white/10 rounded-lg text-gray-300 hover:bg-white/5 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 disabled:opacity-50 flex items-center gap-2 font-semibold transition-colors"
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
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
