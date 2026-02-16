import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 via-white to-sky-50/70 px-6 py-8">
      <div className="w-full max-w-none space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Consumer Onboarding
          </h1>
          <p className="text-slate-500">
            Complete all steps to add a new consumer to the system
          </p>
        </div>

        <div className="flex items-center justify-center gap-10 py-4">
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center border transition-colors",
                step >= 1
                  ? "bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-200/60"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              )}
            >
              {step === 2 ? (
                <Check className="h-6 w-6" />
              ) : (
                <User className="h-6 w-6" />
              )}
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                step >= 1 ? "text-teal-700" : "text-slate-500"
              )}
            >
              Basic Information
            </span>
          </div>

          <div className="h-px w-40 bg-slate-200" />

          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center border transition-colors",
                step >= 2
                  ? "bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-200/60"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              )}
            >
              <FileText className="h-6 w-6" />
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                step >= 2 ? "text-teal-700" : "text-slate-500"
              )}
            >
              Insurance & Documents
            </span>
          </div>
        </div>

        <Card className="w-full rounded-2xl border border-slate-100 bg-white shadow-md shadow-slate-200/70">
          <CardContent className="p-8">
            {step === 1 && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Basic Information
                    </h2>
                    <p className="text-sm text-slate-500">Step 1 of 2</p>
                  </div>
                  <Separator />
                </div>

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-slate-900 font-medium"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      className="h-12 border-slate-200 bg-white"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="text-slate-900 font-medium">
                        Date of Birth
                      </Label>
                      <div className="relative">
                        <Input
                          id="dob"
                          placeholder="mm/dd/yyyy"
                          className="h-12 border-slate-200 bg-white pr-10"
                          value={formData.dob}
                          onChange={(e) =>
                            setFormData({ ...formData, dob: e.target.value })
                          }
                        />
                        <Calendar className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ssn" className="text-slate-900 font-medium">
                        Social Security Number (SSN)
                      </Label>
                      <Input
                        id="ssn"
                        placeholder="###-##-####"
                        className="h-12 border-slate-200 bg-white"
                        value={formData.ssn}
                        onChange={(e) =>
                          setFormData({ ...formData, ssn: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-slate-900 font-medium"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="(###) ###-####"
                      className="h-12 border-slate-200 bg-white"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-slate-900 font-medium"
                    >
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      className="h-12 border-slate-200 bg-white"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="state"
                        className="text-slate-900 font-medium"
                      >
                        State
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={(val) =>
                          setFormData({ ...formData, state: val })
                        }
                      >
                        <SelectTrigger
                          id="state"
                          className="h-12 border-slate-200 bg-white"
                        >
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OH">Ohio</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="city"
                        className="text-slate-900 font-medium"
                      >
                        City
                      </Label>
                      <Input
                        id="city"
                        placeholder="Columbus"
                        className="h-12 border-slate-200 bg-white"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip" className="text-slate-900 font-medium">
                        ZIP Code
                      </Label>
                      <Input
                        id="zip"
                        placeholder="43201"
                        className="h-12 border-slate-200 bg-white"
                        value={formData.zip}
                        onChange={(e) =>
                          setFormData({ ...formData, zip: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="coordinator"
                        className="text-slate-900 font-medium"
                      >
                        Coordinator
                      </Label>
                      <Input
                        id="coordinator"
                        placeholder="Coordinator name"
                        className="h-12 border-slate-200 bg-white"
                        value={formData.coordinator}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            coordinator: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="status"
                        className="text-slate-900 font-medium"
                      >
                        Status
                      </Label>
                      <Select
                        value={formData.status}
                        onValueChange={(val) =>
                          setFormData({ ...formData, status: val })
                        }
                      >
                        <SelectTrigger
                          id="status"
                          className="h-12 border-slate-200 bg-white"
                        >
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

            {step === 2 && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Insurance & Documents
                    </h2>
                    <p className="text-sm text-slate-500">Step 2 of 2</p>
                  </div>
                  <Separator />
                </div>

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="primaryInsurance"
                      className="text-slate-900 font-medium"
                    >
                      Primary Insurance <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="primaryInsurance"
                      placeholder="e.g., Buckeye Health Plan"
                      className="h-12 border-slate-200 bg-white"
                      value={formData.primaryInsurance}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primaryInsurance: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="secondaryInsurance"
                      className="text-slate-900 font-medium"
                    >
                      Secondary Insurance
                    </Label>
                    <Input
                      id="secondaryInsurance"
                      placeholder="Optional"
                      className="h-12 border-slate-200 bg-white"
                      value={formData.secondaryInsurance}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          secondaryInsurance: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="serviceStart"
                        className="text-slate-900 font-medium"
                      >
                        Service Start Date
                      </Label>
                      <div className="relative">
                        <Input
                          id="serviceStart"
                          placeholder="mm/dd/yyyy"
                          className="h-12 border-slate-200 bg-white pr-10"
                          value={formData.serviceStart}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              serviceStart: e.target.value,
                            })
                          }
                        />
                        <Calendar className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="serviceEnd"
                        className="text-slate-900 font-medium"
                      >
                        Service End Date
                      </Label>
                      <div className="relative">
                        <Input
                          id="serviceEnd"
                          placeholder="mm/dd/yyyy"
                          className="h-12 border-slate-200 bg-white pr-10"
                          value={formData.serviceEnd}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              serviceEnd: e.target.value,
                            })
                          }
                        />
                        <Calendar className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-900 font-medium">
                      Primary Insurance Authorized Hours
                    </Label>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="primaryWeeklyHours"
                          className="text-slate-600"
                        >
                          Weekly
                        </Label>
                        <Input
                          id="primaryWeeklyHours"
                          className="h-12 border-slate-200 bg-white"
                          value={formData.primaryWeeklyHours}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              primaryWeeklyHours: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="primaryMonthlyHours"
                          className="text-slate-600"
                        >
                          Monthly
                        </Label>
                        <Input
                          id="primaryMonthlyHours"
                          className="h-12 border-slate-200 bg-white"
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

                  <div className="space-y-2">
                    <Label className="text-slate-900 font-medium">
                      Secondary Insurance Authorized Hours
                    </Label>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="secondaryWeeklyHours"
                          className="text-slate-600"
                        >
                          Weekly
                        </Label>
                        <Input
                          id="secondaryWeeklyHours"
                          placeholder="Optional"
                          className="h-12 border-slate-200 bg-white"
                          value={formData.secondaryWeeklyHours}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              secondaryWeeklyHours: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="secondaryMonthlyHours"
                          className="text-slate-600"
                        >
                          Monthly
                        </Label>
                        <Input
                          id="secondaryMonthlyHours"
                          placeholder="Optional"
                          className="h-12 border-slate-200 bg-white"
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

                  <Separator />

                  <div className="space-y-2">
                    <Label
                      htmlFor="authorizationLetter"
                      className="text-slate-900 font-medium"
                    >
                      Authorization Letter
                    </Label>
                    <Input
                      id="authorizationLetter"
                      type="file"
                      className="h-12 border-slate-200 bg-white file:mr-4 file:h-10 file:border-0 file:bg-slate-100 file:px-4 file:text-slate-700 hover:file:bg-slate-200"
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
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            onClick={step === 1 ? () => {} : handleBack}
            className={cn(
              "min-w-[100px] border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50",
              step === 1 && "pointer-events-none opacity-0"
            )}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="min-w-[180px] bg-teal-600 text-white shadow-sm hover:bg-teal-700"
          >
            {step === 1 ? (
              <>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Complete Onboarding <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}