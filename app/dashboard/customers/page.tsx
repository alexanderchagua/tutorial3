import CustomersTable from '@/app/ui/customers/table';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { FormattedCustomersTable } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Obtener clientes filtrados (o todos si no hay consulta)
  const customers: FormattedCustomersTable[] = await fetchFilteredCustomers(query);

  // Manejo de errores si no se obtienen clientes
  if (!customers || customers.length === 0) {
    throw new Error('Failed to fetch customers');
  }

  // Limitar la cantidad de clientes a mostrar por página (por ejemplo, 10)
  const pageSize = 10;
  const paginatedCustomers = customers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    
    <Suspense fallback={<p>Loading...</p>}>
      {paginatedCustomers.length > 0 && (
        <CustomersTable customers={paginatedCustomers} />
      )}
    </Suspense>
  );
}