import { Card, Skeleton } from '@heroui/react';

const SubscriptionSkeleton = () => {
  return (
    <Card className="flex flex-row gap-3 items-center justify-between bg-neutral-900 border border-neutral-800">
      <div className="flex gap-4">
        <Skeleton className="size-14 ml-4 shrink-0 rounded-2xl bg-neutral-800" />
        <div className="w-full min-w-40 space-y-1">
          <Skeleton className="w-3/5 h-6 rounded-xl bg-neutral-800 " />
          <Skeleton className="w-2/5 h-5 rounded-xl bg-neutral-800" />
          <Skeleton className="w-1/5 h-6 rounded-3xl mt-2 bg-neutral-800" />
        </div>
      </div>

      <div className="flex items-center gap-5 max-sm:gap-2">
        <div className="flex gap-4">
          <div className='w-full min-w-40 flex flex-col items-end justify-end gap-1'>
            <Skeleton className="w-3/5 h-6 rounded-xl bg-neutral-800" />
            <Skeleton className="w-2/5 h-4 rounded-xl bg-neutral-800" />
          </div>
          <Skeleton className="size-10 rounded-full shrink-0 bg-neutral-800" />
        </div>
        <Skeleton className="w-10 h-5 rounded-3xl bg-neutral-800" />
        <Skeleton className="size-10 rounded-full bg-neutral-800" />
      </div>
    </Card>
  );
};

export default SubscriptionSkeleton;
