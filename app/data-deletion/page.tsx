import Link from "next/link";

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-teal-400 hover:text-teal-300 mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl font-bold mb-8">Data Deletion Request</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">How to Delete Your Data</h2>
            <p>You can request deletion of your account and associated data in two ways:</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Option 1: Delete from Dashboard</h2>
            <p>Log in to your account at <Link href="https://admin.rafikisms.com" className="text-teal-400 hover:underline">admin.rafikisms.com</Link>, navigate to Profile Settings, and use the Delete Account option. This will immediately remove your personal data and queue the deletion of your SMS logs and transaction history.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Option 2: Email Request</h2>
            <p>Send an email to support@rafikisms.com from the email address registered on your account with the subject line "Data Deletion Request". Include your account email and phone number for verification. We will process your request within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">What Gets Deleted</h2>
            <p>When you request data deletion, the following information is permanently removed:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Your account profile and credentials</li>
              <li>Personal information (name, email, phone)</li>
              <li>API keys and tokens</li>
              <li>SMS logs and delivery reports</li>
              <li>Billing and transaction history</li>
              <li>Sender name requests and approvals</li>
            </ul>
            <p className="mt-3">Some data may be retained for a limited period as required by applicable law or for legitimate business purposes such as fraud prevention.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Confirmation</h2>
            <p>Once your data deletion request is processed, you will receive a confirmation email. If you have any questions, contact us at support@rafikisms.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
