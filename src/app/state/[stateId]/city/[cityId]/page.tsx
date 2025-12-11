
import { getDispensariesByCity, getCityById } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { StarRating } from '@/components/reviews/StarRating';

interface PageProps {
  params: { stateId: string; cityId: string };
}

export default async function CityPage({ params }: PageProps) {
  const city = await getCityById(params.cityId);
  if (!city) {
    notFound();
  }

  const dispensaries = await getDispensariesByCity(params.cityId);

  return (
    <>
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary font-headline">
          Dispensaries in {city.name}
        </h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground">
          Explore reviews and ratings for dispensaries in {city.name}.
        </p>
      </header>

      <main>
        {dispensaries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dispensaries.map((dispensary) => (
              <Link
                href={`/state/${params.stateId}/city/${city.id}/dispensary/${dispensary.id}`}
                key={dispensary.id}
                className="block bg-card rounded-xl p-5 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-lg font-semibold text-foreground">{dispensary.name}</h2>
                <p className="text-muted-foreground mt-1 text-sm">{dispensary.address}</p>
                <div className="flex items-center mt-2">
                  <StarRating rating={dispensary.rating} />
                  <span className="text-muted-foreground text-sm ml-2">({dispensary.reviewCount} reviews)</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No dispensaries found in this city yet.</p>
        )}
      </main>
    </>
  );
}
