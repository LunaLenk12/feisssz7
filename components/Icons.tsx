import type { LinkId } from "@/lib/profile";

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

// Simple stylised Steam mark (two linked circles)
export function SteamIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="15" cy="9" r="5" />
      <circle cx="15" cy="9" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="7" cy="16.5" r="2.6" />
      <path d="M9 15.2 11.4 13.4" />
      <path d="M2.5 15.4 4.6 16.3" />
    </svg>
  );
}

// Simple stylised Discord mark (chat bubble with two eyes)
export function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 6.5C7 5 9.2 4.3 12 4.3S17 5 19 6.5c1.4 2.6 2.1 5.6 2 9-1.6 1.3-3.2 2.1-4.9 2.5l-1-1.7M5 6.5c-1.4 2.6-2.1 5.6-2 9 1.6 1.3 3.2 2.1 4.9 2.5l1-1.7" />
      <path d="M8 15.3c2.6 1 5.4 1 8 0" />
      <circle cx="9" cy="11.3" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11.3" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkIcon({ id, className }: { id: LinkId; className?: string }) {
  if (id === "tiktok") return <TikTokIcon className={className} />;
  if (id === "steam") return <SteamIcon className={className} />;
  return <DiscordIcon className={className} />;
}
