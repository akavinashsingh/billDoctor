"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export default function UploadZone({ onFileSelect, isLoading }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    disabled: isLoading,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: `2px dashed ${isDragActive ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "16px",
        padding: "60px 40px",
        textAlign: "center",
        cursor: isLoading ? "not-allowed" : "pointer",
        background: isDragActive ? "var(--accent-dim)" : "var(--surface)",
        transition: "all 0.2s ease",
        opacity: isLoading ? 0.5 : 1,
      }}
    >
      <input {...getInputProps()} />

      <div style={{ marginBottom: "16px", fontSize: "48px" }}>
        {isDragActive ? "📋" : "🏥"}
      </div>

      <p
        style={{
          fontFamily: "var(--display)",
          fontSize: "18px",
          fontWeight: 700,
          color: isDragActive ? "var(--accent)" : "var(--text)",
          marginBottom: "8px",
        }}
      >
        {isDragActive ? "Drop your bill here" : "Upload your hospital bill"}
      </p>

      <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
        Drag & drop or click to browse · PDF, JPG, PNG supported
      </p>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 24px",
          background: "var(--accent-dim)",
          border: "1px solid var(--accent)",
          borderRadius: "8px",
          color: "var(--accent)",
          fontFamily: "var(--mono)",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        <span>⬆</span> Choose file
      </div>

      <p style={{ marginTop: "16px", fontSize: "12px", color: "var(--text-muted)" }}>
        🔒 Your bill is analyzed locally — never stored on our servers
      </p>
    </div>
  );
}
