import type { ReactNode } from "react";

import { Logo } from "@/shared/ui/logo";

interface StatusScreenProps {
  title: string;
  description: string;
  action?: ReactNode;
}

/** Full-screen brand-blue state used by the error and not-found pages. */
export function StatusScreen({ title, description, action }: StatusScreenProps) {
  return (
    <main className="section-x flex min-h-dvh flex-col bg-primary text-white">
      <div className="mx-auto flex h-header w-full max-w-content items-center">
        <Logo />
      </div>
      <div className="mx-auto flex w-full max-w-content flex-1 items-center py-16">
        <div className="max-w-xl animate-rise">
          <h1 className="text-h2 font-bold">{title}</h1>
          <p className="mt-4 text-base text-white/82">{description}</p>
          {action && <div className="mt-8">{action}</div>}
        </div>
      </div>
    </main>
  );
}
