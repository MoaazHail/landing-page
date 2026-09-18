"use client";

import { AnimatePresence, m } from "motion/react";
import { Dialog } from "radix-ui";
import { useRef, useState, type MouseEvent } from "react";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { CtaArrow, CtaLink } from "@/shared/components/cta-link";
import { Icon } from "@/shared/ui/icons";
import { Logo } from "@/shared/ui/logo";

interface MobileNavProps {
  links: { href: string; label: string }[];
  contact: { href: string; label: string };
  localeSwitch: { locale: Locale; label: string; ariaLabel: string };
  labels: { open: string; close: string; nav: string };
}

const EASE = [0.2, 0.8, 0.2, 1] as const;

/** The sheet enters from the inline-end edge: left in RTL, right in LTR. */
const slideFrom = () => (document.documentElement.dir === "rtl" ? -24 : 24);

/** Full-height navigation sheet shown below the desktop nav breakpoint. */
export function MobileNav({ links, contact, localeSwitch, labels }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  // Following an in-page link must not bounce focus (and scroll) back to the trigger.
  const navigatedRef = useRef(false);
  // The dialog locks page scroll while open, so in-page navigation waits for the exit animation.
  const pendingHashRef = useRef<string | null>(null);

  const close = () => {
    navigatedRef.current = true;
    setOpen(false);
  };

  const navigateTo = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    pendingHashRef.current = hash;
    close();
  };

  const completePendingNavigation = () => {
    const hash = pendingHashRef.current;
    pendingHashRef.current = null;
    if (!hash) return;
    history.pushState(null, "", hash);
    // Next task: the dialog has unmounted and released its scroll lock by then.
    setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView());
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={labels.open}
        className="flex size-11 items-center justify-center rounded-btn border border-white/55 text-white transition-colors hover:bg-white/10 min-[1121px]:hidden"
      >
        <Icon name="menu" size={20} />
      </Dialog.Trigger>

      <AnimatePresence onExitComplete={completePendingNavigation}>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-40 bg-scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              forceMount
              aria-describedby={undefined}
              onCloseAutoFocus={(event) => {
                if (navigatedRef.current) event.preventDefault();
                navigatedRef.current = false;
              }}
            >
              <m.div
                className="fixed inset-y-0 end-0 z-50 flex w-[min(360px,88vw)] flex-col bg-primary px-6 pb-8 text-white shadow-float"
                initial={{ opacity: 0, x: slideFrom() }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideFrom() }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <div className="flex h-header items-center justify-between">
                  <Logo size="sm" />
                  <Dialog.Close
                    aria-label={labels.close}
                    className="flex size-11 items-center justify-center rounded-btn border border-white/55 transition-colors hover:bg-white/10"
                  >
                    <Icon name="close" size={20} />
                  </Dialog.Close>
                </div>
                <Dialog.Title className="sr-only">{labels.nav}</Dialog.Title>

                <nav aria-label={labels.nav} className="mt-6 flex-1">
                  <ul className="grid">
                    {links.map((link) => (
                      <li key={link.href} className="border-b border-white/15">
                        <a
                          href={link.href}
                          onClick={(event) => navigateTo(event, link.href)}
                          className="block py-4 font-display text-lg font-medium text-white transition-colors hover:text-white/80"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="grid gap-4">
                  <CtaLink href={contact.href} variant="corner" size="lg" onClick={close}>
                    {contact.label}
                    <CtaArrow className="text-sm" />
                  </CtaLink>
                  <Link
                    href="/"
                    locale={localeSwitch.locale}
                    hrefLang={localeSwitch.locale}
                    aria-label={localeSwitch.ariaLabel}
                    className="text-center text-[15px] font-medium text-white/82 hover:text-white"
                  >
                    {localeSwitch.label}
                  </Link>
                </div>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
