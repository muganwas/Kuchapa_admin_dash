import { textInput } from '@/_types';

export default function TextInput({
	id,
	type = 'text',
	className,
	value,
	placeholder,
	labelText,
	onChange,
}: textInput) {
	return (
		<div className={className || 'flex flex-col w-full'}>
			<label className='flex flex-col p-1'>
				{labelText}
				<input
					id={id}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className='w-full h-10 p-2 bg-gray/50 rounded'
				></input>
			</label>
		</div>
	);
}
