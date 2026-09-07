import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollyCanvas } from '../components/ScrollyCanvas';
import { AboutStory } from '../components/AboutStory';
import { CategoriesSection } from '../components/CategoriesSection';
import { CollectionShowcase } from '../components/CollectionShowcase';
import { BanglesKadasSpotlight } from '../components/BanglesKadasSpotlight';
import { EarringsStudsSpotlight } from '../components/EarringsStudsSpotlight';
import { AtelierMarquee } from '../components/AtelierMarquee';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';
import { JewelleryPiece } from '../types';

interface HomePageProps {
  onOpenBooking: () => void;
  onSelectPiece: (piece: JewelleryPiece) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onSelectPiece
}) => {
  const navigate = useNavigate();

  const handleOpenShowcase = () => {
    navigate('/collections');
  };

  const handleSelectCategory = (categoryId: string) => {
    navigate(`/collections/${categoryId.toLowerCase()}`);
  };

  const handleExploreBangles360 = () => {
    navigate('/collections/bangles');
  };

  const handleExploreEarrings360 = () => {
    navigate('/collections/earrings');
  };

  return (
    <main>
      {/* 1. Main Scrollytelling Canvas Story Journey (Hero + 240 frames) */}
      <ScrollyCanvas
        onOpenBooking={onOpenBooking}
        onOpenShowcase={handleOpenShowcase}
      />

      {/* 2. Brand Heritage Story & Key Stats */}
      <AboutStory onOpenBooking={onOpenBooking} />

      {/* 3. Shop By Category */}
      <CategoriesSection onSelectCategory={handleSelectCategory} />

      {/* 4. Dedicated Bangles & Kadas Spotlight Section */}
      <BanglesKadasSpotlight
        onOpenBooking={onOpenBooking}
        onExplore360={handleExploreBangles360}
        onSelectPiece={onSelectPiece}
      />

      {/* 5. Dedicated Earrings & Studs Spotlight Section */}
      <EarringsStudsSpotlight
        onOpenBooking={onOpenBooking}
        onExplore360={handleExploreEarrings360}
        onSelectPiece={onSelectPiece}
      />

      {/* 6. Featured Collection: Trending Now */}
      <CollectionShowcase
        onSelectPiece={onSelectPiece}
        onOpenBooking={onOpenBooking}
      />

      {/* 7. Infinite Archival Atelier Marquee Exhibition */}
      <AtelierMarquee onOpenBooking={onOpenBooking} />

      {/* 8. Testimonials (Customer Reviews with Cream Pop Tab) */}
      <TestimonialsSection />

      {/* 9. Flagship Showroom & Contact Form */}
      <ContactSection />
    </main>
  );
};
