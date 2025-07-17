import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext.tsx";

Amplify.configure(outputs);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MusicPlayerProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MusicPlayerProvider>
	</StrictMode>
);

