import Image from "next/image";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
}

interface SidebarProductProps {
  image: string;
  title: string;
  price: number;
}

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-16">
              <div>
                <span className="text-red-500 text-sm font-medium tracking-wider uppercase mb-2 block">Our Selection</span>
                <h2 className="text-5xl font-serif italic text-gray-900">Featured Products</h2>
              </div>
              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center hover:bg-red-500 transition-colors duration-300 group">
                  <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center hover:bg-red-500 transition-colors duration-300 group">
                  <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-2 gap-12">
              {/* Product Card 1 */}
              <ProductCard
                image="/product1.jpg"
                title="Vestibulum venenatis volutpat libero"
                description="Lorem ipsum has been the industry's standard"
                originalPrice={80}
                discountedPrice={40}
              />

              {/* Product Card 2 */}
              <ProductCard
                image="/product2.jpg"
                title="Vestibulum venenatis volutpat libero"
                description="Lorem ipsum has been the industry's standard"
                originalPrice={80}
                discountedPrice={40}
              />
            </div>
          </div>

          {/* Red Sidebar */}
          <div className="w-96 bg-red-500 p-8 text-white">
            <div className="space-y-8">
              {/* Sidebar Product 1 */}
              <SidebarProduct
                image="/chair.jpg"
                title="Vestibulum venenatis volutpat libero"
                price={40}
              />

              {/* Sidebar Product 2 */}
              <SidebarProduct
                image="/curtain.jpg"
                title="Vestibulum venenatis volutpat libero"
                price={40}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ image, title, description, originalPrice, discountedPrice }: ProductCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -right-4 top-4 z-10">
        <div className="bg-red-500 text-white py-1.5 px-4 rounded-lg flex items-center gap-1 shadow-lg transform transition-transform duration-300 hover:scale-105">
          <span className="text-sm font-semibold">25%</span>
          <span className="text-xs font-medium">OFF</span>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={image}
          alt={title}
          width={500}
          height={600}
          className="w-full h-[600px] object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition-colors duration-300">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 line-through text-lg">${originalPrice}.00</span>
            <span className="text-red-500 font-semibold text-2xl">${discountedPrice}.00</span>
          </div>
          <button className="text-red-500 border-2 border-red-500 rounded-full px-6 py-2.5 flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all duration-300 font-medium group">
            VIEW ITEM
            <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarProduct({ image, title, price }: SidebarProductProps) {
  return (
    <div className="group cursor-pointer">
      <div className="flex items-center gap-6">
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            width={100}
            height={100}
            className="w-24 h-24 object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-2 group-hover:text-white/90 transition-colors">{title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">${price}.00</span>
            <button className="bg-white/20 p-2.5 rounded-full transform transition-all duration-300 hover:bg-white/30 hover:scale-105 group-hover:rotate-12">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 