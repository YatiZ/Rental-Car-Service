"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function DropdownMenuCheckboxes() {
 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-3 mb-4">
        <DropdownMenuLabel className="text-lg">Taxes and fees</DropdownMenuLabel>
        <div className="flex justify-between text-xs gap-x-5">
            <p>RSR - RENTAL SURCHARGE</p>
            <p>$2.75</p>
        </div>
        <div className="flex justify-between text-xs gap-x-5">
            <p>VLF - VEH LICENSE FEE</p>
            <p>$3.60</p>
        </div>
        <div className="flex justify-between text-xs gap-x-5">
            <p>TAX - TAX</p>
            <p>$2.75</p>
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
