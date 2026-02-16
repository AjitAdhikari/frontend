import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/hooks/queryFn";
import { queryKey } from "@/lib/types/query-keys";
import { ArrowLeft, Edit } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ReadWorkLog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useFetch({
    path: `/api/${queryKey.INSURANCE_PROVIDER}/${id}`,
    queryKey: queryKey.INSURANCE_PROVIDER,
    queryKeyID: id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="min-h-screen bg-background px-6">
      <div className="bg-card z-10">
        <div className="container mx-auto px-2 py-4">
          <div className="flex items-center justify-between">
            <Button variant="link" size="link" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Link to={`/insurance-providers/update/${id}`}>
              <Button variant="ghost" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Log Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-secondary-foreground">Name</span>
                  <p className="font-mono text-sm bg-secondary px-2 py-1 rounded">{data?.name}</p>
                </div>
                <div>
                    <span className="text-sm text-secondary-foreground">Billing Code</span>
                    <p className="font-mono text-sm bg-secondary px-2 py-1 rounded">{data?.billing_code}</p>
                </div>
                <div>
                    <span className="text-sm text-secondary-foreground">Contact Info</span>
                    <p className="font-mono text-sm bg-secondary px-2 py-1 rounded">{data?.contact_info}</p>
                </div>
                <div>
                    <span className="text-sm text-secondary-foreground">Plan Type</span>
                    <p className="font-mono text-sm bg-secondary px-2 py-1 rounded">{data?.plan_type}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadWorkLog;
