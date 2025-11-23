import type { SVGProps } from "react";

interface SocialIconProps {
  href: string;
  label: string;
  title: string;
  children: React.ReactNode;
}

export default function SocialIcon({
  href,
  label,
  title,
  children,
}: SocialIconProps) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="size-10 rounded-full bg-yellow-dark/10 hover:bg-yellow-dark flex items-center justify-center transition-all duration-medium hover:scale-105 group"
        aria-label={label}
        title={title}
      >
        {children}
      </a>
    </li>
  );
}
