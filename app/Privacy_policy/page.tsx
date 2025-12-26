"use client";


import { Navigation } from "@/app/componets/navbar";
import { Footer } from "@/app/componets/footer";
import { Shield, Lock, Eye, Database, UserCheck, Bell } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      {/* <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-2"> */}
        {/* <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-5 h-5" />
            <h1 className="text-1xl md:text-2xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-blue-100">Last updated: December 19, 2024</p>
        </div> */}
      {/* </div> */}

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Privacy Matters</h2>
              <p className="text-gray-700">
                At Shri Hanuman Balaji Charitable Diagnostic Centre, we are committed to protecting your privacy and ensuring the security of your personal and medical information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
              </p>
            </div>
          </div>
        </div>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <Lock className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="font-semibold mb-2">Secure Storage</h3>
            <p className="text-sm text-gray-700">Your data is encrypted and stored securely</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <Eye className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="font-semibold mb-2">Transparency</h3>
            <p className="text-sm text-gray-700">Clear communication about data usage</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
            <UserCheck className="w-10 h-10 text-purple-600 mb-3" />
            <h3 className="font-semibold mb-2">Your Control</h3>
            <p className="text-sm text-gray-700">You control your personal information</p>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">1. Information We Collect</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We collect information that you provide directly to us when using our services. This may include:
              </p>
              
              <div className="ml-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information:</h4>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Name, date of birth, gender, and age</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Contact information (phone number, email address, physical address)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Government-issued identification numbers (as required)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Medical Information:</h4>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Medical history and current health conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Test results and diagnostic reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Prescription and medication information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Physician referrals and recommendations</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Payment Information:</h4>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Credit/debit card details (processed through secure payment gateways)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Insurance information and claims data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Billing and transaction history</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Technical Information:</h4>
                  <ul className="space-y-1 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>IP address and device information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Browser type and operating system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Website usage data and cookies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">2. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>To provide diagnostic and laboratory services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>To process test samples and generate reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>To schedule appointments and send reminders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>To process payments and maintain billing records</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>To communicate test results and health information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>To improve our services and patient experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>To comply with legal and regulatory requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>To send promotional offers and health tips (with your consent)</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">3. Information Sharing and Disclosure</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We may share your information in the following circumstances:
              </p>
              
              <div className="ml-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">With Your Consent:</h4>
                  <p>We share information when you explicitly authorize us to do so.</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Healthcare Providers:</h4>
                  <p>We may share your medical information with your referring physician or other healthcare providers involved in your care.</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Service Providers:</h4>
                  <p>We may share information with third-party service providers who assist us in operating our business (e.g., payment processors, IT service providers).</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Legal Requirements:</h4>
                  <p>We may disclose information when required by law, court order, or government regulation.</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Insurance Companies:</h4>
                  <p>We may share information with insurance providers for claim processing and verification.</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Public Health Authorities:</h4>
                  <p>We may report certain diseases and health conditions as required by public health laws.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">4. Data Security</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We implement appropriate technical and organizational measures to protect your personal and medical information:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Encryption of data in transit and at rest</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Secure access controls and authentication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Regular security audits and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Staff training on data protection and confidentiality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Physical security measures at our facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Secure backup and disaster recovery systems</span>
                </li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">5. Your Rights and Choices</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                You have the following rights regarding your personal information:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold mb-2">Access</h4>
                  <p className="text-sm">Request access to your personal and medical information</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold mb-2">Correction</h4>
                  <p className="text-sm">Request correction of inaccurate information</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold mb-2">Deletion</h4>
                  <p className="text-sm">Request deletion of your information (subject to legal requirements)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold mb-2">Portability</h4>
                  <p className="text-sm">Request a copy of your data in a portable format</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold mb-2">Restriction</h4>
                  <p className="text-sm">Request restriction on processing of your information</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold mb-2">Objection</h4>
                  <p className="text-sm">Object to processing for marketing purposes</p>
                </div>
              </div>

              <p className="mt-6">
                To exercise any of these rights, please contact us using the information provided at the end of this policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">6. Data Retention</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We retain your personal and medical information for as long as necessary to:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Provide our services and maintain your medical records</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Comply with legal and regulatory requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Resolve disputes and enforce our agreements</span>
                </li>
              </ul>
              <p className="mt-4">
                Medical records are typically retained for a minimum of 7 years as per Indian medical council regulations, or longer if required by law.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">7. Cookies and Tracking Technologies</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Remember your preferences and settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Understand how you use our website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Improve website performance and user experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Deliver relevant advertisements (with your consent)</span>
                </li>
              </ul>
              <p className="mt-4">
                You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">8. Third-Party Links</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">9. Children's Privacy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Our services are not directed to children under the age of 18. We do not knowingly collect personal information from children without parental consent. If we learn that we have collected information from a child without parental consent, we will delete that information promptly.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">10. International Data Transfers</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Your information is primarily stored and processed in India. If we transfer information to other countries, we will ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">11. Changes to This Privacy Policy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Posting the updated policy on our website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Updating the "Last Updated" date at the top of this policy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Sending you an email notification (for significant changes)</span>
                </li>
              </ul>
              <p className="mt-4">
                Your continued use of our services after such changes indicates your acceptance of the updated Privacy Policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">12. Contact Us</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mt-4">
                <h4 className="font-semibold mb-3">Data Protection Officer</h4>
                <p><strong>Shri Hanuman Balaji Charitable Diagnostic Centre</strong></p>
                <p className="mt-2">Plot No. X-24, Karkardooma Institutional Area</p>
                <p>New Delhi - 110092, India</p>
                <p className="mt-3">Phone: +91-7827945650, +91-7827945651</p>
                <p>Email: privacy@hanumanbalajicharitable.com</p>
                <p className="mt-3 text-sm text-gray-600">Response Time: Within 7 business days</p>
              </div>
            </div>
          </section>
        </div>

        {/* Consent Notice */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-8 rounded-lg">
          <div className="flex items-start gap-4">
            <Database className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Your Consent</h3>
              <p className="text-gray-700">
                By using our services and providing your information, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree with this policy, please do not use our services.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
