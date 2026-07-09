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
            <p>By accessing or using the RafikiSMS platform, you agree to be bound by these Terms of Service. If you do not agree, you may not use the service. Continued use constitutes acceptance of any updates to these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>RafikiSMS is an enterprise SMS gateway platform that provides API-based SMS sending, sender ID management, delivery tracking, OTP generation and verification, AI-powered SMS tools, and real-time delivery webhooks. The platform connects to mobile network operators in Tanzania, including Airtel Tanzania, for message delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Account Registration</h2>
            <p>You must register for an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your API keys and account credentials. API keys can be generated, renewed, and revoked from your account dashboard. You must notify us immediately of any unauthorized use at support@rafikisms.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Acceptable Use</h2>
            <p>You agree not to use the service for sending unsolicited messages (spam), illegal content, harassment, phishing, or any purpose that violates applicable laws of Tanzania. All messages must comply with Tanzania Communications Regulatory Authority (TCRA) regulations. We reserve the right to suspend accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Sender ID Registration</h2>
            <p>Sender IDs must be registered and approved before use. Requests are submitted to Airtel Tanzania for whitelisting. You may only use sender IDs assigned to your account. Approval typically takes 7 to 14 business days. Misrepresentation of sender identity is prohibited and may result in account suspension.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Fees and Payment</h2>
            <p>Service fees are based on your selected pricing plan. SMS credits are purchased upfront and deducted per message sent. Payments are processed through Snippe via mobile money (M-Pesa, Airtel Money), card (Visa, Mastercard), or dynamic QR. Postpaid billing is available for qualifying enterprise accounts. Failed payments may result in service suspension. Refunds are handled on a case-by-case basis.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Service Availability</h2>
            <p>We strive for high availability but do not guarantee 100% uptime. Our platform is deployed on redundant infrastructure with automated failover. We are not liable for delays or failures caused by mobile network operator outages, network conditions, fiber cuts, or circumstances beyond our reasonable control.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>RafikiSMS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use the service. Our total liability is limited to the fees paid by you in the 12 months preceding the claim. Some jurisdictions do not allow certain limitations, so some of the above may not apply to you.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Termination</h2>
            <p>Either party may terminate the agreement with 30 days written notice. We may suspend or terminate access immediately for violation of these terms, including sending spam or illegal content. Upon termination, you must cease using the service. Data will be retained per our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
            <p>These terms are governed by the laws of the United Republic of Tanzania. Any disputes arising from these terms shall be resolved in the courts of Dar es Salaam, Tanzania.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Contact</h2>
            <p>For questions about these terms, contact us at legal@rafikisms.com.</p>
            <p className="mt-2">RafikiSMS is a service of Starshine Technology Company LTD, Tanzania.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
