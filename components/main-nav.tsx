"use client"

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation"

export function MainNav({
    className,
    ...props
}:React.HTMLAttributes<HTMLInputElement>){

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}/`,
            label: "Overview",
            active: pathname === `/${params.storeId}` 
        },
        {href: `/${params.storeId}/billboards`,
        label: "Billboards",
        active: pathname === `/${params.storeId}`
        },
        {href: `/${params.storeId}/categories`,
        label: "Categories",
        active: pathname === `/${params.storeId}/categories`
        },
        {href: `/${params.storeId}/products`,
        label: "Products",
        active: pathname === `/${params.storeId}/categories`
        },
        {href: `/${params.storeId}/sizes`,
        label: "Sizes",
        active: pathname === `/${params.storeId}/sizes`
        },
        {href: `/${params.storeId}/colors`,
        label: "Colors",
        active: pathname === `/${params.storeId}/colors`
        },
        {
            href : `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`
        }
    ]

        return <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {
                routes.map((i)=>(
                    <Link href={i.href}
                     key={i.href}
                      className={cn("text-sm font-medium transition-colors hover:text-primary", i.active ? "text-black dark:text-white" : "text-muted-foreground")
                    }>{i.label}</Link>
                ))
            }
        </nav>
}