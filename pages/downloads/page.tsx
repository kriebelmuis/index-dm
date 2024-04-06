import Navigation from "@/pages/home/navbar"
import DownloadItem from "./download"

import { ScrollArea } from "@/components/ui/scroll-area"

export default function Downloads() {
	return (
		<main className="flex flex-col">
			<Navigation/>
			<ScrollArea className="size-full-5 p-4 mt-5">
				<DownloadItem></DownloadItem>
			</ScrollArea>
		</main>
	)
}