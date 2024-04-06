import { useRouter } from 'next/router';

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { PasswordInput } from "@/components/ui/password-input"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { invoke } from '@tauri-apps/api/tauri'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const FormSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters"
	}),
	termsofservice: z.boolean(),
})

export default function Login() {
	const { toast } = useToast()
	const router = useRouter();

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const res = await invoke("authorize", {
			username: data.username,
			password: data.password
		})

		if (res === true) {
			router.push("/home/page")
		}

		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		})
	}

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			password: "",
			termsofservice: false,
		}
	})

	return (
		<main className={`flex justify-center items-center h-screen ${inter.className}`}>
			<Card className={"w-[50%]"}>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Index Distribution Manager</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/2 space-y-6">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordInput {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="termsofservice"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>
												Accept terms and conditions
											</FormLabel>
											<FormDescription>
												You agree to our Terms of Service and Privacy Policy.
											</FormDescription>
										</div>
									</FormItem>
								)}
							/>
							<Button type="submit">Login</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</main>
	);
}
