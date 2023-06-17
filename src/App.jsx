import { useState, useEffect } from "react";
import Mps from "./MpsList";
import mpArray from "./mps";
import FormDropdown from "./FormDropdown";

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
		<div className="search-params">
			<div className="mb-4 bg-slate-900 px-4 pb-4 pt-8 md:mb-8 md:px-12 md:pb-8">
				<h1 className="mb-8 font-sans text-3xl text-white">
					Finance Bill 2023 votes
				</h1>

				<form className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-7 md:gap-2">
					{/* mp name */}
					<div className="input-container col-start-1 col-end-3 flex flex-col items-start gap-[0.125rem]">
						<label className="text-white" htmlFor="player">
							Search by mp's name
						</label>
						<input
							id="name"
							type="text"
							className="block w-full p-2 text-sm"
							value={name}
							placeholder="e.g., Babu Owino"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					{/* dropdowns */}
					{showFilters && (
						<div className="grid grid-cols-1 gap-3 md:col-start-4 md:col-end-8 md:grid-cols-4 md:gap-2">
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
						className="col-start-1 col-end-3 mt-0 rounded-sm bg-slate-800 p-2 text-sm text-white md:hidden"
						onClick={(e) => {
							e.preventDefault();
							setShowFilters(!showFilters);
						}}
					>
						{showFilters ? "Hide filters" : "Show filters"}
					</button>
				</form>
			</div>

			{/* <p className="px-4 text-[0.8rem] md:px-12">
				Showing <span className="text-green-500">{filteredMps.length} mps</span>
			</p> */}

			<div className=" px-4 md:px-12">
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
			</div>
		</div>
	);
};

export default App;
