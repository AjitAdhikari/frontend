import { Button } from "@/components/ui/button";
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
  ChevronRight,
  FileText,
  User
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Consumer() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    ssn: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    zip: "",
    coordinator: "",
    status: "Active",
    primaryInsurance: "",
    secondaryInsurance: "",
    serviceStart: "",
    serviceEnd: "",
    primaryWeeklyHours: "",
    primaryMonthlyHours: "",
    secondaryWeeklyHours: "",
    secondaryMonthlyHours: "",
    authorizationLetter: "",
  });

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  // CSS-friendly class definitions
  const classes = {
    container: "absolute top-16 inset-x-0 bottom-0 bg-[#F0F9FF]/50 flex flex-col p-8 overflow-y-auto z-10",
    wrapper: "max-w-5xl mx-auto w-full space-y-12 pb-20",

    header: "text-center space-y-4 pt-4",
    headerTitle: "text-[36px] text-[#1E293B] tracking-tight",
    headerSubtitle: "text-[16px] text-[#64748B] font-normal",

    stepsContainer: "flex items-center justify-center gap-40 py-4",
    stepItem: "flex flex-col items-center gap-3 w-40",
    stepCircle: "h-20 w-20 rounded-full flex items-center justify-center transition-all shadow-md",
    stepCircleActive: "bg-[#0D9488] text-white shadow-[#0D9488]/20",
    stepCircleInactive: "bg-[#E2E8F0] text-[#94A3B8]",
    stepLabel: "text-[14px] font-medium text-center",
    stepLabelActive: "text-[#0D9488]",
    stepLabelInactive: "text-[#94A3B8]",

    formSection: "bg-white rounded-[32px] border border-[#E2E8F0] shadow-sm overflow-hidden",
    formBody: "p-12 space-y-10",

    sectionHeader: "space-y-1 pb-6 border-b border-[#F1F5F9] mb-8",
    sectionTitle: "text-[22px] font-semibold text-[#1E293B]",
    sectionSubtitle: "text-[15px] text-[#94A3B8]",

    gridFull: "grid grid-cols-1 gap-8",
    gridTwo: "grid gap-8 lg:grid-cols-2",
    gridThree: "grid gap-8 lg:grid-cols-3",
    fieldGroup: "space-y-3",
    fieldLabel: "text-[15px] font-medium text-[#1E293B]",
    fieldLabelRequired: "text-red-500 ml-0.5 font-normal",
    fieldLabelSecondary: "text-[#64748B] font-medium text-[14px]",

    input: "h-[54px] border-[#E2E8F0] bg-white text-[16px] rounded-xl focus:border-[#0D9488] focus:ring-4 focus:ring-teal-50 transition-all placeholder:text-[#CBD5E1]",
    inputWithIcon: "pr-12",
    selectTrigger: "h-[54px] border-[#E2E8F0] bg-white text-[16px] rounded-xl focus:ring-4 focus:ring-teal-50 transition-all",

    iconContainer: "absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#94A3B8]",

    footer: "flex items-center justify-between pt-8",
    buttonBack: "h-12 w-28 text-[#64748B] bg-white border border-[#E2E8F0] font-semibold text-[15px] hover:bg-gray-50 rounded-xl transition-all shadow-sm",
    buttonNext: "h-14 px-10 bg-[#0D9488] text-white font-semibold text-[16px] hover:bg-[#0F766E] rounded-xl transition-all flex items-center gap-3 shadow-lg shadow-teal-100",
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {/* Centered Header */}
        <div className={classes.header}>
          <h1 className={classes.headerTitle}>Consumer Onboarding</h1>
          <p className={classes.headerSubtitle}>
            Complete all steps to add a new consumer to the system
          </p>
        </div>

        {/* Steps Indicator - Vertical Orientation */}
        <div className={classes.stepsContainer}>
          <div className={classes.stepItem}>
            <div className={cn(classes.stepCircle, step >= 1 ? classes.stepCircleActive : classes.stepCircleInactive)}>
              <User className="h-10 w-10" />
            </div>
            <span className={cn(classes.stepLabel, step >= 1 ? classes.stepLabelActive : classes.stepLabelInactive)}>
              Basic Information
            </span>
          </div>

          <div className={classes.stepItem}>
            <div className={cn(classes.stepCircle, step >= 2 ? classes.stepCircleActive : classes.stepCircleInactive)}>
              <FileText className="h-10 w-10" />
            </div>
            <span className={cn(classes.stepLabel, step >= 2 ? classes.stepLabelActive : classes.stepLabelInactive)}>
              Insurance & Documents
            </span>
          </div>
        </div>

        {/* Form Body */}
        <div className={classes.formSection}>
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className={classes.formBody}>
              <div className={classes.sectionHeader}>
                <h2 className={classes.sectionTitle}>Basic Information</h2>
                <p className={classes.sectionSubtitle}>Step 1 of 2</p>
              </div>

              <div className={classes.gridFull}>
                {/* Full Name */}
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>
                    Full Name <span className={classes.fieldLabelRequired}>*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    className={classes.input}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                {/* Date of Birth & SSN */}
                <div className={classes.gridTwo}>
                  <div className={classes.fieldGroup}>
                    <Label className={classes.fieldLabel}>Date of Birth</Label>
                    <div className="relative">
                      <Input
                        id="dob"
                        placeholder="mm/dd/yyyy"
                        className={cn(classes.input, classes.inputWithIcon)}
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      />
                      <Calendar className={classes.iconContainer} />
                    </div>
                  </div>
                  <div className={classes.fieldGroup}>
                    <Label className={classes.fieldLabel}>Social Security Number (SSN)</Label>
                    <Input
                      id="ssn"
                      placeholder="###-##-####"
                      className={classes.input}
                      value={formData.ssn}
                      onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="(###) ###-####"
                    className={classes.input}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Street Address */}
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    className={classes.input}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                {/* State, City, ZIP */}
                <div className={classes.gridThree}>
                  <div className={classes.fieldGroup}>
                    <Label className={classes.fieldLabel}>State</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(val) => setFormData({ ...formData, state: val })}
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
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className={classes.fieldGroup}>
                    <Label className={classes.fieldLabel}>ZIP Code</Label>
                    <Input
                      id="zip"
                      placeholder="43201"
                      className={classes.input}
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    />
                  </div>
                </div>

                {/* Coordinator & Status */}
                <div className={classes.gridTwo}>
                  <div className={classes.fieldGroup}>
                    <Label className={classes.fieldLabel}>Coordinator</Label>
                    <Input
                      id="coordinator"
                      placeholder="Coordinator name"
                      className={classes.input}
                      value={formData.coordinator}
                      onChange={(e) => setFormData({ ...formData, coordinator: e.target.value })}
                    />
                  </div>
                  <div className={classes.fieldGroup}>
                    <Label className={classes.fieldLabel}>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(val) => setFormData({ ...formData, status: val })}
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
              </div>
            </div>
          )}

          {/* Step 2: Insurance & Documents */}
          {step === 2 && (
            <div className={classes.formBody}>
              <div className={classes.sectionHeader}>
                <h2 className={classes.sectionTitle}>Insurance & Documents</h2>
                <p className={classes.sectionSubtitle}>Step 2 of 2</p>
              </div>

              <div className={classes.gridTwo}>
                {/* Primary Insurance */}
                <div className={classes.fieldGroup + " lg:col-span-2"}>
                  <Label className={classes.fieldLabel}>
                    Primary Insurance <span className={classes.fieldLabelRequired}>*</span>
                  </Label>
                  <Input
                    id="primaryInsurance"
                    placeholder="e.g., Buckeye Health Plan"
                    className={classes.input}
                    value={formData.primaryInsurance}
                    onChange={(e) => setFormData({ ...formData, primaryInsurance: e.target.value })}
                  />
                </div>

                {/* Secondary Insurance */}
                <div className={classes.fieldGroup + " lg:col-span-2"}>
                  <Label className={classes.fieldLabel}>Secondary Insurance</Label>
                  <Input
                    id="secondaryInsurance"
                    placeholder="Optional"
                    className={classes.input}
                    value={formData.secondaryInsurance}
                    onChange={(e) => setFormData({ ...formData, secondaryInsurance: e.target.value })}
                  />
                </div>

                {/* Service Dates */}
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Service Start Date</Label>
                  <div className="relative">
                    <Input
                      id="serviceStart"
                      placeholder="mm/dd/yyyy"
                      className={cn(classes.input, classes.inputWithIcon)}
                      value={formData.serviceStart}
                      onChange={(e) => setFormData({ ...formData, serviceStart: e.target.value })}
                    />
                    <Calendar className={classes.iconContainer} />
                  </div>
                </div>

                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Service End Date</Label>
                  <div className="relative">
                    <Input
                      id="serviceEnd"
                      placeholder="mm/dd/yyyy"
                      className={cn(classes.input, classes.inputWithIcon)}
                      value={formData.serviceEnd}
                      onChange={(e) => setFormData({ ...formData, serviceEnd: e.target.value })}
                    />
                    <Calendar className={classes.iconContainer} />
                  </div>
                </div>

                {/* Authorized Hours Sections */}
                <div className="lg:col-span-2 grid gap-12 pt-4">
                  {/* Primary Hours */}
                  <div className="space-y-6">
                    <Label className={classes.fieldLabel}>Primary Insurance Authorized Hours</Label>
                    <div className={classes.gridTwo}>
                      <div className={classes.fieldGroup}>
                        <Label className={classes.fieldLabelSecondary}>Weekly</Label>
                        <Input
                          id="primaryWeeklyHours"
                          placeholder="0.00"
                          className={classes.input}
                          value={formData.primaryWeeklyHours}
                          onChange={(e) => setFormData({ ...formData, primaryWeeklyHours: e.target.value })}
                        />
                      </div>
                      <div className={classes.fieldGroup}>
                        <Label className={classes.fieldLabelSecondary}>Monthly</Label>
                        <Input
                          id="primaryMonthlyHours"
                          placeholder="0.00"
                          className={classes.input}
                          value={formData.primaryMonthlyHours}
                          onChange={(e) => setFormData({ ...formData, primaryMonthlyHours: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Secondary Hours */}
                  <div className="space-y-6">
                    <Label className={classes.fieldLabel}>Secondary Insurance Authorized Hours</Label>
                    <div className={classes.gridTwo}>
                      <div className={classes.fieldGroup}>
                        <Label className={classes.fieldLabelSecondary}>Weekly</Label>
                        <Input
                          id="secondaryWeeklyHours"
                          placeholder="0.00"
                          className={classes.input}
                          value={formData.secondaryWeeklyHours}
                          onChange={(e) => setFormData({ ...formData, secondaryWeeklyHours: e.target.value })}
                        />
                      </div>
                      <div className={classes.fieldGroup}>
                        <Label className={classes.fieldLabelSecondary}>Monthly</Label>
                        <Input
                          id="secondaryMonthlyHours"
                          placeholder="0.00"
                          className={classes.input}
                          value={formData.secondaryMonthlyHours}
                          onChange={(e) => setFormData({ ...formData, secondaryMonthlyHours: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authorization Letter */}
                <div className={classes.fieldGroup + " lg:col-span-2 pt-4"}>
                  <Label className={classes.fieldLabel}>Authorization Letter</Label>
                  <Input
                    id="authorizationLetter"
                    type="file"
                    className={cn(classes.input, "file:mr-4 file:h-10 file:border-0 file:bg-slate-100 file:px-4 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer")}
                    onChange={(e) => setFormData({ ...formData, authorizationLetter: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className={classes.footer}>
          <Button
            onClick={step === 1 ? () => navigate(-1) : handleBack}
            className={classes.buttonBack}
          >
            {step === 1 ? "Back" : "Back"}
          </Button>
          <Button onClick={handleNext} className={classes.buttonNext}>
            {step === 1 ? (
              <>
                Next <ChevronRight className="h-6 w-6" />
              </>
            ) : (
              <>
                Complete Onboarding <Check className="h-6 w-6" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}