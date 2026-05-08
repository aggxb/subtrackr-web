import { Card, Skeleton } from '@heroui/react';

const StatCardSkeleton = () => {
  return (
    <Card className="px-4 py-8 flex flex-row justify-between bg-neutral-800 border border-neutral-900 max-sm:px-3 max-sm:py-6">
      <div className="w-full space-y-1.5">
        <Skeleton className="w-2/5 h-5 rounded-lg bg-neutral-800" />
        <Skeleton className="w-3/5 h-8 rounded-lg bg-neutral-800" />
      </div>
      <Skeleton className="size-12 rounded-xl bg-neutral-800 shrink-0 ml-4" />
    </Card>
  );
};

export default StatCardSkeleton;
