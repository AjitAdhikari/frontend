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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Check,
  ChevronRight,
  FileText,
  User,
} from "lucide-react";
import { useState } from "react";

export default function Consumer() {
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
    container: "h-full w-full bg-gradient-to-b from-sky-50 via-white to-sky-50/70 flex flex-col p-8",
    wrapper: "flex-1 flex flex-col space-y-8",
    header: "text-center space-y-3",
    headerTitle: "text-4xl font-bold tracking-tight text-slate-900",
    headerSubtitle: "text-lg text-slate-500",
    
    stepsContainer: "flex items-center justify-center gap-16 py-6",
    stepItem: "flex flex-col items-center gap-3",
    stepCircle: "h-16 w-16 rounded-full flex items-center justify-center border-2 transition-colors",
    stepCircleActive: "bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-200/60",
    stepCircleInactive: "bg-slate-100 text-slate-500 border-slate-200",
    stepLabel: "text-base font-semibold",
    stepLabelActive: "text-teal-700",
    stepLabelInactive: "text-slate-500",
    stepDivider: "h-1 w-48 bg-slate-300",
    
    formContent: "flex-1 flex flex-col overflow-y-auto",
    formSection: "space-y-8 pb-8",
    sectionHeader: "space-y-4",
    sectionTitle: "text-2xl font-bold text-slate-900",
    sectionSubtitle: "text-base text-slate-500 mt-2",
    sectionSeparator: "bg-slate-200 h-0.5",
    
    fieldsGrid: "grid gap-8 w-full",
    fieldGroup: "space-y-3",
    fieldLabel: "text-slate-900 font-semibold text-base",
    fieldLabelRequired: "text-red-500",
    fieldLabelSecondary: "text-slate-600 font-medium text-base",
    
    input: "h-14 border border-slate-300 bg-white text-base rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300",
    inputWithIcon: "pr-12",
    select: "h-14 border border-slate-300 bg-white text-base rounded-lg focus:outline-none focus:border-slate-400",
    
    gridTwo: "grid gap-8 lg:grid-cols-2",
    gridThree: "grid gap-8 lg:grid-cols-3",
    
    iconContainer: "absolute right-4 top-4 h-6 w-6 text-slate-400",
    
    sectionGroupTitle: "text-slate-900 font-semibold text-base",
    
    footer: "flex items-center justify-between pt-6 border-t border-slate-200",
    buttonBack: "h-12 px-6 text-slate-700 bg-white border border-slate-400 font-medium text-base hover:bg-slate-50 rounded-lg transition-colors",
    buttonNext: "h-12 px-8 bg-teal-600 text-white font-semibold text-base hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-2",
    buttonDisabled: "pointer-events-none opacity-0",
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {/* Header */}
        <div className={classes.header}>
          <h1 className={classes.headerTitle}>Consumer Onboarding</h1>
          <p className={classes.headerSubtitle}>
            Complete all steps to add a new consumer to the system
          </p>
        </div>

        {/* Steps Indicator */}
        <div className={classes.stepsContainer}>
          <div className={classes.stepItem}>
            <div
              className={cn(
                classes.stepCircle,
                step >= 1 ? classes.stepCircleActive : classes.stepCircleInactive
              )}
            >
              {step === 2 ? (
                <Check className="h-8 w-8" />
              ) : (
                <User className="h-8 w-8" />
              )}
            </div>
            <span
              className={cn(
                classes.stepLabel,
                step >= 1 ? classes.stepLabelActive : classes.stepLabelInactive
              )}
            >
              Basic Information
            </span>
          </div>

          <div className={classes.stepDivider} />

          <div className={classes.stepItem}>
            <div
              className={cn(
                classes.stepCircle,
                step >= 2 ? classes.stepCircleActive : classes.stepCircleInactive
              )}
            >
              <FileText className="h-8 w-8" />
            </div>
            <span
              className={cn(
                classes.stepLabel,
                step >= 2 ? classes.stepLabelActive : classes.stepLabelInactive
              )}
            >
              Insurance & Documents
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className={classes.formContent}>
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className={classes.formSection}>
              <div className={classes.sectionHeader}>
                <div>
                  <h2 className={classes.sectionTitle}>Basic Information</h2>
                  <p className={classes.sectionSubtitle}>Step 1 of 2</p>
                </div>
                <Separator className={classes.sectionSeparator} />
              </div>

              <div className={classes.fieldsGrid}>
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
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
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

                {/* Phone Number */}
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

                {/* Street Address */}
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    className={classes.input}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                {/* State, City, ZIP */}
                <div className={classes.gridThree}>
                  <div className={classes.fieldGroup}>
                    <Label className={classes.fieldLabel}>State</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(val) =>
                        setFormData({ ...formData, state: val })
                      }
                    >
                      <SelectTrigger className={classes.select}>
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
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coordinator: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={classes.fieldGroup}>
                    <Label className={classes.fieldLabel}>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(val) =>
                        setFormData({ ...formData, status: val })
                      }
                    >
                      <SelectTrigger className={classes.select}>
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
            <div className={classes.formSection}>
              <div className={classes.sectionHeader}>
                <div>
                  <h2 className={classes.sectionTitle}>Insurance & Documents</h2>
                  <p className={classes.sectionSubtitle}>Step 2 of 2</p>
                </div>
                <Separator className={classes.sectionSeparator} />
              </div>

              <div className={classes.fieldsGrid}>
                {/* Primary Insurance */}
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>
                    Primary Insurance <span className={classes.fieldLabelRequired}>*</span>
                  </Label>
                  <Input
                    id="primaryInsurance"
                    placeholder="e.g., Buckeye Health Plan"
                    className={classes.input}
                    value={formData.primaryInsurance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        primaryInsurance: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Secondary Insurance */}
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Secondary Insurance</Label>
                  <Input
                    id="secondaryInsurance"
                    placeholder="Optional"
                    className={classes.input}
                    value={formData.secondaryInsurance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        secondaryInsurance: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Service Dates */}
                <div className={classes.gridTwo}>
                  <div className={classes.fieldGroup}>
                    <Label className={classes.fieldLabel}>Service Start Date</Label>
                    <div className="relative">
                      <Input
                        id="serviceStart"
                        placeholder="mm/dd/yyyy"
                        className={cn(classes.input, classes.inputWithIcon)}
                        value={formData.serviceStart}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serviceStart: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serviceEnd: e.target.value,
                          })
                        }
                      />
                      <Calendar className={classes.iconContainer} />
                    </div>
                  </div>
                </div>

                {/* Primary Insurance Hours */}
                <div className="space-y-6">
                  <h3 className={classes.sectionGroupTitle}>
                    Primary Insurance Authorized Hours
                  </h3>
                  <div className={classes.gridTwo}>
                    <div className={classes.fieldGroup}>
                      <Label className={classes.fieldLabelSecondary}>Weekly</Label>
                      <Input
                        id="primaryWeeklyHours"
                        placeholder="Enter weekly hours"
                        className={classes.input}
                        value={formData.primaryWeeklyHours}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            primaryWeeklyHours: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className={classes.fieldGroup}>
                      <Label className={classes.fieldLabelSecondary}>Monthly</Label>
                      <Input
                        id="primaryMonthlyHours"
                        placeholder="Enter monthly hours"
                        className={classes.input}
                        value={formData.primaryMonthlyHours}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            primaryMonthlyHours: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary Insurance Hours */}
                <div className="space-y-6">
                  <h3 className={classes.sectionGroupTitle}>
                    Secondary Insurance Authorized Hours
                  </h3>
                  <div className={classes.gridTwo}>
                    <div className={classes.fieldGroup}>
                      <Label className={classes.fieldLabelSecondary}>Weekly</Label>
                      <Input
                        id="secondaryWeeklyHours"
                        placeholder="Optional"
                        className={classes.input}
                        value={formData.secondaryWeeklyHours}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            secondaryWeeklyHours: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className={classes.fieldGroup}>
                      <Label className={classes.fieldLabelSecondary}>Monthly</Label>
                      <Input
                        id="secondaryMonthlyHours"
                        placeholder="Optional"
                        className={classes.input}
                        value={formData.secondaryMonthlyHours}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            secondaryMonthlyHours: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Authorization Letter */}
                <div className={classes.fieldGroup}>
                  <Label className={classes.fieldLabel}>Authorization Letter</Label>
                  <Input
                    id="authorizationLetter"
                    type="file"
                    className={cn(
                      classes.input,
                      "file:mr-4 file:h-10 file:border-0 file:bg-slate-100 file:px-4 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                    )}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        authorizationLetter: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className={classes.footer}>
          <Button
            onClick={step === 1 ? () => {} : handleBack}
            className={cn(
              classes.buttonBack,
              step === 1 && classes.buttonDisabled
            )}
          >
            Back
          </Button>
          <Button onClick={handleNext} className={classes.buttonNext}>
            {step === 1 ? (
              <>
                Next <ChevronRight className="h-5 w-5" />
              </>
            ) : (
              <>
                Complete Onboarding <Check className="h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}