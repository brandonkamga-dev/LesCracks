// src/components/PostulerForm.tsx
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function PostulerForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-lg font-bold rounded-xl hover:from-blue-700 hover:to-blue-900 transition shadow-lg flex items-center gap-3">
          <Rocket className="w-6 h-6" />
          Postuler maintenant
        </Button>

      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Formulaire de candidature</DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire pour postuler à nos programmes et nous permettre de mieux vous accompagner.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-6">
          {/* Infos personnelles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input id="prenom" placeholder="Votre prénom" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nom">Nom</Label>
              <Input id="nom" placeholder="Votre nom" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="telephone">Téléphone (WhatsApp)</Label>
              <Input id="telephone" placeholder="+237 6X XX XX XX" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="exemple@email.com" required />
            </div>
          </div>

          {/* Programme souhaité */}
          <div className="grid gap-2">
            <Label htmlFor="programme">Programme souhaité</Label>
            <Select>
              <SelectTrigger id="programme">
                <SelectValue placeholder="Choisissez un programme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accompagnement-360">Accompagnement 360</SelectItem>
                <SelectItem value="formation-p2p">Formation P2P</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Niveau d'expérience */}
          <div className="grid gap-2">
            <Label>Niveau d'expérience</Label>
            <RadioGroup defaultValue="debutant" className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="debutant" id="debutant" />
                <Label htmlFor="debutant">Débutant</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="intermediaire" id="intermediaire" />
                <Label htmlFor="intermediaire">Intermédiaire</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="avance" id="avance" />
                <Label htmlFor="avance">Avancé</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Motivation / Objectifs */}
          <div className="grid gap-2">
            <Label htmlFor="motivation">Pourquoi voulez-vous rejoindre ce programme ?</Label>
            <Textarea id="motivation" placeholder="Décrivez votre motivation" required />
          </div>

          {/* Question ouverte supplémentaire */}
          <div className="grid gap-2">
            <Label htmlFor="attentes">Quelles sont vos attentes principales ?</Label>
            <Textarea id="attentes" placeholder="Objectifs à atteindre" />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="text-black border-gray-300 hover:bg-yellow-400">
                Annuler
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-900 transition"
            >
              Envoyer
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}
