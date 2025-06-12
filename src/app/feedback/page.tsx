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

type FeedbackRecord = {
  name?: string;
  email?: string;
  feedback_text: string;
};

async function saveFeedback(feedback: FeedbackRecord): Promise<void> {
  console.log("Simulating feedback save:", feedback);
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedbackText.trim()) {
      toast("Tidak ada feedback yang diisi.");
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

      setName("");
      setEmail("");
      setFeedbackText("");

      toast("Feedback berhasil disubmitted");
    } catch (error) {
      console.error("Error while saving feedback:", error);
      toast("Error submitting feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sm:mx-40 mx-10 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading mb-4">
            Kami Sangat Menghargai Penilaian Anda
          </h1>
          <p className="text-xl text-muted-foreground">
            Bantu Kami Mengembangkan Aplikasi Kami.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
            <CardDescription>
              Mohon isi formulir di bawah ini untuk mengirimkan feedback.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama (opsional)</Label>
                  <Input
                    id="name"
                    placeholder="Nama Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (opsional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="anda@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback Anda</Label>
                <Textarea
                  id="feedback"
                  placeholder="Mohon berikan kami peniliaian Anda"
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
                  <span className="mr-2">Submitting...</span>
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
                Kami berkomitmen untuk memberikan tanggapan yang sebaik-baiknya
                untuk memperbaiki dan meningkatkan layanan kami. Masukan dari
                anda sangat berarti bagi kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
