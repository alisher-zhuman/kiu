import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const logoDataUrl = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/icons/logo.png")).toString("base64")}`;

const AppleIcon = () =>
  new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#004C97",
      }}
    >
      <img src={logoDataUrl} width={132} height={132} alt="" />
    </div>,
    size
  );

export default AppleIcon;
