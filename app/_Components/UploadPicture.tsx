import React, { DragEvent, useRef, useState } from "react";
import UploadIcon from "../_Icons/UploadIcon";
import Image from "next/image";
import { toast } from "react-toastify";
import { useFormContext } from "react-hook-form";
type Props = {
  name: string;
};
export default function UploadPicture({ name }: Props) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const [previewPic, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
console.log(watch(name));
  const convertImageToUrl = (imgFile: File): void => {
    if (imgFile) {
      const path = URL.createObjectURL(imgFile);
      setPreview(path);
      setValue(name, imgFile);
      return;
    }
    setPreview(null);
  };

  const handleDropPicture = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let imageFile = e.dataTransfer.files[0];
    if (imageFile && imageFile.type.split("/")[0] !== "image") {
      toast("only images could be upload", {
        type: "error",
        theme: "colored",
        closeOnClick: true,
      });
      setPreview(null);
      setValue(name, "");
      return;
    }
    convertImageToUrl(imageFile);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const imageFile: FileList | null = e.target.files;
    if (imageFile && imageFile?.length > 0) {
      if (imageFile[0].type.split("/")[0] !== "image") {
        toast("only images could be upload", {
          type: "error",
          theme: "colored",
          closeOnClick: true,
        });
        setPreview(null);
        setValue(name, "");
      } else {
        convertImageToUrl(imageFile[0]);
      }
    }
  };

  const handleClickFileInput = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <div
        className="space-y-1 h-[600px] relative w-full"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropPicture}
      >
        <label className="label">add photo</label>
        <div className="h-[95%] text-center bg-dark-3 relative w-full">
          <input
            type="file"
            className=" w-full text-transparent cursor-pointer m-auto hidden"
            {...register(name)}
            onChange={inputChangeHandler}
            ref={fileInputRef}
          />
          {previewPic ? (
            <>
              <Image
                quality={100}
                fill={true}
                src={previewPic}
                className="scale-95 rounded-2xl max-h-[90%]"
                alt="picture preview"
              />
              <p
                className="absolute left-0 right-0 w-full py-1 text-center border-t bottom-2 border-slate-500 text-slate-400 cursor-pointer"
                onClick={handleClickFileInput}
              >
                click or darg photo to replace
              </p>
            </>
          ) : (
            <div className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <UploadIcon />
              <h3>Drag photos here</h3>
              <span className="text-sm text-light-4">svg , png , jpg</span>
              <div
                onClick={handleClickFileInput}
                className="relative px-4 py-3 rounded-md bg-dark-4 text-off-white cursor-pointer"
              >
                select from computer
              </div>
            </div>
          )}
        </div>
      </div>
      {errors && (
        <span className="block text-sm text-left capitalize text-red">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
}
