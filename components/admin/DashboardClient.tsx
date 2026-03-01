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
          icon={<FolderOpen size={18} className="text-[#1A1918]/60" />}
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
        <div className="bg-white border border-[#C5A059]/10 rounded-lg p-4 text-center">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 mb-1">Published</p>
          <p className="font-editorial text-2xl text-[#2D7A4F]">{stats.publishedProducts}</p>
        </div>
        <div className="bg-white border border-[#C5A059]/10 rounded-lg p-4 text-center">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 mb-1">Drafts</p>
          <p className="font-editorial text-2xl text-[#D4A017]">{stats.draftProducts}</p>
        </div>
        <div className="bg-white border border-[#C5A059]/10 rounded-lg p-4 text-center">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 mb-1">Pages</p>
          <p className="font-editorial text-2xl text-[#1A1918]">{stats.totalPages}</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { href: `${base}/products/new`, label: 'Add Product', icon: PlusCircle, color: '#8A1C14' },
          { href: `${base}/categories/new`, label: 'Add Category', icon: Tags, color: '#C5A059' },
          { href: `${base}/collections/new`, label: 'New Collection', icon: FolderOpen, color: '#2D7A4F' },
          { href: `${base}/pages/new`, label: 'New Page', icon: FileText, color: '#1A1918' },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-3 rounded-lg border border-[#C5A059]/10 p-4 hover:bg-[#C5A059]/5 transition-colors group"
          >
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${action.color}10` }}
            >
              <action.icon size={18} style={{ color: action.color }} />
            </div>
            <span className="text-sm font-medium text-[#1A1918]">{action.label}</span>
            <ArrowRight
              size={14}
              className="ml-auto text-[#1A1918]/20 group-hover:text-[#1A1918]/50 transition-colors"
            />
          </Link>
        ))}
      </div>

      {/* Two column layout: Recent Products + Live Campaigns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-lg border border-[#C5A059]/10 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#C5A059]/5">
            <h3 className="text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium">
              Recent Products
            </h3>
            <Link href={`${base}/products`} className="text-[10px] tracking-wider uppercase text-[#C5A059] hover:underline">
              View all
            </Link>
          </div>
          {recentProducts.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title="No products yet"
                description="Add your first product to get started."
                action={
                  <Link href={`${base}/products/new`} className="text-sm text-[#8A1C14] hover:underline">
                    Add Product
                  </Link>
                }
              />
            </div>
          ) : (
            <div className="divide-y divide-[#C5A059]/5">
              {recentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`${base}/products/${product.id}/edit`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-[#C5A059]/3 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[#1A1918]">{product.name_en}</p>
                    <p className="text-xs text-[#1A1918]/40 mt-0.5">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={product.status} />
                    <span className="font-editorial text-[#8A1C14]">
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
          <div className="bg-white rounded-lg border border-[#C5A059]/10 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#C5A059]/5">
              <h3 className="text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium">
                Live Campaigns
              </h3>
              <Link href={`${base}/campaigns`} className="text-[10px] tracking-wider uppercase text-[#C5A059] hover:underline">
                View all
              </Link>
            </div>
            {liveCampaigns.length === 0 ? (
              <div className="px-5 py-6 text-center text-sm text-[#1A1918]/30">
                No active campaigns
              </div>
            ) : (
              <div className="divide-y divide-[#C5A059]/5">
                {liveCampaigns.map((campaign) => (
                  <Link
                    key={campaign.id}
                    href={`${base}/campaigns/${campaign.id}/edit`}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-[#C5A059]/3 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#1A1918]">{campaign.name_en}</p>
                      <p className="text-xs text-[#1A1918]/40 mt-0.5">
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

          <div className="bg-white rounded-lg border border-[#C5A059]/10 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#C5A059]/5">
              <h3 className="text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/50 font-medium">
                Upcoming Collections
              </h3>
              <Link href={`${base}/collections`} className="text-[10px] tracking-wider uppercase text-[#C5A059] hover:underline">
                View all
              </Link>
            </div>
            {upcomingCollections.length === 0 ? (
              <div className="px-5 py-6 text-center text-sm text-[#1A1918]/30">
                No upcoming launches
              </div>
            ) : (
              <div className="divide-y divide-[#C5A059]/5">
                {upcomingCollections.map((col) => (
                  <Link
                    key={col.id}
                    href={`${base}/collections/${col.id}/edit`}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-[#C5A059]/3 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#1A1918]">{col.name_en}</p>
                      <p className="text-xs text-[#1A1918]/40 mt-0.5">
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
