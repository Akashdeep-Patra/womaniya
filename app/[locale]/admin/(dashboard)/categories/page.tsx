import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { getAllCategories } from '@/actions/categories';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { StatusPill } from '@/components/admin/StatusPill';
import { EmptyState } from '@/components/admin/EmptyState';

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
          <Link
            href={`/${locale}/admin/categories/new`}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#8A1C14] text-white text-xs tracking-wider uppercase rounded-md hover:bg-[#B3241C] transition-colors"
          >
            <PlusCircle size={16} />
            Add Category
          </Link>
        }
      />

      {cats.length === 0 ? (
        <EmptyState
          title="No categories yet"
          description="Create your first category to organize your products."
          action={
            <Link
              href={`/${locale}/admin/categories/new`}
              className="text-sm text-[#8A1C14] hover:underline"
            >
              Create Category
            </Link>
          }
        />
      ) : (
        <div className="bg-white rounded-lg border border-[#C5A059]/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#C5A059]/10">
                  <th className="text-left text-[10px] tracking-[0.15em] uppercase text-foreground/40 font-medium py-3 px-5">
                    Name
                  </th>
                  <th className="text-left text-[10px] tracking-[0.15em] uppercase text-foreground/40 font-medium py-3 px-5 hidden sm:table-cell">
                    Slug
                  </th>
                  <th className="text-left text-[10px] tracking-[0.15em] uppercase text-foreground/40 font-medium py-3 px-5">
                    Status
                  </th>
                  <th className="text-left text-[10px] tracking-[0.15em] uppercase text-foreground/40 font-medium py-3 px-5 hidden md:table-cell">
                    Order
                  </th>
                </tr>
              </thead>
              <tbody>
                {cats.map((cat) => (
                  <tr key={cat.id} className="border-b border-[#C5A059]/5 hover:bg-[#C5A059]/3 transition-colors">
                    <td className="py-3 px-5">
                      <Link
                        href={`/${locale}/admin/categories/${cat.id}/edit`}
                        className="text-sm font-medium text-foreground hover:text-[#8A1C14] transition-colors"
                      >
                        {cat.name_en}
                        {cat.name_bn && (
                          <span className="text-foreground/40 ml-2 font-bengali text-xs">
                            {cat.name_bn}
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="py-3 px-5 text-xs text-foreground/40 hidden sm:table-cell">
                      {cat.slug}
                    </td>
                    <td className="py-3 px-5">
                      <StatusPill status={cat.status} />
                    </td>
                    <td className="py-3 px-5 text-xs text-foreground/40 hidden md:table-cell">
                      {cat.sort_order}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
