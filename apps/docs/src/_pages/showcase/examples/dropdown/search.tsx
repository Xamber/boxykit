import { Dropdown } from "boxykit/react";

const ZONES = [
  "Honolulu",
  "Anchorage",
  "Los Angeles",
  "Denver",
  "Chicago",
  "New York",
  "São Paulo",
  "London",
  "Berlin",
  "Helsinki",
  "Dubai",
  "Delhi",
  "Bangkok",
  "Tokyo",
  "Sydney",
].map((city) => ({ value: city.toLowerCase().replaceAll(" ", "-"), label: city }));

export function DropdownSearch() {
  return <Dropdown aria-label="Time zone" options={ZONES} placeholder="Pick a city" />;
}
