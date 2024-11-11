"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchBar({setTableData, searchUser}: any) {
  const [searchValue, setSearchValue] = useState<string>()
  const debouncedSearchValue = useDebounce(searchValue, 300); 

  
  useEffect(() => {
    console.log(debouncedSearchValue, "debouncedSearchValue")
    searchUser(debouncedSearchValue).then((resp: any) => {
      setTableData(resp?.users)
    })
  }, [debouncedSearchValue])

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search for name"
        defaultValue={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-8"
        type="search"
        name="nameSearch"
      />
    </div>
  );
}