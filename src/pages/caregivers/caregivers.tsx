import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Check,
  ChevronLeft,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CaregiverForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    ssn: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    zip: "",
    hireDate: "",
    hourlyRate: "",
    maxHoursWeekly: "",
    status: "Active",
  });

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const classes = {
    container: "absolute top-16 inset-x-0 bottom-0 bg-[#F8FAFC] flex flex-col p-8 overflow-y-auto z-10",
    wrapper: "max-w-6xl mx-auto w-full space-y-8 pb-12",

    backButton: "flex items-center gap-2 text-gray-900 hover:text-gray-700 font-semibold mb-8 cursor-pointer w-fit text-[15px] px-2",
    backIcon: "h-4 w-4",

    headerSection: "bg-[#F0F9FF] border-b border-[#E2E8F0] px-10 py-10 flex items-center gap-6 mb-8 -mx-8 -mt-8",
    headerIcon: "h-20 w-20 rounded-full bg-[#0D9488] flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-teal-100",
    headerContent: "flex-1",
    headerTitle: "text-[32px] font-bold text-[#1E293B] tracking-tight",
    headerSubtitle: "text-[16px] text-[#64748B] mt-1.5 font-normal leading-relaxed",

    formSection: "bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm overflow-hidden",
    sectionHeader: "px-8 pt-8 pb-4",
    sectionTitle: "text-[22px] font-semibold text-[#1E293B] tracking-tight",

    formBody: "p-8 space-y-6",
    gridTwo: "grid gap-x-8 gap-y-6 lg:grid-cols-2",
    fieldGroup: "space-y-2.5",
    fieldLabel: "text-[15px] font-semibold text-[#1E293B]",
    fieldLabelRequired: "text-red-500 ml-0.5",

    input: "h-[52px] border-[#E2E8F0] bg-[#FDFDFD] text-[15px] rounded-xl focus:border-[#0D9488] focus:ring-4 focus:ring-teal-50 transition-all placeholder:text-[#94A3B8]",
    inputWithIcon: "pr-12",
    selectTrigger: "h-[52px] border-[#E2E8F0] bg-[#FDFDFD] text-[15px] rounded-xl focus:ring-4 focus:ring-teal-50 transition-all",

    iconContainer: "absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#94A3B8]",

    footer: "flex items-center justify-end gap-4 pt-8 pb-2 pr-2",
    buttonCancel: "h-12 px-8 text-[#64748B] bg-white border border-[#E2E8F0] font-semibold text-[15px] hover:bg-gray-50 rounded-xl transition-all shadow-sm",
    buttonSubmit: "h-12 px-8 bg-[#0D9488] text-white font-semibold text-[15px] hover:bg-[#0F766E] rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-teal-100",
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {/* Back Link */}
        <div className={classes.backButton} onClick={handleCancel}>
          <ChevronLeft className={classes.backIcon} />
          <span>Back to Caregivers</span>
        </div>

        {/* Header Branding Card */}
        <div className={classes.headerSection}>
          <div className={classes.headerIcon}>
            <Users className="h-8 w-8" />
          </div>
          <div className={classes.headerContent}>
            <h1 className={classes.headerTitle}>Add New Caregiver</h1>
            <p className={classes.headerSubtitle}>
              Enter caregiver details and upload required documents
            </p>
          </div>
        </div>

        {/* Main Information Card */}
        <div className={classes.formSection}>
          <div className={classes.sectionHeader}>
            <h2 className={classes.sectionTitle}>Basic Information</h2>
          </div>

          <div className={classes.formBody}>
            <div className="space-y-6">
              {/* Full Name Row */}
              <div className={classes.fieldGroup}>
                <Label className={classes.fieldLabel}>
                  Full Name <span className={classes.fieldLabelRequired}>*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Jane Smith"
                  className={classes.input}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              {/* DOB & SSN Row */}
              <div className={classes.gridTwo}>
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Date of Birth</Label>
                  <div className="relative">
                    <Input
                      id="dob"
                      placeholder="mm/dd/yyyy"
                      className={cn(classes.input, classes.inputWithIcon)}
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                    />
                    <Calendar className={classes.iconContainer} />
                  </div>
                </div>
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>
                    Social Security Number (SSN)
                  </Label>
                  <Input
                    id="ssn"
                    placeholder="###-##-####"
                    className={classes.input}
                    value={formData.ssn}
                    onChange={(e) =>
                      setFormData({ ...formData, ssn: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Email & Phone Row */}
              <div className={classes.gridTwo}>
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Email</Label>
                  <Input
                    id="email"
                    placeholder="jane@example.com"
                    type="email"
                    className={classes.input}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="(###) ###-####"
                    className={classes.input}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* State & City Row */}
              <div className={classes.gridTwo}>
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>State</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(val) =>
                      setFormData({ ...formData, state: val })
                    }
                  >
                    <SelectTrigger className={classes.selectTrigger}>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OH">Ohio</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>City</Label>
                  <Input
                    id="city"
                    placeholder="Columbus"
                    className={classes.input}
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* ZIP & Hire Date Row */}
              <div className={classes.gridTwo}>
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="43201"
                    className={classes.input}
                    value={formData.zip}
                    onChange={(e) =>
                      setFormData({ ...formData, zip: e.target.value })
                    }
                  />
                </div>
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Hire Date</Label>
                  <div className="relative">
                    <Input
                      id="hireDate"
                      placeholder="mm/dd/yyyy"
                      className={cn(classes.input, classes.inputWithIcon)}
                      value={formData.hireDate}
                      onChange={(e) =>
                        setFormData({ ...formData, hireDate: e.target.value })
                      }
                    />
                    <Calendar className={classes.iconContainer} />
                  </div>
                </div>
              </div>

              {/* Rate & Hours Row */}
              <div className={classes.gridTwo}>
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    placeholder="25.00"
                    type="number"
                    step="0.01"
                    className={classes.input}
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      setFormData({ ...formData, hourlyRate: e.target.value })
                    }
                  />
                </div>
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Max Hours Weekly</Label>
                  <Input
                    id="maxHoursWeekly"
                    placeholder="40"
                    type="number"
                    className={classes.input}
                    value={formData.maxHoursWeekly}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxHoursWeekly: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Status Row */}
              <div className={classes.fieldGroup}>
                <Label className={classes.fieldLabel}>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val) =>
                    setFormData({ ...formData, status: val })
                  }
                >
                  <SelectTrigger className={classes.selectTrigger}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Footer Buttons Overlay */}
            <div className={classes.footer}>
              <button onClick={handleCancel} className={classes.buttonCancel}>
                Cancel
              </button>
              <button onClick={handleSubmit} className={classes.buttonSubmit}>
                <Check className="h-5 w-5" />
                Add Caregiver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}