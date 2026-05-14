import type { Metadata } from "next";
import { CareersPage } from "@/components/careers/careers-page";

export const metadata: Metadata = {
  title: "Careers - Rafiki SMS",
  description:
    "Join the team building Tanzania's SMS infrastructure. We're hiring engineers, product managers, and customer success professionals in Dar es Salaam.",
};

export default function Page() {
  return <CareersPage />;
}
