import { getCitiesByState, getStateById } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface PageProps {
  params: { stateId: string };
}

export default async function StatePage({ params }: PageProps) {
  const state = await getStateById(params.stateId);
  if (!state) {
    notFound();
  }

  const cities = await getCitiesByState(params.stateId);

  return (
    <>
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary font-headline">
          Cities in {state.name}
        </h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground">
          Find top-rated dispensaries in a city near you.
        </p>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {cities.map((city) => (
            <Link href={`/state/${state.id}/city/${city.id}`} key={city.id} className="group" prefetch={true}>
              <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-accent">
                <CardHeader className="flex flex-row items-center justify-between p-4">
                  <CardTitle className="text-base md:text-lg font-medium">{city.name}</CardTitle>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
