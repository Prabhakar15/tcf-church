import HeroSection from '../components/home/HeroSection';
import WelcomeSection from '../components/home/WelcomeSection';
import VisionSection from '../components/home/VisionSection';
import CommunitySection from '../components/home/CommunitySection';
import PastorSection from '../components/home/PastorSection';
import DailyWordPreview from '../components/home/DailyWordPreview';
import SermonPreview from '../components/home/SermonPreview';
import EventsPreview from '../components/home/EventsPreview';
import ConnectSection from '../components/home/ConnectSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <VisionSection />
      <CommunitySection />
      <PastorSection />
      <DailyWordPreview />
      <SermonPreview />
      <EventsPreview />
      <ConnectSection />
    </>
  );
}
