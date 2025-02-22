import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-pink-50 overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}
