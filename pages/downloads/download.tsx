import Image from 'next/image'

import {
	Card
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'

export default function DownloadItem() {
	return (
		<div>
			<div className='flex flex-col p-4 items-start size-full border rounded-md'>
				<div className=' opacity-50'>
					<Image
						loader={() => {
							return "https://cdn2.steamgriddb.com/hero_thumb/b359ff14a406dbfe43f505e5b9dfbec8.jpg"
						}}
						src="hi.png"
						layout='fill'
						objectFit='cover'
						alt=""/>
				</div>
				<Label>hi</Label>
			</div>
		</div>
	)
}