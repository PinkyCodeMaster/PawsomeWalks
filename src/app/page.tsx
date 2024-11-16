import { DogIcon, MapPinIcon, UsersIcon, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1"
            alt="Happy dogs being walked"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/25" />
        </div>
        <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Professional Dog Walking Services You Can Trust
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Connect with verified dog walkers, schedule walks, and join a community of dog lovers
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/book">Book a Walk</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/walkers">Meet Our Walkers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose PawsomeWalks?</h2>
          <p className="text-muted-foreground">Experience the best dog walking service in your area</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<DogIcon className="w-10 h-10" />}
            title="Experienced Walkers"
            description="All our walkers are verified and trained professionals"
          />
          <FeatureCard
            icon={<MapPinIcon className="w-10 h-10" />}
            title="Location Tracking"
            description="Real-time updates on your dog's walking route"
          />
          <FeatureCard
            icon={<UsersIcon className="w-10 h-10" />}
            title="Community Events"
            description="Join group walks and meet other dog owners"
          />
          <FeatureCard
            icon={<CalendarIcon className="w-10 h-10" />}
            title="Easy Scheduling"
            description="Flexible booking system that works around your schedule"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Give Your Dog the Best Walk?</h2>
        <p className="mb-8 text-lg">Join thousands of happy dog owners using PawsomeWalks</p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/signup">Get Started Today</Link>
        </Button>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
      <div className="mb-4 flex justify-center text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}