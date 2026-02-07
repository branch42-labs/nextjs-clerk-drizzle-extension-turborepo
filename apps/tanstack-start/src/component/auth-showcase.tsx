import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/tanstack-react-start";

import { Button } from "@acme/ui/button";

export function AuthShowcase() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <SignedOut>
        <SignInButton mode="modal">
          <Button size="lg">Sign in with Clerk</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <p className="text-center text-2xl">
          <span>
            Logged in as{" "}
            {user?.fullName ??
              user?.primaryEmailAddress?.emailAddress ??
              user?.username ??
              "User"}
          </span>
        </p>

        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}
