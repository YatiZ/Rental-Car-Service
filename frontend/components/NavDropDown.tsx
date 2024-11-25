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
          <DropdownMenuItem>Favorites</DropdownMenuItem>
          <DropdownMenuItem>Rented History</DropdownMenuItem>
          <DropdownMenuItem>Setting</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    )
  }
  
  export default NavDropDown