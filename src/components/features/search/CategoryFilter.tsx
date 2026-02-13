"use client";

import { Home, Trees, Waves, Mountain, Sun, User, Utensils } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    { id: "all", label: "Todos", icon: Home },
    { id: "pousada", label: "Pousadas", icon: User },
    { id: "sitio", label: "Sítios", icon: Trees },
    { id: "fazenda", label: "Fazendas", icon: Mountain },
    { id: "praia", label: "Litoral", icon: Waves },
    { id: "piscina", label: "Com Piscina", icon: Sun },
    { id: "gastronomia", label: "Gastronomia", icon: Utensils },
];

export function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category") || "all";

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handleCategoryClick = (categoryId: string) => {
        // If clicking same category (except 'all'), maybe toggle off? Or just keep it.
        // Let's just update the URL.
        const newUrl = categoryId === "all" ? "/" : `/?${createQueryString("category", categoryId)}`;
        router.push(newUrl);
    };

    return (
        <div className="w-full border-b border-gray-100 bg-white pt-4 sticky top-[80px] z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-0">
                    {CATEGORIES.map((category) => {
                        const Icon = category.icon;
                        const isActive = activeCategory === category.id;

                        return (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={cn(
                                    "relative flex flex-col items-center gap-2 min-w-[64px] cursor-pointer group transition-all pb-3 outline-none",
                                    isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-800 hover:bg-transparent bg-transparent border-0"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "h-6 w-6 transition-all duration-200",
                                        isActive ? "stroke-[2.5px]" : "stroke-[1.5px] group-hover:scale-105"
                                    )}
                                />
                                <span className={cn(
                                    "text-xs whitespace-nowrap transition-all",
                                    isActive ? "font-semibold" : "font-medium"
                                )}>
                                    {category.label}
                                </span>

                                {isActive ? (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                ) : (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-gray-200 transition-colors" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
