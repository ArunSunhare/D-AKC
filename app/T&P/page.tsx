"use client";
import { Navigation } from "@/app/componets/navbar";
import { Footer } from "@/app/componets/footer";
import { FileText, Shield, AlertCircle, CheckCircle } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      {/* <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <FileText className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
          </div>
          <p className="text-xl text-red-100">Last updated: December 19, 2024</p>
        </div>
      </div> */}

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Important Notice</h2>
              <p className="text-gray-700">
                Please read these terms and conditions carefully before using our services. By accessing or using Shri Hanuman Balaji Charitable Diagnostic Centre's services, you agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                By accessing and using the services provided by Shri Hanuman Balaji Charitable Diagnostic Centre ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                We reserve the right to update, change, or replace any part of these Terms and Conditions by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">2. Services Provided</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Shri Hanuman Balaji Charitable Diagnostic Centre provides medical diagnostic and testing services including but not limited to:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Pathology and laboratory testing services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Radiology and imaging services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Health checkup packages</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Home sample collection services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Online report delivery</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">3. Appointment and Scheduling</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Appointments can be scheduled through our website, phone, or in-person visits. While we strive to accommodate all appointments at the scheduled time, delays may occur due to emergency situations or unforeseen circumstances.
              </p>
              <p>
                Cancellations must be made at least 24 hours in advance. Repeated no-shows or last-minute cancellations may result in restrictions on future bookings.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">4. Patient Responsibilities</h2>
            <div className="space-y-4 text-gray-700">
              <p>As a patient, you agree to:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Provide accurate and complete information about your health history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Follow pre-test instructions provided by our staff</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Arrive on time for scheduled appointments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Treat our staff and other patients with respect and courtesy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Make timely payments for services rendered</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">5. Payment Terms</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Payment for services is due at the time of service unless other arrangements have been made in advance. We accept cash, credit/debit cards, and digital payment methods.
              </p>
              <p>
                Prices for tests and packages are subject to change without prior notice. The price applicable at the time of service will be charged.
              </p>
              <p>
                In case of insurance claims, patients are responsible for any amounts not covered by their insurance provider.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">6. Test Results and Reports</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Test results will be made available within the timeframe specified for each test. Reports can be accessed online, collected in person, or sent via email as per patient preference.
              </p>
              <p>
                Results will only be shared with the patient or their authorized representative. Proper identification may be required to collect physical reports.
              </p>
              <p>
                We are not responsible for delays in report delivery caused by factors beyond our control, such as technical issues or courier service delays.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">7. Privacy and Confidentiality</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We are committed to protecting your privacy and maintaining the confidentiality of your medical information. All patient information is handled in accordance with applicable privacy laws and regulations.
              </p>
              <p>
                Your medical information may be shared with healthcare providers, insurance companies, or other relevant parties only with your consent or as required by law.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">8. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                While we strive to provide accurate and reliable diagnostic services, we cannot guarantee specific outcomes. Test results should be interpreted by qualified healthcare professionals in the context of the patient's overall health.
              </p>
              <p>
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">9. Refund and Cancellation Policy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Refunds for cancelled tests or services will be processed according to the following terms:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Cancellations made 24 hours before scheduled appointment: Full refund</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Cancellations made less than 24 hours: 50% refund</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>No-shows: No refund</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Sample already collected: No refund</span>
                </li>
              </ul>
              <p className="mt-4">
                Refunds will be processed within 7-10 business days to the original payment method.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">10. Intellectual Property</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                All content on our website, including text, graphics, logos, images, and software, is the property of Shri Hanuman Balaji Charitable Diagnostic Centre and is protected by copyright and other intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, or create derivative works from our content without our express written permission.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">11. Force Majeure</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We shall not be liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, wars, strikes, government actions, or pandemics.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">12. Governing Law</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in New Delhi.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-600">13. Contact Information</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Shri Hanuman Balaji Charitable Diagnostic Centre</strong></p>
                <p className="mt-2">Plot No. X-24, Karkardooma Institutional Area</p>
                <p>New Delhi - 110092</p>
                <p className="mt-2">Phone: +91-7827945650, +91-7827945651</p>
                <p>Email: info@hanumanbalajicharitable.com</p>
              </div>
            </div>
          </section>
        </div>

        {/* Acknowledgment Box */}
        <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-8 rounded-lg">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Acknowledgment</h3>
              <p className="text-gray-700">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and Shri Hanuman Balaji Charitable Diagnostic Centre.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
