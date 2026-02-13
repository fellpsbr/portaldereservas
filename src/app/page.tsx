import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/layout/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Featured Regions Section */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explore por Região
              </h2>
              <p className="text-lg text-gray-600">
                Descubra destinos incríveis em todo o estado de São Paulo
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Serra da Mantiqueira",
                  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070",
                  count: "24 propriedades"
                },
                {
                  name: "Litoral Norte",
                  image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070",
                  count: "18 propriedades"
                },
                {
                  name: "Interior Paulista",
                  image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2032",
                  count: "32 propriedades"
                }
              ].map((region) => (
                <div
                  key={region.name}
                  className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url('${region.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{region.name}</h3>
                    <p className="text-sm text-white/80">{region.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Property Types Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tipos de Acomodação
              </h2>
              <p className="text-lg text-gray-600">
                Encontre o estilo perfeito para sua estadia
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: "Pousadas", icon: "🏡", description: "Conforto e hospitalidade" },
                { type: "Sítios", icon: "🌳", description: "Natureza e tranquilidade" },
                { type: "Fazendas", icon: "🐴", description: "Experiência rural autêntica" }
              ].map((item) => (
                <div
                  key={item.type}
                  className="p-8 text-center border-2 border-gray-200 rounded-xl hover:border-[#2E8B57] hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.type}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
