import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import AddRenterPage from "./RenterInfo";
import Link from "next/link";

const NavDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>User</DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/UserInfo">
          <DropdownMenuItem className="font-bold">My Profile</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <AddRenterPage />
        </DropdownMenuItem>

        <Link href="/Favorite-List">
          <DropdownMenuItem>Your Favorites</DropdownMenuItem>
        </Link>

        <Link href="/Rent-History">
          <DropdownMenuItem>Rented History</DropdownMenuItem>
        </Link>

        <DropdownMenuItem>Setting</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropDown;
