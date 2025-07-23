// src/app/components/Tools.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import './Tools.css';

const typeToConversionMap: { [key: string]: string } = {
  word: 'word-to-pdf',
  image: 'image-to-pdf',
  pdf: 'pdf-to-word',
  compress: 'compress',
};

const conversionToTypeMap: { [key: string]: string } = {
  'word-to-pdf': 'word',
  'image-to-pdf': 'image',
  'pdf-to-word': 'pdf',
  'compress': 'compress',
};

const ConvertersPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedConversion, setSelectedConversion] = useState<string>('pdf-to-word');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
  const PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

  // Sync dropdown with URL query param
  useEffect(() => {
    const type = searchParams?.get('type');
    if (type && typeToConversionMap[type]) {
      setSelectedConversion(typeToConversionMap[type]);
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setConvertedFileUrl(null);
      setError(null);
    }
  };

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getApiEndpoint = () => {
    switch (selectedConversion) {
      case 'pdf-to-word':
        return '/api/tools/convert-pdf-to-word';
      case 'word-to-pdf':
        return '/api/tools/convert-word-to-pdf';
      case 'image-to-pdf':
        return '/api/tools/convert-image-to-pdf';
      case 'compress':
        return '/api/tools/compress-file';
      default:
        return '/api/tools/convert-pdf-to-word';
    }
  };

  const getOutputExtension = () => {
    switch (selectedConversion) {
      case 'pdf-to-word':
        return 'docx';
      case 'word-to-pdf':
      case 'image-to-pdf':
        return 'pdf';
      case 'compress':
        return selectedFile?.name.split('.').pop() || 'zip';
      default:
        return 'pdf';
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setIsConverting(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${API_URL}${getApiEndpoint()}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${USERNAME}:${PASSWORD}`)
        },
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setConvertedFileUrl(url);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error during file conversion.');
      }
    } catch (error) {
      console.error('Conversion failed:', error);
      setError('Failed to convert the file. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedFileUrl && selectedFile) {
      const originalName = selectedFile.name.split('.')[0];
      const extension = getOutputExtension();
      const a = document.createElement('a');
      a.href = convertedFileUrl;
      a.download = `${originalName}_converted.${extension}`;
      a.click();
      URL.revokeObjectURL(convertedFileUrl);

      // Reset everything manually
      setConvertedFileUrl(null);
      setSelectedFile(null);
      setError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear file input
      }
    }
  };

  return (
    <div className="converter-page-container">
      <h1>
        Online Document Converter
      </h1>
      <p>Easy File Conversion & Compression.</p>

      <div className="converter-dropdown-container">
        <p style={{ fontWeight: 'bold', color: '#073a6d'}}>
          Select Type:
        </p>
        <div className="converter-dropdown">
          <select
            value={selectedConversion}
            onChange={(e) => {
              const newValue = e.target.value;
              setSelectedConversion(newValue);
              const newType = conversionToTypeMap[newValue];
              router.push(`/tools/convert-util?type=${newType}`);
            }}
          >
            <option value="word-to-pdf">📝➡️📄 Word to PDF</option>
            <option value="image-to-pdf">🖼️➡️📄 Image to PDF</option>
            <option value="pdf-to-word">📄➡️📝 PDF to Word</option>
            <option value="compress">🗜️ Compress File</option>
          </select>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept={
          selectedConversion === 'pdf-to-word' ? '.pdf' :
          selectedConversion === 'word-to-pdf' ? '.doc,.docx' :
          selectedConversion === 'image-to-pdf' ? 'image/*' :
          '*/*'
        }
      />

      <button onClick={handleChooseFileClick} className="choose-file" aria-label="Choose File">
        Choose File
      </button>

      {selectedFile && (
        <div className="file-info">
          Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
        </div>
      )}

      {selectedFile && !isConverting && (
        <button onClick={handleConvert} className="convert-button">
          {selectedConversion === 'compress' ? 'Compress' : 'Convert'}
        </button>
      )}

      {isConverting && (
        <div className="spinner" aria-label="Converting..." />
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {convertedFileUrl && !isConverting && (
        <button onClick={handleDownload} className="download-button">
          Download {selectedConversion === 'compress' ? 'Compressed' : 'Converted'} File
        </button>
      )}
    </div>
  );
};

export default ConvertersPage;
