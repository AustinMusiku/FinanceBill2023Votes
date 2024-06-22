const Mp = ({
	position,
	name,
	image,
	county,
	constituency,
	party,
	attendance,
	vote,
	category,
}) => {
	return (
		<li className="text-underline flex w-full flex-row items-center gap-2 border-b-[1px] border-slate-200 py-4">
			<p className="basis-9/10 flex grow flex-row items-center pr-1 text-sm md:grow-0 md:basis-[35%] md:pr-0">
				<span className="mr-2 hidden h-full text-[0.75rem] md:inline-block">
					{position}.
				</span>
				<span>{name}</span>
			</p>

			<div className="flex basis-[10%] flex-row justify-between md:basis-[65%]">
				<p className="hidden basis-1/4  text-center text-sm md:inline-block">
					{category === "" ? "-" : category}
				</p>

				<p className="hidden basis-1/4  text-center text-sm md:inline-block">
					{county === "" ? "-" : county}
				</p>

				<p className="hidden basis-1/4 text-center text-sm md:inline-block">
					{constituency === "" ? "-" : constituency}
				</p>

				<p className="hidden basis-1/12 text-center text-sm md:inline-block">
					{party === "" ? "-" : party}
				</p>

				<p className="hidden basis-1/4 text-center text-sm md:inline-block">
					{attendance}
				</p>

				<p className="basis-1/12 text-center text-sm md:uppercase">
					{vote === 1 ? "YES" : vote === 0 ? "NO" : vote === -1 ? "N/A" : "-"}
				</p>
			</div>
		</li>
	);
};

export default Mp;
