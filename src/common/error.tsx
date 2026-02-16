import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center drop-shadow-md">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Error !!!</h1>
        <p className="text-xl text-gray-700 mb-8">
          Oops! Something went wrong. Please try again later.
        </p>
        <Link to="/" className="">
          <Button variant="ghost" className="ml-4">
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;




