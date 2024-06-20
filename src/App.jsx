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
	const [category, setCategory] = useState("");
	const [party, setParty] = useState("");
	const [county, setCounty] = useState("");

	// checkboxes
	const [attendance, setAttendance] = useState("");
	const [vote, setVote] = useState("");

	const [filteredMps, setFilteredMps] = useState([]);

	let mps = mpArray;
	let constituencies =
		county === ""
			? Object.values(countyToConstituency).flat()
			: countyToConstituency[county];

	useEffect(() => {
		setFilteredMps(filterMps(mps));
	}, [name, category, party, county, constituency, attendance, vote]);

	function filterMps(mps) {
		if (
			name === "" &&
			category === "" &&
			party === "" &&
			county === "" &&
			constituency === "" &&
			attendance === null &&
			vote === null
		)
			return mps;

		// filter by name
		if (name !== "") {
			mps = mps.filter((mp) =>
				mp.name.toLowerCase().includes(name.toLowerCase())
			);
		}

		// filter by category
		if (category !== "") {
			// disable constituency dropdown #constituency
			if (category === "CONSTITUENCY" || category === "") {
				document.getElementById("constituency").disabled = false;
			} else {
				setConstituency("");
				document.getElementById("constituency").disabled = true;
			}
			mps = mps.filter((mp) => mp.category === category);
		}

		// filter by party
		if (party !== "") {
			mps = mps.filter((mp) => mp.party === party);
		}

		// filter by county
		if (county !== "") {
			mps = mps.filter((mp) => mp.county === county);
		}

		// filter by constituency
		if (constituency !== "") {
			if (
				county !== "" &&
				!countyToConstituency[county].includes(constituency)
			) {
				mps = mps.filter((item) => item[2] === county);
				setConstituency("");
			} else {
				mps = mps.filter((mp) => mp.constituency === constituency);
			}
		}

		// filter by attendance
		if (attendance !== "") {
			mps = mps.filter((mp) => mp.attendance === attendance);
		}

		// filter by vote
		if (vote !== "") {
			mps = mps.filter((mp) => {
				// TODO: allow forwards compatibility with 2024 votes
				let voteAsDigit = vote === "YES" ? 1 : 0;
				return mp["2023"] === voteAsDigit;
			});
		}

		return mps;
	}

	function resetFilters() {
		setName("");
		setCategory("");
		setParty("");
		setCounty("");
		setConstituency("");
		setAttendance(null);
		setVote("");
		setAttendance("");
		setFilteredMps(mps);
	}

	return (
		<section className="page-section flex flex-col">
			<header className="mb-4 bg-slate-900 px-6 pb-6 pt-8 md:mb-8 md:px-8 md:pb-8">
				<h1 className="mb-5 font-sans text-3xl text-white">
					Finance Bill 2023 Votes
				</h1>

				<p className="mb-5 max-w-prose text-base text-gray-400">
					These are the votes by the members of the 13th Parliament of Kenya on
					the 14th of June 2023 regarding the finance bill. The bill passed its
					second reading by 176 votes to 81.
				</p>

				<form className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-8 md:items-end md:gap-2">
					{/* mp name */}
					<div className="col-start-1 col-end-3">
						{/* label */}
						<label
							htmlFor="name"
							className="ml-1 text-sm text-white md:text-xs"
						>
							Search by mp's name
						</label>
						<FormText
							label="mp name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></FormText>
					</div>

					{/* dropdowns */}
					{showFilters && (
						<div className="grid grid-cols-1 gap-3 md:col-start-3 md:col-end-9 md:grid-cols-6 md:gap-2">
							{/* category */}
							<FormDropdown
								label="category"
								options={mps.map((mp) => mp.category)}
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></FormDropdown>

							{/* party */}
							<FormDropdown
								label="party"
								options={mps.map((mp) => mp.party)}
								value={party}
								onChange={(e) => setParty(e.target.value)}
							></FormDropdown>

							{/* county */}
							<FormDropdown
								label="county"
								options={mps.map((mp) => mp.county)}
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
								options={mps.map((mp) => mp.attendance)}
								value={attendance}
								onChange={(e) => setAttendance(e.target.value)}
							></FormDropdown>

							{/* vote */}
							<FormDropdown
								label="vote"
								options={["NO", "YES"]}
								value={vote}
								onChange={(e) => setVote(e.target.value)}
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
