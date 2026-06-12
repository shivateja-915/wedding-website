import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import StoryTimeline from "@/components/sections/StoryTimeline";
import FeaturedFilms from "@/components/sections/FeaturedFilms";
import Services from "@/components/sections/Services";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* Global UI */}
      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      {/* Page Sections */}
      <main>
        {/* 1. Hero — Scroll-driven frame animation */}
        <Hero />

        {/* 2. Gallery — Horizontal scroll gallery */}
        <Gallery />

        {/* 3. Story Timeline — 4-chapter horizontal scroll */}
        <StoryTimeline />

        {/* 4. Featured Films — Cinematic film cards */}
        <FeaturedFilms />

        {/* 5. Services — Glassmorphism cards */}
        <Services />

        {/* 6. Statistics — Animated counters */}
        <Statistics />

        {/* 7. Testimonials — Floating glass cards */}
        <Testimonials />

        {/* 8. About — Photographer journey */}
        <About />

        {/* 9. Contact — Contact info only (no form) */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
