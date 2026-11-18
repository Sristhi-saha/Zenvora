import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export default function CommonForm({
  formControls = [],
  formData = {},
  setFormData,
  onSubmit,
  isBtnDisabled,
  buttonText = "Submit",
}) {
  function renderInputsByComponentType(controlItem) {
    const rawValue = formData?.[controlItem.name];

    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            type={controlItem.type || "text"}
            placeholder={controlItem.placeholder}
            name={controlItem.name}
            id={controlItem.name}
            value={rawValue ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [controlItem.name]: e.target.value,
              }))
            }
            className="rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-900 dark:focus-visible:ring-emerald-500 focus-visible:border-gray-900 dark:focus-visible:border-emerald-500 h-11 text-sm transition-colors"
          />
        );

      case "select":
        return (
          <Select
            value={formData?.[controlItem.name] || undefined}
            onValueChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                [controlItem.name]: val,
              }))
            }
          >
            <SelectTrigger className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-gray-100 h-11 text-sm focus:ring-1 focus:ring-gray-900 dark:focus:ring-emerald-500 transition-colors">
              <SelectValue placeholder={controlItem.placeholder} />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-gray-100 shadow-md">
              {controlItem.options?.map((option, index) => (
                <SelectItem
                  key={option.id || option.value || index}
                  value={option.id || option.value}
                  className="cursor-pointer dark:hover:bg-gray-800"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            placeholder={controlItem.placeholder}
            name={controlItem.name}
            id={controlItem.name}
            value={rawValue ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [controlItem.name]: e.target.value,
              }))
            }
            className="rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-900 dark:focus-visible:ring-emerald-500 min-h-[100px] text-sm transition-colors"
          />
        );

      default:
        return null;
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem, index) => (
          <div key={controlItem.name || index} className="grid gap-1.5 text-left">
            <label
              htmlFor={controlItem.name}
              className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 font-mono"
            >
              {controlItem.label}
            </label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>

      {/* Styled Submit Button */}
      <button
        type="submit"
        disabled={isBtnDisabled}
        className="w-full mt-6 py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#1C1C1C] hover:bg-black border-2 border-gray-900 dark:bg-white dark:text-[#111111] dark:border-white dark:hover:bg-gray-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all cursor-pointer"
      >
        {buttonText}
      </button>
    </form>
  );
}
