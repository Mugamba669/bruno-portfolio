import { ImageResponse } from "next/og";
import { profile as seedProfile } from "@/lib/data";
import { getPortfolio } from "@/lib/portfolio";

export const alt = `${seedProfile.name} — Software Engineer & Technical Lead`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const { profile } = await getPortfolio();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0e",
          color: "#edeae3",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 9, background: "#f0b254" }} />
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#f0b254", textTransform: "uppercase" }}>
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div style={{ marginTop: 24, fontSize: 40, color: "#9d978c" }}>
            Software Engineer &amp; Technical Lead
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 28, color: "#9d978c", letterSpacing: 2 }}>
            {profile.tagline}
          </div>
          <div style={{ fontSize: 24, color: "#6f6a60" }}>
            {profile.site.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
