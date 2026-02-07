"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AboutContent } from "@/components/shared/AboutContent";

export function AboutDrawerTrigger() {
  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4"
        >
          About Truth Tribune
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex max-h-[85vh] flex-col">
        <DrawerHeader className="shrink-0 border-b border-border">
          <DrawerTitle className="font-serif text-xl">About Truth Tribune</DrawerTitle>
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-4 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <AboutContent className="mt-0" hideTitle />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
