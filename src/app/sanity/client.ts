import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "z4te4vin",
  dataset: "production",
  apiVersion: "2024-11-01",
  useCdn: false,
});