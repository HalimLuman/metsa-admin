"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CiSaveUp2 } from "react-icons/ci";


const FileUploader = ({ files, onChange }) => {
  const onDrop = useCallback((acceptedFiles) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="w-full flex justify-center border border-dashed rounded-xl py-5 cursor-pointer">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          className="max-h-[400px] overflow-hidden object-cover"
          alt="uploaded image"
        />
      ) : (
        <div className="flex items-center gap-4">
        <CiSaveUp2 className="text-2xl"/>
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-blue-500 hover:text-blue-700">Click to upload</span> or drag
              and drop
            </p>
            <p>SVG, PNG, JPEG or GIF (max 800x400)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;