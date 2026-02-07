import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/chrome-extension";

import "./style.css";

const publishableKey = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY");
}

function AuthDetails() {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    return <p>Loading auth...</p>;
  }

  return <p>{userId ? `Signed in as ${userId}` : "Not signed in"}</p>;
}

function PopupContent() {
  return (
    <div className="popup">
      <h1>Rely AI</h1>
      <p>Chrome extension powered by Plasmo + Clerk.</p>
      <AuthDetails />

      <SignedOut>
        <SignInButton>
          <button type="button">Sign In</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

function IndexPopup() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <PopupContent />
    </ClerkProvider>
  );
}

export default IndexPopup;
