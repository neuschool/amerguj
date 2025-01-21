import { LockIcon } from "../Icons";

interface BadgeProps {
  isLive?: boolean;
  isPrivate?: boolean;
  children: JSX.Element | string;
  border?: boolean;
  className?: string;
}

export default function Badge({
  isLive = false,
  isPrivate = false,
  children,
  border = false,
  className = '',
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full bg-neutral-200 px-2 py-0.5 text-sm text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300 ${className}`}
    >
      {isPrivate && <LockIcon size={12} />}
      {children}
    </div>
  );
}
