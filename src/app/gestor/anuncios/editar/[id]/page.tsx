"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, X, MapPin, DollarSign, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { getPropertyById, updateProperty } from "@/lib/data/properties";
import { Property } from "@/lib/types";
import { ImageUpload } from "@/components/ui/ImageUpload";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("@/components/ui/Map"), {
    ssr: false,
    loading: () => <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

const AMENITIES_OPTIONS = [
    "Wi-Fi",
    "Piscina",
    "Café da Manhã",
    "Estacionamento",
    "Lareira",
    "Churrasqueira",
    "Pet Friendly",
    "Ar Condicionado",
    "TV",
    "Cozinha",
    "Trilhas",
    "Lago",
    "Passeio a Cavalo",
    "Quadra Esportiva",
    "Sauna",
];

export default function EditarAnuncioPage() {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState<Property | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "pousada" as "pousada" | "sitio" | "fazenda",
        city: "",
        state: "SP",
        address: "",
        lat: -23.55052,
        lng: -46.633308,
        price: "",
        maxGuests: "",
        whatsapp: "",
        amenities: [] as string[],
        images: [] as string[],
    });



    useEffect(() => {
        if (params.id) {
            const fetchProperty = async () => {
                setLoading(true);
                const data = await getPropertyById(params.id as string);
                if (data) {
                    setProperty(data);
                    setFormData({
                        title: data.title,
                        description: data.description,
                        type: data.type,
                        city: data.location.city,
                        state: data.location.state,
                        address: data.location.address || "",
                        lat: data.location.lat || -23.55052,
                        lng: data.location.lng || -46.633308,
                        price: data.price.toString(),
                        maxGuests: data.maxGuests.toString(),
                        whatsapp: data.whatsapp,
                        amenities: data.amenities,
                        images: data.images,
                    });
                }
                setLoading(false);
            };
            fetchProperty();
        }
    }, [params.id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLocationSelect = (lat: number, lng: number) => {
        setFormData((prev) => ({
            ...prev,
            lat,
            lng,
        }));
    };

    const handleAmenityToggle = (amenity: string) => {
        setFormData({
            ...formData,
            amenities: formData.amenities.includes(amenity)
                ? formData.amenities.filter((a) => a !== amenity)
                : [...formData.amenities, amenity],
        });
    };

    const handleRemoveImage = (index: number) => {
        setFormData({
            ...formData,
            images: formData.images.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const updatedProperty = await updateProperty(params.id as string, {
                title: formData.title,
                description: formData.description,
                type: formData.type,
                location: {
                    city: formData.city,
                    state: formData.state,
                    address: formData.address,
                    lat: formData.lat,
                    lng: formData.lng,
                },
                price: parseInt(formData.price),
                maxGuests: parseInt(formData.maxGuests),
                whatsapp: formData.whatsapp,
                amenities: formData.amenities,
                images: formData.images,
            } as Partial<Property>);

            if (updatedProperty) {
                alert("Anúncio atualizado com sucesso!");
                router.push("/gestor/dashboard");
            } else {
                alert("Erro ao atualizar anúncio. Tente novamente.");
            }
        } catch (error) {
            console.error("Error updating property:", error);
            alert("Erro ao atualizar anúncio. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-xl text-gray-600">Carregando...</p>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">Propriedade não encontrada</p>
                    <Link href="/gestor/dashboard">
                        <Button variant="primary">Voltar ao Dashboard</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <Link
                        href="/gestor/dashboard"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Voltar ao Dashboard
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Anúncio</h1>
                    <p className="text-gray-600">
                        Atualize as informações da sua propriedade
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Básicas</CardTitle>
                            <CardDescription>Dados principais da sua propriedade</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                                    Título do Anúncio *
                                </label>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Ex: Pousada Vista Verde"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                                    Descrição *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={5}
                                    placeholder="Descreva sua propriedade, comodidades, atrações próximas..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="type" className="text-sm font-medium text-gray-700">
                                        Tipo de Propriedade *
                                    </label>
                                    <div className="relative">
                                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <select
                                            id="type"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="flex h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent transition-all duration-200"
                                            required
                                        >
                                            <option value="pousada">Pousada</option>
                                            <option value="sitio">Sítio</option>
                                            <option value="fazenda">Fazenda</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="maxGuests" className="text-sm font-medium text-gray-700">
                                        Capacidade Máxima *
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="maxGuests"
                                            name="maxGuests"
                                            type="number"
                                            placeholder="Ex: 6"
                                            value={formData.maxGuests}
                                            onChange={handleChange}
                                            className="pl-10"
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Localização</CardTitle>
                            <CardDescription>Onde sua propriedade está localizada</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2 md:col-span-2">
                                    <label htmlFor="city" className="text-sm font-medium text-gray-700">
                                        Cidade *
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="city"
                                            name="city"
                                            type="text"
                                            placeholder="Ex: Campos do Jordão"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="state" className="text-sm font-medium text-gray-700">
                                        Estado *
                                    </label>
                                    <Input
                                        id="state"
                                        name="state"
                                        type="text"
                                        value={formData.state}
                                        onChange={handleChange}
                                        disabled
                                        className="bg-gray-100"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="address" className="text-sm font-medium text-gray-700">
                                    Endereço Completo
                                </label>
                                <Input
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="Ex: Rua das Hortênsias, 123"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                                <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-300 mt-4">
                                    <PropertyMap
                                        lat={formData.lat}
                                        lng={formData.lng}
                                        zoom={13}
                                        interactive
                                        onLocationSelect={handleLocationSelect}
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Clique no mapa para marcar a localização exata.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pricing & Contact */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Preço e Contato</CardTitle>
                            <CardDescription>Informações de valor e WhatsApp</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="price" className="text-sm font-medium text-gray-700">
                                        Preço por Noite (R$) *
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            placeholder="Ex: 350"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="pl-10"
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                                        WhatsApp (com DDD) *
                                    </label>
                                    <Input
                                        id="whatsapp"
                                        name="whatsapp"
                                        type="tel"
                                        placeholder="Ex: 11999999999"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Amenities */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Comodidades</CardTitle>
                            <CardDescription>Selecione as comodidades disponíveis</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {AMENITIES_OPTIONS.map((amenity) => (
                                    <label
                                        key={amenity}
                                        className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${formData.amenities.includes(amenity)
                                            ? "border-[#2E8B57] bg-[#2E8B57]/5"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={() => handleAmenityToggle(amenity)}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm font-medium text-gray-700">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Images */}
                    <CardHeader>
                        <CardTitle>Fotos</CardTitle>
                        <CardDescription>
                            Adicione fotos da sua propriedade (mínimo 1)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ImageUpload
                            onUpload={(url) => {
                                setFormData(prev => ({
                                    ...prev,
                                    images: [...prev.images, url]
                                }));
                            }}
                        />

                        {formData.images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={img}
                                            alt={`Imagem ${index + 1}`}
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>

                    {/* Submit */}
                    <div className="flex gap-4 justify-end">
                        <Link href="/gestor/dashboard">
                            <Button type="button" variant="ghost">
                                Cancelar
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={isLoading || formData.images.length === 0}
                        >
                            {isLoading ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
