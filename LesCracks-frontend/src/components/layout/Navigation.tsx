// src/components/layout/Navigation.tsx
import { Link } from "react-router-dom";
import { Menu, CheckCircle, Video, BookOpen, GraduationCap, Library } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { PostulerForm } from "@/components/home/PostulerForm";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";

export default function Navigation() {

  const [showProgrammes, setShowProgrammes] = useState(false);
  const [showRessources, setShowRessources] = useState(false);


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/" className="relative flex items-center gap-2 group">
            <span className="text-2xl lg:text-3xl font-black tracking-tight text-white">
              Les<span className="text-yellow-400">Cracks</span>
            </span>
          </Link>

          {/* NAVIGATION DESKTOP */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex items-center gap-4">
              {/* Nos Programmes */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-white hover:text-yellow-400">
                  Nos Programmes
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white">
                  <ul className="grid w-[340px] gap-3 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/programmes/accompagnement-360" className="flex items-center gap-4 p-3 rounded-md hover:bg-blue-200">
                          <GraduationCap className="h-6 w-6 text-primary flex-shrink-0" />
                          Accompagnement 360
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/programmes/formation-p2p" className="flex items-center gap-4 p-3 rounded-md hover:bg-blue-200">
                          <BookOpen className="h-6 w-6 text-primary flex-shrink-0" />
                          Formation P2P
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Nos Ressources */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-white hover:text-yellow-400">
                  Nos Ressources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white">
                  <ul className="grid w-[340px] gap-3 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/ressources/bibliotheque" className="flex items-center gap-4 p-3 rounded-md hover:bg-blue-200">
                          <Library className="h-6 w-6 text-primary flex-shrink-0" />
                          Bibliothèque
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/ressources/videotheque" className="flex items-center gap-4 p-3 rounded-md hover:bg-blue-200">
                          <Video className="h-6 w-6 text-primary flex-shrink-0" />
                          Vidéothèque
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/ressources/solutions" className="flex items-center gap-4 p-3 rounded-md hover:bg-blue-200">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                          Solutions
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Liens simples */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/evenements" className="px-4 py-2 text-white hover:text-yellow-400">Événements</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/a-propos" className="px-4 py-2 text-white hover:text-yellow-400">À propos</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Desktop */}
          <div className="hidden lg:flex">
            <PostulerForm />
          </div>

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden text-white">
                <Menu size={32} />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-3/4 sm:w-1/2 bg-transparent p-4">
              <div className="flex flex-col gap-4">

                {/* Logo */}
                <Link to="/" className="text-2xl font-black text-white mb-4">
                  Les<span className="text-yellow-400">Cracks</span>
                </Link>

                {/* Menu items */}
                <ul className="flex flex-col gap-2 text-white">
                  {/* Nos Programmes */}
                  <li>
                    <button
                      onClick={() => setShowProgrammes(!showProgrammes)}
                      className="w-full text-left py-2 hover:text-yellow-400"
                    >
                      Nos Programmes
                    </button>
                    {showProgrammes && (
                      <ul className="pl-4 flex flex-col gap-1">
                        <li><Link to="/programmes/accompagnement-360" className="hover:text-yellow-400">Accompagnement 360</Link></li>
                        <li><Link to="/programmes/formation-p2p" className="hover:text-yellow-400">Formation P2P</Link></li>
                      </ul>
                    )}
                  </li>

                  {/* Nos Ressources */}
                  <li>
                    <button
                      onClick={() => setShowRessources(!showRessources)}
                      className="w-full text-left py-2 hover:text-yellow-400"
                    >
                      Nos Ressources
                    </button>
                    {showRessources && (
                      <ul className="pl-4 flex flex-col gap-1">
                        <li><Link to="/ressources/bibliotheque" className="hover:text-yellow-400">Bibliothèque</Link></li>
                        <li><Link to="/ressources/videotheque" className="hover:text-yellow-400">Vidéothèque</Link></li>
                        <li><Link to="/ressources/solutions" className="hover:text-yellow-400">Solutions</Link></li>
                      </ul>
                    )}
                  </li>

                  {/* Liens simples */}
                  <li><Link to="/evenements" className="py-2 hover:text-yellow-400">Événements</Link></li>
                  <li><Link to="/a-propos" className="py-2 hover:text-yellow-400">À propos</Link></li>

                  {/* CTA Postuler */}
                  <li className="mt-4">
                    <PostulerForm />
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}
