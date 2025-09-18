import { z } from "zod";

export const SearchFormSchema = z.strictObject({
  departureCityId: z.cuid(),
  arrivalCityId: z.cuid(),
});

export type SearchFormType = z.infer<typeof SearchFormSchema>;

