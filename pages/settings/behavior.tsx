import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gauge } from 'lucide-react';

export default function Behavior({ goBack }: { goBack: any }) {
	return (
		<div>
			<Button variant="outline" className="text-gray-500 mb-5" onClick={goBack}>Back</Button>
			<div className="flex flex-row items-center space-x-2 rounded-md border p-4">
					<Gauge size="35" className='flex-shrink-0' />
					<div className='flex flex-col p-2 items-start size-full'>
						<p className="text-sm font-medium leading-none">Speed limit</p>
						<p className="text-sm text-muted-foreground">Download speedlimit in megabytes</p>
					</div>
					<Input className='w-50' />
				</div>
		</div>
	)
}