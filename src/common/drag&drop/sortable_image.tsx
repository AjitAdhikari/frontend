import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SortableImageItemProps {
  field: any;
  index: number;
  imageSrc: string | null;
  name: string;
  fileInputRefs: React.MutableRefObject<{
    [key: string]: HTMLInputElement | null;
  }>;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleFileDelete: (index: number) => void;
  remove: (index: number) => void;
}

const SortableImageItem = ({
  field,
  index,
  imageSrc,
  name,
  fileInputRefs,
  handleFileChange,
  handleFileDelete,
  remove,
}: SortableImageItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: field.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex gap-3 items-start p-3 border border-gray-200 rounded-lg"
    >
      <div className="flex-1 cursor-move" {...attributes} {...listeners}>
        {imageSrc ? (
          <div className="relative">
            <div className="bg-gray-100 rounded-lg overflow-hidden p-2 flex items-center justify-center min-h-[140px]">
              <img
                src={imageSrc}
                alt={`Preview ${index + 1}`}
                className="max-w-full max-h-[280px] object-contain rounded-md bg-gray-400"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-1 -right-1 rounded-full h-6 w-6 p-0"
              onClick={() => handleFileDelete(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-gray-400 transition-colors">
            <div className="space-y-2">
              <div className="flex justify-center">
                <svg
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={(el) => {
                    fileInputRefs.current[`${name}.${index}`] = el;
                  }}
                  onChange={(e) => handleFileChange(e, index)}
                  id={`file-${name}-${index}`}
                />
                <label
                  htmlFor={`file-${name}-${index}`}
                  className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Choose image file
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        )}
      </div>
      <Button
        type="button"
        variant="destructive"
        size="icon"
        onClick={() => remove(index)}
        className="mt-2"
      >
        <X aria-hidden="true" />
      </Button>
    </div>
  );
};

export default SortableImageItem;