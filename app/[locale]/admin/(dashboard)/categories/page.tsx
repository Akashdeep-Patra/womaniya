import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { getAllCategories } from '@/actions/categories';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CategoryTableClient } from '@/components/admin/CategoryTableClient';

type Props = { params: Promise<{ locale: string }> };

export default async function CategoriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cats = await getAllCategories();

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        description={`${cats.length} categories`}
        actions={
          <Link prefetch={true} href={`/${locale}/admin/categories/new`}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-xs tracking-wider uppercase rounded-md hover:bg-primary/90 transition-colors"
          >
            <PlusCircle size={16} />
            Add Category
          </Link>
        }
      />

      <CategoryTableClient initialCategories={cats} locale={locale} />
    </div>
  );
}
