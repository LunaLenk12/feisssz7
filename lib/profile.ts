// Edit this file to change everything on the page.
export const profile = {
  name: "feisssz7",
  domain: "feisssz7.mn",
  // Put your picture at /public/avatar.png (square, 400x400+). Falls back to a monogram.
  avatar: "/avatar.png",
  // Background clip with sound. Put your own file at /public/bg.mp4 (H.264, ideally under ~15 MB).
  // If the file is missing, the animated gradient is shown instead.
  background: { video: "/bg.mp4", volume: 0.5 },
  // Lines are typed out one after another, then loop.
  bio: ["100% clean"],
  links: [
    {
      id: "tiktok",
      label: "TikTok",
      handle: "@feiics",
      href: "https://www.tiktok.com/@feiics",
    },
    {
      id: "steam",
      label: "Steam",
      handle: "profile",
      href: "https://steamcommunity.com/profiles/76561199854446319",
    },
    {
      id: "discord",
      label: "Discord",
      handle: "riftclan",
      href: "https://discord.gg/riftclan",
    },
  ],
} as const;

export type LinkId = (typeof profile.links)[number]["id"];
