import VideoHero from '@/components/sections/VideoHero';
import HighlightsSection from '@/components/sections/HighlightsSection';
import CompanyOverview from '@/components/sections/CompanyOverview';
import LeadershipSection from '@/components/sections/LeadershipSection';

export default function Home() {
  return (
    <main className="bg-gray-100">
      <VideoHero />
      <div className="bg-gray-100">
        <HighlightsSection />
        <CompanyOverview />
        <LeadershipSection />
      </div>
    </main>
  );
}
