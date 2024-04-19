import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || disabled}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
