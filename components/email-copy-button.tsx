"use client";

import { Mail, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function EmailCopyButton() {
  const [copied, setCopied] = useState(false);
  const email = "tadeas.kozub@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleCopy}
      className="text-lg px-8 py-4 font-normal flex items-center justify-center bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl backdrop-blur-md transition-all hover:bg-black/10 dark:hover:bg-black/80 hover:border-black/20 dark:hover:border-white/20 cursor-pointer text-foreground break-all max-w-full hover:-translate-y-0.5 active:translate-y-0"
    >
      <Mail className="mr-3 h-6 w-6 text-muted-foreground shrink-0" />
      <span className="truncate tracking-wide">{email}</span>
      {copied ? (
        <Check className="ml-3 h-5 w-5 text-green-500 transition-all scale-100" />
      ) : (
        <Copy className="ml-3 h-5 w-5 text-muted-foreground opacity-50 transition-all hover:opacity-100 active:scale-95" />
      )}
    </div>
  );
}
