'use client';

import React, { useState, useEffect } from 'react';

const fontOptions = [
  'Arial',
  'Courier New',
  'Georgia',
  'Verdana',
  'Trebuchet MS',
  'Times New Roman',
  'Ubuntu',
  'DejaVu Sans',
  'Inter',
  'Poppins',
];

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const BASIC_AUTH = 'Basic ' + btoa(
  `${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`
);

const DesignPage: React.FC = () => {
  const [designType, setDesignType] = useState<'favicon' | 'logo'>('favicon');
  const [text, setText] = useState('');
  const [font, setFont] = useState('Arial');
  const [bgColor, setBgColor] = useState('#4F46E5');
  const [textColor, setTextColor] = useState('#ffffff');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [faviconShape, setFaviconShape] = useState<'square' | 'circle'>('square');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getEndpoint = () => {
    if (designType === 'favicon') {
      return imageFile ? 'favicon-image' : 'favicon-text';
    } else {
      return imageFile ? 'logo-image' : 'logo-text';
    }
  };

  const handlePreview = async () => {
    if (!imageFile && !text.trim()) {
      setPreviewUrl(null);
      return;
    }

    setPreviewUrl(null); // show loading text
    try {
      const formData = new FormData();
      formData.append('type', designType);
      formData.append('text', text);
      formData.append('font', font);
      formData.append('bgColor', bgColor);
      formData.append('textColor', textColor);
      formData.append('shape', faviconShape);
      formData.append('mode', imageFile ? 'image' : 'text');
      if (imageFile) formData.append('image', imageFile);

      const res = await fetch(`${API_URL}/api/generates/preview`, {
        method: 'POST',
        headers: { Authorization: BASIC_AUTH },
        body: formData,
      });

      if (!res.ok) throw new Error('Preview generation failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (err) {
      console.error(err);
      setPreviewUrl(null);
    }
  };

  const handleCreate = async () => {
    if (!imageFile && !text.trim()) {
      alert('Please upload an image or enter text to generate a favicon or logo.');
      return;
    }

    try {
      setLoading(true);
      setDownloadUrl(null);
      const formData = new FormData();
      formData.append('type', designType);
      formData.append('text', text);
      formData.append('font', font);
      formData.append('bgColor', bgColor);
      formData.append('textColor', textColor);
      formData.append('shape', faviconShape);
      if (imageFile) formData.append('image', imageFile);

      const endpoint = getEndpoint();

      const res = await fetch(`${API_URL}/api/generates/${endpoint}`, {
        method: 'POST',
        headers: { Authorization: BASIC_AUTH },
        body: formData,
      });

      if (!res.ok) throw new Error('Generation failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      alert('Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDesignType('favicon');
    setText('');
    setFont('Arial');
    setBgColor('#4F46E5');
    setTextColor('#ffffff');
    setImageFile(null);
    setDownloadUrl(null);
    setPreviewUrl(null);
    setFaviconShape('square');
  };

  useEffect(() => {
    handlePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designType, text, font, bgColor, textColor, imageFile, faviconShape]);

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded shadow space-y-4">
      <h1
        className="text-xl font-bold text-center"
        style={{ color: '#7e22ce !important', paddingBottom: '50px' }}
      >
        Favicon & Logo Generator
      </h1>

      {/* Select Type */}
      <div className="flex items-center gap-4">
        <label className="w-40 font-medium">Select Type:</label>
        <select
          value={designType}
          onChange={(e) => setDesignType(e.target.value as 'favicon' | 'logo')}
          className="flex-1 border p-2 rounded"
        >
          <option value="favicon">Favicon</option>
          <option value="logo">Logo</option>
        </select>
      </div>

      {/* Shape selector for favicon */}
      {designType === 'favicon' && (
        <div className="flex items-center gap-4">
          <label className="w-40 font-medium">Favicon Shape:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="square"
                checked={faviconShape === 'square'}
                onChange={() => setFaviconShape('square')}
              />
              Square
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="circle"
                checked={faviconShape === 'circle'}
                onChange={() => setFaviconShape('circle')}
              />
              Circle
            </label>
          </div>
        </div>
      )}

      {/* Upload Image */}
      <div className="flex items-center gap-4">
        <label className="w-40 font-medium">Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImageFile(e.target.files?.[0] || null);
            if (e.target.files?.length) setText('');
          }}
          className="flex-1"
        />
      </div>

      {/* Text input */}
      <div className="flex items-center gap-4">
        <label className="w-40 font-medium">Text Based:</label>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value) setImageFile(null);
          }}
          disabled={!!imageFile}
          className="flex-1 border p-2 rounded"
          placeholder="Enter text"
        />
      </div>

      {/* Font selector */}
      <div className="flex items-center gap-4">
        <label className="w-40 font-medium">Font Family:</label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="flex-1 border p-2 rounded"
        >
          {fontOptions.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Background color */}
      <div className="flex items-center gap-4">
        <label className="w-40 font-medium">Background Color:</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-16 h-10 rounded border"
        />
      </div>

      {/* Text color */}
      <div className="flex items-center gap-4">
        <label className="w-40 font-medium">Text Color:</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="w-16 h-10 rounded border"
        />
      </div>

      {/* Preview section */}
      {(text.trim() || imageFile) && (
        <>
          {!previewUrl ? (
            <div className="text-center text-gray-500 italic py-4">
              Loading preview...
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <img
                src={previewUrl}
                alt="Preview"
                width={64}
                height={64}
                style={{ borderRadius: faviconShape === 'circle' ? '50%' : '0' }}
              />
            </div>
          )}
        </>
      )}


      {/* Create button */}
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Create'}
      </button>

      {/* Download ZIP */}
      {downloadUrl && (
        <button
          onClick={() => {
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `${designType}.zip`;
            a.click();
            resetForm();
          }}
          className="bg-green-600 text-white px-4 py-2 rounded w-full mt-2"
        >
          Download ZIP
        </button>
      )}

      <div className="pb-12" />
    </div>
  );
};

export default DesignPage;
