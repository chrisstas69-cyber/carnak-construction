export const dynamic = "force-static";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.seo.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const bricks = Array.from({ length: 9 });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#121315",
          color: "#f4f1ea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", width: "64%" }}>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#b9b4aa", textTransform: "uppercase" }}>
            {[site.location.city + ", " + site.location.region, site.serviceAreaShort].join("  ·  ")}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: 4, lineHeight: 1 }}>{site.wordmark}</div>
            <div style={{ fontSize: 34, color: "#b9b4aa", marginTop: 12 }}>{site.wordmarkSub.join(" ")}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: 96, height: 6, background: "#bf4a16", marginBottom: 24 }} />
            <div style={{ fontSize: 34, lineHeight: 1.25, maxWidth: 640 }}>
              Masonry, concrete, paving, roofing, exterior restoration & institutional construction
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "36%", background: "#2a211e", paddingTop: 10 }}>
          {bricks.map((_, row) => (
            <div key={row} style={{ display: "flex", marginLeft: row % 2 ? -60 : 0, marginBottom: 8 }}>
              {Array.from({ length: 4 }).map((__, col) => (
                <div
                  key={col}
                  style={{
                    width: 112,
                    height: 58,
                    marginRight: 8,
                    background: (row + col) % 3 === 0 ? "#5a3a2f" : (row + col) % 3 === 1 ? "#4c3129" : "#643f33",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
