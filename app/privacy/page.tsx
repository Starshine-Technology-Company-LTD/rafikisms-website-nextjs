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
            <p>When you register for an account, we collect your name, email address, phone number, and company details. As you use the platform, we collect SMS transaction data including sender IDs, recipient phone numbers, message timestamps, delivery status, and API request logs. This data is necessary to operate the SMS gateway, process message delivery, and generate delivery reports.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>We use your information to provide and maintain the RafikiSMS platform, process and deliver SMS messages through connected carrier networks (including Airtel Tanzania), generate delivery reports and analytics, manage sender ID registrations with regulatory authorities, process payments through Snippe, and communicate with you about your account and service updates.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Message Content</h2>
            <p>We process SMS message content only as necessary to transmit messages through our infrastructure and to connected mobile network operators. Message content is not stored, read, or used for any purpose beyond delivery. SMS logs retain metadata such as recipient, sender ID, timestamp, and delivery status, but not the full message body after delivery is complete.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Sharing</h2>
            <p>We do not sell your personal information. We share data with mobile network operators (such as Airtel Tanzania) as required to deliver SMS messages. We may share data with payment processors (Snippe) to process transactions. We may disclose information if required by law or to protect our rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
            <p>SMS logs and delivery reports are retained for the duration of your active account and for a period thereafter to comply with legal obligations, resolve disputes, and enforce agreements. You may request deletion of your account and associated data by contacting support@rafikisms.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Security</h2>
            <p>We implement industry-standard security measures. All API traffic is encrypted in transit using TLS. API keys are hashed using SHA-256 before storage. Database access is restricted and monitored. Regular security reviews are conducted to protect your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data held by RafikiSMS. You may request a copy of your data. To exercise these rights, contact support@rafikisms.com. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
            <p>For privacy-related inquiries, contact us at privacy@rafikisms.com.</p>
            <p className="mt-2">RafikiSMS is a service of Starshine Technology Company LTD, Tanzania.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
