"use client";

import { motion } from "framer-motion";
import { MapPin, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Property } from "@/lib/types";

interface PropertyCardProps {
    property: Property;
    index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
    const whatsappMessage = encodeURIComponent(
        `Olá! Tenho interesse em ${property.title}. Gostaria de mais informações.`
    );
    const whatsappLink = `https://wa.me/${property.whatsapp}?text=${whatsappMessage}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <Link href={`/anuncio/${property.id}`}>
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                            {property.type === "pousada" && "Pousada"}
                            {property.type === "sitio" && "Sítio"}
                            {property.type === "fazenda" && "Fazenda"}
                        </div>
                    </div>
                </Link>

                <div className="p-6">
                    <Link href={`/anuncio/${property.id}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#2E8B57] transition-colors">
                            {property.title}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">
                            {property.location.city}, {property.location.state}
                        </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {property.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {property.amenities.slice(0, 3).map((amenity) => (
                            <span
                                key={amenity}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                                {amenity}
                            </span>
                        ))}
                        {property.amenities.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                +{property.amenities.length - 3}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-gray-600">
                                <Users className="h-4 w-4" />
                                <span className="text-sm">{property.maxGuests}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#2E8B57] font-bold">
                                <DollarSign className="h-5 w-5" />
                                <span className="text-lg">{property.price}</span>
                                <span className="text-sm text-gray-600">/noite</span>
                            </div>
                        </div>

                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            <Button variant="whatsapp" size="sm">
                                WhatsApp
                            </Button>
                        </a>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
