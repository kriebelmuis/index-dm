import Link from "next/link"

import { Home, ArrowDownToLine, Settings2 } from "lucide-react"

export default function Navigation() {
	return (
		<div className="ml-5 mt-5">
			<div className="sm:hidden">
				<label htmlFor="Tab" className="sr-only">Tab</label>

				<select
					id="Tab"
					className="w-full rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
				>
					<option selected>Home</option>
					<option>Downloads</option>
					<option>Settings</option>
				</select>
			</div>

			<div className="hidden sm:block">
				<div className="border-b border-gray-200 dark:border-gray-700">
					<nav className="-mb-px flex gap-6" aria-label="Tabs">
						<a
							href="#"
							className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
						>
							<Home></Home>

							Home
						</a>

						<a
							href="#"
							className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
						>
							<ArrowDownToLine></ArrowDownToLine>

							Downloads
						</a>

						<a
							href="#"
							className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
						>
							<Settings2></Settings2>

							Settings
						</a>
					</nav>
				</div>
			</div>
		</div>
	)
}