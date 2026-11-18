import React from "react";
import { filters } from "../../config/index.js";
import { BookOpen, Layers, Filter, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

function ProductFilter({ filters: currentFilters = {}, handleFilter, handleResetFilters }) {
  return (
    <div className="bg-white dark:bg-[#141414] border-2 border-gray-900 dark:border-gray-700 rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] space-y-6 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center border border-emerald-300 dark:border-emerald-800">
            <Filter className="w-4 h-4" />
          </div>
          <h3 className="text-base font-extrabold text-[#1C1C1C] dark:text-white">
            Filter Notes
          </h3>
        </div>

        {handleResetFilters && (
          <button
            onClick={handleResetFilters}
            className="text-[11px] font-mono font-bold text-gray-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset All Filters"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="space-y-6">
        {Object.keys(filters.ProductFilter).map((filterKey) => {
          const filter = filters.ProductFilter[filterKey];

          return (
            <div key={filterKey} className="space-y-3">
              <h4 className="text-xs font-mono uppercase font-bold text-gray-700 dark:text-gray-300 tracking-wider">
                {filter.label}
              </h4>

              <div className="space-y-2">
                {filter.options.map((option) => {
                  const isChecked =
                    currentFilters &&
                    currentFilters[filterKey] &&
                    currentFilters[filterKey].indexOf(option.value) > -1;

                  return (
                    <label
                      key={option.value}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors group"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(isChecked)}
                        onChange={() => handleFilter?.(filterKey, option.value)}
                        className="w-4 h-4 rounded-md border-2 border-gray-900 dark:border-gray-600 text-[#1C1C1C] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-emerald-600"
                      />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductFilter;
