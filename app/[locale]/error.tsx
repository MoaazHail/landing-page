"use client";

import { useTranslations } from "next-intl";

import { StatusScreen } from "@/shared/components/status-screen";
import { Button } from "@/shared/ui/button";

export default function LocaleError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const t = useTranslations("Errors");

  return (
    <StatusScreen
      title={t("title")}
      description={t("description")}
      action={
        <Button variant="corner" size="lg" onClick={() => retry()}>
          {t("retry")}
        </Button>
      }
    />
  );
}
