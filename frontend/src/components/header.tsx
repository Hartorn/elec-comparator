import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { PlugZap } from "lucide-react";

export function AppHeader() {
  return (
    <header
      className={cn(
        "bg-background",
        "sticky top-0 z-40 border-b bg-background",
        "flex",
        "w-full flex h-16 items-center pl-1 sm:justify-between sm:space-x-0 justify-between",
      )}
    >
      <div></div>
      <div className="flex">
        <div className="pl-4">
          <PlugZap />
        </div>
        <p className="inline-block font-bold pl-4">
          {"Comparateur de fournisseur d'électricité"}
        </p>

        <div className="pl-4">
          <PlugZap />
        </div>
      </div>

      <div className="pr-4">
        <ModeToggle />
      </div>
    </header>
  );
}
