import { ReactEventHandler, useState, useEffect, SyntheticEvent } from 'react';
import PaginationButton from './paginationButton';
import { mainSubService, mainCategory, subCategory, service } from '../page';

export interface list {
	name: string;
	itemName: string;
	secondaryItemName?: string;
	items?: any[];
	pagesCount: number;
	currentPage: number;
	classes?: string;
	onPrev?: ReactEventHandler;
	onNext?: ReactEventHandler;
	onItemSelect?: (e: SyntheticEvent, c: mainSubService) => void;
	onPageSelect?: (e: SyntheticEvent, c: number) => void;
}
export default function List({
	name,
	items,
	itemName,
	secondaryItemName,
	pagesCount,
	currentPage,
	classes,
	onPrev,
	onNext,
	onItemSelect,
	onPageSelect,
}: list) {
	const [pages, setPages] = useState<number[] | undefined>();
	useEffect(() => {
		setPages(new Array(pagesCount < 5 ? pagesCount : 5).fill(0));
	}, [pagesCount]);
	return (
		<div
			className={classes || 'flex flex-col p-2 shadow-sm h-1/2 justify-between'}
		>
			<div className='flex flex-col'>
				<div className='flex mb-5 font-bold'>{name}</div>
				<div className='flex flex-col justify-center'>
					{items &&
						items.map((item) => (
							<div
								className='flex flex-col p-1 border border-solid border-gray/50 h-10 mt-1 justify-center cursor-pointer'
								key={item?.id}
								onClick={(e) => {
									onItemSelect && onItemSelect(e, item);
								}}
							>
								{secondaryItemName && (
									<span className='flex text-xs'>
										{item && item[secondaryItemName as keyof mainSubService]}
									</span>
								)}
								<span className='flex'>
									{item && item[itemName as keyof mainSubService]}
								</span>
							</div>
						))}
				</div>
			</div>
			<div id='pagination' className='flex flex-row justify-end'>
				<PaginationButton
					onSelect={(e) => {
						if (currentPage > 1) onPrev && onPrev(e);
					}}
					text='Prev'
					className={`inline-block text-sm justify-center items-center p-1 border border-solid border-black/5 mr-1 my-1 ${
						currentPage > 1 && pagesCount > 1
							? 'cursor-pointer'
							: 'cursor-not-allowed'
					}`}
				/>
				{pages?.map((page, i) => (
					<PaginationButton
						onSelect={(e) => {
							if (currentPage !== i + 1) onPageSelect && onPageSelect(e, i + 1);
						}}
						text={i + 1 + ''}
						key={i}
						className={
							i + 1 === currentPage
								? 'inline-block text-sm p-1 border border-solid border-red/30 my-1 cursor-pointer'
								: undefined
						}
					/>
				))}
				<PaginationButton
					onSelect={onNext}
					text='Next'
					className={`inline-block text-sm justify-center items-center p-1 border border-solid border-black/5 ml-1 my-1 ${
						pagesCount > 1 && currentPage < pagesCount
							? 'cursor-pointer'
							: 'cursor-not-allowed'
					}`}
				/>
			</div>
		</div>
	);
}
