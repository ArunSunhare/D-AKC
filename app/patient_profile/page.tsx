"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Calendar, MapPin, Home, Edit, LogOut, ArrowLeft, X } from "lucide-react";
import { Navigation } from "@/app/componets/navbar";
import { Footer } from "@/app/componets/footer";

interface UserProfile {
  name?: string;
  mobile?: string;
  requestId?: string;
  MRNo?: string;
  Title?: string;
  FirstName?: string;
  PatientLastName?: string;
  Gender?: string;
  DOB?: string;
  Age?: string;
  MobileNo?: string;
  Email?: string;
  Address?: string;
  Country?: string;
  State?: string;
  District?: string;
  City?: string;
  PinCode?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedProfile = localStorage.getItem("userProfile");

    if (!storedUser) {
      router.push("/signin");
      return;
    }

    const userData = JSON.parse(storedUser);
    const profileData = storedProfile ? JSON.parse(storedProfile) : null;

    setUser({
      ...userData,
      ...profileData
    });
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    router.push("/");
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    if (user) {
      setUser({ ...user, [field]: value });
    }
  };

  const handleSave = () => {
    if (user) {
      localStorage.setItem("userProfile", JSON.stringify(user));
      setIsEditing(false);
      alert("Profile updated successfully!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header with Orange Gradient */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-6 relative">
            <button
              onClick={() => router.push("/")}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {getInitial(user.name || user.FirstName || "U")}
                </div>
              </div>
              
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">
                  {user.Title} {user.FirstName} {user.PatientLastName}
                </h2>
                <p className="text-orange-100">Patient ID: {user.MRNo || user.requestId || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="p-6">
              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mb-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                )}
              </div>

              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="flex items-center gap-2 text-gray-700 font-bold text-lg mb-4 pb-2 border-b border-gray-200">
                  <User className="w-5 h-5 text-orange-500" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Title"
                    value={user.Title}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('Title', val)}
                    type="select"
                    options={['Mr', 'Mrs', 'Ms', 'Dr', 'Baby']}
                  />

                  <FormField
                    label="Request ID"
                    value={user.requestId || "N/A"}
                    isEditing={false}
                    readOnly
                  />

                  <FormField
                    label="First Name"
                    value={user.FirstName}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('FirstName', val)}
                  />

                  <FormField
                    label="Last Name"
                    value={user.PatientLastName}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('PatientLastName', val)}
                  />

                  <FormField
                    label="MR Number"
                    value={user.MRNo || "N/A"}
                    isEditing={false}
                    readOnly
                  />

                  <FormField
                    label="Gender"
                    value={user.Gender}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('Gender', val)}
                    type="select"
                    options={['Male', 'Female', 'Other']}
                  />

                  <FormField
                    label="Date of Birth"
                    value={user.DOB}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('DOB', val)}
                    type="date"
                  />

                  <FormField
                    label="Age"
                    value={user.Age ? `${user.Age} years` : "N/A"}
                    isEditing={false}
                    readOnly
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="flex items-center gap-2 text-gray-700 font-bold text-lg mb-4 pb-2 border-b border-gray-200">
                  <Phone className="w-5 h-5 text-orange-500" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Mobile Number"
                    value={user.MobileNo || user.mobile}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('MobileNo', val)}
                    type="tel"
                  />

                  <FormField
                    label="Email Address"
                    value={user.Email}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('Email', val)}
                    type="email"
                  />
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="flex items-center gap-2 text-gray-700 font-bold text-lg mb-4 pb-2 border-b border-gray-200">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <FormField
                      label="Street Address"
                      value={user.Address}
                      isEditing={isEditing}
                      onChange={(val) => handleInputChange('Address', val)}
                      fullWidth
                    />
                  </div>

                  <FormField
                    label="Country"
                    value={user.Country}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('Country', val)}
                  />

                  <FormField
                    label="State"
                    value={user.State}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('State', val)}
                  />

                  <FormField
                    label="District"
                    value={user.District}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('District', val)}
                  />

                  <FormField
                    label="City"
                    value={user.City}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('City', val)}
                  />

                  <FormField
                    label="PIN Code"
                    value={user.PinCode}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('PinCode', val)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>

  );
}

// Reusable Form Field Component
interface FormFieldProps {
  label: string;
  value?: string;
  isEditing: boolean;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'date' | 'select';
  options?: string[];
  readOnly?: boolean;
  fullWidth?: boolean;
}

function FormField({ 
  label, 
  value, 
  isEditing, 
  onChange, 
  type = 'text', 
  options, 
  readOnly = false,
  fullWidth = false 
}: FormFieldProps) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="block text-sm text-gray-600 mb-1 font-medium">{label}</label>
      {isEditing && !readOnly ? (
        type === 'select' ? (
          <select
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800"
          >
            {options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800"
          />
        )
      ) : (
        <p className={`px-4 py-2 bg-gray-50 rounded-lg ${readOnly ? 'text-gray-500' : 'text-gray-800'}`}>
          {value || "Not provided"}
        </p>
      )}
    </div>
  );
}