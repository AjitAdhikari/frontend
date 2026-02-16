import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          <CheckCircle className="w-3 h-3" />
          {status}
        </Badge>
      );
    case "unpaid":
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3" />
          {status}
        </Badge>
      );
    case "partially_paid":
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          <Clock className="w-3 h-3" />
          Partially Paid
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const getIssueStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
          {status}
        </Badge>
      );
    case "returned":
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          {status}
        </Badge>
      );
    case "overdue":
      return <Badge variant="destructive">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
