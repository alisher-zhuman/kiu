import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { type AppLocale } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoDataUrl = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/icons/logo.png")).toString("base64")}`;

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

const OpengraphImage = async ({ params }: Props) => {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        background: "#004C97",
      }}
    >
      <img src={logoDataUrl} width={220} height={220} alt="" />

      <div
        style={{
          display: "flex",
          maxWidth: 900,
          textAlign: "center",
          fontSize: 48,
          fontWeight: 700,
          color: "white",
        }}
      >
        {t("publisher")}
      </div>
    </div>,
    size
  );
};

export default OpengraphImage;
