import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("main-content")).render(
	<BrowserRouter>
		<Routes>
			<Analytics />
			<Route path="/" element={<App />} />
		</Routes>
	</BrowserRouter>
);
