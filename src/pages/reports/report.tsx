import { useAuth } from "@/context/authcontext";
import CaregiverReport from "./caregiverReport";
import ConsumerReport from "./consumerReport";
import InsuranceReport from "./insuranceReport";
import LocationReport from "./location_report";
import { Role } from "@/enum/enum";

const Report = () => {
  const {user} = useAuth();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {user?.role === Role.SUPERADMIN && (
            <>  
            <LocationReport />
            </>
      )}
        <InsuranceReport />
        <ConsumerReport />
        <CaregiverReport />
      </section>
    </div>
  );
};

export default Report;
