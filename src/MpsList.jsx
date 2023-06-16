import Mp from "./Mp";

const MpsList = ({ mps }) => {
	let mpsList = mps.map((item, idx) => {
		const [name, imageLink, county, constituency, party, attendance, vote] = item;
	
		const mp = { name, imageLink, county, constituency, party, attendance, vote };

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
				vote={mp.vote ?? true}
			/>
		);
	});

	return (
		<ul className="flex flex-col px-12">
			<li key="header" className="player w-full border-b-[1px] border-slate-200 py-4">
				<div className="justify-betwen flex flex-row">
					<p className="basis-4/5 text-sm font-bold">Name</p>
					<p className="basis-1/3 text-sm font-bold">Constituency</p>
					<p className="basis-1/5 text-center text-sm font-bold">County</p>
					<p className="basis-1/5 text-center text-sm font-bold">Party</p>
					<p className="basis-1/5 text-center text-sm font-bold">Attendance</p>
					<p className="basis-1/5 text-center text-sm font-bold">Vote</p>
				</div>
			</li>
			{mpsList}
		</ul>
	);
};

export default MpsList;
