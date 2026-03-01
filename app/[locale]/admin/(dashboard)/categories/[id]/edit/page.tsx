import { setRequestLocale } from 'next-intl/server';
import { notFound }        from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CategoryForm }    from '@/components/admin/CategoryForm';
import { getCategoryById, updateCategory } from '@/actions/categories';

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function EditCategoryPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const category = await getCategoryById(Number(id));
  if (!category) notFound();

  const updateAction = async (formData: FormData) => {
    'use server';
    await updateCategory(Number(id), formData);
  };

  return (
    <div>
      <AdminPageHeader
        title={`Edit: ${category.name_en}`}
        description="Update category details."
      />
      <CategoryForm locale={locale} category={category} action={updateAction} />
    </div>
  );
}
