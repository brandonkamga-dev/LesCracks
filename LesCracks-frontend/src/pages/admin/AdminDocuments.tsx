import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, FileText, Tag, Download, X, Upload, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminApi } from '../../services/adminApi';

interface Document {
  id_document: string;
  title: string;
  description: string;
  file_url: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  id_image?: number;
  download_count: number;
  createdAt?: string;
  categories?: Array<{ id_category: number; name: string }>;
  tags?: Array<{ id_tag: number; name: string }>;
  image?: { id_image: number; image_url: string };
}

const AdminDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_url: '',
    file_name: '',
    file_size: '',
    mime_type: '',
    categoryIds: [] as number[],
    tagIds: [] as number[],
    imageFile: null as File | null,
    documentFile: null as File | null
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  // Charger données
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [documentsRes, categoriesRes, tagsRes] = await Promise.all([
          adminApi.getDocuments(),
          adminApi.getCategories(),
          adminApi.getTags()
        ]);

        setDocuments(documentsRes.data?.documents || []);
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
    let filtered = documents;
    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(d =>
        d.title.toLowerCase().includes(lower) ||
        d.description.toLowerCase().includes(lower)
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(d => d.categories?.some(c => c.id_category === Number(selectedCategory)));
    }
    setFilteredDocuments(filtered);
  }, [documents, search, selectedCategory]);

  // Ouvrir modal
  const openModal = (document?: Document) => {
    if (document) {
      setEditingDocument(document);
      setFormData({
        title: document.title,
        description: document.description,
        file_url: document.file_url,
        file_name: document.file_name || '',
        file_size: document.file_size?.toString() || '',
        mime_type: document.mime_type || '',
        categoryIds: document.categories?.map(c => c.id_category) || [],
        tagIds: document.tags?.map(t => t.id_tag) || [],
        imageFile: null,
        documentFile: null
      });
      setImagePreview(document.image?.image_url || null);
    } else {
      setEditingDocument(null);
      setFormData({
        title: '',
        description: '',
        file_url: '',
        file_name: '',
        file_size: '',
        mime_type: '',
        categoryIds: [],
        tagIds: [],
        imageFile: null,
        documentFile: null
      });
      setImagePreview(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingDocument(null);
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

  // Gestion document
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, documentFile: file }));
    }
  };

  // Soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!editingDocument && !formData.documentFile) {
      alert('Veuillez sélectionner un fichier document');
      return;
    }

    setUploading(true);
    try {
      let id_image = editingDocument?.id_image;
      let file_url = editingDocument?.file_url || '';
      let file_name = editingDocument?.file_name || '';
      let file_size = editingDocument?.file_size || 0;
      let mime_type = editingDocument?.mime_type || '';

      if (formData.imageFile) {
        const uploadRes = await adminApi.uploadImage(formData.imageFile);
        id_image = uploadRes.data.image.id_image;
      }

      if (formData.documentFile) {
        const uploadRes = await adminApi.uploadDocument(formData.documentFile);
        file_url = uploadRes.data.file_url;
        file_name = uploadRes.data.file_name || formData.documentFile.name;
        file_size = uploadRes.data.file_size || formData.documentFile.size;
        mime_type = uploadRes.data.mime_type || formData.documentFile.type;
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        file_url,
        file_name,
        file_size,
        mime_type,
        id_image,
        categoryIds: formData.categoryIds,
        tagIds: formData.tagIds
      };

      if (editingDocument) {
        await adminApi.updateDocument(editingDocument.id_document, payload);
      } else {
        await adminApi.createDocument(payload);
      }

      // Rafraîchir
      const res = await adminApi.getDocuments();
      setDocuments(res.data?.documents || []);
      closeModal();
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce document ?')) return;
    try {
      await adminApi.deleteDocument(id);
      setDocuments(prev => prev.filter(d => d.id_document !== id));
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

  const totalDownloads = documents.reduce((s, d) => s + d.download_count, 0);

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
          <h1 className="text-2xl font-bold text-white">Gestion des Documents</h1>
          <p className="text-gray-400">Créer, modifier et suivre vos documents</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5" />
          Nouveau Document
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
              <p className="text-sm text-gray-400">Total Documents</p>
              <p className="text-3xl font-bold text-white">{documents.length}</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-400" />
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
              <p className="text-sm text-gray-400">Téléchargements Totaux</p>
              <p className="text-3xl font-bold text-white">{totalDownloads}</p>
            </div>
            <Download className="w-8 h-8 text-yellow-400" />
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
                {documents.length ? Math.round(totalDownloads / documents.length) : 0}
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Document</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Catégories</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Téléchargements</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Tags</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredDocuments.map((document) => (
                <tr key={document.id_document} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {document.image?.image_url ? (
                        <img src={document.image.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-white truncate max-w-xs">{document.title}</p>
                        <p className="text-xs text-gray-400">
                          {document.createdAt ? new Date(document.createdAt).toLocaleDateString('fr-FR') : '—'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {document.categories?.length ? (
                        document.categories.map(c => (
                          <span key={c.id_category} className="px-2 py-1 text-xs bg-blue-400/20 text-blue-300 rounded-full">
                            {c.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-300">
                      <Download className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium">{document.download_count}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {document.tags?.length ? (
                        document.tags.map(t => (
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
                      <button onClick={() => openModal(document)} className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(document.id_document)} className="text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-300">Aucun document</h3>
            <p className="mt-1 text-sm text-gray-400">
              {search || selectedCategory ? 'Aucun résultat.' : 'Créez votre premier document.'}
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
                {editingDocument ? 'Modifier le document' : 'Nouveau document'}
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

              {/* Fichier document */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fichier document {editingDocument ? '(optionnel pour modification)' : '*'}
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                  onChange={handleDocumentChange}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
                  required={!editingDocument}
                />
                {formData.documentFile && (
                  <p className="mt-2 text-sm text-gray-400">
                    Fichier sélectionné: {formData.documentFile.name}
                  </p>
                )}
              </div>

              {/* Nom du fichier (optionnel, auto-rempli si vide) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nom du fichier (optionnel)</label>
                <input
                  type="text"
                  value={formData.file_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, file_name: e.target.value }))}
                  placeholder="Laissé vide pour utiliser le nom du fichier uploadé"
                  className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
                />
              </div>

              {/* Catégories */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Catégories</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map(category => (
                    <label key={category.id_category} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.categoryIds.includes(category.id_category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({ ...prev, categoryIds: [...prev.categoryIds, category.id_category] }));
                          } else {
                            setFormData(prev => ({ ...prev, categoryIds: prev.categoryIds.filter(id => id !== category.id_category) }));
                          }
                        }}
                        className="mr-2 w-4 h-4 rounded bg-slate-700 border-white/10 text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-300">{category.name}</span>
                    </label>
                  ))}
                </div>
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
                    editingDocument ? 'Mettre à jour' : 'Créer'
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

export default AdminDocuments;