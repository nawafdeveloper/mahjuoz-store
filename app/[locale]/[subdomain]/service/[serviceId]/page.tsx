export const runtime = 'edge';

import { fetchServicePage } from '@/lib/read';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: Promise<{ serviceId: string; locale: string }> }) {
  const { locale, serviceId } = await params;
  const serviceRes = await fetchServicePage(serviceId);

  if (!serviceRes.success || !serviceRes.data?.data.service) {
    return notFound();
  }

  const service = serviceRes.data.data.service;
  const images = Array.isArray(service.images) ? service.images : [];

  return (
    <div>
      service id: {service.id}
    </div>
  )
}