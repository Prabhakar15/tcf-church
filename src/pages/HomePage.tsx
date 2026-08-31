import HeroSection from '../components/home/HeroSection';
import WorshipWithUs from '../components/home/WorshipWithUs';
import DailyWordPreview from '../components/home/DailyWordPreview';
import WatchAndListen from '../components/home/WatchAndListen';
import VisionSection from '../components/home/VisionSection';
import PastorSection from '../components/home/PastorSection';
import WelcomeSection from '../components/home/WelcomeSection';
import ConnectSection from '../components/home/ConnectSection';
import FinalCTA from '../components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WorshipWithUs />
      <DailyWordPreview />
      <WatchAndListen />
      <VisionSection />
      <PastorSection />
      <WelcomeSection />
      <ConnectSection />
      <FinalCTA />
    </>
  );
}
