import { setRequestLocale } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { createCategory } from '@/actions/categories';

type Props = { params: Promise<{ locale: string }> };

export default async function NewCategoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <AdminPageHeader
        title="New Category"
        description="Create a new product category."
      />
      <CategoryForm locale={locale} action={createCategory} />
    </div>
  );
}
