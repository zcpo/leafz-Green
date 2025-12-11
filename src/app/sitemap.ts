'use server';

import { getStates, getCitiesByState, getDispensariesByCity } from '@/lib/data';
import type { MetadataRoute } from 'next';

const URL = 'https://your-production-domain.com'; // IMPORTANT: Change this to your actual domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const states = await getStates();
  const statesUrls = states.map((state) => ({
    url: `${URL}/state/${state.id}`,
    lastModified: new Date(),
  }));

  const citiesUrls = (
    await Promise.all(
      states.map(async (state) => {
        const cities = await getCitiesByState(state.id);
        return cities.map((city) => ({
          url: `${URL}/state/${state.id}/city/${city.id}`,
          lastModified: new Date(),
        }));
      })
    )
  ).flat();

  const dispensariesUrls = (
    await Promise.all(
        citiesUrls.map(async (cityRoute) => {
            const cityId = cityRoute.url.substring(cityRoute.url.lastIndexOf('/') + 1);
            const dispensaries = await getDispensariesByCity(cityId);
            return dispensaries.map((dispensary) => {
                const stateId = cityRoute.url.split('/')[4];
                return {
                    url: `${URL}/state/${stateId}/city/${cityId}/dispensary/${dispensary.id}`,
                    lastModified: new Date(),
                }
            });
        })
    )
  ).flat();


  return [
    {
      url: URL,
      lastModified: new Date(),
    },
    ...statesUrls,
    ...citiesUrls,
    ...dispensariesUrls,
  ];
}
