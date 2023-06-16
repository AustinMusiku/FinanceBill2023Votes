import { useState, useEffect } from "react";
import Mps from "./MpsList";
import mpArray from "./mps";
import FormDropdown from "./FormDropdown";

const App = () => {
	const [firstLoad, setFirstLoad] = useState(true);

	// text inputs
	const [name, setName] = useState("");
	const [constituency, setConstituency] = useState("");

	// dropdowns
	const [party, setParty] = useState("");
	const [county, setCounty] = useState("");

	// checkboxes
	const [present, setPresent] = useState(null);
	const [vote, setVote] = useState(null);

	const [filteredMps, setFilteredMps] = useState([]);

	let mps = mpArray;

	useEffect(() => {
		setFilteredMps(filterMps(mps));
	}, [name, party, county, constituency, present, vote]);

	function filterMps(mps) {
		if (
			name === "" &&
			party === "" &&
			county === "" &&
			constituency === "" &&
			present === null &&
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

		return mps;
	}

	function resetFilters() {
		setName("");
		setParty("");
		setCounty("");
		setConstituency("");
		setPresent(null);
		setVote(null);
		setFilteredMps(mps);
	}

	return (
		<div className="search-params">
			<div className="mb-8 bg-slate-900 px-8 pb-8 pt-8">
				<h1 className="mb-8 font-sans text-3xl text-white">
					Finance Bill 2023 votes
				</h1>

				<form className="grid w-full grid-cols-7 flex-row items-end gap-2">
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

					{/* party */}
					<div className="col-start-5 col-end-6">
						<FormDropdown
							label="party"
							options={mps.map((item) => item[4])}
							value={party}
							onChange={(e) => setParty(e.target.value)}
						></FormDropdown>
					</div>

					{/* county */}
					<div className="col-start-6 col-end-7">
						<FormDropdown
							label="county"
							options={mps.map((item) => item[2])}
							value={county}
							onChange={(e) => setCounty(e.target.value)}
						></FormDropdown>
					</div>

					{/* constituency */}
					<div className="col-start-7 col-end-8">
						<FormDropdown
							label="constituency"
							options={mps.map((item) => item[3])}
							value={constituency}
							onChange={(e) => setConstituency(e.target.value)}
						></FormDropdown>
					</div>
				</form>
			</div>

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
	);
};

export default App;
