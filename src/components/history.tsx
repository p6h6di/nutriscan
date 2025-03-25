"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";

export function AnalysisHistory() {
  const router = useRouter();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => router.push("/analysis")}
        className="fixed top-4 right-18 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        <History className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <span className="sr-only">History</span>
      </Button>
      <div className="fixed top-4 right-4">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "40px",
                height: "40px",
              },
            },
          }}
        />
      </div>
    </>
  );
}
