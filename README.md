# Report Processing System with Google Generative AI

## Medical Report Processing System with Google Generative AI


This project provides a complete system for uploading clinical reports (PDFs or images), processing the reports to identify biomarkers with abnormalities, and summarizing the findings using Google Generative AI (Gemini Model).


## Features

- Upload clinical reports in various formats (PDF, JPG, PNG, etc.).
- Compress large images to improve performance.
- Convert files to Base64 format for backend processing.
- Extract biomarkers and abnormalities using Google Generative AI.
- Summarize the report in a concise format with numerical details.

---

## Technology Stack

### Frontend
- **React**: For building the user interface.
- **TailwindCSS**: For styling components.
- **Tesseract.js**: For OCR-based text extraction from images (optional for future updates).

### Backend
- **Node.js**: For handling API requests.
- **Google Generative AI**: To process and summarize the clinical report content.
- **dotenv**: To manage environment variables securely.

---

## Installation Guide

### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your system.
- **Google Generative AI API Key**: Obtain an API key from Google.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bilalpiaic/dr_omega.git
   ```
 
2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Install backend dependencies**:
   ```bash
   npm install @google/generative-ai dotenv
   ```

4. **Set up environment variables**:  
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   GEMINI_API_KEY=<your-google-generative-ai-api-key>
   PINECONE_API_KEY=<your pinecone-api-key> 
   ```

5. **Start the application**:
   ```bash
   npm start
   ```

---

## Usage

1. Navigate to the **Report Processing Page**.
2. Upload a clinical report file (PDF or image).
3. Click **Upload and Extract** to process the report.
4. View the summarized findings in the **Report Summary** field.

---

## Project Structure

```plaintext
.
├── public/                 # Static files (e.g., index.html)
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── ReportComponent.tsx   # Main report handling component
│   │   ├── input.tsx       # Input field component
│   │   ├── button.tsx      # Button component
│   │   ├── label.tsx       # Label component
│   │   ├── textarea.tsx    # Textarea component
│   ├── utils/              # Utility functions
│   │   ├── compressImage.tsx      # Image compression logic
│   │   ├── arrayBufferToBase64.ts # Base64 conversion
│   └── App.tsx             # Main app entry point
├── server/
│   ├── index.js            # Express server setup (if applicable)
│   ├── api.js              # API routes for report processing
├── .env                    # Environment variables
├── package.json            # Dependency management
└── README.md               # Project documentation
```

---

## API Details

### Endpoint
- `/api/extractreportgemini`

### Method
- **POST**

### Request Body
```json
{
    "base64": "<Base64-encoded file>"
}
```

### Response
```json
{
    "success": true,
    "data": "<Summarized report>"
}
```

---

## Features in Progress

- OCR-based text extraction for scanned PDF files.
- Improved validation for large file uploads.
- Real-time progress indication during report processing.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

For major changes, please open an issue first to discuss what you would like to change.

--This Markdown file is formatted to be clean, readable, and suitable for displaying on GitHub. Each section is organized with headers (`#`, `##`, `###`), and code examples are wrapped in triple backticks (```). This structure ensures that the documentation is easy to navigate and visually appealing.--
