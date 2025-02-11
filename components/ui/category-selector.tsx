"use client";

import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
 // Ensure this import is valid
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "./command"; // Ensure this import is valid
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"; // Ensure this import is valid
import { useRouter } from "next/navigation";
import { useState } from "react";
 // Ensure this import is valid
import React from "react"; // Import React for type definitions
import { Button } from "./button";
import { Category } from "@/sanity.types";
interface CategorySelectorProps {
  categories: Category[];
}

/**
 * CategorySelectorComponent allows users to select a category from a list.
 * It provides a searchable dropdown using Popover and Command components.
 *
 * @param {CategorySelectorProps} props - The properties object.
 * @param {Category[]} props.categories - The list of available categories.
 */
export function CategorySelectorComponent({ categories }: CategorySelectorProps) {
  // State to manage the open/closed state of the popover
  const [open, setOpen] = useState(false);
  // State to keep track of the selected category ID
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  // Next.js router for navigation
  const router = useRouter();

  /**
   * Handles the selection of a category.
   * Toggles selection and navigates to the category page if a slug is provided.
   *
   * @param {string} categoryId - The ID of the selected category.
   * @param {string} [slug] - The slug of the selected category for navigation.
   */
  const handleSelectCategory = (categoryId: string, slug?: string) => {
    // Toggle selection if the category is already selected
    setSelectedCategoryId((prev) => (prev === categoryId ? "" : categoryId));
    if (slug) {
      // Navigate to the selected category's page
      router.push(`/categories/${slug}`);
    }
    // Close the popover after selection
    setOpen(false);
  };

  return (
    // Popover component to display the category selector dropdown
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger element for the popover */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-auto ml-6 my-4 flex items-center justify-between space-x-2 bg-zinc-600 border border-gray-300 hover:bg-gray-50 text-white font-bold py-2 px-4 rounded shadow-sm transition-all duration-200"
        >
          {/* Display the selected category title or a default placeholder */}
          <span className="text-sm sm:text-base">
            {selectedCategoryId
              ? categories.find((cat) => cat._id === selectedCategoryId)?.title
              : "Categories"}
          </span>
          {/* Icon indicating the dropdown can be expanded */}
          <ChevronsUpDown className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      {/* Content of the popover containing the search and list of categories */}
      <PopoverContent className="w-full ml-8 my-1 sm:w-80 p-2 shadow-lg">
        <Command shouldFilter={false}>
          {/* Input field for searching categories */}
          <CommandInput
            placeholder="Search category..."
            className="h-10 px-3 border border-gray-200 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                // Get the input value and convert it to lowercase for comparison
                const inputValue = (e.currentTarget as HTMLInputElement).value.toLowerCase();
                // Find a category that includes the input value in its title
                const foundCategory = categories.find((c) =>
                  c.title?.toLowerCase().includes(inputValue)
                );
                if (foundCategory?.slug?.current) {
                  // Set the selected category ID and navigate to its page
                  setSelectedCategoryId(foundCategory._id);
                  router.push(`/categories/${foundCategory.slug.current}`);
                  // Close the popover after navigation
                  setOpen(false);
                }
              }
            }}
          />
          {/* List of categories matching the search input */}
          <CommandList>
            {/* Display when no categories match the search query */}
            <CommandEmpty className="text-gray-500">No category found.</CommandEmpty>
            {/* Grouping of category items */}
            <CommandGroup heading="Categories">
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  onSelect={() => handleSelectCategory(category._id, category.slug?.current)}
                  className="hover:bg-gray-100 rounded transition-colors"
                >
                  {/* Display the category title */}
                  <span className="text-sm font-bold">{category.title}</span>
                  {/* Check icon to indicate the selected category */}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedCategoryId === category._id ? "opacity-100 text-blue-500" : "opacity-0"
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
