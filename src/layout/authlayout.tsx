import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className=" h-screen w-full grid lg:grid-cols-2">
      <div className="bg-gradient-to-r from-primary to-muted flex justify-center items-center">
        <Outlet />
      </div>
      <div className="relative max-lg:hidden flex max-h-[100vh] bg-[url('@/assets/images/login_bg.jpg')] bg-cover bg-center">
        <section className="bg-muted-foreground absolute bottom-20 left-1/2 -translate-x-1/2 p-6 text-white space-y-4 max-w-11/12 w-full rounded-md">
          <h6>MyIntra Portal</h6>
        </section>
      </div>
    </div>
  );
};

export default AuthLayout;
