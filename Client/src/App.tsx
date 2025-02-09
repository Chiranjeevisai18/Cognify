import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ClerkProvider, useUser } from "@clerk/clerk-react";
import Cognify from "./components/Cognify";
import Features from "./Features";
import SignInPage  from "./components/SignInPage";
import { useEffect } from "react";
import SignUpPage from "./components/SignUpPage";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY - Get it from https://dashboard.clerk.com/");
}

// ✅ Redirect User to "/features" After Sign-In
function AuthListener() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/features"); // ✅ Redirect when signed in
    }
  }, [isSignedIn, navigate]);

  return null;
}

// ✅ Protect Routes for Signed-In Users
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isSignedIn } = useUser();
  return isSignedIn ? children : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AuthListener /> {/* ✅ Watches sign-in status */}
      <Routes>
        <Route path="/" element={<Cognify />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/features" element={<ProtectedRoute><Features /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ClerkProvider>
  );
}

export default App;
