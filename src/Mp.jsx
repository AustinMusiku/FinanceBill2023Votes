const Mp = ({name, image, county, constituency, party, present, vote}) => {
	return (
		<li className="player w-full border-b-[1px] border-slate-200 text-underline flex flex-row items-center py-4">
				<p className="justify-betwen flex basis-4/5 flex-col items-start gap-1">
					<span className="text-sm">{name}</span>
					{/* <span className="text-sm">{props.firstName}</span>
					<span className="text-xl">{props.secondName}</span> */}
				</p>
				<p className="basis-1/3 text-sm">{constituency}</p>

				<p className="basis-1/5 text-sm text-center">{county}</p>
				<p className="basis-1/5 text-sm text-center">{party}</p>
				<p className="basis-1/5 text-sm text-center">{present ?? true}</p>
				<p className="basis-1/5 text-sm text-center">{vote ?? true}</p>
		</li>
	);
};

export default Mp;
