import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";

export default function Navigation() {
  return (
    <nav className="p-4 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/MI North Christmas Logo_20250202_192450_0000.png"
              alt="MI North Christmas"
              width={60}
              height={60}
              className="h-15 w-auto rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-gray-900">MI North</span>
              <span className="text-lg font-serif text-gray-700">Christmas</span>
            </div>
          </Link>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8">
          <Link href="/" className="text-gray-700 hover:text-red-500 transition">Home</Link>
          <Link href="/products" className="text-gray-700 hover:text-red-500 transition">Products</Link>
          <Link href="/faq" className="text-gray-700 hover:text-red-500 transition">FAQ</Link>
          <Link href="/blog" className="text-gray-700 hover:text-red-500 transition">Blog</Link>
          <Link href="/join" className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">Join Now</Link>
        </div>
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </nav>
  );
} 