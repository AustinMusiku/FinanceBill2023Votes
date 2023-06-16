import { useState, useEffect } from "react";
import Mps from "./MpsList";
import mpArray from "./mps";

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
		if (name === "" && party === "" && county === "" && constituency === "" && present === null && vote === null) return mps;

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

	return (
		<div className="search-params">
			<div className="mb-8 bg-slate-900 px-8 pb-8 pt-8">
				<h1 className="mb-8 font-display text-5xl text-white">Players</h1>

				<form className="grid w-full grid-cols-7 flex-row items-end gap-2">
                    {/* mp name */}
					<div className="input-container col-start-1 col-end-3 flex flex-col items-start gap-[0.125rem]">
						<label className="text-white" htmlFor="player">
							mp name
						</label>
						<input
							id="name"
							type="text"
							className="block w-full p-2"
							value={name}
							placeholder="e.g., Babu Owino"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

                    {/* county */}
					<div className="input-container col-start-5 col-end-6 flex flex-col items-start gap-[0.125rem]">
						<label className="text-sm text-white" htmlFor="position">
							Filter by county
						</label>
						<select
							id="county"
							className="block w-full border-none bg-[#141f39] p-2 text-sm text-[#f2f2f2]"
							value={county}
							onChange={(e) => setCounty(e.target.value)}
						>
							<option value={county}>
                                All
                            </option>
                                {mps
                                    .map((item) => item[2])
                                    .filter((value, index, self) => self.indexOf(value) === index)
                                    .sort((x, y) => x - y)
                                    .map((item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        );
                                    })
                                    
                                }
						</select>
					</div>
                    
                    {/* party */}
					<div className="input-container col-start-6 col-end-7 flex flex-col items-start gap-[0.125rem]">
						<label className="text-sm text-white" htmlFor="position">
							Filter by party
						</label>
						<select
							id="party"
							className="block w-full border-none bg-[#141f39] p-2 text-sm text-[#f2f2f2]"
							value={party}
							onChange={(e) => setParty(e.target.value)}
						>
							<option value={party}>
                                All
                            </option>
                                {mps
                                    .map((item) => item[4])
                                    .filter((value, index, self) => self.indexOf(value) === index)
                                    .sort((x, y) => x - y)
                                    .map((item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        );
                                    })
                                    
                                }
						</select>
					</div>
                    
                    {/* constituency */}
					<div className="input-container col-start-7 col-end-8 flex flex-col items-start gap-[0.125rem]">
						<label className="text-sm text-white" htmlFor="position">
							Filter by constituency
						</label>
						<select
							id="constituency"
							className="block w-full border-none bg-[#141f39] p-2 text-sm text-[#f2f2f2]"
							value={constituency}
							onChange={(e) => setConstituency(e.target.value)}
						>
							<option value={constituency}>
                                All
                            </option>
                                {mps
                                    .map((item) => item[3])
                                    .filter((value, index, self) => self.indexOf(value) === index)
                                    .map((item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        );
                                    })
                                    
                                }
						</select>
					</div>

                    
				</form>
			</div>

			{filteredMps.length === 0 ? (
				<h1 className="text-3xl text-center">No members of parliament found</h1>
			) : (
				<Mps mps={filteredMps} />
			)}
		</div>
	);
};

export default App;