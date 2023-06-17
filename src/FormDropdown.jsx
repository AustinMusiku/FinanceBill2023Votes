const FormDropdown = ({ label, options, value, onChange }) => {
	return (
		<div className="input-container flex flex-col items-start gap-1">
			<label className="ml-1 text-sm text-white" htmlFor="player">
				Filter by {label}
			</label>
			<select
				id="name"
				className="block w-full rounded-lg border-none bg-[#141f39] py-2 pl-3 pr-2 text-sm text-[#f2f2f2]"
				value={value}
				onChange={onChange}
			>
				<option value="">All</option>
				{options
					.filter(
						(value, index, self) =>
							self.indexOf(value) === index &&
							value !== "" &&
							value !== "More..."
					)
					.sort()
					.map((item, index) => {
						return (
							<option value={item} key={index}>
								{item}
							</option>
						);
					})}
			</select>
		</div>
	);
};

export default FormDropdown;
