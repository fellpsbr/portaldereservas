"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Home, Calendar, MessageSquare, BarChart3, Settings, LogOut, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { getProperties, deleteProperty, getManagerProperties } from "@/lib/data/properties";
import { Property } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProperties() {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const data = await getManagerProperties(user.id);
                setProperties(data);
            } else {
                // If no user, maybe redirect or show empty? 
                // Ideally this page is protected by middleware or layout check, 
                // but strictly speaking we should probably redirect to login here if not found.
                // For now, just empty list.
                setProperties([]);
            }
            setLoading(false);
        }
        fetchProperties();
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (confirm(`Tem certeza que deseja excluir "${title}"?`)) {
            const success = await deleteProperty(id);
            if (success) {
                alert("Anúncio excluído com sucesso!");
                setProperties(properties.filter((p) => p.id !== id));
            } else {
                alert("Erro ao excluir anúncio. Tente novamente.");
            }
        }
    };

    // Mock data for stats
    const stats = [
        { label: "Visualizações", value: "1,234", change: "+12%", icon: BarChart3 },
        { label: "Cliques WhatsApp", value: "89", change: "+8%", icon: MessageSquare },
        { label: "Anúncios Ativos", value: properties.length.toString(), change: "0%", icon: Home },
        { label: "Taxa de Conversão", value: "7.2%", change: "+2%", icon: BarChart3 },
    ];


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
                <div className="mb-8">
                    <Link href="/">
                        <h1 className="text-2xl font-bold text-[#2E8B57]">Portal de Reservas</h1>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">Painel do Gestor</p>
                </div>

                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "overview"
                            ? "bg-[#2E8B57] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Visão Geral</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("properties")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "properties"
                            ? "bg-[#2E8B57] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <Home className="h-5 w-5" />
                        <span>Meus Anúncios</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("calendar")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "calendar"
                            ? "bg-[#2E8B57] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <Calendar className="h-5 w-5" />
                        <span>Calendário</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("leads")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "leads"
                            ? "bg-[#2E8B57] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <MessageSquare className="h-5 w-5" />
                        <span>Leads</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("analytics")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "analytics"
                            ? "bg-[#2E8B57] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <BarChart3 className="h-5 w-5" />
                        <span>Relatórios</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("settings")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "settings"
                            ? "bg-[#2E8B57] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <Settings className="h-5 w-5" />
                        <span>Configurações</span>
                    </button>
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <Link href="/gestor/login">
                        <Button variant="ghost" className="w-full justify-start">
                            <LogOut className="h-5 w-5 mr-3" />
                            Sair
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Bem-vindo de volta!</h2>
                            <p className="text-gray-600 mt-1">Aqui está um resumo dos seus anúncios</p>
                        </div>
                        <Link href="/gestor/anuncios/novo">
                            <Button variant="primary" size="lg">
                                <Plus className="h-5 w-5 mr-2" />
                                Novo Anúncio
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <Card key={index}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                            <p className="text-sm text-green-600 mt-1">{stat.change} vs. mês anterior</p>
                                        </div>
                                        <div className="h-12 w-12 bg-[#2E8B57]/10 rounded-lg flex items-center justify-center">
                                            <stat.icon className="h-6 w-6 text-[#2E8B57]" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Recent Properties */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Seus Anúncios</CardTitle>
                            <CardDescription>Gerencie suas propriedades cadastradas</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {loading ? (
                                    <p className="text-gray-500 text-center py-8">Carregando...</p>
                                ) : properties.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">
                                        Nenhum anúncio cadastrado ainda
                                    </p>
                                ) : (
                                    properties.map((property) => (
                                        <div
                                            key={property.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900">{property.title}</h4>
                                                <p className="text-sm text-gray-600">
                                                    {property.location.city}, {property.location.state} • R$ {property.price}/noite
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link href={`/anuncio/${property.id}`} target="_blank">
                                                    <Button variant="ghost" size="sm">
                                                        Ver
                                                    </Button>
                                                </Link>
                                                <Link href={`/gestor/anuncios/editar/${property.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        Editar
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(property.id, property.title)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Excluir
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
