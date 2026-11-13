
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoading,
  setImageLoading,
  uploadedImageUrl,
  setUploadedImageUrl,
  isEditMode,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function onhandledrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (setUploadedImageUrl) {
      setUploadedImageUrl("");
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    if (setImageLoading) setImageLoading(true);
    try {
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      if (response?.data?.success) {
        const url =
          response.data.imageUrl ||
          response.data?.result?.url ||
          response.data?.result?.secure_url;
        setUploadedImageUrl(url);
        toast.success("Image uploaded successfully");
      } else {
        toast.error(response?.data?.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(
        error?.response?.data?.message || "Image upload failed. Check Cloudinary settings."
      );
      if (setUploadedImageUrl) setUploadedImageUrl("");
    } finally {
      if (setImageLoading) setImageLoading(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <label className="text-lg font-semibold mb-2 block">Upload Image</label>
      <div
        onDragOver={handleDragOver}
        onDrop={onhandledrop}
        className="border-2 border-dashed rounded-lg p-4 mt-4"
      >
        <Input
          type="file"
          id="image-upload"
          className="hidden"
          ref={inputRef}
          disabled={isEditMode}
          onChange={handleImageFileChange}
        />
                {
                    !imageFile?
                    <label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer">
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                        <span>Drag & drop or click to upload</span>
                    </label>:
                    imageLoading?<Skeleton className="h-10 bg-gray-200" />:(
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-7 h-8 mr-2"/>
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <button variant='ghost'size='icon' className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4"/>
                            <span className="sr-only">Remove File</span>
                        </button>
                    </div>)
                }
            </div>
        </div>
    )
}

export default ProductImageUpload