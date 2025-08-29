# FinBrief - AI Stock News Summarizer

An AI-powered tool that analyzes financial news articles and provides actionable insights with key points, market impact analysis, and risk factors.

## Features

- **AI-Powered Analysis**: Uses Llama 3.2 (1B) model to analyze financial news
- **Structured Summaries**: Get organized insights with Key Points, Market Impact, Actionable Insights, and Risk Factors
- **Company Context**: Optional company name specification for better analysis
- **Export & Share**: Export summaries as text files or share via native sharing
- **Modern UI**: Beautiful, responsive interface with dark theme and animations
- **Real-time Processing**: Instant analysis with loading indicators
- **Copy to Clipboard**: Easy copying of individual summaries

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI Model**: Ollama with Llama 3.2 (1B)
- **UI Components**: Radix UI, Lucide React icons
- **State Management**: React hooks

## Prerequisites

- Node.js 18+ 
- Ollama installed and running locally
- Llama 3.2 (1B) model downloaded

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install and start Ollama:**
   ```bash
   # Download Ollama from https://ollama.ai
   # Start Ollama service
   ollama serve
   ```

3. **Pull the required model:**
   ```bash
   ollama pull llama3.2:1b
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Paste News Article**: Copy and paste any financial news article into the text area
2. **Add Company Name** (Optional): Specify the company name for better context
3. **Get Analysis**: Click "Summarize News" or press Cmd/Ctrl + Enter
4. **Review Insights**: View the structured analysis with key points, market impact, and risks
5. **Export/Share**: Use the action buttons to export or share your summaries

## Example News Types

The tool works best with:
- Earnings reports and financial statements
- Company announcements and press releases
- Market analysis and economic news
- Regulatory updates and policy changes
- Merger and acquisition news
- Product launches and strategic initiatives

## API Endpoints

### POST /api/summarize-news

Analyzes financial news and returns structured insights.

**Request Body:**
```json
{
  "newsText": "Your financial news article text here...",
  "companyName": "Company Name (Optional)"
}
```

**Response:**
```json
{
  "summary": "Structured analysis with key points, market impact, actionable insights, and risk factors"
}
```

## Project Structure

```
my-next-app/
├── app/
│   ├── api/
│   │   └── summarize-news/
│   │       └── route.ts          # API endpoint for news analysis
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── ui/
│   │   └── button.tsx            # Reusable button component
│   ├── news-header.tsx           # Application header
│   ├── news-input.tsx            # News input form
│   ├── news-summarizer.tsx       # Main application component
│   ├── news-summary.tsx          # Summary display component
│   └── news-welcome.tsx          # Welcome screen
├── lib/
│   └── utils.ts                  # Utility functions
└── package.json
```

## Customization

### Changing the AI Model

To use a different Ollama model, update the model name in:
- `app/api/summarize-news/route.ts` (line 4)
- `components/news-header.tsx` (modelName prop)
- `components/news-welcome.tsx` (model display)

### Styling

The application uses Tailwind CSS with custom utilities. Key style classes:
- `.dark-gradient-bg`: Dark gradient background
- `.glass`: Glass morphism effect
- `.custom-scrollbar`: Custom scrollbar styling
- `.hover-lift`: Hover animation effects

### Prompt Engineering

The AI prompt can be customized in `app/api/summarize-news/route.ts` to:
- Change the analysis structure
- Add specific financial metrics
- Modify the tone and style
- Include additional analysis categories

## Troubleshooting

### Ollama Connection Issues

If you see "Cannot reach Ollama" errors:
1. Ensure Ollama is running: `ollama serve`
2. Check if the model is downloaded: `ollama list`
3. Pull the model if missing: `ollama pull llama3.2:1b`

### Performance Issues

- The 1B model provides a good balance of speed and quality
- For faster responses, consider using smaller models
- For better quality, consider larger models (3B, 7B, etc.)

### Build Issues

If you encounter build errors:
1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check TypeScript errors: `npm run typecheck`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Ollama documentation
3. Open an issue on GitHub

---

**Note**: This tool is for educational and informational purposes. Always verify financial information from multiple sources before making investment decisions.
