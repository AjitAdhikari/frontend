import ErrorImage from "@/assets/images/error.png";

const AccessDenied = () => {
  return (
    <div>
      <div className="grid place-content-center place-items-center h-[85vh] gap-6 p-8">
        <section className="flex justify-center items-center max-w-md">
          <img
            src={ErrorImage}
            alt="error"
            className="aspect-square object-cover w-full h-auto max-w-sm"
          />
        </section>
        <section className="flex flex-col items-center justify-center text-center space-y-4 max-w-lg">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            You do not have permission to view this page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AccessDenied;