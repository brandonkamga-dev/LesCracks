// src/components/home/PostulerForm.tsx
import { useState } from "react";
import { Rocket } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProgrammesForm from "@/components/ProgrammesForm";

interface PostulerFormProps {
  /** Classe CSS personnalisée pour le bouton */
  className?: string;
  /** Taille du bouton (text, padding, etc.) */
  size?: "sm" | "md" | "lg";
  /** Si le bouton doit prendre toute la largeur */
  fullWidth?: boolean;
}

export function PostulerForm({
  className = "",
  size = "md",
  fullWidth = false
}: PostulerFormProps) {
  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenChange = (open: boolean) => {
    if (!open) setDialogKey(prev => prev + 1); // reset formulaire
  };

  // Définir padding/text selon la taille
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className={`
            ${sizeClasses[size]} 
            ${fullWidth ? "w-full" : "w-auto"}
            bg-gradient-to-r from-blue-600 to-blue-800
            text-white font-bold
            hover:from-yellow-300 hover:to-yellow-500
            transition-all duration-300
            rounded-xl shadow-lg flex items-center justify-center gap-3
            cursor-pointer
            ${className}
          `}
        >
          <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
          Postuler maintenant
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-[#020617] border border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Formulaire de candidature</DialogTitle>
          <DialogDescription className="text-gray-400">
            Remplissez ce formulaire pour postuler à nos programmes et nous permettre de mieux vous accompagner.
          </DialogDescription>
        </DialogHeader>

        <ProgrammesForm key={dialogKey} />
      </DialogContent>
    </Dialog>
  );
}
