"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Leaflet with Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    lat: number;
    lng: number;
    zoom?: number;
    interactive?: boolean;
    onLocationSelect?: (lat: number, lng: number) => void;
}

function MapController({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], zoom);
    }, [lat, lng, zoom, map]);
    return null;
}

function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function Map({
    lat = -23.55052,
    lng = -46.633308,
    zoom = 13,
    interactive = false,
    onLocationSelect,
}: MapProps) {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={zoom}
            style={{ height: "100%", width: "100%", borderRadius: "0.5rem", zIndex: 0 }}
            scrollWheelZoom={interactive}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController lat={lat} lng={lng} zoom={zoom} />
            {interactive && onLocationSelect && <MapEvents onLocationSelect={onLocationSelect} />}
            <Marker position={[lat, lng]} />
        </MapContainer>
    );
}
