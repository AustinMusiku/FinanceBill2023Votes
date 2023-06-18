import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { inject } from "@vercel/analytics";
import App from "./App";

inject();

ReactDOM.createRoot(document.getElementById("main-content")).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
		</Routes>
	</BrowserRouter>
);
