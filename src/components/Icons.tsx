import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Roadside signpost — two arrow boards on a pole. */
export function SignpostIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M12 3v18" />
      <path d="M9 21h6" />
      <path d="M12 5h6.5L21 7.5 18.5 10H12z" />
      <path d="M12 12H5.5L3 14.5 5.5 17H12z" />
    </svg>
  );
}

/** Classic telephone handset. */
export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M5.5 3h3l1.7 4.2-2.1 1.6a12.5 12.5 0 0 0 7.1 7.1l1.6-2.1L21 15.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
    </svg>
  );
}

/** Paper plane / send. */
export function PlaneIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M21.5 3.5 10.8 13.2" />
      <path d="M21.5 3.5 14.5 21l-3.7-7.8L3 9.5Z" />
    </svg>
  );
}

/** Globe with meridians. */
export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14.5 14.5 0 0 1 0 18" />
      <path d="M12 3a14.5 14.5 0 0 0 0 18" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden="true">
      <path d="m5 9 7 7 7-7" />
    </svg>
  );
}

export const CONTACT_ICONS = {
  signpost: SignpostIcon,
  phone: PhoneIcon,
  plane: PlaneIcon,
  globe: GlobeIcon,
} as const;
