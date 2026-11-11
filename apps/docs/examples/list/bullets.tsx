import { List, ListItem } from "boxykit/react";

export function ListBullets() {
  return (
    <List>
      <ListItem>Write the release notes</ListItem>
      <ListItem>Fix the login redirect</ListItem>
      <ListItem>Move the old tasks to the archive, then check that nothing links to them</ListItem>
    </List>
  );
}
