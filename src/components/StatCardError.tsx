import { Card } from '@heroui/react';

const StatCardError = () => {
  return (
    <Card className="px-4 py-8 flex flex-row justify-between bg-neutral-950 border border-red-600/20 max-sm:px-3 max-sm:py-6">
      <div className="w-full space-y-1.5">
        <div className="w-2/5 h-5 rounded-lg bg-red-950/10 border border-red-600/20"></div>
        <div className="w-3/5 h-8 rounded-lg bg-red-950/10 border border-red-600/20"></div>
      </div>
      <div className="size-12 rounded-xl bg-red-950/10 shrink-0 ml-4 border border-red-800/20"></div>
    </Card>
  );
};

export default StatCardError;
