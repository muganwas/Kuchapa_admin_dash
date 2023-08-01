import { buttonInput } from '@/_types';

export default function Button({
	id,
	className,
	labelText,
	onClick,
}: buttonInput) {
	return (
		<div className={className || 'flex flex-col w-full'}>
			<input
				id={id}
				type='button'
				onClick={onClick}
				className='w-full h-10 p-2 text-gray-300 rounded shadow-md cursor-pointer'
				value={labelText}
			/>
		</div>
	);
}
