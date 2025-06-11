"use server";

const SUMMARY_API_ENDPOINT =
  "https://backend-summarize-production.up.railway.app/";

export type SummaryResult = {
  compression_ratio: string;
  methods_used: string[];
  original_length: number;
  original_text: string;
  processing_mode: string;
  question_count: number;
  questions: string[] | null;
  status: string;
  summary: string;
  summary_length: number;
  created_at: string;
};

export type SummaryRequest = {
  text: string;
  length: "short" | "medium" | "long";
  userName?: string;
  includeQuestions?: boolean;
  questionCount?: number;
};

async function callSummaryAPI(text: string) {
  const response = await fetch(`${SUMMARY_API_ENDPOINT}process-text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      `API error: ${response.status} - ${
        errorData?.error || response.statusText
      }`
    );
  }

  const result = await response.json();

  if (!result.summary) {
    throw new Error("Invalid API response: missing summary");
  }

  return result;
}

export async function summarizeText({
  text,
  length,
  userName,
  includeQuestions = true,
  questionCount = 3,
}: SummaryRequest): Promise<SummaryResult> {
  if (!text || text.trim().length === 0) {
    throw new Error("Text content is required");
  }

  const cleanText = text.trim();
  const originalWordCount = cleanText.split(/\s+/).length;

  if (originalWordCount < 10) {
    throw new Error("Text must be at least 10 words long");
  }

  if (originalWordCount > 500) {
    throw new Error("Text must be no more than 500 words long");
  }

  const validQuestionCount = Math.min(Math.max(questionCount || 3, 1), 5);

  try {
    console.log("Calling API with:", {
      textLength: cleanText.length,
      length,
      includeQuestions,
      questionCount: validQuestionCount,
    });

    const apiResult = await callSummaryAPI(cleanText);

    console.log("API Response:", {
      hasSummary: !!apiResult.summary,
      questionsCount: apiResult.questions?.length || 0,
      method: apiResult.method,
    });

    const summary = apiResult.summary || "";
    const questions = normalizeQuestions(apiResult.questions);

    if (!summary) {
      throw new Error("Failed to generate summary");
    }

    const result: SummaryResult = {
      original_text: cleanText,
      summary: summary,
      questions: questions,
      compression_ratio: apiResult.compression_ratio || "",
      methods_used: apiResult.methods_used || [],
      original_length: apiResult.original_length || originalWordCount,
      processing_mode: apiResult.processing_mode || "standard",
      status: apiResult.status || "success",
      summary_length: summary.split(/\s+/).length,
      question_count: questions.length,
      created_at: new Date().toISOString(),
    };

    console.log("Final result:", result);

    return result;
  } catch (error) {
    console.error("Error in summarizeText:", error);

    if (error instanceof Error) {
      if (error.message.includes("500")) {
        throw new Error(
          "Server temporarily unavailable. Please try again in a moment."
        );
      } else if (error.message.includes("404")) {
        throw new Error(
          "Summarization service not found. Please contact support."
        );
      } else if (
        error.message.includes("timeout") ||
        error.message.includes("TIMEOUT")
      ) {
        throw new Error(
          "Request timed out. The text might be too long or service is busy."
        );
      } else if (error.message.includes("too short")) {
        throw new Error(
          "Text is too short for processing. Please provide more content."
        );
      } else if (error.message.includes("API error")) {
        throw error;
      }

      if (
        error.message.includes("must be at least") ||
        error.message.includes("must be no more than") ||
        error.message.includes("is required")
      ) {
        throw error;
      }
    }

    throw new Error(
      "Failed to process text. Please check your input and try again."
    );
  }
}

export async function getSummaryHistory(): Promise<SummaryResult[]> {
  try {
    const response = await fetch(`${SUMMARY_API_ENDPOINT}history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `Failed to fetch history: ${response.status} - ${
          errorData?.error || response.statusText
        }`
      );
    }

    const rawData = await response.json();
    const historyData = rawData.data;

    if (!Array.isArray(historyData)) {
      console.warn("History response is not an array:", rawData);
      return [];
    }

    return historyData.map(transformToSummaryResult);
  } catch (error) {
    console.error("Error fetching summary history:", error);
    return [];
  }
}

// Helper to normalize questions
function normalizeQuestions(input: any): string[] {
  if (Array.isArray(input)) return input;
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return [input]; // fallback: treat plain string as single question
    }
    return [input];
  }
  return [];
}

// Transform API history record to SummaryResult
function transformToSummaryResult(apiRecord: any): SummaryResult {
  return {
    original_text: apiRecord.original || apiRecord.original_text,
    summary: apiRecord.summary || apiRecord.summary_text,
    questions: normalizeQuestions(apiRecord.questions),
    compression_ratio: apiRecord.compression_ratio || "",
    methods_used: apiRecord.methods_used || [],
    original_length:
      apiRecord.word_count?.original || apiRecord.original_word_count || 0,
    summary_length:
      apiRecord.word_count?.summary || apiRecord.summary_word_count || 0,
    created_at:
      apiRecord.timestamp || apiRecord.created_at || new Date().toISOString(),
    processing_mode: apiRecord.processing_mode || "standard",
    status: apiRecord.status || "success",
    question_count: normalizeQuestions(apiRecord.questions).length,
  };
}
