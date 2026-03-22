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
        padding: "56px 40px",
        textAlign: "center",
        cursor: isLoading ? "not-allowed" : "pointer",
        background: isDragActive
          ? "var(--accent-dim)"
          : "linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)",
        transition: "all 0.25s ease",
        opacity: isLoading ? 0.5 : 1,
        transform: isDragActive ? "scale(1.01)" : "scale(1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <input {...getInputProps()} />

      {/* Subtle corner accents */}
      {isDragActive && (
        <>
          <div style={{ position: "absolute", top: 12, left: 12, width: 20, height: 20, borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", borderRadius: "3px 0 0 0" }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 20, height: 20, borderTop: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", borderRadius: "0 3px 0 0" }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, width: 20, height: 20, borderBottom: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", borderRadius: "0 0 0 3px" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 20, height: 20, borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", borderRadius: "0 0 3px 0" }} />
        </>
      )}

      <div
        style={{
          width: "64px",
          height: "64px",
          background: isDragActive ? "var(--accent-dim)" : "var(--surface)",
          border: `1px solid ${isDragActive ? "var(--accent)" : "var(--border)"}`,
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          margin: "0 auto 20px",
          transition: "all 0.25s ease",
        }}
      >
        {isDragActive ? "📋" : "🏥"}
      </div>

      <p
        style={{
          fontFamily: "var(--display)",
          fontSize: "20px",
          fontWeight: 700,
          color: isDragActive ? "var(--accent)" : "var(--text)",
          marginBottom: "8px",
          transition: "color 0.2s",
        }}
      >
        {isDragActive ? "Drop your bill here" : "Upload your hospital bill"}
      </p>

      <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px" }}>
        Drag & drop or click to browse
        <span style={{ margin: "0 8px", opacity: 0.4 }}>·</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "12px" }}>JPG · PNG · WEBP</span>
      </p>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "11px 28px",
          background: isDragActive ? "var(--accent)" : "var(--accent-dim)",
          border: "1px solid var(--accent)",
          borderRadius: "10px",
          color: isDragActive ? "var(--bg)" : "var(--accent)",
          fontFamily: "var(--mono)",
          fontSize: "13px",
          fontWeight: 500,
          transition: "all 0.2s ease",
        }}
      >
        <span style={{ fontSize: "14px" }}>⬆</span> Choose File
      </div>

      <p style={{ marginTop: "20px", fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
        <span>🔒</span>
        <span>Your bill is analyzed privately — never stored on our servers</span>
      </p>
    </div>
  );
}
