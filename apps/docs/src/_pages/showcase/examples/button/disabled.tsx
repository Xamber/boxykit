import { Button } from "boxykit/react";
import { Check, LogIn, LogOut } from "lucide-react";

export function ButtonDisabled() {
  return (
    <div className="docs-row">
      <Button disabled>
        Save <Check className="boxy-icon" />
      </Button>
      <Button look="dark" disabled>
        Sign in <LogIn className="boxy-icon" />
      </Button>
      <Button look="outline" disabled>
        Sign out <LogOut className="boxy-icon" />
      </Button>
    </div>
  );
}
