import React, { useState } from 'react';
import { ArrowRight, User, Mail, Phone } from 'lucide-react';

const ProgrammesForm: React.FC = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    whatsapp: '',
    programme: 'formation-pratique',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('https://formspree.io/f/mlgdqaep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccess(true);
        setFormData({
          prenom: '',
          nom: '',
          email: '',
          whatsapp: '',
          programme: 'formation-pratique',
        });
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError('Une erreur est survenue. Merci de réessayer.');
      }
    } catch {
      setError('Impossible de contacter le serveur. Vérifiez votre connexion.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#020617] p-6 md:p-12 rounded-2xl max-w-3xl mx-auto shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Postuler à un programme LesCracks
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Programme select */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Programme</label>
          <select
            name="programme"
            value={formData.programme}
            onChange={handleChange}
            className="w-full py-3 px-4 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="formation-pratique">Programme 1 — Formation pratique</option>
            <option value="accompagnement-360">Programme 2 — Formation + Accompagnement 360°</option>
          </select>
        </div>

        {/* Prénom */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Prénom</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              placeholder="Votre prénom"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Nom */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Nom</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Votre nom"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Numéro WhatsApp</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              placeholder="+237 6XX XXX XXX"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Format: +237 6XX XXX XXX</p>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Success */}
        {success && <p className="text-green-400 text-sm">✅ Inscription réussie ! Merci.</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Envoi en cours...' : 'Postuler maintenant'}
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs text-gray-500 text-center mt-2">
          Vos informations seront utilisées uniquement pour votre inscription.
        </p>
      </form>
    </div>
  );
};

export default ProgrammesForm;
