import Link from "next/link"

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Home, ArrowDownToLine, Settings2 } from "lucide-react"
import React from "react";

export default function Navigation() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link href="/home" legacyBehavior passHref>
						<NavigationMenuLink className={ navigationMenuTriggerStyle() }>
							Home
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/downloads" legacyBehavior passHref>
						<NavigationMenuLink className={ navigationMenuTriggerStyle() }>
							Download
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/settings" legacyBehavior passHref>
						<NavigationMenuLink className={ navigationMenuTriggerStyle() }>
							Settings
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
