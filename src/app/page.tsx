
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/features/search/SearchBar";
import { CategoryFilter } from "@/components/features/search/CategoryFilter";
import { PropertyCard } from "@/components/features/property/PropertyCard";
import { getProperties } from "@/lib/data/properties";
import { Property } from "@/lib/types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "pousada", label: "Pousadas" },
  { id: "sitio", label: "Sítios" },
  { id: "fazenda", label: "Fazendas" },
  { id: "praia", label: "Litoral" },
  { id: "piscina", label: "Com Piscina" },
  { id: "gastronomia", label: "Gastronomia" },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category || "all";
  const properties = await getProperties();

  // Filter properties based on category
  const filteredProperties = category === "all"
    ? properties
    : properties.filter((p) => {
      if (category === "pousada") return p.type === "pousada";
      if (category === "sitio") return p.type === "sitio";
      if (category === "fazenda") return p.type === "fazenda";
      if (category === "praia") return ["Guarujá", "Ubatuba", "Ilhabela"].includes(p.location.city);
      if (category === "piscina") return p.amenities.some(a => a.toLowerCase().includes("piscina"));
      return true;
    });

  const featuredProperties = filteredProperties.slice(0, 4);
  const recentProperties = filteredProperties.slice(2, 6);
  const regionProperties = properties.filter(p => p.location.city === "Guarujá").slice(0, 4);

  const Section = ({ title, subtitle, items, linkText, linkHref }: { title: string, subtitle?: string, items: Property[], linkText?: string, linkHref?: string }) => {
    if (items.length === 0) return null;
    return (
      <section className="py-8 border-b border-gray-100 last:border-0">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
            </div>
            {linkText && linkHref && (
              <Link href={linkHref} className="flex items-center text-sm font-medium text-gray-900 hover:underline">
                {linkText} <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pb-16">
        <div className="bg-white border-b border-gray-100 pt-6 pb-8 px-4">
          <div className="mx-auto max-w-7xl relative z-10">
            <SearchBar />
          </div>
        </div>
        <CategoryFilter />
        <div className="pt-6">
          {filteredProperties.length > 0 ? (
            <>
              <Section
                title={category === 'all' ? "Acomodações muito procuradas" : `Opções de ${CATEGORIES.find(c => c.id === category)?.label || category}`}
                subtitle={category === 'all' ? "Os preferidos dos hóspedes no Portal" : undefined}
                items={featuredProperties}
                linkText="Mostrar mais"
                linkHref={`/busca?category=${category}`}
              />
              <Section
                title="Disponível neste fim de semana"
                items={recentProperties}
                linkText="Ver disponibilidade"
                linkHref="/busca"
              />
              {category === 'all' && (
                <Section
                  title="Fique em Guarujá"
                  items={regionProperties}
                  linkText="Ver todos em Guarujá"
                  linkHref="/busca?location=Guarujá"
                />
              )}
            </>
          ) : (
            <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 text-center">
              <h3 className="text-lg font-semibold text-gray-900">Nenhuma acomodação encontrada nesta categoria.</h3>
              <p className="text-gray-500 mt-2">Tente selecionar outra categoria ou limpar os filtros.</p>
              <Link href="/">
                <button className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Limpar filtros
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}


