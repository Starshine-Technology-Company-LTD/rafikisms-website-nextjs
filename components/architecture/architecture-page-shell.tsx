"use client";

import { Navigation } from "@/components/landing/navigation";
import { ArchitectureView } from "@/components/architecture/architecture-view";

/** Single client boundary for `/architecture` — avoids webpack dev `clientReferenceManifest` issues when the server page imported multiple separate client roots. */
export function ArchitecturePageShell() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <ArchitectureView />
    </div>
  );
}
