import { BarChart3, MessageSquare, Users, TrendingUp } from 'lucide-react'

export function DashboardShowcase() {
  return (
    <section className="overflow-hidden py-16 md:py-32 bg-white dark:bg-black transition-colors duration-300">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8 md:space-y-12">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-medium text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-3">Dashboard</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Real-time control for your SMS operations
          </h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            Monitor delivery, manage sender IDs, track billing, and keep your team aligned from a single dashboard.
          </p>
        </div>
        <div className="relative rounded-3xl p-3">
          <div className="[perspective:800px]">
            <div className="[transform:skewY(-2deg)skewX(-2deg)rotateX(6deg)]">
              <div className="aspect-[88/36] relative">
                <div className="[background-image:radial-gradient(var(--tw-gradient-stops,at_75%_25%))] to-background z-1 -inset-[4.25rem] absolute from-transparent to-75%"></div>
                <img src="/dashbaord-light.png" className="dark:hidden absolute inset-0 z-10 rounded-2xl" alt="Dashboard light" width={2797} height={1137} />
                <img src="/dashboard-dark.png" className="hidden dark:block absolute inset-0 z-10 rounded-2xl" alt="Dashboard dark" width={2797} height={1137} />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-20 md:pt-28 border-t border-teal-200/50 dark:border-teal-800/30">
          <div className="relative mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center ring-1 ring-teal-500/20">
                  <BarChart3 className="size-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Live metrics</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Real-time delivery rates, queue depth, and throughput at a glance.</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center ring-1 ring-teal-500/20">
                  <MessageSquare className="size-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Sender management</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Approve, block, and assign sender IDs with governance controls.</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center ring-1 ring-teal-500/20">
                  <Users className="size-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Team roles</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Granular permissions for finance, operations, and support teams.</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center ring-1 ring-teal-500/20">
                  <TrendingUp className="size-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Billing & exports</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Usage reports, invoice history, and CSV exports ready for reconciliation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
