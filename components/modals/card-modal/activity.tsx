"use client";

import { AuditLog } from "@prisma/client";
import { ActivityIcon, ChevronDown } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { ActivityItem } from "@/components/activity-item";

interface ActivityProps {
  items: AuditLog[];
};

export const Activity = ({
  items,
}: ActivityProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700 dark:stroke-white" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2 dark:text-white">
          Активность
        </p>
        <ol className="mt-2 space-y-4">
          {items.map((item) => (
            <ActivityItem
              key={item.id}
              data={item}
            />
          ))}
        </ol>
      </div>
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 dark:stroke-white" />
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
