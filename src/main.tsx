import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext.tsx";
import { CacheProvider } from "./contexts/CacheContext.tsx";

Amplify.configure(outputs);

createRoot(document.getElementById("root")!).render(
	// <StrictMode>
	<CacheProvider>
		<MusicPlayerProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MusicPlayerProvider>
	</CacheProvider>
	// </StrictMode>
);

