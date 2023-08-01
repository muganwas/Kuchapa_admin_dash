import { ReactEventHandler, useState, useEffect } from 'react';
import PaginationButton from './paginationButton';

export interface list {
	name: string;
	itemName: string;
	items: any[] | undefined;
	pagesCount: number;
	currentPage: number;
	classes?: string;
	onPrev?: ReactEventHandler;
	onNext?: ReactEventHandler;
	onItemSelect?: ReactEventHandler;
	onPageSelect?: ReactEventHandler;
}
export default function List({
	name,
	items,
	itemName,
	pagesCount,
	currentPage,
	classes,
	onPrev,
	onNext,
	onItemSelect,
}: list) {
	const [pages, setPages] = useState<number[] | undefined>();
	useEffect(() => {
		setPages(new Array(pagesCount).fill(0));
	}, [pagesCount]);
	return (
		<div className={classes || 'flex flex-col'}>
			<div>{name}</div>
			<div className='flex flex-col'>
				{items &&
					items.map((item) => <span key={item.id}>{item[itemName]}</span>)}
			</div>
			<div id='pagination'>
				<PaginationButton
					onSelect={onPrev}
					text='Prev'
					className='inline-block p-2 border border-solid border-black/5 mr-1 my-1 cursor-pointer'
				/>
				{pages &&
					pages.map((page, i) => (
						<PaginationButton
							onSelect={onItemSelect}
							text={i + 1 + ''}
							key={i}
							className={
								i === currentPage
									? 'inline-block p-2 border border-solid border-red/30 m-1 cursor-pointer'
									: undefined
							}
						/>
					))}
				<PaginationButton
					onSelect={onNext}
					text='Next'
					className='inline-block p-2 border border-solid border-black/5 ml-1 my-1 cursor-pointer'
				/>
			</div>
		</div>
	);
}
