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
				className || 'p-2 border border-solid border-black/10 cursor-pointer'
			}
		>
			{text}
		</span>
	);
}
