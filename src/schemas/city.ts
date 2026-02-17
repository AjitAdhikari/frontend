import { z } from "zod";

export const citySchema = z.object({
  id: z.string().optional(),
  cityName: z.string().min(1, "City name is required"),
  state: z.string().min(1, "State is required"),
  active: z.boolean().default(true),
});

export const cityFormSchema = citySchema.omit({ id: true });

export type City = z.infer<typeof citySchema>;
export type CityFormData = z.infer<typeof cityFormSchema>;