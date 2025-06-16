import { Skeleton } from "@/components/ui/skeleton";

export default function MainDashboardLoading() {
    return (
        <div className="p-4 space-y-6">
            <div className="flex gap-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
            </div>

            <div className="grid grid-cols-4 gap-4">
                <Skeleton className="h-[400px] col-span-3 w-full" />
                <Skeleton className="h-[400px] w-full" />
            </div>


            <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-80" />
                <Skeleton className="h-80" />
                <Skeleton className="h-80" />
            </div>
        </div>
    );
}
