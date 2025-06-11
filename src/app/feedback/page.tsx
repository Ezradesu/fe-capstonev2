"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
//ga keburu mendingan ke main appsnya aja dulu

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedbackText.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide your feedback",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const feedbackRecord: FeedbackRecord = {
        name: name.trim() || undefined,
        email: email.trim() || undefined,
        feedback_text: feedbackText.trim(),
      };

      await saveFeedback(feedbackRecord);

      // Reset form
      setName("");
      setEmail("");
      setFeedbackText("");

      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! We appreciate your input.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error while saving feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sm:mx-40 mx-10 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading mb-4">We Value Your Feedback</h1>
          <p className="text-xl text-muted-foreground">
            Help us improve TextAI by sharing your thoughts and experiences.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
            <CardDescription>
              Please fill out the form below to submit your feedback.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Please share your thoughts, ideas, suggestions, or report any issues..."
                  className="min-h-[150px]"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4"
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Submitting...</span>
                  </>
                ) : (
                  <>Submit Feedback</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-12 bg-muted/50 p-6 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">
                Committed to Improvement
              </h3>
              <p className="text-muted-foreground">
                We review all feedback and are committed to continuously
                improving our service. While we may not be able to respond to
                every submission individually, your input is valuable and will
                be considered as we develop new features and enhancements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
