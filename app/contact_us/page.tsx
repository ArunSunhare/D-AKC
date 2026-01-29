"use client";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Navigation } from "@/app/componets/navbar";
import { Footer } from "@/app/componets/footer";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r   text-white py-20">
        {/* <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-red-100">We're here to help and answer any question you might have</p>
        </div> */}
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-600">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600">
              Plot No. X-24, Karkardooma Institutional Area, New Delhi-110092
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-600">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600">
              +91-7827945650<br />
              +91-7827945651
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-600">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600">
              info@hanumanbalajicharitable.com
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-600">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Open Hours</h3>
            <p className="text-gray-600">
              24 × 7<br />
              All Days Open
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form & Map Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
            <div className="w-20 h-1 bg-red-600 mb-8"></div>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we will get back to you as soon as possible
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="appointment">Book Appointment</option>
                  <option value="test-results">Test Results</option>
                  <option value="feedback">Feedback</option>
                  <option value="complaint">Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Map & Additional Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Find Us Here</h2>
              <div className="w-20 h-1 bg-red-600 mb-6"></div>
              <p className="text-gray-600 mb-6">
                Visit our diagnostic centre for quality healthcare services
              </p>

              {/* Google Map Embed */}
              <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.2746890645!2d77.3042!3d28.6518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM5JzA2LjUiTiA3N8KwMTgnMTUuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shri Hanuman Balaji Charitable Diagnostic Centre Location"
                />
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-8 border border-red-200">
              <h3 className="text-xl font-semibold mb-4">Quick Information</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Emergency services available 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Free home sample collection available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Online report delivery within 24-48 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Parking facility available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>Wheelchair accessible entrance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">What are your operating hours?</h3>
              <p className="text-gray-600">
                We are open 24×7, all days of the week including weekends and public holidays.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Do I need an appointment?</h3>
              <p className="text-gray-600">
                While walk-ins are welcome, we recommend booking an appointment for faster service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">How can I get my reports?</h3>
              <p className="text-gray-600">
                Reports are available online and can also be collected from the centre or sent via email.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Do you offer home sample collection?</h3>
              <p className="text-gray-600">
                Yes, we provide free home sample collection services. Call us to schedule a visit.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
