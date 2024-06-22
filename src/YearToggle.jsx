const YearToggle = ({ setYear }) => {
	return (
		<div className="toggle-wrapper after:content-['12th Reading'] relative mx-auto mb-8 flex w-full flex-row items-center gap-1.5 rounded-lg bg-[#141f39] p-1 text-gray-100 transition-all after:absolute after:left-1 after:top-1 after:z-0 after:h-[calc(100%-8px)] after:w-[calc(50%-6px)] after:rounded-md after:bg-gray-100 after:px-4 after:py-2 after:text-slate-800 after:duration-200 md:mb-8 md:w-96">
			<button
				style={{ WebkitTapHighlightColor: "transparent" }}
				className="b2023 z-10 w-1/2 rounded-md px-8 py-2 text-center text-sm font-semibold text-slate-800  focus:outline-none"
				onClick={function (e) {
					e.preventDefault();
					setYear("2023");
					document
						.querySelector(".toggle-wrapper")
						.classList.remove("after:translate-x-[calc(100%+4px)]");
					document.querySelector(".b2023").classList.toggle("text-slate-800");
					document.querySelector(".b2024").classList.toggle("text-slate-800");
				}}
			>
				2023
			</button>
			<button
				style={{ WebkitTapHighlightColor: "transparent" }}
				className="b2024 z-10 w-1/2 rounded-md px-8 py-2 text-center text-sm  font-semibold  focus:outline-none"
				onClick={function (e) {
					e.preventDefault();
					setYear("2024");
					document
						.querySelector(".toggle-wrapper")
						.classList.add("after:translate-x-[calc(100%+4px)]");
					document.querySelector(".b2024").classList.toggle("text-slate-800");
					document.querySelector(".b2023").classList.toggle("text-slate-800");
				}}
			>
				2024
			</button>
		</div>
	);
};

export default YearToggle;
