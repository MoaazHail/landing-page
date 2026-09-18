import type { SVGProps } from "react";

/**
 * Line icons from the reference design, addressable by name so CMS content
 * can reference them (e.g. `icon: "bolt"`). All draw with `currentColor`.
 */
const paths = {
  layout: (
    <>
      <rect x="3" y="3.5" width="18" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 8.5h18M8.5 8.5v12" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  bolt: (
    <path
      d="M13.5 2.5L5 13.6h5.2L9.8 21.5 19 10.2h-5.4l-.1-7.7z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
  chart: (
    <>
      <path d="M3.5 20.5h17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="5" y="12" width="3.6" height="6" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10.2" y="8" width="3.6" height="10" stroke="currentColor" strokeWidth="1.4" />
      <rect x="15.4" y="4" width="3.6" height="14" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  headset: (
    <>
      <path d="M4 15v-3a8 8 0 0116 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="2.6" y="13.6" width="4" height="6.4" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <rect x="17.4" y="13.6" width="4" height="6.4" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M19.4 20c0 1.4-1.4 2.4-3.4 2.4h-2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  brief: (
    <>
      <path d="M6 3.5h7.4L18.5 8.6v11.9H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13.2 3.8v5.1h5.1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.8 12.6h6.4M8.8 15.6h6.4M8.8 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  design: (
    <>
      <path d="M5 3.5h9l4.8 4.8V16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 3.5v17h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M19.6 11.4l2.2 2.2-6.4 6.4-2.9.7.7-2.9 6.4-6.4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  review: (
    <>
      <circle cx="10.8" cy="10.8" r="7.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.6 10.9l2.4 2.4 4.2-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.2 16.3l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 6.4v1.2M12 10.4v1.2M9.4 9h1.2M13.4 9h1.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.6 13.8L7 21l5-2.4 5 2.4-1.6-7.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.8" y="4" width="18.4" height="12.6" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 20h6M12 16.8V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  document: (
    <>
      <path d="M5.8 3.4h7.6L18.4 8.4v12.2H5.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13.1 3.7v4.9h4.9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.8 13h6.4M8.8 16.4h4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  check: (
    <path d="M4.5 12.5l4.6 4.6L19.5 6.8" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.2 12.2l2.6 2.6 5-5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  /** Points toward the inline-end in LTR; mirror with `rtl:-scale-x-100`. */
  chevron: (
    <path d="M9.5 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  arrowUp: (
    <>
      <path d="M12 20V5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M5.5 11.5L12 5l6.5 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  close: <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 17l5-4.5 3.5 3 3-2.5L20 17" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </>
  ),
  quote: (
    <path
      d="M9.6 6.5C6.6 7.6 4.8 10 4.8 13.4V18h5.6v-5.6H7.6c0-2 1-3.4 2.9-4.1l-.9-1.8zm9 0c-3 1.1-4.8 3.5-4.8 6.9V18h5.6v-5.6h-2.8c0-2 1-3.4 2.9-4.1l-.9-1.8z"
      fill="currentColor"
    />
  ),
  youtube: (
    <path
      fill="currentColor"
      d="M21.6 7.2c-.2-1-1-1.8-2-2C17.8 4.8 12 4.8 12 4.8s-5.8 0-7.6.4c-1 .2-1.8 1-2 2C2 9 2 12 2 12s0 3 .4 4.8c.2 1 1 1.8 2 2 1.8.4 7.6.4 7.6.4s5.8 0 7.6-.4c1-.2 1.8-1 2-2C22 15 22 12 22 12s0-3-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.02-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9z"
    />
  ),
  x: (
    <path
      fill="currentColor"
      d="M17.7 3h3.3l-7.2 8.2L22 21h-6.3l-4.6-6-5.3 6H2.5l7.5-8.6L2.3 3h6.4l4.3 5.7L17.7 3zm-1.2 16h1.8L7.6 4.9H5.7L16.5 19z"
    />
  ),
  instagram: (
    <>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

export const iconNames = Object.keys(paths) as IconName[];

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
      {paths[name] ?? paths.layout}
    </svg>
  );
}
