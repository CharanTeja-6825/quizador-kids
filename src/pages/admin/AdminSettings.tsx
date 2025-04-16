
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const AdminSettings: React.FC = () => {
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage system settings and preferences.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure your application preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input id="schoolName" defaultValue="KidLearn Academy" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input id="adminEmail" type="email" defaultValue="admin@kidlearn.edu" />
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about student progress
                </p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoPublish">Auto-publish Content</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically publish new lessons and quizzes
                </p>
              </div>
              <Switch id="autoPublish" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Learning Settings</CardTitle>
            <CardDescription>Configure learning parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lessonsPerDay">Maximum Lessons Per Day</Label>
              <Input id="lessonsPerDay" type="number" defaultValue="5" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quizzesPerDay">Maximum Quizzes Per Day</Label>
              <Input id="quizzesPerDay" type="number" defaultValue="3" />
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="progressTracking">Detailed Progress Tracking</Label>
                <p className="text-sm text-muted-foreground">
                  Track detailed metrics for each student
                </p>
              </div>
              <Switch id="progressTracking" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="adaptiveLearning">Adaptive Learning</Label>
                <p className="text-sm text-muted-foreground">
                  Adjust difficulty based on student performance
                </p>
              </div>
              <Switch id="adaptiveLearning" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
