"use client";

import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Category } from "@/sanity.types";
import React from "react";

interface CategorySelectorProps {
  categories: Category[];
}

export function CategorySelectorComponent({ categories }: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const router = useRouter();

  const handleSelectCategory = (categoryId: string, slug?: string) => {
    setSelectedCategoryId((prev) => (prev === categoryId ? "" : categoryId));
    if (slug) {
      router.push(`/categories/${slug}`);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-auto ml-6 my-4 flex items-center justify-between space-x-2 bg-red-600 border border-gray-300 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
        >
          <span className="text-sm sm:text-base">
            {selectedCategoryId
              ? categories.find((cat) => cat._id === selectedCategoryId)?.title
              : "Select a Category"}
          </span>
          <ChevronsUpDown className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full ml-6 my-1 sm:w-80 p-4 shadow-lg bg-white rounded-lg">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search categories..."
            className="h-10 px-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                const inputValue = (e.currentTarget as HTMLInputElement).value.toLowerCase();
                const foundCategory = categories.find((c) =>
                  c.title?.toLowerCase().includes(inputValue)
                );
                if (foundCategory?.slug?.current) {
                  setSelectedCategoryId(foundCategory._id);
                  router.push(`/categories/${foundCategory.slug.current}`);
                  setOpen(false);
                }
              }
            }}
          />
          <CommandList>
            <CommandEmpty className="text-gray-500">No categories found.</CommandEmpty>
            <CommandGroup heading="Available Categories">
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  onSelect={() => handleSelectCategory(category._id, category.slug?.current)}
                  className="hover:bg-red-100 rounded-lg transition-colors"
                >
                  <span className="text-sm font-semibold">{category.title}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedCategoryId === category._id ? "opacity-100 text-red-600" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
