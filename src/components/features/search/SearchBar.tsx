"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function SearchBar() {
    const router = useRouter();
    const [location, setLocation] = useState("");
    const [guests, setGuests] = useState("");
    const [date, setDate] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (guests) params.set("guests", guests);
        if (date) params.set("date", date);
        router.push(`/busca?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <form
                onSubmit={handleSearch}
                className="bg-white shadow-lg border border-gray-200 overflow-hidden rounded-3xl md:rounded-full"
            >
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center p-2 pl-6 gap-2">
                    {/* Location Input */}
                    <div className="flex-1 flex flex-col justify-center px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
                        <label className="text-xs font-bold text-gray-800 ml-1">Onde</label>
                        <input
                            type="text"
                            placeholder="Buscar destinos"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-sm text-gray-600 focus:outline-none placeholder:text-gray-400"
                        />
                    </div>

                    <div className="w-px h-8 bg-gray-200"></div>

                    {/* Date Input */}
                    <div className="flex-1 flex flex-col justify-center px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
                        <label className="text-xs font-bold text-gray-800 ml-1">Quando</label>
                        <input
                            type="text"
                            placeholder="Insira as datas"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-sm text-gray-600 focus:outline-none placeholder:text-gray-400"
                        />
                    </div>

                    <div className="w-px h-8 bg-gray-200"></div>

                    {/* Guests Input */}
                    <div className="flex-1 flex flex-col justify-center px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors pr-2 relative">
                        <label className="text-xs font-bold text-gray-800 ml-1">Quem</label>
                        <input
                            type="number"
                            placeholder="Hóspedes?"
                            min="1"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-sm text-gray-600 focus:outline-none placeholder:text-gray-400"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="rounded-full w-12 h-12 flex items-center justify-center bg-[#2E8B57] hover:bg-[#267347] text-white shadow-md p-0 mr-1"
                    >
                        <Search className="h-5 w-5 font-bold" />
                    </Button>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col p-4 gap-3">
                    {/* Location Input */}
                    <div className="flex flex-col px-4 py-3 bg-gray-50 rounded-2xl">
                        <label className="text-xs font-bold text-gray-800 mb-1">Onde</label>
                        <input
                            type="text"
                            placeholder="Buscar destinos"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-sm text-gray-600 focus:outline-none placeholder:text-gray-400"
                        />
                    </div>

                    {/* Date Input */}
                    <div className="flex flex-col px-4 py-3 bg-gray-50 rounded-2xl">
                        <label className="text-xs font-bold text-gray-800 mb-1">Quando</label>
                        <input
                            type="text"
                            placeholder="Insira as datas"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-sm text-gray-600 focus:outline-none placeholder:text-gray-400"
                        />
                    </div>

                    {/* Guests Input with Search Button */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 flex flex-col px-4 py-3 bg-gray-50 rounded-2xl">
                            <label className="text-xs font-bold text-gray-800 mb-1">Quem</label>
                            <input
                                type="number"
                                placeholder="Hóspedes?"
                                min="1"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                className="w-full bg-transparent border-none p-0 text-sm text-gray-600 focus:outline-none placeholder:text-gray-400"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="rounded-full w-14 h-14 flex items-center justify-center bg-[#2E8B57] hover:bg-[#267347] text-white shadow-md p-0 flex-shrink-0"
                        >
                            <Search className="h-6 w-6 font-bold" />
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
