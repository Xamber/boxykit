import { Button } from "boxykit/react";
import { ExternalLink, UserPlus } from "lucide-react";

export function ButtonSmall() {
  return (
    <div className="docs-row">
      <Button size="small">
        Assign <UserPlus className="boxy-icon" />
      </Button>
      <Button look="dark" size="small">
        Assign <UserPlus className="boxy-icon" />
      </Button>
      <Button look="outline" size="small">
        Open <ExternalLink className="boxy-icon" />
      </Button>
    </div>
  );
}
