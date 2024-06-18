"use client";

import { AuditLog } from "@prisma/client";
import { ActivityIcon, ChevronDown, ChevronUp } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { ActivityItem } from "@/components/activity-item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ActivityProps {
  items: AuditLog[];
};

export const Activity = ({
  items,
}: ActivityProps) => {

  //const handle: boolean = true;
  const [handle, setHandle] = useState<boolean>(false);

  return (
    <div className="">
      <div className="flex items-start gap-x-3 w-full">
        <ActivityIcon className="h-5 w-5 mt-2 text-neutral-700 dark:stroke-white" />
        <Button
          onClick={() => { setHandle(!handle) }}
          size="sm"
          className="dark:hover:bg-slate-600 dark:bg-slate-800 px-2 py-0 border-none w-full bg-neutral-200 text-secondary-foreground hover:bg-neutral-300"
        >
          <div className="w-full flex justify-between">
            <p className="font-semibold text-neutral-700 dark:text-white">
              Активность
            </p>
            {handle ?
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 dark:stroke-white" /> :
              <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200 dark:stroke-white" />
            }
          </div>
        </Button>
      </div>
      <div className={cn(handle ? "w-full ml-2.5" : "hidden")}>
        <ol className="mt-2 space-y-4 break-words">
          {items.map((item) => (
            <ActivityItem
              key={item.id}
              data={item}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};
