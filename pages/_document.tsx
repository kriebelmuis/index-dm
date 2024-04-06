import { ThemeProvider } from "@/components/theme-provider";
import { Html, Head, Main, NextScript } from "next/document";
import Layout from "./_layout";

export default function Document() {
	return (
		<Html lang="en" suppressHydrationWarning>
			<Head />
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Layout>
						<Main></Main>
						<NextScript />
					</Layout>
				</ThemeProvider>
			</body>
		</Html>
	);
}
