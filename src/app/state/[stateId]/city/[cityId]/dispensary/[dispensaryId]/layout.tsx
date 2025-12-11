import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getDispensaryById, getCityById, getStateById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function DispensaryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { stateId: string; cityId: string; dispensaryId: string };
}) {
  const state = await getStateById(params.stateId);
  const city = await getCityById(params.cityId);
  const dispensary = await getDispensaryById(params.dispensaryId);

  if (!state || !city || !dispensary || city.stateId !== state.id || dispensary.cityId !== city.id) {
    notFound();
  }

  const breadcrumbItems = [
    { label: state.name, href: `/state/${state.id}` },
    { label: city.name, href: `/state/${state.id}/city/${city.id}` },
    { label: dispensary.name, href: `/state/${state.id}/city/${city.id}/dispensary/${dispensary.id}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />
      {children}
    </div>
  );
}
