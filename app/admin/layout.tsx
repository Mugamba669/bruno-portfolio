import "./admin.css";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      {children}
      <Toaster richColors position="top-right" />
    </div>
  );
}
