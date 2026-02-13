"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="text-2xl font-bold text-[#2E8B57]">
                            Portal de Reservas
                        </span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Abrir menu</span>
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    <Link
                        href="/busca"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-[#2E8B57] transition-colors"
                    >
                        Buscar
                    </Link>
                    <Link
                        href="/sobre"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-[#2E8B57] transition-colors"
                    >
                        Como Funciona
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
                    <Link href="/gestor/login">
                        <Button variant="ghost" size="sm">
                            Login Gestor
                        </Button>
                    </Link>
                    <Link href="/gestor/cadastrar">
                        <Button variant="primary" size="sm">
                            Anunciar
                        </Button>
                    </Link>
                </div>
            </nav>
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="space-y-2 px-4 pb-4 pt-2">
                        <Link
                            href="/busca"
                            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Buscar
                        </Link>
                        <Link
                            href="/sobre"
                            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Como Funciona
                        </Link>
                        <Link
                            href="/gestor/login"
                            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Login Gestor
                        </Link>
                        <Link href="/gestor/cadastrar" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="primary" className="w-full">
                                Anunciar
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
