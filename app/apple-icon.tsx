import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#121315" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: 3, color: "#f4f1ea" }}>CARNAK</div>
          <div style={{ width: 72, height: 6, background: "#bf4a16", marginTop: 10 }} />
        </div>
      </div>
    ),
    size,
  );
}
