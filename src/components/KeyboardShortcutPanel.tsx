"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ShortcutPanelProps {
  open: boolean;
  onClose: () => void;
}

const shortcuts = [
  { keys: ["Cmd/Ctrl", "+", "Enter"], action: "Start export" },
  { keys: ["Space"], action: "Play / pause preview" },
  { keys: ["?"], action: "Toggle this shortcut panel" },
  { keys: ["Escape"], action: "Close overlay / cancel" },
  { keys: ["M"], action: "Toggle audio mute" },
];

function ShortcutRow({ keys, action }: { keys: string[]; action: string }) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5">
      <span className="text-sm text-[var(--muted)]">{action}</span>
      <div className="flex items-center gap-1.5 shrink-0">
        {keys.map((key) => (
          <kbd
            key={key}
            className="inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[11px] font-mono text-[var(--muted)] shadow-sm"
          >
            {key}
          </kbd>
        ))}
      </div>
    </li>
  );
}

export default function KeyboardShortcutPanel({ open, onClose }: ShortcutPanelProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:justify-end sm:p-4">
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        id="keyboard-shortcut-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcut-panel-title"
        className="relative w-full max-w-xl overflow-hidden rounded-t-3xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl sm:max-w-lg sm:rounded-3xl"
      >
        <div className="flex items-start justify-between border-b border-[var(--border)] px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.35em] text-[var(--muted)]">Quick help</p>
            <h3 id="shortcut-panel-title" className="mt-1 text-lg font-heading font-bold text-[var(--text)]">
              Keyboard Shortcuts
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shortcuts"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text)]"
          >
            <X size={14} />
          </button>
        </div>

        <div className="px-5 py-4 sm:px-6 sm:py-5">
          <p className="text-sm text-[var(--muted)]">
            Keep the editor moving without hunting for controls.
          </p>

          <ul className="mt-4 space-y-2">
            {shortcuts.map(({ keys, action }) => (
              <ShortcutRow key={action} keys={keys} action={action} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
