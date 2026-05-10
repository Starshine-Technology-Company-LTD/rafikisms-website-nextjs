import { redirect } from "next/navigation";

/** Architecture route disabled — flip to restore `ArchitecturePageShell` import + metadata when needed. */
export default function ArchitecturePage() {
  redirect("/");
}
