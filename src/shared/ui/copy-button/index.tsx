"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface Props {
  value: string;
  label?: string;
}

export const CopyButton = ({ value, label }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label ?? "Скопировать"}
      className="ml-3 shrink-0 rounded-lg p-1.5 text-[#004C97]/60 transition-colors hover:bg-[#004C97]/10 hover:text-[#004C97]"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
};
