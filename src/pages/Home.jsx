import React from 'react';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import BotanicalMarquee from '../components/home/BotanicalMarquee';
import ShopByCategory from '../components/home/ShopByCategory';
import BestsellersSection from '../components/home/BestsellersSection';
import BrandStorySection from '../components/home/BrandStorySection';
import InteractivePlantFinder from '../components/home/InteractivePlantFinder';
import FeaturedCollection from '../components/home/FeaturedCollection';
import PlantCareJournal from '../components/home/PlantCareJournal';
import WhyVerdora from '../components/home/WhyVerdora';
import CustomerTestimonials from '../components/home/CustomerTestimonials';
import NewsletterSection from '../components/home/NewsletterSection';
import Footer from '../components/layout/Footer';

export default function Home() {
  const scrollToPlantFinder = () => {
    const el = document.getElementById('plant-finder-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col selection:bg-sage/40 selection:text-forest">
      {/* 3.A Announcement Bar */}
      <AnnouncementBar />

      {/* 3.B Sticky Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* 3.C Hero Section */}
        <HeroSection onOpenPlantFinder={scrollToPlantFinder} />

        {/* Botanical Infinite Marquee Ribbon */}
        <BotanicalMarquee />

        {/* 3.D Shop By Category */}
        <ShopByCategory />

        {/* 3.E Bestsellers: Most Loved by Nature */}
        <BestsellersSection />

        {/* 3.F Brand Story: A Greener Way to Live */}
        <BrandStorySection />

        {/* 3.G Interactive Plant Finder */}
        <InteractivePlantFinder />

        {/* 3.H Featured Collection: Bring the Outdoors In */}
        <FeaturedCollection />

        {/* 3.I Plant Care Journal */}
        <PlantCareJournal />

        {/* 3.J Why VERDORA */}
        <WhyVerdora />

        {/* 3.K Customer Testimonials */}
        <CustomerTestimonials />

        {/* 3.L Newsletter: Let's Grow Together */}
        <NewsletterSection />
      </main>

      {/* 3.M Footer */}
      <Footer />
    </div>
  );
}

