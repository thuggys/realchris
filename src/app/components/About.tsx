import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-2">
              <h3 className="text-gray-600 uppercase tracking-wider text-sm font-medium">About Us</h3>
              <h2 className="text-4xl font-bold text-gray-900">Hi, Welcome to MI North Christmas!</h2>
            </div>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                We are a dedicated team of Christmas enthusiasts with over 10 years of experience 
                in bringing joy and festive spirit to homes around the world.
              </p>
              
              <p>
                We're passionate about helping others create magical holiday moments. With our 
                carefully curated selection of Christmas decorations and gifts, we make it easy 
                for you to transform your space into a winter wonderland.
              </p>

              <p>
                Whether you're looking for traditional decorations or modern holiday accessories, 
                we're here to help you find the perfect items to make your Christmas celebrations 
                truly special.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition group"
              >
                Read More
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-8">
              <Image
                src="/signature.png"
                alt="Signature"
                width={120}
                height={60}
                className="opacity-80"
              />
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">John & Sarah Thompson</p>
                <p className="text-sm text-gray-600">Founders, MI North Christmas</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-6 -right-6 w-[calc(100%+24px)] h-[calc(100%+24px)] bg-red-600/10 rounded-3xl"></div>
              <div className="absolute -top-3 -right-3 w-[calc(100%+12px)] h-[calc(100%+12px)] bg-red-600/5 rounded-3xl"></div>
              
              {/* Main image container */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-white p-4">
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/about-image.jpg"
                    alt="Our Story"
                    width={600}
                    height={800}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-6 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">10+ Years</p>
                    <p className="text-sm text-gray-600">Of Spreading Joy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 