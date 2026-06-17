import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminHome() {
  return (
    <div className="p-8">
      <Card className="max-w-sm">
        <CardHeader><CardTitle>Admin</CardTitle></CardHeader>
        <CardContent><Button>shadcn works</Button></CardContent>
      </Card>
    </div>
  );
}
