import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import React from 'react'
import AddRenterPage from "./RenterInfo"
import Link from "next/link"
  
  const NavDropDown = () => {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger>User</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <AddRenterPage/>
          </DropdownMenuItem>
        
            <Link href='/Favorite-List'>
            <DropdownMenuItem>
            Your Favorites
            </DropdownMenuItem>
            </Link>
        
          <DropdownMenuItem>Rented History</DropdownMenuItem>
          <DropdownMenuItem>Setting</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    )
  }
  
  export default NavDropDown