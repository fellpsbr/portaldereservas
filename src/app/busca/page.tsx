"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/features/property/PropertyCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getProperties } from "@/lib/data/properties";
import { Search, SlidersHorizontal, MapPin, DollarSign, Home } from "lucide-react";
import { Property } from "@/lib/types";

import { Suspense } from "react";

function SearchContent() {
    const searchParams = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        location: searchParams.get("location") || "",
        guests: searchParams.get("guests") || "",
        type: "",
        minPrice: "",
        maxPrice: "",
        amenities: [] as string[],
    });

    useEffect(() => {
        async function fetchProperties() {
            setLoading(true);
            const data = await getProperties();
            setProperties(data);
            setLoading(false);
        }
        fetchProperties();
    }, []);

    const filteredProperties = useMemo(() => {
        return properties.filter((property) => {
            // Location filter
            if (
                filters.location &&
                !property.location.city.toLowerCase().includes(filters.location.toLowerCase())
            ) {
                return false;
            }

            // Guests filter
            if (filters.guests && property.maxGuests < parseInt(filters.guests)) {
                return false;
            }

            // Type filter
            if (filters.type && property.type !== filters.type) {
                return false;
            }

            // Price filters
            if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
                return false;
            }
            if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
                return false;
            }

            // Amenities filter
            if (
                filters.amenities.length > 0 &&
                !filters.amenities.every((amenity) => property.amenities.includes(amenity))
            ) {
                return false;
            }

            return true;
        });
    }, [properties, filters]);

    const handleFilterChange = (key: string, value: string) => {
        setFilters({ ...filters, [key]: value });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50">
                {/* Search Header */}
                <div className="bg-white border-b border-gray-200 py-6">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="flex-1 w-full relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Buscar por cidade..."
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange("location", e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button
                                variant={showFilters ? "primary" : "ghost"}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <SlidersHorizontal className="h-5 w-5 mr-2" />
                                Filtros
                            </Button>
                        </div>

                        {/* Filters Panel */}
                        {showFilters && (
                            <div className="mt-6 p-6 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Tipo</label>
                                    <div className="relative">
                                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <select
                                            value={filters.type}
                                            onChange={(e) => handleFilterChange("type", e.target.value)}
                                            className="flex h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                                        >
                                            <option value="">Todos</option>
                                            <option value="pousada">Pousada</option>
                                            <option value="sitio">Sítio</option>
                                            <option value="fazenda">Fazenda</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Preço Mínimo</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            type="number"
                                            placeholder="R$ 0"
                                            value={filters.minPrice}
                                            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Preço Máximo</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            type="number"
                                            placeholder="R$ 1000"
                                            value={filters.maxPrice}
                                            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Results */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {filteredProperties.length} {filteredProperties.length === 1 ? "propriedade encontrada" : "propriedades encontradas"}
                        </h2>
                        {filters.location && (
                            <p className="text-gray-600 mt-1">
                                em <span className="font-semibold">{filters.location}</span>
                            </p>
                        )}
                    </div>

                    {filteredProperties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProperties.map((property, index) => (
                                <PropertyCard key={property.id} property={property} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Nenhuma propriedade encontrada
                            </h3>
                            <p className="text-gray-600">
                                Tente ajustar os filtros ou buscar por outra localização
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function BuscaPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <p>Carregando busca...</p>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
