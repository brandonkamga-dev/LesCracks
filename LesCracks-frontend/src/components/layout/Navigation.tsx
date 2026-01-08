// src/components/layout/Navigation.tsx
import { Link, useLocation } from "react-router-dom";
import { Menu, Video, Library, Zap } from "lucide-react";
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
  const location = useLocation();

  const [showRessources, setShowRessources] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617] backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/" className="relative flex items-center gap-2 group">
            <span className="relative text-2xl lg:text-3xl font-black tracking-tight text-white">
              Les<span className="text-primary-yellow">Cracks</span>
            </span>
          </Link>

          {/* NAVIGATION DESKTOP */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex items-center gap-1">

              {/* Nos Programmes - lien simple */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/accompagnement"
                    className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                      isActive("/accompagnement") ? "text-primary-blue" : "text-white hover:text-primary-yellow"
                    }`}
                  >
                    Nos Programmes
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Nos Ressources - conserve sous-menus */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-white hover:text-primary-yellow transition-all duration-300 font-medium">
                  Nos Ressources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#020617]">
                  <div className="w-[420px] p-6">
                    <div className="space-y-4">
                      <NavigationMenuLink asChild>
                        <Link to="/ressources" className="group flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-blue-500/30">
                          <div className="mt-1 p-2 border border-white/20 rounded-md">
                            <Library className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold group-hover:text-[var(--primary)] transition-colors">Bibliothèque</h3>
                            <p className="text-gray-400 text-sm mt-1">Ressources documentaires et articles</p>
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link to="/ressources" className="group flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-yellow-500/30">
                          <div className="mt-1 p-2 border border-white/20 rounded-md">
                            <Video className="h-5 w-5 text-yellow-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors">Vidéothèque</h3>
                            <p className="text-gray-400 text-sm mt-1">Tutoriels et contenus vidéo</p>
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link to="/ressources" className="group flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-blue-500/30">
                          <div className="mt-1 p-2 border border-white/20 rounded-md">
                            <Zap className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold group-hover:text-[var(--primary)] transition-colors">Solutions</h3>
                            <p className="text-gray-400 text-sm mt-1">Préparation aux tests techniques</p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Liens simples */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/evenements"
                    className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                      isActive("/evenements") ? "text-primary-blue" : "text-white hover:text-primary-yellow"
                    }`}
                  >
                    Événements
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/a-propos"
                    className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                      isActive("/a-propos") ? "text-primary-blue" : "text-white hover:text-primary-yellow"
                    }`}
                  >
                    À propos
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <PostulerForm />
          </div>

          {/* MOBILE MENU */}
          <div className="lg:hidden flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-white hover:text-[var(--primary)] transition-colors">
                  <Menu size={32} />
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="w-3/4 sm:w-1/2 bg-[#020617] border-r border-white/10 p-4">
                <div className="flex flex-col gap-6">
                  <Link to="/" className="text-2xl font-black text-white mb-4">
                    Les<span className="text-[var(--primary)]">Cracks</span>
                  </Link>

                  <ul className="flex flex-col gap-3 text-white">
                    {/* Nos Programmes */}
                    <li>
                      <Link
                        to="/accompagnement"
                        className={`w-full text-left py-3 px-3 rounded-lg transition-all duration-300 font-medium block ${
                          isActive("/accompagnement") ? "text-primary-blue" : "hover:text-yellow-400 hover:bg-white/5"
                        }`}
                      >
                        Nos Programmes
                      </Link>
                    </li>

                    {/* Nos Ressources */}
                    <li>
                      <button
                        onClick={() => setShowRessources(!showRessources)}
                        className="w-full text-left py-3 px-3 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-all duration-300 font-medium flex items-center justify-between"
                      >
                        <span>Nos Ressources</span>
                        <span className={`transition-transform duration-300 ${showRessources ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      {showRessources && (
                        <ul className="pl-4 flex flex-col gap-2 mt-2 border-l border-white/10">
                          <li>
                            <Link
                              to="/ressources"
                              className="py-2 px-3 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all duration-300 block"
                            >
                              Bibliothèque
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/ressources"
                              className="py-2 px-3 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-all duration-300 block"
                            >
                              Vidéothèque
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/ressources"
                              className="py-2 px-3 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all duration-300 block"
                            >
                              Solutions
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Liens simples */}
                    <li>
                      <Link
                        to="/evenements"
                        className={`py-3 px-3 rounded-lg transition-all duration-300 block font-medium ${
                          isActive("/evenements") ? "text-primary-blue" : "hover:text-yellow-400 hover:bg-white/5"
                        }`}
                      >
                        Événements
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/a-propos"
                        className={`py-3 px-3 rounded-lg transition-all duration-300 block font-medium ${
                          isActive("/a-propos") ? "text-primary-blue" : "hover:text-yellow-400 hover:bg-white/5"
                        }`}
                      >
                        À propos
                      </Link>
                    </li>

                    {/* CTA Postuler */}
                    <li className="mt-4 pt-4 border-t border-white/10">
                      <PostulerForm />
                    </li>
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}
