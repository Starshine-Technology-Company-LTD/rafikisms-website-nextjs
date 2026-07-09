import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-teal-400 hover:text-teal-300 mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: July 2026</p>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the RafikiSMS platform, you agree to be bound by these Terms of Service. If you do not agree, you may not use the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>RafikiSMS provides an SMS gateway API platform that enables businesses to send and receive SMS messages, manage sender IDs, track delivery reports, and integrate SMS capabilities into their applications.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Account Registration</h2>
            <p>You must register for an account and provide accurate information. You are responsible for maintaining the confidentiality of your API keys and credentials. You must notify us immediately of any unauthorized use.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Acceptable Use</h2>
            <p>You agree not to use the service for sending unsolicited messages (spam), illegal content, harassment, or any purpose that violates applicable laws. All messages must comply with TCRA (Tanzania Communications Regulatory Authority) regulations.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Sender IDs</h2>
            <p>Sender IDs must be registered and approved before use. You may only use sender IDs assigned to your account. Misrepresentation of sender identity is prohibited.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Fees and Payment</h2>
            <p>Service fees are based on the pricing plan selected. Payments are processed through Snippe (mobile money, card, or QR). Refunds are issued per our refund policy. Failed payments may result in service suspension.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Service Availability</h2>
            <p>We strive for high availability but do not guarantee 100% uptime. We are not liable for delays or failures caused by network issues, carrier outages, or circumstances beyond our control.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>RafikiSMS shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the service. Our total liability is limited to the fees paid in the 12 months preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Termination</h2>
            <p>Either party may terminate the agreement with 30 days notice. We may suspend or terminate access immediately for violation of these terms. Upon termination, you must cease using the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
            <p>These terms are governed by the laws of the United Republic of Tanzania. Any disputes shall be resolved in the courts of Tanzania.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Contact</h2>
            <p>For questions about these terms, contact us at legal@rafikisms.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
