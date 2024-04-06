import React, { useState } from 'react';

import Navigation from "@/pages/home/navbar"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Wifi } from 'lucide-react';
import { Settings2 } from 'lucide-react';

import Network from './network';
import Behavior from './behavior';

export default function Settings() {
	const [currentMenu, setCurrentMenu] = useState('main');

	const handleMenuClick = (menu: string) => {
		setCurrentMenu(menu);
	};

	const handleBack = () => {
		setCurrentMenu('main');
	};

	return (
		<main className="flex flex-col">
			<Navigation />
			<ScrollArea className="size-full-5 p-4">
				{currentMenu === 'main' && (
					<div className='flex flex-col gap-2'>
						<Button variant='outline' className="h-50" onClick={() => handleMenuClick('behavior')}>
							<Settings2 size="30" className='flex-shrink-0' />
							<div className='flex flex-col p-4 items-start size-full'>
								<p className="text-sm font-medium leading-none">Behavior</p>
								<p className="text-sm text-muted-foreground">Language, theme, save logs</p>
							</div>
						</Button>
						<Button variant='outline' className="h-50" onClick={() => handleMenuClick('network')}>
							<Wifi size="30" className='flex-shrink-0' />
							<div className='flex flex-col p-4 items-start size-full'>
								<p className="text-sm font-medium leading-none">Network</p>
								<p className="text-sm text-muted-foreground">Speedlimiter and other networking features</p>
							</div>
						</Button>
					</div>
				)}
				{currentMenu === 'network' && <Network goBack={handleBack} />}
				{currentMenu === 'behavior' && <Behavior goBack={handleBack} />}
			</ScrollArea>
		</main>
	)
}