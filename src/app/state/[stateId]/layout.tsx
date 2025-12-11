rm -rf .git
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getStateById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function StateLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { stateId: string };
}) {
  const state = await getStateById(params.stateId);
  if (!state) {
    notFound();
  }

  const breadcrumbItems = [{ label: state.name, href: `/state/${state.id}` }];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />
      {children}
    </div>
  );
}
