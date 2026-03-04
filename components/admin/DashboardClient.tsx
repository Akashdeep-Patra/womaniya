'use client';

import Link from 'next/link';
import { Package, Tags, FolderOpen, Megaphone, FileText, PlusCircle, ArrowRight } from 'lucide-react';
import { StatCard } from './StatCard';
import { StatusPill } from './StatusPill';
import { EmptyState } from './EmptyState';
import type { DashboardStats } from '@/actions/dashboard';
import type { Product } from '@/db/schema';
import type { Collection, Campaign } from '@/db/schema';

type DashboardClientProps = {
  stats: DashboardStats;
  recentProducts: Product[];
  upcomingCollections: Collection[];
  liveCampaigns: Campaign[];
  locale: string;
};

export function DashboardClient({
  stats,
  recentProducts,
  upcomingCollections,
  liveCampaigns,
  locale,
}: DashboardClientProps) {
  const base = `/${locale}/admin`;

  return (
    <div className="space-y-8">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard
          icon={<Package size={18} className="text-[#C5A059]" />}
          label="Total Products"
          value={stats.totalProducts}
          variant="dark"
        />
        <StatCard
          icon={<Tags size={18} className="text-[#8A1C14]" />}
          label="Categories"
          value={stats.totalCategories}
          variant="accent"
        />
        <StatCard
          icon={<FolderOpen size={18} className="text-foreground/60" />}
          label="Collections"
          value={stats.totalCollections}
        />
        <StatCard
          icon={<Megaphone size={18} className="text-[#2D7A4F]" />}
          label="Live Campaigns"
          value={stats.liveCampaigns}
        />
      </div>

      {/* Secondary stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Published</p>
          <p className="font-sans font-semibold tracking-tight text-2xl text-primary">{stats.publishedProducts}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Drafts</p>
          <p className="font-sans font-semibold tracking-tight text-2xl text-accent">{stats.draftProducts}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Pages</p>
          <p className="font-sans font-semibold tracking-tight text-2xl text-foreground">{stats.totalPages}</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { href: `${base}/products/new`, label: 'Add Product', icon: PlusCircle, colorClass: 'text-primary', bgClass: 'bg-primary/10' },
          { href: `${base}/categories/new`, label: 'Add Category', icon: Tags, colorClass: 'text-accent', bgClass: 'bg-accent/10' },
          { href: `${base}/collections/new`, label: 'New Collection', icon: FolderOpen, colorClass: 'text-primary', bgClass: 'bg-primary/10' },
          { href: `${base}/pages/new`, label: 'New Page', icon: FileText, colorClass: 'text-foreground', bgClass: 'bg-foreground/10' },
        ].map((action) => (
          <Link prefetch={true}
            key={action.href}
            prefetch={true}
            href={action.href}
            className="flex items-center gap-3 bg-card rounded-lg border border-border p-4 hover:bg-muted transition-colors group"
          >
            <div
              className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${action.bgClass}`}
            >
              <action.icon size={18} className={action.colorClass} />
            </div>
            <span className="text-sm font-medium text-foreground">{action.label}</span>
            <ArrowRight
              size={14}
              className="ml-auto text-muted-foreground group-hover:text-foreground transition-colors"
            />
          </Link>
        ))}
      </div>

      {/* Two column layout: Recent Products + Live Campaigns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-background rounded-lg border border-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium">
              Recent Products
            </h3>
            <Link prefetch={true} href={`${base}/products`} className="text-[10px] tracking-wider uppercase text-bengal-kansa hover:underline">
              View all
            </Link>
          </div>
          {recentProducts.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title="No products yet"
                description="Add your first product to get started."
                action={
                  <Link prefetch={true} href={`${base}/products/new`} className="text-sm text-bengal-sindoor hover:underline">
                    Add Product
                  </Link>
                }
              />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentProducts.map((product) => (
                <Link prefetch={true}
                  key={product.id}
                  href={`${base}/products/${product.id}/edit`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{product.name_en}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={product.status} />
                    <span className="font-sans font-semibold tracking-tight text-bengal-sindoor">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Live Campaigns + Upcoming Collections */}
        <div className="space-y-4">
          <div className="bg-background rounded-lg border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium">
                Live Campaigns
              </h3>
              <Link prefetch={true} href={`${base}/campaigns`} className="text-[10px] tracking-wider uppercase text-bengal-kansa hover:underline">
                View all
              </Link>
            </div>
            {liveCampaigns.length === 0 ? (
              <div className="px-5 py-6 text-center text-sm text-muted-foreground">
                No active campaigns
              </div>
            ) : (
              <div className="divide-y divide-border">
                {liveCampaigns.map((campaign) => (
                  <Link prefetch={true}
                    key={campaign.id}
                    href={`${base}/campaigns/${campaign.id}/edit`}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{campaign.name_en}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {campaign.starts_at
                          ? new Date(campaign.starts_at).toLocaleDateString()
                          : ''}{' '}
                        —{' '}
                        {campaign.ends_at
                          ? new Date(campaign.ends_at).toLocaleDateString()
                          : 'Ongoing'}
                      </p>
                    </div>
                    <StatusPill status="live" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="bg-background rounded-lg border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-medium">
                Upcoming Collections
              </h3>
              <Link prefetch={true} href={`${base}/collections`} className="text-[10px] tracking-wider uppercase text-bengal-kansa hover:underline">
                View all
              </Link>
            </div>
            {upcomingCollections.length === 0 ? (
              <div className="px-5 py-6 text-center text-sm text-muted-foreground">
                No upcoming launches
              </div>
            ) : (
              <div className="divide-y divide-border">
                {upcomingCollections.map((col) => (
                  <Link prefetch={true}
                    key={col.id}
                    href={`${base}/collections/${col.id}/edit`}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{col.name_en}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Launches {col.launch_date ? new Date(col.launch_date).toLocaleDateString() : 'TBD'}
                      </p>
                    </div>
                    <StatusPill status="scheduled" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
