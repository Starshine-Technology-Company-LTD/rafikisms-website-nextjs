import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-teal-400 hover:text-teal-300 mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: July 2026</p>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>We collect information you provide when creating an account, including your name, email address, phone number, and company details. We also collect SMS metadata (sender ID, recipient, timestamp, delivery status) necessary for providing our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>Your information is used solely to operate, maintain, and improve our SMS gateway services. This includes processing and delivering SMS messages, generating delivery reports, managing your account, and providing customer support.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. SMS Message Content</h2>
            <p>We process SMS message content only as necessary to transmit messages through our network and connected carriers. We do not read, store, or analyze the content of your SMS messages beyond what is required for delivery and reporting.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data with trusted third-party carriers and service providers solely for the purpose of delivering SMS messages. We may also disclose information if required by law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
            <p>SMS logs and delivery reports are retained for as long as your account is active and for a reasonable period thereafter to comply with legal obligations and resolve disputes. You may request deletion of your account and associated data by contacting support.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Security</h2>
            <p>We implement industry-standard security measures including encryption in transit (TLS), encrypted storage, and access controls to protect your data. API keys are hashed before storage. Regular security audits are conducted.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. You may also request a copy of your data. To exercise these rights, contact us at support@rafikisms.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
            <p>For privacy-related inquiries, contact us at privacy@rafikisms.com or visit our <Link href="/contact" className="text-teal-400 hover:underline">Contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
