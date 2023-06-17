const FormText = ({ value, onChange }) => {
	return (
		<div className="box-border flex w-full items-center justify-between rounded-lg border-[1px] border-[#141f39] bg-[#141f39] py-2 text-sm">
			<div className="height-full ml-1 mr-1.5 flex max-h-full items-center px-2">
				<svg className="h-4 w-4 border-0 outline-none" viewBox="0 0 32 32">
					<path
						className="fill-current text-gray-400"
						d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"
					/>
				</svg>
			</div>

			<input
				id="name"
				type="text"
				className="block w-full border-0 bg-[#141f39] py-0 pl-0 text-sm text-gray-200 outline-none placeholder:text-gray-400 focus:ring-0"
				value={value}
				placeholder="Search by mp's name"
				onChange={onChange}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
		</div>
	);
};

export default FormText;
