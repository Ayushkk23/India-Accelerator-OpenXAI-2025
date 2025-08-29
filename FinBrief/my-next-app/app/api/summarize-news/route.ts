import { NextRequest, NextResponse } from "next/server";
import ollama from "ollama";

const model = "llama3.2:1b";

// Ensure Node runtime for compatibility with the `ollama` Node client
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json().catch(() => ({}));
    const newsText = (data?.newsText ?? "").toString().trim();
    const companyName = (data?.companyName ?? "").toString().trim();
    
    if (!newsText) {
      return NextResponse.json(
        { error: "Missing 'newsText' in request body" },
        { status: 400 }
      );
    }

    // Create a comprehensive prompt for financial news summarization
    const prompt = `You are a financial analyst expert. Please analyze and summarize the following financial news in a clear, concise format with actionable insights.

${companyName ? `Company: ${companyName}` : ''}

News Article:
${newsText}

Please provide a summary in the following format:

📊 **Key Points:**
- [3-5 bullet points of the most important information]

💰 **Market Impact:**
- [How this affects the stock price/market]

🎯 **Actionable Insights:**
- [What investors should know or do]

⚠️ **Risk Factors:**
- [Any potential risks or concerns]

Keep the summary professional, accurate, and focused on financial implications. Use clear, concise language that both novice and experienced investors can understand.`;

    try {
      const response = await ollama.chat({
        model,
        messages: [{ role: "user", content: prompt }],
      });
      return NextResponse.json({ summary: response.message.content });
    } catch (err: any) {
      const msg = String(err?.message ?? err);

      // Ollama daemon not reachable
      if (
        msg.includes("ECONNREFUSED") ||
        msg.includes("connect") ||
        msg.includes("ENOTFOUND") ||
        msg.includes("fetch failed")
      ) {
        return NextResponse.json(
          {
            error:
              "Cannot reach Ollama at http://127.0.0.1:11434. Please start Ollama and try again.",
          },
          { status: 503 }
        );
      }

      // Model missing: attempt to pull, then retry once
      if (
        msg.toLowerCase().includes("not found") ||
        msg.toLowerCase().includes("no such model") ||
        msg.toLowerCase().includes("does not exist")
      ) {
        try {
          // Pull the model (non-streaming) and wait until it is available
          await ollama.pull({ model, stream: false });
          const retry = await ollama.chat({
            model,
            messages: [{ role: "user", content: prompt }],
          });
          return NextResponse.json({ summary: retry.message.content });
        } catch (pullErr: any) {
          return NextResponse.json(
            {
              error: `Failed to pull model '${model}': ${
                pullErr?.message ?? pullErr
              }`,
            },
            { status: 500 }
          );
        }
      }

      // Unknown error
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unexpected server error" },
      { status: 500 }
    );
  }
}
