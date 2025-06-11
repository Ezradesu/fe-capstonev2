"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type SummaryRequest,
  type SummaryResult,
  summarizeText,
  getSummaryHistory,
} from "@/lib/ai";
import { Clock, Copy, User, FileText, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function SummarizePage() {
  const [inputText, setInputText] = useState("");
  const [summaryLength, setSummaryLength] = useState<
    "short" | "medium" | "long"
  >("medium");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<SummaryResult | null>(
    null
  );
  const [history, setHistory] = useState<SummaryResult[]>([]);
  const [activeTab, setActiveTab] = useState("summarize");

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  async function handleSubmit() {
    if (!inputText.trim()) {
      toast.error("Please enter some text to summarize.");
      return;
    }

    if (wordCount < 40) {
      toast.error("Please enter at least 40 words.");
      return;
    }

    if (wordCount > 350) {
      toast.error("Please enter no more than 350 words.");
      return;
    }

    setIsLoading(true);

    try {
      const request: SummaryRequest = {
        text: inputText,
        length: summaryLength,
        userName: "Anonymous User",
        includeQuestions: true,
        questionCount: 3,
      };

      const result = await summarizeText(request);
      setCurrentSummary(result);

      // Refresh history setelah summary baru dibuat
      if (activeTab === "history") {
        await loadHistory();
      }

      toast.success("Your text has been successfully summarized!");
    } catch (error) {
      console.error("Error summarizing text:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate summary"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function loadHistory() {
    setIsLoadingHistory(true);
    try {
      console.log("Loading summary history...");
      const historyData = await getSummaryHistory();
      console.log("History data received:", historyData);

      setHistory(historyData);

      if (historyData.length === 0) {
        console.log("No history data found");
      } else {
        console.log(`Loaded ${historyData.length} history items`);
      }
    } catch (error) {
      console.error("Failed to load history:", error);
      toast.error("Failed to load history");
      setHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  }

  // Load history when switching to history tab
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "history") {
      loadHistory();
    }
  };

  // Auto-load history when component mounts if history tab is active
  useEffect(() => {
    if (activeTab === "history") {
      loadHistory();
    }
  }, [activeTab]);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("id-ID", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      console.warn("Failed to format date:", error);

      return dateString;
    }
  };

  // Get word count color based on limits
  const getWordCountColor = () => {
    if (wordCount < 40) return "text-red-500";
    if (wordCount > 350) return "text-red-500";
    return "text-green-600";
  };

  return (
    <div className="sm:mx-40 mx-10 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading mb-4">Mulai Meringkas</h1>
          <p className="text-xl text-muted-foreground">
            Ubah informasi panjang-mu menjadi ringkasan serta pertanyaan agar
            kamu bisa belajar lebih cepat.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summarize">Summarize Text</TabsTrigger>
            <TabsTrigger value="history">Summary History</TabsTrigger>
          </TabsList>

          <TabsContent value="summarize" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Input Text
                </CardTitle>
                <CardDescription>
                  Enter text between 40-350 words for summarization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your text here (40-350 words)..."
                  className="min-h-[200px]"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-sm font-medium ${getWordCountColor()}`}
                  >
                    {wordCount} words
                    {wordCount < 40 && " (minimum 40)"}
                    {wordCount > 350 && " (maximum 350)"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {wordCount >= 40 && wordCount <= 350
                      ? "✓ Ready to summarize"
                      : ""}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Summary Length</span>
                    <Select
                      value={summaryLength}
                      onValueChange={(value: "short" | "medium" | "long") =>
                        setSummaryLength(value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">
                          Short (1-2 sentences)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium (3-4 sentences)
                        </SelectItem>
                        <SelectItem value="long">
                          Long (detailed summary)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || wordCount < 40 || wordCount > 350}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    "Generate Summary"
                  )}
                </Button>
              </CardFooter>
            </Card>

            {currentSummary && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Summary</CardTitle>
                  <CardDescription>
                    {currentSummary.original_length > 0 &&
                    currentSummary.summary_length > 0 ? (
                      <>
                        Reduced from {currentSummary.original_length} to{" "}
                        {currentSummary.summary_length} words (
                        {Math.round(
                          ((currentSummary.original_length -
                            currentSummary.summary_length) /
                            currentSummary.original_length) *
                            100
                        )}
                        % reduction)
                      </>
                    ) : (
                      "Summary generated successfully"
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-md relative">
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {currentSummary.summary}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(currentSummary.summary)}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy summary</span>
                    </Button>
                  </div>
                </CardContent>

                {/* Display Questions if available */}
                {currentSummary.questions &&
                  currentSummary.questions.length > 0 && (
                    <>
                      <CardHeader>
                        <CardTitle>Generated Questions</CardTitle>
                        <CardDescription>
                          {currentSummary.question_count} questions generated
                          from text
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 bg-muted rounded-md">
                          <div className="space-y-2">
                            {currentSummary.questions.map((question, index) => (
                              <p key={index} className="text-sm">
                                <span className="font-medium">
                                  {index + 1}.
                                </span>{" "}
                                {question}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>Created by: Anonymous</span>
                          <Clock className="h-4 w-4 ml-3" />
                          <span>{formatDate(currentSummary.created_at)}</span>
                        </div>
                      </CardContent>
                    </>
                  )}
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Summary History</CardTitle>
                    <CardDescription>
                      View all previously generated summaries
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={loadHistory}
                    disabled={isLoadingHistory}
                  >
                    {isLoadingHistory ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    <span className="sr-only">Refresh history</span>
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {isLoadingHistory ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Loader2 className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-spin" />
                  <p className="text-muted-foreground">Loading history...</p>
                </CardContent>
              </Card>
            ) : history.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No summary history found.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Generate your first summary to see it here!
                  </p>
                </CardContent>
              </Card>
            ) : (
              history.map((item, index) => (
                <Card key={`${item.created_at}-${index}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          Summary #{index + 1}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatDate(item.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            Anonymous
                          </span>
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(item.summary)}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy summary</span>
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Original Text Preview */}
                    {item.original_text && (
                      <div className="p-4 bg-muted/30 rounded-md mb-4">
                        <h5 className="text-sm font-medium mb-2">
                          Original Text:
                        </h5>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {item.original_text}
                        </p>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="p-4 bg-muted/50 rounded-md mb-4">
                      <h5 className="text-sm font-medium mb-2">Summary:</h5>
                      <p className="whitespace-pre-wrap leading-relaxed text-sm">
                        {item.summary}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="text-sm text-muted-foreground space-y-1">
                      {item.original_length > 0 && item.summary_length > 0 && (
                        <div>
                          <span className="font-medium">Word reduction:</span>{" "}
                          {item.original_length} → {item.summary_length} words
                        </div>
                      )}
                      {item.compression_ratio && (
                        <div>
                          <span className="font-medium">
                            Compression ratio:
                          </span>{" "}
                          {item.compression_ratio}
                        </div>
                      )}
                      {item.methods_used?.summary && (
                        <div>
                          <span className="font-medium">Method used:</span>{" "}
                          {item.methods_used.summary}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
