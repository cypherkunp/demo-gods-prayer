import { Loader2 } from "lucide-react";

export default function LoadingIndicator() {
  return (
    <div className="fixed bg-gray-900 inset-0 flex items-center justify-center ">
      <div className="text-center">
        <Loader2
          className="h-16 w-16 animate-spin text-primary mx-auto"
          aria-hidden="true"
        />
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Loading your content
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This may take a few moments...
        </p>
      </div>
    </div>
  );
}
