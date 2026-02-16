import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import ListField from "./listfield";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

type FieldOption = {
  value: string;
  label: string;
};


interface FieldConfig {
  key: string;
  label: string;
  placeholder: string;
  type?: "input" | "textarea" | "list" | "select" ;
  options? : FieldOption[],
  defaultValue? : string;
}

interface ObjectListFieldProps {
  form: any;
  name: string;
  fields: FieldConfig[];
  addButtonText?: string;
}

const ObjectListField = ({ 
  form, 
  name, 
  fields: fieldConfigs,
  addButtonText = "+ Add Insurance Details",
}: ObjectListFieldProps) => {
  const { control, register, getValues } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // Create empty object based on field configurations
  const createEmptyObject = () => {
    return fieldConfigs.reduce((obj, field) => {
      if (field.type === "list") {
      obj[field.key] = [];
    } else if (field.type === "select") {
      obj[field.key] = "";
    } else {
      obj[field.key] = "";
    }
      return obj;
    }, {} as Record<string, any>);
  };

  // Initialize fields with existing data or ensure at least one empty input
  useEffect(() => {
    const currentValues = getValues(name) || [];

    if (fields.length === 0) {
      if (currentValues.length > 0) {
        // populate with existing values
        currentValues.forEach((val: any) => append(val));
      } else {
        // ensure at least one empty object
        // append(createEmptyObject());
      }
    }
  }, [fields, append, getValues, name, fieldConfigs]);


  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => (
        <div key={field.id} className="border flex justify-between items-start rounded-lg p-4 bg-gray-50 gap-8">
            <div className="flex flex-col gap-3 w-full">
            {fieldConfigs.map((fieldConfig) => (
              <div key={fieldConfig.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {fieldConfig.label}
                </label>
                {fieldConfig.type === "textarea" ? (
                  <Textarea
                    placeholder={fieldConfig.placeholder}
                    {...register(`${name}.${index}.${fieldConfig.key}`)}
                  />
                ) : fieldConfig.type === "list" ? (
                  <ListField
                    form={form}
                    name={`${name}.${index}.${fieldConfig.key}`}
                  />
                )
                : fieldConfig.type === "select" ? (
                  <Controller
                            name={`${name}.${index}.${fieldConfig.key}`}
                            control={form.control}
                            render={({ field }) => (
                              <Select
                                value={field.value ?? ""}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="h-9 w-[70%] border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm">
                                  <SelectValue
                                  placeholder={`Select ${fieldConfig.label.toLowerCase()}...`}
                                />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>{fieldConfig.label}</SelectLabel>
                                  {fieldConfig.options?.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={String(option.value)}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                            ) 
                             :(
                  <Input
                    placeholder={fieldConfig.placeholder}
                    type={fieldConfig.type}
                    {...register(`${name}.${index}.${fieldConfig.key}`)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="">
           
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => remove(index)}
            >
              ✕
            </Button>
          </div>
        
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() => append(createEmptyObject())}
      >
        {addButtonText}
      </Button>
    </div>
  );
};

export default ObjectListField;

/* 
Usage Examples:

// For phases with title and description:
<ObjectListField 
  form={form}
  name="phases"
  fields={[
    { key: "title", label: "Title", placeholder: "e.g., Phase 1: Application" },
    { key: "description", label: "Description", placeholder: "Enter description..." }
  ]}
  addButtonText="+ Add Phase"
/>

// For team members:
<ObjectListField 
  form={form}
  name="team_members"
  fields={[
    { key: "name", label: "Name", placeholder: "Enter member name" },
    { key: "role", label: "Role", placeholder: "Enter role" },
    { key: "email", label: "Email", placeholder: "Enter email address" }
  ]}
  addButtonText="+ Add Team Member"
/>

// For FAQ with textarea:
<ObjectListField 
  form={form}
  name="faqs"
  fields={[
    { key: "question", label: "Question", placeholder: "Enter question" },
    { key: "answer", label: "Answer", placeholder: "Enter answer", type: "textarea" }
  ]}
  addButtonText="+ Add FAQ"
/>

// For services with list fields:
<ObjectListField 
  form={form}
  name="services"
  fields={[
    { key: "heading", label: "Heading", placeholder: "Enter service heading" },
    { key: "outcome", label: "Outcome", placeholder: "Enter service outcome" },
    { key: "services", label: "Services", placeholder: "Enter services", type: "list" },
    { key: "description", label: "Description", placeholder: "Enter description", type: "textarea" },
    { key: "short_description", label: "Short Description", placeholder: "Enter short description" }
  ]}
  addButtonText="+ Add Service"
/>

// For simple key-value pairs:
<ObjectListField 
  form={form}
  name="settings"
  fields={[
    { key: "key", label: "Setting Key", placeholder: "e.g., max_users" },
    { key: "value", label: "Setting Value", placeholder: "Enter value" }
  ]}
/>
*/