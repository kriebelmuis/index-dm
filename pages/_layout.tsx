import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div
			onContextMenu={(e) => {
				e.preventDefault();
				console.log("Right Click");
			}}>
			{children}
			<Toaster />
		</div>
	);
};

export default Layout;
