import { getDispensaryById, getReviewsByDispensary } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { StarRating } from '@/components/reviews/StarRating';
import { MapPin, Phone } from 'lucide-react';
import { ReviewList } from '@/components/reviews/ReviewList';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { Separator } from '@/components/ui/separator';

interface PageProps {
  params: {
    stateId: string;
    cityId: string;
    dispensaryId: string;
  };
}

export default async function DispensaryPage({ params }: PageProps) {
  const { stateId, cityId, dispensaryId } = params;
  const dispensary = await getDispensaryById(dispensaryId);
  if (!dispensary) {
    notFound();
  }

  const reviews = await getReviewsByDispensary(dispensaryId);

  return (
    <>
      <header className="mb-6 md:mb-8">
        <div className="relative h-48 md:h-80 w-full rounded-lg overflow-hidden mb-4">
          <Image
            src={dispensary.imageUrl}
            alt={dispensary.name}
            fill
            className="object-cover"
            priority
            data-ai-hint={dispensary.imageHint}
          />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary font-headline">
          {dispensary.name}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-2 mt-2">
          <div className="flex items-center gap-2">
            <StarRating rating={dispensary.rating} />
            <span className="font-semibold">{dispensary.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              ({dispensary.reviewCount} reviews)
            </span>
          </div>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <p className="flex items-center gap-2 text-muted-foreground text-sm md:text-base">
            <MapPin className="h-4 w-4" /> {dispensary.address}
          </p>
           <Separator orientation="vertical" className="h-4 hidden md:block" />
           <p className="flex items-center gap-2 text-muted-foreground text-sm md:text-base">
            <Phone className="h-4 w-4" /> (555) 123-4567
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          <ReviewList reviews={reviews} />
          <ReviewForm 
            dispensaryId={dispensaryId}
            stateId={stateId}
            cityId={cityId}
          />
        </div>
        <aside className="lg:col-span-1 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold font-headline">Location</h2>
            <div className="h-96 w-full rounded-lg border bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Map has been removed.</p>
            </div>
        </aside>
      </div>
    </>
  );
}
