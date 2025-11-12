import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, UserPlus, ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import EventRegistrationForm from '../forms/EventRegistrationForm';

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  registrationUrl?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface EventCardProps {
  event: Event;
  index: number;
  onAnalytics?: (eventId: string, action: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, index, onAnalytics }) => {
  const { isDark } = useTheme();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleRegistration = () => {
    setShowRegistrationForm(true);
    if (onAnalytics && event.id) {
      onAnalytics(event.id, 'event_registration_opened');
    }
  };

  const handleRegistrationSuccess = () => {
    if (onAnalytics && event.id) {
      onAnalytics(event.id, 'event_registration_completed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-[#f59e0b] text-black text-sm font-medium rounded-full">
          {event.type}
        </span>
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {event.date}
        </span>
      </div>
      
      <h3 className={`text-2xl font-bold mb-4 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {event.title}
      </h3>
      
      <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {event.description}
      </p>
      
      <div className={`space-y-2 mb-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {event.time}
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          {event.location}
          {event.maxParticipants && (
            <span className="ml-2 text-xs">
              ({event.currentParticipants || 0}/{event.maxParticipants})
            </span>
          )}
        </div>
      </div>
      
      <button
        onClick={handleRegistration}
        className="inline-flex items-center justify-center w-full py-3 bg-[#1f48ff] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        <UserPlus className="mr-2 w-4 h-4" />
        S'inscrire à l'événement
        <ArrowRight className="ml-2 w-4 h-4" />
      </button>

      {/* Formulaire d'inscription */}
      {event.id && (
        <EventRegistrationForm
          eventId={event.id}
          eventTitle={event.title}
          isOpen={showRegistrationForm}
          onClose={() => setShowRegistrationForm(false)}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </motion.div>
  );
};

export default EventCard;
