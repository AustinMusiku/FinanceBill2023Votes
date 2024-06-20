import Mp from "./Mp";

const MpsList = ({ mps }) => {
	let mpsList = mps.map((mp, idx) => {
		return (
			<Mp
				key={idx}
				position={idx + 1}
				name={mp.name}
				image={mp.image}
				county={mp.county}
				constituency={mp.constituency}
				party={mp.party}
				attendance={mp.attendance ?? true}
				vote={mp["2023"] ?? true}
				category={mp.category ?? ""}
			/>
		);
	});

	return (
		<ul className="flex flex-col">
			<li
				key="header"
				className="player w-full border-b-[1px] border-slate-200 py-4"
			>
				<div className="justify-betwen flex flex-row gap-2">
					<p className="grow basis-1/2 pr-1 text-sm font-bold md:grow-0 md:basis-[35%] md:pr-0">
						Name
					</p>

					<div className="flex basis-1/2 flex-row justify-between md:basis-[65%]">
						<p className="hidden basis-1/4 text-center text-sm font-bold md:inline-block">
							Category
						</p>
						<p className="hidden basis-1/4 text-center text-sm font-bold md:inline-block">
							County
						</p>
						<p className="hidden basis-1/4 text-center text-sm font-bold md:inline-block">
							Constituency
						</p>
						<p className="basis-1/12 text-center text-sm font-bold">Party</p>
						<p className="basis-1/4 text-center text-sm font-bold">
							Attendance
						</p>
						<p className="text-righ basis-1/12 text-center text-sm font-bold">
							Vote
						</p>
					</div>
				</div>
			</li>
			{mpsList}
		</ul>
	);
};

export default MpsList;
