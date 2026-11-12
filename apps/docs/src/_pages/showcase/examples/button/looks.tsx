import { Button } from "boxykit/react";
import { Check, LogIn, LogOut } from "lucide-react";

export function ButtonLooks() {
  return (
    <div className="docs-row">
      <Button>
        Save <Check className="boxy-icon" />
      </Button>
      <Button look="dark">
        Sign in <LogIn className="boxy-icon" />
      </Button>
      <Button look="outline">
        Sign out <LogOut className="boxy-icon" />
      </Button>
    </div>
  );
}
