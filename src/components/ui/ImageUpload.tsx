"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";

interface ImageUploadProps {
    onUpload: (url: string) => void;
    disabled?: boolean;
}

export function ImageUpload({ onUpload, disabled }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleUpload = async (file: File) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Por favor, selecione apenas arquivos de imagem.");
            return;
        }

        // Validate size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("A imagem deve ter no máximo 5MB.");
            return;
        }

        setIsUploading(true);

        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("property-images")
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from("property-images")
                .getPublicUrl(filePath);

            onUpload(data.publicUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Erro ao fazer upload da imagem. Tente novamente.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    return (
        <div className="w-full">
            <div
                className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                    ${dragActive ? "border-[#2E8B57] bg-[#2E8B57]/5" : "border-gray-300 hover:bg-gray-50"}
                    ${disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !disabled && !isUploading && document.getElementById("image-upload-input")?.click()}
            >
                <input
                    id="image-upload-input"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                    disabled={disabled || isUploading}
                />

                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {isUploading ? (
                        <>
                            <Loader2 className="w-8 h-8 mb-2 text-[#2E8B57] animate-spin" />
                            <p className="text-sm text-gray-500">Enviando...</p>
                        </>
                    ) : (
                        <>
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="mb-1 text-sm text-gray-500">
                                <span className="font-semibold">Clique para enviar</span> ou arraste
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG ou GIF (MAX. 5MB)</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
