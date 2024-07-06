export const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
export const GOOGLEMAP_KEY = import.meta.env.VITE_GOOGLEMAP_APIKEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

if (!GOOGLEMAP_KEY) {
  throw new Error("Missing Google Map API Key")
}