const FormDropdown = ({ label, options, value, onChange }) => {
	return (
		<div className="input-container flex flex-col items-start gap-[0.125rem]">
			<label className="text-sm text-white" htmlFor="player">
				Filter by {label}
			</label>
			<select
				id="name"
				className="block w-full border-none bg-[#141f39] p-2 text-sm text-[#f2f2f2]"
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
