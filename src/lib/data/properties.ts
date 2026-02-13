import { supabase } from "../supabase";
import { Property } from "../types";

// Supabase database functions
export async function getProperties(): Promise<Property[]> {
    const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching properties:", error);
        return [];
    }

    return data.map(mapSupabaseToProperty);
}

export async function getManagerProperties(userId: string): Promise<Property[]> {
    const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("manager_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching manager properties:", error);
        return [];
    }

    return data.map(mapSupabaseToProperty);
}

export async function getPropertyById(id: string): Promise<Property | null> {
    const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching property:", error);
        return null;
    }

    return mapSupabaseToProperty(data);
}

export async function addProperty(
    property: Omit<Property, "id" | "createdAt" | "updatedAt">
): Promise<Property | null> {
    const { data, error } = await supabase
        .from("properties")
        .insert([
            {
                title: property.title,
                description: property.description,
                type: property.type,
                city: property.location.city,
                state: property.location.state,
                address: property.location.address,
                lat: property.location.lat,
                lng: property.location.lng,
                price: property.price,
                max_guests: property.maxGuests,
                whatsapp: property.whatsapp,
                amenities: property.amenities,
                images: property.images,
                manager_id: property.managerId,
            },
        ])
        .select()
        .single();

    if (error) {
        console.error("Error adding property:", error);
        return null;
    }

    return mapSupabaseToProperty(data);
}

export async function updateProperty(
    id: string,
    updates: Partial<Property>
): Promise<Property | null> {
    const updateData: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
    };

    if (updates.title) updateData.title = updates.title;
    if (updates.description) updateData.description = updates.description;
    if (updates.type) updateData.type = updates.type;
    if (updates.price) updateData.price = updates.price;
    if (updates.maxGuests) updateData.max_guests = updates.maxGuests;
    if (updates.whatsapp) updateData.whatsapp = updates.whatsapp;
    if (updates.amenities) updateData.amenities = updates.amenities;
    if (updates.images) updateData.images = updates.images;

    if (updates.location) {
        if (updates.location.city) updateData.city = updates.location.city;
        if (updates.location.state) updateData.state = updates.location.state;
        if (updates.location.address) updateData.address = updates.location.address;
        if (updates.location.lat !== undefined) updateData.lat = updates.location.lat;
        if (updates.location.lng !== undefined) updateData.lng = updates.location.lng;
    }

    const { data, error } = await supabase
        .from("properties")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating property:", JSON.stringify(error, null, 2));
        return null;
    }

    return mapSupabaseToProperty(data);
}

export async function deleteProperty(id: string): Promise<boolean> {
    const { error } = await supabase.from("properties").delete().eq("id", id);

    if (error) {
        console.error("Error deleting property:", error);
        return false;
    }

    return true;
}

// Helper function to map Supabase data to Property type
function mapSupabaseToProperty(data: Record<string, unknown>): Property {
    return {
        id: data.id as string,
        title: data.title as string,
        description: data.description as string,
        type: data.type as "pousada" | "sitio" | "fazenda",
        location: {
            city: data.city as string,
            state: data.state as string,
            address: (data.address as string) || "",
            lat: data.lat as number | undefined,
            lng: data.lng as number | undefined,
        },
        price: data.price as number,
        maxGuests: data.max_guests as number,
        whatsapp: data.whatsapp as string,
        amenities: (data.amenities as string[]) || [],
        images: (data.images as string[]) || [],
        managerId: (data.manager_id as string) || "",
        createdAt: new Date(data.created_at as string),
        updatedAt: new Date(data.updated_at as string),
    };
}
