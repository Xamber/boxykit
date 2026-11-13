import { Button } from "boxykit/react";
import { UserPlus } from "lucide-react";

export function ButtonSizes() {
  return (
    <div className="docs-row">
      <Button size="normal">
        Normal <UserPlus className="boxy-icon" />
      </Button>
      <Button>
        Small <UserPlus className="boxy-icon" />
      </Button>
      <Button size="tiny">
        Tiny <UserPlus className="boxy-icon" />
      </Button>
      <Button look="outline" size="tiny">
        Tiny <UserPlus className="boxy-icon" />
      </Button>
    </div>
  );
}
