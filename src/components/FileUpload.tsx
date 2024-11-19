import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

function FileUpload({ onFileUpload }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
      {isDragActive ? (
        <p className="text-sm text-gray-600">Drop your CSV file here...</p>
      ) : (
        <div>
          <p className="text-sm text-gray-600">
            Drag & drop your CSV file here, or click to select
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Must contain 'ds' (dates) and 'y' (values) columns
          </p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;