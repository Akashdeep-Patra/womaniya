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
          <Link prefetch={true} href={`/${locale}/admin/categories/new`}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-xs tracking-wider uppercase rounded-md hover:bg-primary/90 transition-colors"
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
              className="text-sm text-primary hover:underline"
            >
              Create Category
            </Link>
          }
        />
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr className="border-b border-border">
                  <th className="text-left text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium py-3 px-5">
                    Name
                  </th>
                  <th className="text-left text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium py-3 px-5 hidden sm:table-cell">
                    Slug
                  </th>
                  <th className="text-left text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium py-3 px-5">
                    Status
                  </th>
                  <th className="text-left text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium py-3 px-5 hidden md:table-cell">
                    Order
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cats.map((cat) => (
                  <tr key={cat.id} className="transition-colors hover:bg-muted/50 group">
                    <td className="py-3 px-5">
                      <Link 
                        href={`/${locale}/admin/categories/${cat.id}/edit`}
                        className="text-sm font-medium text-foreground group-hover:text-primary transition-colors block"
                      >
                        {cat.name_en}
                        {cat.name_bn && (
                          <span className="text-muted-foreground ml-2 font-bengali text-xs group-hover:text-primary/70 transition-colors">
                            {cat.name_bn}
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="py-3 px-5 text-xs text-muted-foreground hidden sm:table-cell">
                      {cat.slug}
                    </td>
                    <td className="py-3 px-5">
                      <StatusPill status={cat.status} />
                    </td>
                    <td className="py-3 px-5 text-xs text-muted-foreground hidden md:table-cell">
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
