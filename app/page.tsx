import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import CapabilitiesShader from "./components/ui/capabilities-shader";
import Showcase from "./components/Showcase";
import Approach from "./components/Approach";
import Process from "./components/Process";
import { DashboardShowcase } from "./components/ui/dashboard-showcase";
import Integrations from "./components/Integrations";
import Security from "./components/Security";
import Developers from "./components/Developers";
import Customers from "./components/Customers";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <CapabilitiesShader />
        <Showcase />
        <Approach />
        <Process />
        <DashboardShowcase />
        <Integrations />
        <Security />
        <Developers />
        <Customers />
        <Pricing />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
