"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User, Mail, Phone, Calendar, MapPin, Edit, LogOut, ArrowLeft, X,
  FileText, Clock, TestTube, Activity, CheckCircle, XCircle, AlertCircle
} from "lucide-react";
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

interface Booking {
  requestId?: string;
  date?: string;
  slot?: string;
  tests?: Array<{ name: string; price: number }>;
  total?: number;
  timestamp?: string;
  status?: string;
}

interface ApiBooking {
  RequestID?: string;
  RequestDate?: string;
  Status?: string;
  TestDetails?: string;
  Amount?: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [apiBookings, setApiBookings] = useState<ApiBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/signin");
      return;
    }

    const userData = JSON.parse(storedUser);
    const mobile = userData.mobile;

    // Fetch patient data dynamically from API
    const fetchPatientData = async () => {
      try {
        const res = await fetch(`/api/get-patient?MobileNo=${mobile}`);

        const result = await res.json();

        if (result?.d) {
          const parsed = JSON.parse(result.d);

          if (parsed?.status === "Success" && Array.isArray(parsed.data) && parsed.data.length > 0) {
            // Use first patient as default
            const patient = parsed.data[0];

            const profileData = {
              Title: patient.Title?.replace(".", "") || "",
              FirstName: patient.PFirstName || patient.PName?.trim() || "",
              PatientLastName: patient.PLastName || "",
              Gender: patient.Gender || "",
              DOB: patient.DOB || "",
              Age: patient.Age || "",
              MobileNo: patient.ContactNo || mobile,
              Email: patient.Email || "",
              Address: patient.House_No || "",
              Country: patient.Country || "",
              City: patient.City || "",
              MRNo: patient.MRNo || "",
              allPatients: parsed.data, // Store all patients
            };

            setUser({
              name: patient.PName?.trim() || "User",
              mobile: patient.ContactNo || mobile,
              ...profileData
            });

            // Store for future use
            localStorage.setItem("userProfile", JSON.stringify(profileData));
            localStorage.setItem("allPatients", JSON.stringify(parsed.data));
          } else {
            // No patient found - use stored profile if available
            const storedProfile = localStorage.getItem("userProfile");
            if (storedProfile) {
              const profileData = JSON.parse(storedProfile);
              setUser({
                ...userData,
                ...profileData
              });
            } else {
              setUser(userData);
            }
          }
        } else {
          // Fallback to stored profile
          const storedProfile = localStorage.getItem("userProfile");
          if (storedProfile) {
            const profileData = JSON.parse(storedProfile);
            setUser({
              ...userData,
              ...profileData
            });
          } else {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
        // Fallback to stored data
        const storedProfile = localStorage.getItem("userProfile");
        if (storedProfile) {
          const profileData = JSON.parse(storedProfile);
          setUser({
            ...userData,
            ...profileData
          });
        } else {
          setUser(userData);
        }
      }
    };

    fetchPatientData();

    // Load local bookings
    const localBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(localBookings);

    // Fetch bookings from API
    fetchBookingsFromAPI(mobile);

    setLoading(false);
  }, [router]);

  const fetchBookingsFromAPI = async (mobile: string) => {
    if (!mobile) return;

    setLoadingBookings(true);
    try {
      const res = await fetch(`/api/get-status?MobileNo=${mobile}`);
      const data = await res.json();

      if (data?.status === "Success" && Array.isArray(data.data)) {
        setApiBookings(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("bookings");
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

  const getStatusIcon = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("complete") || s.includes("done") || s.includes("success")) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    if (s.includes("pending") || s.includes("processing")) {
      return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
    if (s.includes("cancel") || s.includes("fail")) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    return <Clock className="w-5 h-5 text-blue-600" />;
  };

  const getStatusColor = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("complete") || s.includes("done") || s.includes("success")) {
      return "bg-green-50 text-green-700 border-green-200";
    }
    if (s.includes("pending") || s.includes("processing")) {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
    if (s.includes("cancel") || s.includes("fail")) {
      return "bg-red-50 text-red-700 border-red-200";
    }
    return "bg-blue-50 text-blue-700 border-blue-200";
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

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    } catch {
      return dateStr;
    }
  };

  // Merge local and API bookings
  const allBookings = [
    ...bookings.map(b => ({ ...b, source: "local" as const })),
    ...apiBookings.map(b => ({
      requestId: b.RequestID,
      date: b.RequestDate,
      status: b.Status,
      total: b.Amount,
      tests: b.TestDetails ? [{ name: b.TestDetails, price: b.Amount || 0 }] : [],
      source: "api" as const
    }))
  ].sort((a, b) => {
    const dateA =
      "timestamp" in a ? a.timestamp ?? "" : a.date ?? "";
    const dateB =
      "timestamp" in b ? b.timestamp ?? "" : b.date ?? "";

    return dateB.localeCompare(dateA);
  });


  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 border border-gray-100">
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 px-8 py-8 relative">
              <button
                onClick={() => router.push("/")}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                    {getInitial(user.name || user.FirstName || "U")}
                  </div>
                </div>

                <div className="text-white flex-1">
                  <h1 className="text-3xl font-bold mb-2">
                    {user.Title} {user.FirstName} {user.PatientLastName}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-orange-100">
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {user.MobileNo || user.mobile || "N/A"}
                    </p>
                    {user.Email && (
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {user.Email}
                      </p>
                    )}
                    <p className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      ID: {user.MRNo || user.requestId || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 text-white bg-white/20 rounded-lg hover:bg-white/30 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-semibold"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-6 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-semibold"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  label="Title"
                  value={user.Title}
                  isEditing={isEditing}
                  onChange={(val) => handleInputChange('Title', val)}
                  type="select"
                  options={['Mr', 'Mrs', 'Ms', 'Dr', 'Baby']}
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
                <FormField
                  label="MR Number"
                  value={user.MRNo || "N/A"}
                  isEditing={false}
                  readOnly
                />
                <div className="md:col-span-2">
                  <FormField
                    label="Address"
                    value={user.Address}
                    isEditing={isEditing}
                    onChange={(val) => handleInputChange('Address', val)}
                    fullWidth
                  />
                </div>
                <FormField
                  label="City"
                  value={user.City}
                  isEditing={isEditing}
                  onChange={(val) => handleInputChange('City', val)}
                />
                <FormField
                  label="State"
                  value={user.State}
                  isEditing={isEditing}
                  onChange={(val) => handleInputChange('State', val)}
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

          {/* Booking History */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Test Booking History
              </h2>
            </div>

            <div className="p-8">
              {loadingBookings ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading bookings...</p>
                </div>
              ) : allBookings.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No bookings found</p>
                  <button
                    onClick={() => router.push("/investigations")}
                    className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                  >
                    Book a Test
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {allBookings.map((booking, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow bg-gradient-to-r from-white to-gray-50"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                              <TestTube className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                Request ID: {booking.requestId || "N/A"}
                              </h3>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                                {booking.date && (
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(booking.date)}
                                  </span>
                                )}
                                {"slot" in booking && booking.slot && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {booking.slot}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {booking.tests && booking.tests.length > 0 && (
                            <div className="ml-16 space-y-2">
                              <p className="text-sm font-semibold text-gray-700 mb-2">Tests:</p>
                              <div className="flex flex-wrap gap-2">
                                {booking.tests.map((test, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                                  >
                                    {test.name} - ₹{test.price}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {booking.total && (
                            <div className="ml-16 mt-3">
                              <p className="text-lg font-bold text-orange-600">
                                Total: ₹{booking.total}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          {booking.status && (
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="font-semibold">{booking.status}</span>
                            </div>
                          )}
                          {!booking.status && (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-blue-50 text-blue-700 border-blue-200">
                              <Clock className="w-5 h-5" />
                              <span className="font-semibold">Processing</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
    <div className={fullWidth ? "md:col-span-2 lg:col-span-3" : ""}>
      <label className="block text-sm text-gray-600 mb-2 font-semibold">{label}</label>
      {isEditing && !readOnly ? (
        type === 'select' ? (
          <select
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 transition-all"
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
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 transition-all"
          />
        )
      ) : (
        <p className={`px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 ${readOnly ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
          {value || "Not provided"}
        </p>
      )}
    </div>
  );
}
