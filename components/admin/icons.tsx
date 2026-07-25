// Shared outline icon set for the admin console — single stroke style,
// 20x20 viewBox, currentColor. Keep every icon in this file so nav, tables,
// and cards all draw from the same visual language.
import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    width: 16,
    height: 16,
    viewBox: "0 0 20 20",
    fill: "none",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function IconGrid(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1" stroke="currentColor" />
      <rect x="11" y="2.5" width="6.5" height="6.5" rx="1" stroke="currentColor" />
      <rect x="2.5" y="11" width="6.5" height="6.5" rx="1" stroke="currentColor" />
      <rect x="11" y="11" width="6.5" height="6.5" rx="1" stroke="currentColor" />
    </svg>
  );
}

export function IconShirt(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 3 3 6l1.8 2.4L7 7v10h6V7l2.2 1.4L17 6l-4-3-1 1.2a2.8 2.8 0 0 1-4 0L7 3Z" stroke="currentColor" />
    </svg>
  );
}

export function IconReceipt(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 2.5h11v15l-2-1.3-1.8 1.3-1.7-1.3-1.7 1.3-1.8-1.3-2 1.3v-15Z" stroke="currentColor" />
      <path d="M7 7h6M7 10h6M7 13h3.5" stroke="currentColor" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="7.5" cy="6.5" r="3" stroke="currentColor" />
      <path d="M2 17c0-3.3 2.5-5.5 5.5-5.5S13 13.7 13 17" stroke="currentColor" />
      <path d="M13.5 4.3a3 3 0 0 1 0 5.8" stroke="currentColor" />
      <path d="M14.5 11.7c2.3.5 3.8 2.5 3.8 5.3" stroke="currentColor" />
    </svg>
  );
}

export function IconCard(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2" y="4.5" width="16" height="11.5" rx="1.3" stroke="currentColor" />
      <path d="M2 8.2h16" stroke="currentColor" />
      <path d="M5 12.3h4M12 12.3h1.5" stroke="currentColor" />
    </svg>
  );
}

export function IconChartBar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 17V9M9 17V3M15 17v-6" stroke="currentColor" />
      <path d="M2.5 17.5h15" stroke="currentColor" />
    </svg>
  );
}

export function IconGear(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="3" stroke="currentColor" />
      <path
        d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4M15.1 15.1l-1.4-1.4M6.3 6.3 4.9 4.9"
        stroke="currentColor"
      />
    </svg>
  );
}

export function IconLayout(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="2.5" width="15" height="15" rx="1.3" stroke="currentColor" />
      <path d="M2.5 7.5h15" stroke="currentColor" />
      <path d="M7.5 7.5v10" stroke="currentColor" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="8.7" cy="8.7" r="5.2" stroke="currentColor" />
      <path d="m16.5 16.5-3.6-3.6" stroke="currentColor" />
    </svg>
  );
}

export function IconBell(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 8a5 5 0 0 1 10 0c0 4 1.5 5 1.5 5h-13S5 12 5 8Z" stroke="currentColor" />
      <path d="M8.2 16a1.9 1.9 0 0 0 3.6 0" stroke="currentColor" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" />
    </svg>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 5.5 10l6.5 6.5" stroke="currentColor" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m4.5 7.5 5.5 5.5 5.5-5.5" stroke="currentColor" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 3.5v13M3.5 10h13" stroke="currentColor" />
    </svg>
  );
}

export function IconPencil(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13.6 2.9 17 6.4 6.9 16.5 2.8 17.3l.8-4.1 10-10.3Z" stroke="currentColor" />
      <path d="M11.5 5 15 8.4" stroke="currentColor" />
    </svg>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 5.5h13" stroke="currentColor" />
      <path d="M7.5 5.5v-2h5v2M5.5 5.5 6.2 17h7.6l.7-11.5" stroke="currentColor" />
      <path d="M8.3 8.5v6M11.7 8.5v6" stroke="currentColor" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 10.5 8 14.5 16 5.5" stroke="currentColor" />
    </svg>
  );
}

export function IconCheckCircle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7.3" stroke="currentColor" />
      <path d="M6.7 10.2 9 12.5l4.3-5" stroke="currentColor" />
    </svg>
  );
}

export function IconAlertTriangle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 3 2.5 16.5h15L10 3Z" stroke="currentColor" strokeLinejoin="round" />
      <path d="M10 8.3v3.4" stroke="currentColor" />
      <circle cx="10" cy="14.2" r="0.15" fill="currentColor" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconExternalLink(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8.5 4.5h-4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4" stroke="currentColor" />
      <path d="M11.5 3.5H16v4.5M16 3.5l-7 7" stroke="currentColor" />
    </svg>
  );
}

export function IconEye(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2 10s2.8-5.5 8-5.5S18 10 18 10s-2.8 5.5-8 5.5S2 10 2 10Z" stroke="currentColor" />
      <circle cx="10" cy="10" r="2.3" stroke="currentColor" />
    </svg>
  );
}

export function IconUpload(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 13V3.5M6.5 7 10 3.5 13.5 7" stroke="currentColor" />
      <path d="M3.5 13.5v2a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-2" stroke="currentColor" />
    </svg>
  );
}

export function IconImage(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="3.5" width="15" height="13" rx="1.3" stroke="currentColor" />
      <circle cx="7" cy="8" r="1.4" stroke="currentColor" />
      <path d="m4 15 4.2-4.4a1.4 1.4 0 0 1 2 0L13 13.5l1.3-1.3a1.4 1.4 0 0 1 2 0L17.5 13.5" stroke="currentColor" />
    </svg>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M16.5 10a6.5 6.5 0 1 1-2-4.7" stroke="currentColor" />
      <path d="M16.5 2.8V6a1 1 0 0 1-1 1h-3.2" stroke="currentColor" />
    </svg>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M16.5 10h-13M8.5 4.5 3 10l5.5 5.5" stroke="currentColor" />
    </svg>
  );
}

export function IconTrendUp(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 13.5 8 8.5l3 3 6-6.5" stroke="currentColor" />
      <path d="M13 4.7h4v4" stroke="currentColor" />
    </svg>
  );
}

export function IconTrendDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6.5 8 11.5l3-3 6 6.5" stroke="currentColor" />
      <path d="M13 15.3h4v-4" stroke="currentColor" />
    </svg>
  );
}

export function IconFilter(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 4.5h14L11.5 11v5L8.5 14v-3L3 4.5Z" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 2.8 12.2 8l5.3.5-4 3.6 1.2 5.2L10 14.6l-4.7 2.7 1.2-5.2-4-3.6L8 8 10 2.8Z" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPackageAlert(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6.2 10 2.5l7 3.7v7.6L10 17.5l-7-3.5V6.2Z" stroke="currentColor" strokeLinejoin="round" />
      <path d="M3 6.2 10 9.7l7-3.5M10 9.7v7.8" stroke="currentColor" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.3" stroke="currentColor" />
      <path d="m3 5.5 7 5.5 7-5.5" stroke="currentColor" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5.3 3.5h2.3l1 3.7-1.7 1.4a9.5 9.5 0 0 0 4.5 4.5l1.4-1.7 3.7 1v2.3a1.5 1.5 0 0 1-1.6 1.5A13.5 13.5 0 0 1 3.8 5.1a1.5 1.5 0 0 1 1.5-1.6Z" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7.3" stroke="currentColor" />
      <path d="M2.7 10h14.6M10 2.7c2 2 3 4.6 3 7.3s-1 5.3-3 7.3c-2-2-3-4.6-3-7.3s1-5.3 3-7.3Z" stroke="currentColor" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="4" width="15" height="13.5" rx="1.3" stroke="currentColor" />
      <path d="M2.5 8h15M6.5 2.5v3M13.5 2.5v3" stroke="currentColor" />
    </svg>
  );
}

export function IconStore(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 8v8.5h14V8" stroke="currentColor" />
      <path d="M2.3 4.5h15.4L19 8.3a2.1 2.1 0 0 1-4 .8 2.1 2.1 0 0 1-4 0 2.1 2.1 0 0 1-4 0 2.1 2.1 0 0 1-4-.8L2.3 4.5Z" stroke="currentColor" strokeLinejoin="round" />
      <path d="M8 16.5V12h4v4.5" stroke="currentColor" />
    </svg>
  );
}

export function IconTag(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M11 3H4v7l8.5 8.5a1.8 1.8 0 0 0 2.5 0l3.5-3.5a1.8 1.8 0 0 0 0-2.5L11 3Z" stroke="currentColor" strokeLinejoin="round" />
      <circle cx="7.3" cy="6.3" r="1.1" stroke="currentColor" />
    </svg>
  );
}

export function IconMoreHorizontal(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="4.5" cy="10" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="10" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="10" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 3v9.5M6.5 9 10 12.5 13.5 9" stroke="currentColor" />
      <path d="M3.5 13.5v2a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-2" stroke="currentColor" />
    </svg>
  );
}
