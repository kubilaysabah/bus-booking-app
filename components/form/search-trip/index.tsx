"use client";

import { useState, useEffect, useActionState } from "react";
import {
  ArrowLeftRightIcon,
  SearchIcon,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchAction } from "@/api/actions/search";
import { getCities } from "@/api/services/cities";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchTrip() {
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const [state, action, pending] = useActionState(searchAction, null);

  return (
    <Card className="max-w-lg">
      <CardContent>
        <form className="space-y-5" action={action}>
          <div className="flex items-center gap-3">
            <Checkbox
              id="roundTrip"
              checked={isRoundTrip}
              onCheckedChange={(checked) => setIsRoundTrip(checked as boolean)}
            />
            <Label htmlFor="roundTrip">
              <ArrowLeftRightIcon />
              Round Trip
            </Label>
          </div>
          <div className="flex flex-wrap items-end space-x-3">
            <div className="w-full md:flex-1">
              <Label>Departure City</Label>
              {isLoading ? (
                <Skeleton className="w-full h-10 mt-2" />
              ) : (
                <Select disabled={pending} name="departureCity">
                  <SelectTrigger disabled={pending} className="w-full mt-2">
                    <SelectValue placeholder="Departure City" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="w-full md:w-auto">
              <Button
                variant={"outline"}
                size={"sm"}
                className="mx-auto w-auto flex"
                type="button"
                disabled={!isRoundTrip || pending || isLoading}
              >
                {pending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowLeftRightIcon />
                )}
              </Button>
            </div>

            <div className="w-full md:flex-1">
              <Label>Arrival City</Label>
              {isLoading ? (
                <Skeleton className="w-full h-10 mt-2" />
              ) : (
                <Select name="arrivalCity" disabled={pending || !isRoundTrip}>
                  <SelectTrigger disabled={!isRoundTrip || pending} className="w-full mt-2">
                    <SelectValue placeholder="Arrival City" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-end space-x-3">
            <div className="w-full md:flex-1">
              <Label>Departure Date</Label>
              <DatePicker disabled={pending} placeholder="Departure Date" className="w-full mt-2" name="departureDate" />
            </div>
            <div className="w-full md:flex-1">
              <Label>Return Date</Label>
              <DatePicker disabled={!isRoundTrip || pending} placeholder="Return Date" className="w-full mt-2" name="returnDate" />
            </div>
          </div>

          <div className="flex flex-wrap justify-end">
            <Button
              variant={"outline"}
              size={"sm"}
              type="submit"
              disabled={pending || isLoading || isError}
            >
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search Trip
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
