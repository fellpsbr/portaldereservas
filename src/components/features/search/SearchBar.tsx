"use client";

import { Search, MapPin, Calendar, Users } from "lucide-react";
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
        if (date) params.set("date", date); // We might need to handle date ranges later
        router.push(`/busca?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <form
                onSubmit={handleSearch}
                className="flex flex-col md:flex-row items-center bg-white rounded-full shadow-lg border border-gray-200 p-2 pl-6 gap-2"
            >
                {/* Location Input */}
                <div className="flex-1 w-full md:w-auto flex flex-col justify-center px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors relative group">
                    <label className="text-xs font-bold text-gray-800 ml-1">Onde</label>
                    <input
                        type="text"
                        placeholder="Buscar destinos"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-sm text-gray-600 focus:outline-none placeholder:text-gray-400"
                    />
                </div>

                <div className="hidden md:block w-px h-8 bg-gray-200"></div>

                {/* Date Input */}
                <div className="flex-1 w-full md:w-auto flex flex-col justify-center px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
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

                <div className="hidden md:block w-px h-8 bg-gray-200"></div>

                {/* Guests Input */}
                <div className="flex-1 w-full md:w-auto flex flex-col justify-center px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors hover:pr-12 relative">
                    <label className="text-xs font-bold text-gray-800 ml-1">Quem</label>
                    <input
                        type="number"
                        placeholder="Hóspedes?"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-sm text-gray-600 focus:outline-none placeholder:text-gray-400"
                    />

                    <Button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 flex items-center justify-center bg-[#2E8B57] hover:bg-[#267347] text-white shadow-md p-0"
                    >
                        <Search className="h-5 w-5 font-bold" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
