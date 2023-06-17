const Mp = ({
	position,
	name,
	image,
	county,
	constituency,
	party,
	attendance,
	vote,
}) => {
	return (
		<li className="text-underline flex w-full flex-row items-center gap-2 border-b-[1px] border-slate-200 py-4">
			<p className="flex grow basis-1/2 flex-row items-center pr-1 text-sm md:grow-0 md:basis-[35%] md:pr-0">
				<span className="mr-2 hidden h-full text-[0.75rem] md:inline-block">
					{position}.
				</span>
				<span>{name}</span>
			</p>

			<div className="flex basis-1/2 flex-row justify-between md:basis-[65%]">
				<p className="hidden basis-1/4 text-center text-sm md:inline-block">
					{constituency === "" ? "-" : constituency}
				</p>

				<p className="hidden basis-1/4  text-center text-sm md:inline-block">
					{county === "" ? "-" : county}
				</p>

				<p className="basis-1/12 text-center text-sm">
					{party === "" ? "-" : party}
				</p>

				<p className="basis-1/4 text-center text-sm">{attendance}</p>

				<p className="text-righ basis-1/12 text-center text-sm">
					{vote === 1 ? "YES" : vote === 0 ? "NO" : "-"}
				</p>
			</div>
		</li>
	);
};

export default Mp;
