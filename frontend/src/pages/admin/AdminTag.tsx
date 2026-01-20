// src/pages/admin/AdminTags.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Tag, X, Loader2, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

interface Tag {
  id_tag: number;
  name: string;
}

const AdminTags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [tagName, setTagName] = useState('');
  const [saving, setSaving] = useState(false);

  // Messages UI
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await adminApi.getTags();
        setTags(res.data?.tags || []);
      } catch {
        setError('Impossible de charger les tags');
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const filtered = tags.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [tags, search]);

  const openModal = (tag?: Tag) => {
    setError(null);
    if (tag) {
      setEditingTag(tag);
      setTagName(tag.name);
    } else {
      setEditingTag(null);
      setTagName('');
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTag(null);
    setTagName('');
    setError(null);
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) {
      setError('Le nom du tag est requis');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (editingTag) {
        await adminApi.updateTag(editingTag.id_tag, tagName.trim());
        showSuccess('Tag modifié avec succès');
      } else {
        await adminApi.createTag(tagName.trim());
        showSuccess('Tag créé avec succès');
      }

      const res = await adminApi.getTags();
      setTags(res.data?.tags || []);
      closeModal();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    // Remplace confirm() par un petit modal inline
    if (!window.confirm('Supprimer ce tag ?')) return;

    try {
      await adminApi.deleteTag(id);
      setTags(prev => prev.filter(t => t.id_tag !== id));
      showSuccess('Tag supprimé');
    } catch {
      setError('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Messages globaux */}
      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">{success}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Tags</h1>
          <p className="text-gray-600">Organisez vos contenus avec des tags</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouveau Tag
        </button>
      </div>

      {/* Recherche */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tags</p>
              <p className="text-2xl font-bold text-gray-900">{tags.length}</p>
            </div>
            <Tag className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            {filteredTags.map((tag) => (
              <div
                key={tag.id_tag}
                className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full border border-purple-200"
              >
                <Tag className="w-4 h-4" />
                <span className="font-medium">{tag.name}</span>
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => openModal(tag)}
                    className="text-purple-600 hover:text-purple-800"
                    title="Modifier"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id_tag)}
                    className="text-red-600 hover:text-red-800"
                    title="Supprimer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTags.length === 0 && (
            <div className="text-center py-12">
              <Tag className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun tag</h3>
              <p className="mt-1 text-sm text-gray-500">
                {search ? 'Aucun résultat.' : 'Créez votre premier tag.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingTag ? 'Modifier le tag' : 'Nouveau tag'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du tag *</label>
                <input
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="Ex: JavaScript, Marketing..."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                    error ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {error}
                  </p>
                )}
              </div>

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
                  disabled={saving}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    editingTag ? 'Mettre à jour' : 'Créer'
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

export default AdminTags;