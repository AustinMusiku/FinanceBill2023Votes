import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Mps from "./MpsList";
import countyToConstituency from "./countyToConstituency";
import mpArray from "./mps";
import FormDropdown from "./FormDropdown";
import FormText from "./FormText";
import MyFooter from "./MyFooter";

const App = () => {
	const [showFilters, setShowFilters] = useState(window.innerWidth > 768);

	// text inputs
	const [name, setName] = useState("");
	const [constituency, setConstituency] = useState("");

	// dropdowns
	const [status, setStatus] = useState("");
	const [party, setParty] = useState("");
	const [county, setCounty] = useState("");

	// checkboxes
	const [attendance, setAttendance] = useState("");
	const [vote, setVote] = useState(null);

	const [filteredMps, setFilteredMps] = useState([]);

	let mps = mpArray;
	let constituencies =
		county === ""
			? Object.values(countyToConstituency).flat()
			: countyToConstituency[county];

	useEffect(() => {
		setFilteredMps(filterMps(mps));

		function handleResize() {
			setShowFilters(window.innerWidth > 768);
		}

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [name, status, party, county, constituency, attendance, vote]);

	function filterMps(mps) {
		if (
			name === "" &&
			party === "" &&
			county === "" &&
			constituency === "" &&
			attendance === null &&
			vote === null
		)
			return mps;

		if (name !== "") {
			mps = mps.filter((item) =>
				item[0].toLowerCase().includes(name.toLowerCase())
			);
		}

		if (status !== "") {
			// disable constituency dropdown #constituency
			if (status === "CONSTITUENCY" || status === "") {
				document.getElementById("constituency").disabled = false;
			} else {
				setConstituency("");
				document.getElementById("constituency").disabled = true;
			}
			mps = mps.filter((item) => item[7] === status);
		}

		if (party !== "") {
			mps = mps.filter((item) => item[4] === party);
		}

		if (county !== "") {
			mps = mps.filter((item) => item[2] === county);
		}

		if (constituency !== "") {
			if (
				county !== "" &&
				!countyToConstituency[county].includes(constituency)
			) {
				mps = mps.filter((item) => item[2] === county);
				setConstituency("");
			} else {
				mps = mps.filter((item) => item[3] === constituency);
			}
		}

		if (attendance !== "") {
			mps = mps.filter((item) => item[5] === attendance);
		}

		return mps;
	}

	function resetFilters() {
		setName("");
		setStatus("");
		setParty("");
		setCounty("");
		setConstituency("");
		setAttendance(null);
		setVote(null);
		setAttendance("");
		setFilteredMps(mps);
	}

	return (
		<section className="page-section flex flex-col">
			<header className="mb-4 bg-slate-900 px-6 pb-6 pt-8 md:mb-8 md:px-8 md:pb-8 ">
				<h1 className="mb-8 text-center font-sans text-3xl text-white ">
					Finance bill votes
				</h1>

				<div className="toggle-wrapper after:content-['12th Reading'] relative mx-auto mb-4 flex w-full flex-row items-center gap-1.5 rounded-lg bg-[#141f39] p-1 transition-all after:absolute after:left-1 after:top-1 after:z-0 after:h-[calc(100%-8px)] after:w-[calc(50%-6px)] after:rounded-md after:bg-slate-800 after:px-4 after:py-2 after:duration-200 md:mb-8 md:w-96">
					<button
						style={{ WebkitTapHighlightColor: "transparent" }}
						className="z-10 w-1/2 rounded-md px-8 py-2 text-center text-sm font-medium text-white focus:outline-none"
						onClick={() =>
							document
								.querySelector(".toggle-wrapper")
								.classList.remove("after:translate-x-[calc(100%+4px)]")
						}
					>
						2nd Reading
					</button>
					<button
						style={{ WebkitTapHighlightColor: "transparent" }}
						className="z-10 w-1/2 rounded-md px-8 py-2 text-center text-sm font-medium text-white focus:outline-none"
						onClick={() =>
							document
								.querySelector(".toggle-wrapper")
								.classList.add("after:translate-x-[calc(100%+4px)]")
						}
					>
						3rd Reading
					</button>
				</div>
				<p className="mx-auto mb-4 max-w-prose text-base text-gray-400 md:mb-12 md:text-center">
					These are the votes by the members of the 13th Parliament of Kenya on
					the 14th of June 2023 regarding the finance bill. The bill passed its
					second reading by 176 votes to 81. Some of the votes are still pending
					verification and will be updated as soon as possible.
				</p>

				<form className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-8 md:items-end md:gap-2">
					{/* mp name */}
					{showFilters && (
						<div className="col-start-1 col-end-3">
							<FormText
								label="mp name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></FormText>
						</div>
					)}

					{/* dropdowns */}
					{showFilters && (
						<div className="grid grid-cols-1 gap-3 md:col-start-4 md:col-end-9 md:grid-cols-5 md:gap-2">
							{/* party */}
							<FormDropdown
								label="status"
								options={mps.map((item) => item[7])}
								value={status}
								onChange={(e) => setStatus(e.target.value)}
							></FormDropdown>

							{/* party */}
							<FormDropdown
								label="party"
								options={mps.map((item) => item[4])}
								value={party}
								onChange={(e) => setParty(e.target.value)}
							></FormDropdown>

							{/* county */}
							<FormDropdown
								label="county"
								options={mps.map((item) => item[2])}
								value={county}
								onChange={(e) => setCounty(e.target.value)}
							></FormDropdown>

							{/* constituency */}
							<FormDropdown
								label="constituency"
								options={constituencies}
								value={constituency}
								onChange={(e) => setConstituency(e.target.value)}
							></FormDropdown>

							{/* attendance */}
							<FormDropdown
								label="attendance"
								options={mps.map((item) => item[5])}
								value={attendance}
								onChange={(e) => setAttendance(e.target.value)}
							></FormDropdown>
						</div>
					)}

					{/* toggle filters */}
					<button
						className="col-start-1 col-end-3 mt-0 rounded-lg bg-slate-800 p-2.5 text-sm text-white md:hidden"
						onClick={(e) => {
							e.preventDefault();
							setShowFilters(!showFilters);
						}}
					>
						{showFilters ? "Hide filters" : "Show filters"}
					</button>
				</form>
			</header>
			{/* <p className="px-4 text-[0.8rem] md:px-12">
				Showing <span className="text-green-500">{filteredMps.length} mps</span>
			</p> */}

			<section className="mb-4 shrink-0 grow basis-auto px-6 md:mb-8 md:px-8">
				{filteredMps.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-4">
						<h1 className="mt-12 text-center text-xl">No mps found!</h1>
						<button
							onClick={resetFilters}
							className="text-blue-500 underline hover:text-blue-700"
						>
							Reset Filters
						</button>
					</div>
				) : (
					<Mps mps={filteredMps} />
				)}
			</section>

			<MyFooter />
			<Analytics />
		</section>
	);
};

export default App;
