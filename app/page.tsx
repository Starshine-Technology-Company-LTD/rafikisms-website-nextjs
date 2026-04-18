import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ShowcaseSection } from "@/components/landing/showcase-section";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { ApproachSection } from "@/components/landing/approach-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TeamSection } from "@/components/landing/team-section";
import { FaqSection } from "@/components/landing/faq-section";
import { ContactSection } from "@/components/landing/contact-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip noise-overlay">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <section
        id="process"
        className="relative z-20 isolate bg-background py-20 lg:py-28"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
              Our Process
            </p>
            <h2 className="font-display text-3xl tracking-tight text-foreground md:text-5xl">
              A collaboration journey,
              <br />
              from concept to delivery
            </h2>
          </div>
          {/* Opaque shell: translucent + backdrop-blur sampled the sticky showcase behind this block */}
          <div className="rounded-3xl border border-foreground/10 bg-card p-6 shadow-sm md:p-10 dark:bg-card">
            <ProcessTimeline />
          </div>
        </div>
      </section>
      <HowItWorksSection />
      <InfrastructureSection />
      <MetricsSection />
      <IntegrationsSection />
      <SecuritySection />
      <ApproachSection />
      <DevelopersSection />
      <TestimonialsSection />
      <PricingSection />
      <TeamSection />
      <FaqSection />
      <ContactSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
