'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Package, Tags, FolderOpen, Megaphone, FileText, Flag,
  Plus, ArrowUpRight, Sparkles, CalendarDays,
} from 'lucide-react';
import { StatCard } from './StatCard';
import { StatusPill } from './StatusPill';
import type { DashboardStats } from '@/actions/dashboard';
import type { Product, Collection, Campaign } from '@/db/schema';

type DashboardClientProps = {
  stats: DashboardStats;
  recentProducts: Product[];
  upcomingCollections: Collection[];
  liveCampaigns: Campaign[];
  locale: string;
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

function SectionHeader({
  title,
  href,
  icon: Icon,
}: {
  title: string;
  href: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center justify-between px-1 mb-3">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-muted-foreground" />
        <h3 className="text-xs tracking-[0.14em] uppercase text-muted-foreground font-semibold">
          {title}
        </h3>
      </div>
      <Link
        href={href}
        className="text-[11px] tracking-wider uppercase text-primary/70 hover:text-primary font-medium transition-colors flex items-center gap-1"
      >
        View all
        <ArrowUpRight size={11} />
      </Link>
    </div>
  );
}

const QUICK_ACTIONS = [
  { key: 'product', href: '/products/new', label: 'Product', icon: Package },
  { key: 'category', href: '/categories/new', label: 'Category', icon: Tags },
  { key: 'collection', href: '/collections/new', label: 'Collection', icon: FolderOpen },
  { key: 'banner', href: '/banners/new', label: 'Banner', icon: Flag },
] as const;

export function DashboardClient({
  stats,
  recentProducts,
  upcomingCollections,
  liveCampaigns,
  locale,
}: DashboardClientProps) {
  const base = `/${locale}/admin`;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6 lg:space-y-8"
    >
      {/* ─── KPI Row ─── */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard
          icon={<Package size={18} className="text-primary" />}
          label="Products"
          value={stats.totalProducts}
          href={`${base}/products`}
        />
        <StatCard
          icon={<Tags size={18} className="text-primary" />}
          label="Categories"
          value={stats.totalCategories}
          href={`${base}/categories`}
        />
        <StatCard
          icon={<FolderOpen size={18} className="text-primary" />}
          label="Collections"
          value={stats.totalCollections}
          href={`${base}/collections`}
        />
        <StatCard
          icon={<Megaphone size={18} className="text-admin-success" />}
          label="Live Campaigns"
          value={stats.liveCampaigns}
          href={`${base}/campaigns`}
        />
      </motion.div>

      {/* ─── Status Strip ─── */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
        {[
          { label: 'Published', value: stats.publishedProducts, color: 'text-admin-success' },
          { label: 'Drafts', value: stats.draftProducts, color: 'text-admin-warning' },
          { label: 'Pages', value: stats.totalPages, color: 'text-foreground' },
        ].map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-xl border border-border bg-card px-4 py-3 lg:py-4"
          >
            <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium">
              {s.label}
            </p>
            <p className={`font-sans font-bold tracking-tight text-2xl lg:text-3xl tabular-nums mt-0.5 ${s.color}`}>
              {s.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* ─── Quick Actions ─── */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-2 px-1 mb-3">
          <Sparkles size={14} className="text-muted-foreground" />
          <h3 className="text-xs tracking-[0.14em] uppercase text-muted-foreground font-semibold">
            Quick Create
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.key}
              prefetch={true}
              href={`${base}${action.href}`}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 transition-all duration-200 hover:border-primary/30 hover:bg-primary/[0.03] active:scale-[0.98]"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/8 dark:bg-primary/15 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-105">
                <action.icon size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground flex-1">{action.label}</span>
              <Plus
                size={14}
                className="text-muted-foreground/40 transition-all duration-200 group-hover:text-primary group-hover:rotate-90"
              />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ─── Content Grid ─── */}
      <motion.div variants={fadeUp} className="grid lg:grid-cols-5 gap-4 lg:gap-5">
        {/* Recent Products — wider column */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card overflow-hidden">
          <SectionHeader title="Recent Products" href={`${base}/products`} icon={Package} />
          {recentProducts.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <Package size={28} className="mx-auto text-muted-foreground/20 mb-3" />
              <p className="text-sm text-muted-foreground">No products yet</p>
              <Link
                href={`${base}/products/new`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mt-3 hover:underline"
              >
                <Plus size={12} />
                Add your first product
              </Link>
            </div>
          ) : (
            <div>
              {recentProducts.map((product, i) => (
                <Link
                  key={product.id}
                  prefetch={true}
                  href={`${base}/products/${product.id}/edit`}
                  className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50 border-t border-border first:border-t-0"
                >
                  {/* Thumbnail */}
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0 ring-1 ring-border">
                    <Image
                      src={product.image_url}
                      alt={product.name_en}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="40px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {product.name_en}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{product.category}</p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <StatusPill status={product.status} />
                    <span className="font-sans font-semibold text-sm tabular-nums text-foreground hidden sm:block">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right column — Campaigns + Collections stacked */}
        <div className="lg:col-span-2 flex flex-col gap-4 lg:gap-5">
          {/* Live Campaigns */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <SectionHeader title="Live Campaigns" href={`${base}/campaigns`} icon={Megaphone} />
            {liveCampaigns.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Megaphone size={24} className="mx-auto text-muted-foreground/20 mb-2" />
                <p className="text-sm text-muted-foreground">No active campaigns</p>
              </div>
            ) : (
              <div>
                {liveCampaigns.map((campaign) => (
                  <Link
                    key={campaign.id}
                    href={`${base}/campaigns/${campaign.id}/edit`}
                    className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50 border-t border-border first:border-t-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-admin-success/10 flex items-center justify-center shrink-0">
                      <Megaphone size={14} className="text-admin-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {campaign.name_en}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                        <CalendarDays size={10} />
                        {campaign.starts_at
                          ? new Date(campaign.starts_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
                          : '—'}
                        {' — '}
                        {campaign.ends_at
                          ? new Date(campaign.ends_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
                          : 'Ongoing'}
                      </p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-admin-success animate-pulse shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Collections */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <SectionHeader title="Upcoming Collections" href={`${base}/collections`} icon={FolderOpen} />
            {upcomingCollections.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <FolderOpen size={24} className="mx-auto text-muted-foreground/20 mb-2" />
                <p className="text-sm text-muted-foreground">No upcoming launches</p>
              </div>
            ) : (
              <div>
                {upcomingCollections.map((col) => (
                  <Link
                    key={col.id}
                    prefetch={true}
                    href={`${base}/collections/${col.id}/edit`}
                    className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50 border-t border-border first:border-t-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/8 dark:bg-primary/15 flex items-center justify-center shrink-0">
                      <FolderOpen size={14} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {col.name_en}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {col.launch_date
                          ? new Date(col.launch_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
                          : 'TBD'}
                      </p>
                    </div>
                    <StatusPill status="scheduled" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
