"use client";

import { Download, FileText, Clock, Shield } from "lucide-react";

export function OnlineReportsSection() {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Patient Online Reports
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access your medical reports online securely and conveniently from anywhere
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Digital Reports</h3>
              <p className="text-gray-600 text-sm">Get your test results in digital format</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Access</h3>
              <p className="text-gray-600 text-sm">Reports available within 24-48 hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">Your data is protected with advanced security</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Download</h3>
              <p className="text-gray-600 text-sm">Download reports in PDF format anytime</p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://shbcdc.in/online_his/design/online_lab/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg shadow-lg"
            >
              <Download className="w-6 h-6" />
              Download Your Reports Online
            </a>
            <p className="text-gray-500 text-sm mt-3">
              Click here to access your medical reports securely
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
