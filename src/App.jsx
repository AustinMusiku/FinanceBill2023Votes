import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Mps from "./MpsList";
import mpArray from "./mps";
import FormDropdown from "./FormDropdown";
import FormText from "./FormText";

const App = () => {
	const [showFilters, setShowFilters] = useState(window.innerWidth > 768);

	// text inputs
	const [name, setName] = useState("");
	const [constituency, setConstituency] = useState("");

	// dropdowns
	const [party, setParty] = useState("");
	const [county, setCounty] = useState("");

	// checkboxes
	const [attendance, setAttendance] = useState("");
	const [vote, setVote] = useState(null);

	const [filteredMps, setFilteredMps] = useState([]);

	let mps = mpArray;

	useEffect(() => {
		setFilteredMps(filterMps(mps));
	}, [name, party, county, constituency, attendance, vote]);

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

		if (party !== "") {
			mps = mps.filter((item) => item[4] === party);
		}

		if (county !== "") {
			mps = mps.filter((item) => item[2] === county);
		}

		if (constituency !== "") {
			mps = mps.filter((item) => item[3] === constituency);
		}

		if (attendance !== "") {
			mps = mps.filter((item) => item[5] === attendance);
		}

		return mps;
	}

	function resetFilters() {
		setName("");
		setParty("");
		setCounty("");
		setConstituency("");
		setAttendance(null);
		setVote(null);
		setAttendance("");
		setFilteredMps(mps);
	}

	return (
		<>
			<header className="mb-4 rounded-b-2xl bg-slate-900 px-6 pb-6 pt-8 md:mb-8 md:rounded-b-3xl md:px-8 md:pb-8">
				<h1 className="mb-8 font-sans text-3xl text-white">
					Finance Bill 2023 votes
				</h1>

				{/* <p className="mb-8 max-w-prose text-base text-gray-400">
					These are the votes of the members of the 13th Parliament of Kenya on
					15th June 2023 on the Finance Bill. The bill passed it's second
					reading by 176 votes to 81. Some of the votes are still pending and
					will be updated ASAP.
				</p> */}

				<form className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-7 md:items-end md:gap-2">
					{/* mp name */}
					<div className="col-start-1 col-end-3">
						<FormText
							label="mp name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></FormText>
					</div>

					{/* dropdowns */}
					{showFilters && (
						<div className="grid grid-cols-1 gap-3 md:col-start-4 md:col-end-8 md:grid-cols-4 md:gap-4">
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
								options={mps.map((item) => item[3])}
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
						className="col-start-1 col-end-3 mt-0 rounded-lg bg-slate-800 p-2 text-sm text-white md:hidden"
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
			<section className=" px-6 md:px-8">
				{filteredMps.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-4">
						<h1 className="text-center text-3xl">Oops, no mps found!</h1>
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
			<Analytics />;
		</>
	);
};

export default App;
