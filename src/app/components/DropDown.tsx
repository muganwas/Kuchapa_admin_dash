import { useRef } from 'react';

export type listItem = {
	option: string;
	value: string;
};

export interface dropDown {
	list: listItem[] | undefined;
	className?: string;
	selectedOption: string | undefined;
	placeholder: string;
	toSaveLabel: string;
	onClickItem: (e: any, callBack: () => void) => void;
}
export default function DropDown({
	list,
	className,
	selectedOption,
	placeholder,
	toSaveLabel,
	onClickItem,
}: dropDown) {
	const ddContainerRef = useRef<HTMLDivElement | null>();
	const toggleDD = () => {
		const oldClass = ddContainerRef.current?.className;
		let newClass = '';
		if (oldClass?.includes('hidden')) {
			newClass = oldClass.replace('hidden', '');
		} else {
			newClass = oldClass + ' hidden';
		}
		ddContainerRef.current?.setAttribute('class', newClass);
	};
	return (
		<div className={className || 'flex flex-col p-1'}>
			<div
				onClick={toggleDD}
				className={`flex flex-1 p-2 ${selectedOption ? '' : 'text-black/50'}
				} cursor-pointer border border-solid border-black/60`}
			>
				{selectedOption || placeholder}
			</div>
			<div className='relative'>
				<div
					ref={(ref) => (ddContainerRef.current = ref)}
					className={'flex flex-col flex-1 w-full bg-white absolute hidden'}
				>
					{list?.map((lItem, i) => (
						<span
							className={`inline-block p-1 border ${
								!lItem.value && 'hidden'
							} border-solid border-gray/30 cursor-pointer`}
							key={i}
							id={lItem.value}
							onClick={(e) => {
								e.preventDefault();
								onClickItem(
									{ id: lItem.value, [toSaveLabel]: lItem.option },
									toggleDD
								);
							}}
						>
							{lItem.option}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
