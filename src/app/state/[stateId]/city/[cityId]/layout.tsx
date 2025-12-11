import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getCityById, getStateById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function CityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { stateId: string; cityId: string };
}) {
  const state = await getStateById(params.stateId);
  const city = await getCityById(params.cityId);

  if (!state || !city || city.stateId !== state.id) {
    notFound();
  }

  const breadcrumbItems = [
    { label: state.name, href: `/state/${state.id}` },
    { label: city.name, href: `/state/${state.id}/city/${city.id}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />
      {children}
    </div>
  );
}
