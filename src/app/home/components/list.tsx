import { ReactEventHandler, useState, useEffect } from 'react';

export interface list {
	name: string;
	items: string[];
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
	pagesCount,
	currentPage,
	classes,
	onPrev,
	onNext,
	onItemSelect,
}: list) {
	const [pages, setPages] = useState<number[] | undefined>();
	useEffect(() => {
		setPages(new Array(pagesCount));
	}, [pagesCount]);
	return (
		<div className={classes || 'flex flex-col'}>
			<div>{name}</div>
			<div>
				{items.map((item) => (
					<span key={item}>{item}</span>
				))}
			</div>
			<div id='pagination'>
				<span onClick={onPrev}>Prev</span>
				{pagesCount}
				<span onClick={onNext}>Next</span>
			</div>
		</div>
	);
}
