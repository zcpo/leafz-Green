import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewDispensaryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Dispensary</CardTitle>
        <CardDescription>
          Fill out the form below to add a new dispensary.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              placeholder="e.g. The Green Spot"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              className="w-full"
              placeholder="e.g. 123 Main St, Anytown, USA"
            />
          </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="stateId">State ID</Label>
                <Input
                  id="stateId"
                  type="text"
                  placeholder="e.g. california"
                />
              </div>
               <div className="grid gap-3">
                <Label htmlFor="cityId">City ID</Label>
                <Input
                  id="cityId"
                  type="text"
                  placeholder="e.g. los-angeles"
                />
              </div>
          </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  id="lat"
                  type="text"
                  placeholder="e.g. 34.0522"
                />
              </div>
               <div className="grid gap-3">
                <Label htmlFor="lng">Longitude</Label>
                <Input
                  id="lng"
                  type="text"
                  placeholder="e.g. -118.2437"
                />
              </div>
          </div>
          <Button type="submit">Save Dispensary</Button>
        </form>
      </CardContent>
    </Card>
  );
}
