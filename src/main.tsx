import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);

