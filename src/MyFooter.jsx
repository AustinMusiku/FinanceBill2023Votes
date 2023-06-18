import React, { useEffect } from "react";

const MyFooter = () => {
	useEffect(() => {
		const adjustBodyHeight = () => {
			document.querySelector(".page-section").style.minHeight =
				window.innerHeight + "px";
		};

		adjustBodyHeight();

		window.addEventListener("resize", adjustBodyHeight);

		return () => {
			window.removeEventListener("resize", adjustBodyHeight);
		};
	}, []);

	return (
		<footer className="bg-gray-10 grid shrink-0 place-items-center bg-gray-200 py-8 text-sm text-gray-800 md:px-8 md:py-8">
			<p className="text-center">
				by{" "}
				<a
					href="https://austinmusiku.pages.dev/"
					target="_blank"
					rel="noopener noreferrer"
					className="underline"
				>
					Austin Musiku
				</a>
			</p>
		</footer>
	);
};

export default MyFooter;
