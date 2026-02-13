"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { getPropertyById } from "@/lib/data/properties";
import { MapPin, Users, DollarSign, ArrowLeft, Share2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Property } from "@/lib/types";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("@/components/ui/Map"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />,
});

export default function AnuncioPage() {
    const params = useParams();
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(0);
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("portal_reservas_favorites") || "[]");
        if (params.id && favorites.includes(params.id)) {
            setIsFavorite(true);
        }
    }, [params.id]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: property?.title,
                    text: `Confira este lugar incrível: ${property?.title}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log("Error sharing:", error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copiado para a área de transferência!");
        }
    };

    const handleToggleFavorite = () => {
        if (!params.id) return;

        const favorites = JSON.parse(localStorage.getItem("portal_reservas_favorites") || "[]");
        let newFavorites;

        if (isFavorite) {
            newFavorites = favorites.filter((id: string) => id !== params.id);
        } else {
            newFavorites = [...favorites, params.id];
        }

        localStorage.setItem("portal_reservas_favorites", JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    useEffect(() => {
        async function fetchProperty() {
            setLoading(true);
            const data = await getPropertyById(params.id as string);
            setProperty(data);
            setLoading(false);
        }
        fetchProperty();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Carregando...
                        </h1>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Propriedade não encontrada
                        </h1>
                        <Button onClick={() => router.push("/busca")} variant="primary">
                            Voltar para busca
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const whatsappMessage = encodeURIComponent(
        `Olá! Tenho interesse em ${property.title} (ID: ${property.id}). Gostaria de mais informações sobre disponibilidade e valores.`
    );
    const whatsappLink = `https://wa.me/${property.whatsapp}?text=${whatsappMessage}`;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-white">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Voltar
                    </button>

                    {/* Title & Actions */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {property.title}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-5 w-5" />
                                <span>
                                    {property.location.city}, {property.location.state}
                                    {property.location.address && ` - ${property.location.address}`}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4 md:mt-0">
                            <Button variant="ghost" size="sm" onClick={handleShare}>
                                <Share2 className="h-5 w-5 mr-2" />
                                Compartilhar
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleToggleFavorite}
                                className={isFavorite ? "text-red-500 hover:text-red-600 hover:bg-red-50" : ""}
                            >
                                <Heart className={`h-5 w-5 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                                {isFavorite ? "Salvo" : "Salvar"}
                            </Button>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <motion.div
                            className="md:col-span-3 h-96 md:h-[500px] rounded-xl overflow-hidden cursor-pointer"
                            layoutId="main-image"
                        >
                            <img
                                src={property.images[selectedImage]}
                                alt={property.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </motion.div>
                        <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                            {property.images.slice(0, 3).map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`h-32 md:h-40 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === index
                                        ? "border-[#2E8B57]"
                                        : "border-transparent hover:border-gray-300"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${property.title} - ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Property Info */}
                            <div>
                                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-gray-600" />
                                        <span className="text-gray-900">
                                            Até <strong>{property.maxGuests}</strong> hóspedes
                                        </span>
                                    </div>
                                    <div className="px-4 py-2 bg-[#2E8B57]/10 text-[#2E8B57] rounded-full text-sm font-semibold">
                                        {property.type === "pousada" && "Pousada"}
                                        {property.type === "sitio" && "Sítio"}
                                        {property.type === "fazenda" && "Fazenda"}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre este local</h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {property.description}
                                </p>
                            </div>

                            {/* Amenities */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Comodidades</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {property.amenities.map((amenity) => (
                                        <div
                                            key={amenity}
                                            className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                                        >
                                            <div className="h-2 w-2 bg-[#2E8B57] rounded-full" />
                                            <span className="text-gray-900">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Location */}
                            {property.location.lat && property.location.lng && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Localização</h2>
                                    <div className="bg-gray-100 rounded-lg h-64 w-full z-0 relative">
                                        <PropertyMap
                                            lat={property.location.lat}
                                            lng={property.location.lng}
                                            zoom={15}
                                        />
                                    </div>
                                    <p className="text-gray-600 mt-4">
                                        {property.location.city}, {property.location.state}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Booking Card (Sticky) */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 border-2 border-gray-200 rounded-xl p-6 shadow-lg">
                                <div className="flex items-baseline gap-2 mb-6">
                                    <DollarSign className="h-6 w-6 text-[#2E8B57]" />
                                    <span className="text-3xl font-bold text-gray-900">
                                        {property.price}
                                    </span>
                                    <span className="text-gray-600">/ noite</span>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-2">Capacidade</p>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-5 w-5 text-gray-700" />
                                            <span className="font-semibold text-gray-900">
                                                Até {property.maxGuests} hóspedes
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-[#2E8B57]/5 rounded-lg border border-[#2E8B57]/20">
                                        <p className="text-sm text-gray-700 mb-2">
                                            💬 <strong>Reserva via WhatsApp</strong>
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Entre em contato diretamente com o anfitrião para verificar
                                            disponibilidade e fechar sua reserva
                                        </p>
                                    </div>
                                </div>

                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <Button variant="whatsapp" className="w-full text-lg py-6 mb-4">
                                        <svg
                                            className="h-6 w-6 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Reservar via WhatsApp
                                    </Button>
                                </a>

                                <p className="text-xs text-center text-gray-500">
                                    Você será redirecionado para o WhatsApp
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main >

            <Footer />
        </div >
    );
}
