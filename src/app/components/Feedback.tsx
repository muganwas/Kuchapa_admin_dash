import { feedback } from '@/_types';

export default function Feedback({ message, type }: feedback) {
	return (
		<div
			className={`flex p-1 text-white m-2 ${
				type === 'error' ? 'bg-error' : 'bg-success'
			}`}
		>
			{message}
		</div>
	);
}
