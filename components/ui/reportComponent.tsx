import React, { ChangeEvent, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { useToast } from "@/hooks/use-toast";

const ReportComponent = () => {
    const { toast } = useToast();
    const [base64Data, setBase64Data] = useState(""); // State to store Base64 encoded file
    const [reportText, setReportText] = useState(""); // State to store extracted report text
    const [isLoading, setIsLoading] = useState(false); // State to manage loading status

    // Handles file selection and determines the type of processing
    function handleReportSelection(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const file = event.target.files[0];
        console.log("Uploaded file name:", file.name);
        console.log("Uploaded file MIME type:", file.type);

        const validImages = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
        const validDocs = ["application/pdf", "application/csv", "text/csv"];

        const isValidImage = validImages.includes(file.type);
        const isValidDoc = validDocs.includes(file.type);

        if (!isValidImage && !isValidDoc) {
            toast({
                description: "Unsupported file type. Please upload an image or a valid document.",
                variant: "destructive",
            });
            return;
        }

        // Reset previously stored data for new file uploads
        setBase64Data("");
        setReportText("");

        if (isValidDoc) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const arrayBuffer = e.target?.result as ArrayBuffer;
                    const base64 = arrayBufferToBase64(arrayBuffer); // Convert ArrayBuffer to Base64
                    console.log("Extracted document base64 content (sample):", base64.slice(0, 50));
                    setBase64Data(base64);
                } catch (error) {
                    console.error("Error converting file to base64:", error);
                    toast({
                        description: "Failed to process the document. Please try again.",
                        variant: "destructive",
                    });
                }
            };

            reader.onerror = () => {
                toast({
                    description: "Error reading the document file. Please try again.",
                    variant: "destructive",
                });
            };

            reader.readAsArrayBuffer(file); // Read the document as ArrayBuffer
        }

        if (isValidImage) {
            compressImage(file, (compressedFile: File) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const fileContent = e.target?.result as string;
                    console.log("Compressed image base64 content (sample):", fileContent.slice(0, 50));
                    setBase64Data(fileContent);
                };
                reader.readAsDataURL(compressedFile); // Read compressed image as Data URL
            });
        }
    }

    // Sends the Base64 encoded data to the backend for processing
    async function extractDetails() {
        if (!base64Data) {
            toast({
                description: "Please upload a valid report before extracting!",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true); // Indicate loading state

        try {
            const response = await fetch("/api/extractreportgemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ base64: base64Data }), // Send Base64 encoded file to API
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                toast({
                    description: "Failed to extract the report. Please try again.",
                    variant: "destructive",
                });
                return;
            }

            const result = await response.json();
            setReportText(result.data); // Update state with extracted report text
        } catch (error) {
            console.error("Error during API call:", error);
            toast({
                description: "An error occurred while processing the report.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false); // Reset loading state
        }
    }

    return (
        <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
            <fieldset className="relative grid gap-6 rounded-lg border p-4">
                <legend className="text-sm font-medium">Report</legend>
                <Input type="file" onChange={handleReportSelection} />
                <Button onClick={extractDetails} disabled={isLoading}>
                    {isLoading ? "Processing..." : "Upload and Extract"}
                </Button>
                <Label>Report Summary</Label>
                <Textarea
                    placeholder="Extracted data from the report will appear here."
                    value={reportText}
                    className="min-h-72 resize-none border-0 p-3 shadow-none"
                    readOnly
                />
                <Button className="hover:bg-[#d91313]" disabled={!reportText}>
                    Submit
                </Button>
            </fieldset>
        </div>
    );
};

export default ReportComponent;

// Compresses an image file to reduce size and maintain quality
function compressImage(file: File, callback: (compressedFile: File) => void) {
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            // Resize dimensions while maintaining aspect ratio
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height = (height * MAX_WIDTH) / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width = (width * MAX_HEIGHT) / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx!.drawImage(img, 0, 0, width, height);

            const quality = 0.7; // Compression quality
            const dataURL = canvas.toDataURL("image/jpeg", quality);

            const byteString = atob(dataURL.split(",")[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            const compressedFile = new File([ab], file.name, { type: "image/jpeg" });
            callback(compressedFile);
        };

        img.src = e.target?.result as string; // Load image from file reader result
    };

    reader.readAsDataURL(file); // Read the file as a Data URL
}

// Converts an ArrayBuffer to a Base64 string
function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const chunkSize = 8192; // Process in chunks of 8KB

    // Convert each chunk to Base64
    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(
            null,
            Array.from(bytes.slice(i, i + chunkSize))
        );
    }

    return btoa(binary); // Return Base64 encoded string
}
