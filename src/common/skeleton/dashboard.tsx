import { Card } from "@/components/ui/card";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary rounded w-64 mb-2"></div>
          <div className="h-4 bg-secondary rounded w-96 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="h-4 bg-secondary rounded w-24 mb-2"></div>
                <div className="h-8 bg-secondary rounded w-16 mb-2"></div>
                <div className="h-3 bg-secondary rounded w-20"></div>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="h-6 bg-secondary rounded w-40 mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-secondary rounded w-full"
                  ></div>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <div className="h-6 bg-secondary rounded w-32 mb-4"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-secondary rounded w-full"
                  ></div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
