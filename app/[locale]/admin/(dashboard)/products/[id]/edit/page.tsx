import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { ProductForm }      from '@/components/admin/ProductForm';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';
import { notFound }         from 'next/navigation';
import { getProductById, getProductImages } from '@/actions/products';
import { getAllCategories }  from '@/actions/categories';
import { getAllCollections } from '@/actions/collections';

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  const productId = Number(id);
  if (isNaN(productId)) notFound();

  // Parallel fetch for product data and references
  const [product, images, categories, collections] = await Promise.all([
    getProductById(productId),
    getProductImages(productId),
    getAllCategories(),
    getAllCollections()
  ]);

  if (!product) notFound();

  return (
    <div className="px-4 pt-6 pb-6 max-w-2xl mx-auto">
      {/* Back */}
      <Link prefetch={true}
        href={`/${locale}/admin/products`}
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-foreground/50 hover:text-bengal-sindoor mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="font-sans font-semibold tracking-tight text-2xl text-foreground mb-6">
        Edit {product.name_en}
      </h1>

      <ProductForm
        initialData={product}
        initialImages={images}
        categories={categories}
        collections={collections}
      />
    </div>
  );
}