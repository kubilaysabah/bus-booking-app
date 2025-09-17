"use client";

import { useActionState } from "react";
import { ArrowUpDownIcon, SearchIcon, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchAction } from "@/api/actions/search";
import { getCities } from "@/api/services/cities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const [state, action, pending] = useActionState(searchAction, null);

  return (
    <Card className="max-w-xs">
      <CardContent>
        <form className="space-y-5" action={action}>
          <div>
            <Label>Departure City</Label>
            {isLoading ? (
              <Skeleton className="w-full h-10 mt-2" />
            ) : (
              <Select name="departureCity" disabled={pending}>
                <SelectTrigger className="w-full mt-2">
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

          <div>
            <Button
              variant={"outline"}
              size={"sm"}
              className="mx-auto w-auto flex"
              type="button"
              disabled={pending || isLoading}
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUpDownIcon />
              )}
            </Button>
          </div>

          <div>
            <Label>Arrival City</Label>
            {isLoading ? (
              <Skeleton className="w-full h-10 mt-2" />
            ) : (
              <Select name="arrivalCity" disabled={pending}>
                <SelectTrigger className="w-full mt-2">
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

          <Button
            className="w-full"
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
        </form>
      </CardContent>
    </Card>
  );
}
