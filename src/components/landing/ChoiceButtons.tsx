"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BookOpen, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getStoredSlant, setSlantCookie, SLANT_MOTTOS } from "@/lib/slant-client";

const OPTIONS: {
  slant: "left" | "right";
  label: string;
  icon: typeof BookOpen;
}[] = [
  { slant: "left", label: "Left", icon: BookOpen },
  { slant: "right", label: "Right", icon: Scale },
];

export function ChoiceButtons() {
  const router = useRouter();
  const [selected, setSelected] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    setSelected(getStoredSlant());
  }, []);

  function handleChoice(slant: "left" | "right") {
    if (typeof window === "undefined") return;
    setSlantCookie(slant);
    setSelected(slant);
  }

  function handleShowNews() {
    const slant = selected ?? "left";
    if (typeof window === "undefined") return;
    setSlantCookie(slant);
    router.push("/paper");
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-10">
      <div className="grid w-full grid-cols-2 gap-4 sm:gap-6">
        {OPTIONS.map(({ slant, label, icon: Icon }) => {
          const isSelected = selected === slant;
          return (
            <button
              key={slant}
              type="button"
              onClick={() => handleChoice(slant)}
              className={cn(
                "relative flex flex-col items-center gap-4 rounded-2xl border-2 px-6 py-8 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card hover:border-muted-foreground/50 hover:bg-muted/50"
              )}
            >
              {isSelected && (
                <span
                  className="absolute right-3 top-3 size-3 rounded-full bg-emerald-500"
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "flex size-16 items-center justify-center rounded-full sm:size-20",
                  isSelected ? "bg-background/20" : "bg-muted"
                )}
              >
                <Icon
                  className={cn("size-8 sm:size-10", isSelected ? "text-background" : "text-foreground")}
                  strokeWidth={1.5}
                />
              </span>
              <span className="font-medium">{label}</span>
              <span
                className={cn(
                  "text-center text-sm",
                  isSelected ? "text-background/80" : "text-muted-foreground"
                )}
              >
                {SLANT_MOTTOS[slant]}
              </span>
            </button>
          );
        })}
      </div>
      <Button
        size="lg"
        className="w-full bg-foreground px-8 py-6 text-xl font-serif text-background hover:opacity-90"
        onClick={handleShowNews}
      >
        Show Me The News
      </Button>
    </div>
  );
}
