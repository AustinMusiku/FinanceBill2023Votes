const FormText = ({ label, value, onChange }) => {
	return (
		<div className="flex flex-col items-start gap-1">
			<label
				className="ml-1 text-sm capitalize text-white md:text-xs"
				htmlFor="player"
			>
				{label}
			</label>
			<div className="box-border flex w-full items-center justify-between rounded-lg border-[1px] border-[#141f39] bg-[#141f39] pt-2 text-sm">
				<div className="height-full relative -mt-0.5 mb-1.5 ml-1 inline-block px-2">
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
					className="mb-1.5 block w-full border-0 bg-[#141f39] py-0 pl-0 text-sm text-gray-200 outline-none placeholder:text-gray-400 focus:ring-0"
					value={value}
					placeholder="Search mp's name"
					onChange={onChange}
				/>
			</div>
		</div>
	);
};

export default FormText;
