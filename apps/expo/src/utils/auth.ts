import { getClerkInstance } from "@clerk/clerk-expo";

export async function getClerkSessionToken() {
  return (await getClerkInstance().session?.getToken()) ?? null;
}
