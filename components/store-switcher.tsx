"use client"
import { useState } from "react"

import { Store } from "@prisma/client"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { redirect, useParams } from "next/navigation"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger> & React.HTMLAttributes<HTMLInputElement>

interface SwitcherProps extends PopoverTriggerProps {
    items : Store[] | null
};

export default function Switcher({className, items} : SwitcherProps){


        const storeModal = useStoreModal();
        const params = useParams();
        const [open, setOpen] = useState<boolean>();
         
        const formattedItems = items?.map(item => (
            {
                label : item.name,
                value : item.id
            }
        ))

        const currentStore  = formattedItems?.find(i=>i.value === params.storeId);
        const onStoreSelect = (store: {value : string, label : string})=> {
            setOpen(false)
            redirect(`/${store.value}`)
        }

    return <Popover>
        <PopoverTrigger>
            <Button
                variant={"outline"}
                size={"sm"}
                role="combobox"
                aria-expanded={open}
                aria-label="slect a store"
                className={cn("w-[200px justify-between", className)}    
            >
                <StoreIcon className="mr-2 h-4 w-4" />
                {currentStore?.label}
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-0" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-200[200px] p-0">
            <Command>
                <CommandList>
                    <CommandInput placeholder="Search Store" />
                    <CommandEmpty>No Store Found</CommandEmpty>
                    <CommandGroup heading="Stores">
                        {
                            formattedItems?.map(i=>{
                                return <CommandItem 
                                            key={i.value}
                                            onSelect={onStoreSelect(i)}
                                            className="text-sm"
                                            >
                                               <StoreIcon className="mr-2 h-4 w-4 ">
                                                </StoreIcon> 
                                                {i.label}
                                                <Check className={cn("ml-auto h-4 w-4",
                                                currentStore?.value === i.value
                                                ? "opacity-100"
                                                : "opacity-0" )} />
                                </CommandItem>
                            })
                        }
                    </CommandGroup>
                </CommandList>
                <CommandSeparator>
                <CommandList>
                    <CommandInput placeholder="Search Store" />
                    <CommandEmpty>No Store Found</CommandEmpty>
                    <CommandGroup heading="Stores">
                      <CommandItem onSelect={()=>{
                            setOpen(false);
                            storeModal.onOpen();
                            }} className="text-sm">

                                 <PlusCircle className="mr-2 h-5 w-5" />
                                    Create Store
                                </CommandItem>
                        
                    </CommandGroup>
                </CommandList>
                </CommandSeparator>
            </Command>
        </PopoverContent>
    </Popover>
}