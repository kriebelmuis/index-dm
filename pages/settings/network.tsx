import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Network({ goBack }: { goBack: any }) {
	return (
		<div>
			<Button variant="outline" className="text-gray-500 mb-5" onClick={goBack}>Back</Button>
			<div className="flex flex-col space-x-4 rounded-md border p-4">
				<div className="flex flex-row">
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium leading-none">
							DHT Network
						</p>
						<p className="text-sm text-muted-foreground">
							Connect to DHT network
						</p>
					</div>
					<Switch />
				</div>
			</div>
		</div>
	)
}