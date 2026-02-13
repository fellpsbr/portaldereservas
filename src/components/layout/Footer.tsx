import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">Portal de Reservas</h3>
                        <p className="text-sm text-gray-400 max-w-md">
                            Descubra as melhores pousadas, sítios e fazendas do estado de São Paulo.
                            Experiências autênticas no campo, a poucos cliques de distância.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Navegação</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/busca" className="text-sm hover:text-white transition-colors">
                                    Buscar Acomodações
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre" className="text-sm hover:text-white transition-colors">
                                    Como Funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="/gestor/login" className="text-sm hover:text-white transition-colors">
                                    Área do Gestor
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Contato</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4" />
                                <span>contato@portalruralsp.com.br</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4" />
                                <span>(11) 9999-9999</span>
                            </li>
                        </ul>
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Portal de Reservas. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="/privacidade" className="text-xs text-gray-500 hover:text-white transition-colors">
                            Política de Privacidade
                        </Link>
                        <Link href="/termos" className="text-xs text-gray-500 hover:text-white transition-colors">
                            Termos de Uso
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
