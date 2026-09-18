import { getTranslations } from "next-intl/server";

import { SECTION_IDS } from "@/lib/constants/site";
import { Icon } from "@/shared/ui/icons";

export async function BackToTop() {
  const t = await getTranslations("BackToTop");

  return (
    <a
      href={`#${SECTION_IDS.top}`}
      aria-label={t("label")}
      className="fixed bottom-[26px] end-[26px] z-30 flex size-[52px] items-center justify-center rounded-full border border-white/35 bg-primary text-white shadow-float transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-ink max-[640px]:bottom-4 max-[640px]:end-4 max-[640px]:size-11"
    >
      <Icon name="arrowUp" size={18} />
    </a>
  );
}
