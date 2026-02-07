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

function NewTabContent() {
  const { userId, isLoaded } = useAuth();

  return (
    <div
      className="new-tab"
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Rely AI Extension</h1>
      <p>
        {isLoaded
          ? userId
            ? `Signed in as ${userId}`
            : "Not signed in"
          : "Loading auth..."}
      </p>

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

function IndexNewtab() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <NewTabContent />
    </ClerkProvider>
  );
}

export default IndexNewtab;
