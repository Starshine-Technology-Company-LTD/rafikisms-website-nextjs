import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import ShowcaseSection from "@/components/showcase/ShowcaseSection";
import ApproachSection from "@/components/approach/ApproachSection";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TeamSection } from "@/components/landing/team-section";
import { FaqSection } from "@/components/landing/faq-section";
import { ContactSection } from "@/components/landing/contact-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { fetchLandingPublicData } from "@/lib/rafiki-public-api";
import { getVendorRegisterUrl, getVendorSignInUrl } from "@/lib/vendor-url";

export default async function Home() {
  const { branding, team, pricings } = await fetchLandingPublicData();
  const vendorSignInUrl = getVendorSignInUrl();
  const vendorRegisterUrl = getVendorRegisterUrl();
  const logoSrc = branding?.logo_url?.trim() || null;

  return (
    <main className="relative min-h-screen overflow-x-clip noise-overlay">
      <Navigation
        logoSrc={logoSrc}
        vendorSignInUrl={vendorSignInUrl}
        vendorRegisterUrl={vendorRegisterUrl}
      />
      <HeroSection vendorRegisterUrl={vendorRegisterUrl} />
      <FeaturesSection />
      <ShowcaseSection />
      <ApproachSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <MetricsSection />
      <IntegrationsSection />
      <SecuritySection />
      <DevelopersSection />
      <TestimonialsSection />
      <PricingSection
        tiers={pricings ?? undefined}
        vendorRegisterUrl={vendorRegisterUrl}
      />
      <TeamSection members={team ?? undefined} />
      <FaqSection />
      <ContactSection />
      <CtaSection
        vendorSignInUrl={vendorSignInUrl}
        vendorRegisterUrl={vendorRegisterUrl}
      />
      <FooterSection logoSrc={logoSrc} />
    </main>
  );
}
