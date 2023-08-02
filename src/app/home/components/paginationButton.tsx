import { ReactEventHandler } from 'react';

export interface paginationButton {
	text: string;
	className?: string;
	onSelect?: ReactEventHandler;
}
export default function PaginationButton({
	text,
	className,
	onSelect,
}: paginationButton) {
	return (
		<span
			onClick={onSelect}
			className={
				className ||
				'p-2 border border-solid border-black/10 my-1 justify-center items-center cursor-pointer'
			}
		>
			{text}
		</span>
	);
}
