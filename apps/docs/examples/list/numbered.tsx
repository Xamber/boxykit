import { ListItem, NumberedList } from "boxykit/react";

export function ListNumbered() {
  return (
    <NumberedList>
      <ListItem>Open a branch</ListItem>
      <ListItem>Write the change and its test</ListItem>
      <ListItem>Open a pull request and ask for a review</ListItem>
    </NumberedList>
  );
}
