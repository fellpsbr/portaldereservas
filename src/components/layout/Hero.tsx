"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Hero() {
    const router = useRouter();
    const [location, setLocation] = useState("");
    const [guests, setGuests] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (guests) params.set("guests", guests);
        router.push(`/busca?${params.toString()}`);
    };

    return (
        <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=2073')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Descubra o Campo de São Paulo
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Pousadas, sítios e fazendas para sua próxima aventura rural
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    className="bg-white rounded-2xl shadow-2xl p-4 md:p-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Cidade ou região"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="border-0 bg-transparent p-0 focus:ring-0"
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50">
                            <Users className="h-5 w-5 text-gray-400" />
                            <Input
                                type="number"
                                placeholder="Nº de hóspedes"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                className="border-0 bg-transparent p-0 focus:ring-0"
                                min="1"
                            />
                        </div>
                        <Button type="submit" variant="primary" size="lg" className="md:w-auto">
                            <Search className="h-5 w-5 mr-2" />
                            Buscar
                        </Button>
                    </form>
                </motion.div>

                {/* Quick Filters */}
                <motion.div
                    className="mt-6 flex flex-wrap justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    {["Pousadas", "Sítios", "Fazendas", "Com Piscina", "Pet Friendly"].map(
                        (filter) => (
                            <button
                                key={filter}
                                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-200 border border-white/30"
                            >
                                {filter}
                            </button>
                        )
                    )}
                </motion.div>
            </div>
        </section>
    );
}
