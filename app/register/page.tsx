// app/register/page.tsx  (Server Component)

import { Suspense } from "react";
import RegisterClientComponent from "./RegisterClientComponent";

// Fallback UI while search params are loading
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-white text-xl">Loading registration form...</p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RegisterClientComponent />
    </Suspense>
  );
}