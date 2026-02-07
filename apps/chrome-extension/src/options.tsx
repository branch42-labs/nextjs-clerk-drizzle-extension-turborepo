import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/chrome-extension";

const publishableKey = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY");
}

function OptionsContent() {
  const { userId, isLoaded } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
      }}
    >
      <h1>Rely AI Settings</h1>
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

function IndexOptions() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <OptionsContent />
    </ClerkProvider>
  );
}

export default IndexOptions;
