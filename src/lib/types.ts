export interface Property {
    id: string;
    title: string;
    description: string;
    location: {
        city: string;
        state: string;
        address?: string;
        lat?: number;
        lng?: number;
    };
    price: number;
    images: string[];
    amenities: string[];
    type: "pousada" | "sitio" | "fazenda";
    maxGuests: number;
    whatsapp: string;
    managerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "MANAGER" | "USER";
    createdAt: Date;
}

export interface SearchFilters {
    location?: string;
    checkIn?: Date;
    checkOut?: Date;
    guests?: number;
    type?: Property["type"];
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
}
