import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { StatusScreen } from "@/shared/components/status-screen";
import { buttonVariants } from "@/shared/ui/button";

export default async function LocaleNotFound() {
  const t = await getTranslations("Errors");

  return (
    <StatusScreen
      title={t("notFoundTitle")}
      description={t("notFoundDescription")}
      action={
        <Link href="/" className={buttonVariants({ variant: "corner", size: "lg" })}>
          {t("backHome")}
        </Link>
      }
    />
  );
}
