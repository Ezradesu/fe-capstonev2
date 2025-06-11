import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Award } from "lucide-react";

export default function MemberPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading mb-4">Join Our Community</h1>
          <p className="text-xl text-muted-foreground">
            Connect with other users and stay updated on the latest features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="text-center">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Community</CardTitle>
              <CardDescription>
                Join thousands of users who are transforming how they process
                information
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Purpose</CardTitle>
              <CardDescription>
                Our mission is to help people save time and increase
                productivity through AI
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Excellence</CardTitle>
              <CardDescription>
                We are committed to providing the best AI summarization
                experience
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
            <CardDescription>
              Start summarizing your text today with our powerful AI technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="/summarize">
                Start Summarizing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="mt-12 bg-muted/50 p-8 rounded-lg">
          <h2 className="text-2xl font-heading mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Input Your Text</h3>
              <p className="text-sm text-muted-foreground">
                Paste or type text between 40-150 words
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Choose Summary Length</h3>
              <p className="text-sm text-muted-foreground">
                Select short, medium, or long summary format
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Get Your Summary</h3>
              <p className="text-sm text-muted-foreground">
                Receive a concise, AI-generated summary instantly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
