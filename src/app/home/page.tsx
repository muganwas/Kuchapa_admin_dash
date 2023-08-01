'use client';

import {
	useState,
	useEffect,
	useRef,
	useCallback,
	ReactEventHandler,
} from 'react';

import List from './components/list';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

import { SERVER_URL } from '@/_helpers/utils';
import {
	fetchMainCategories,
	fetchSubCategories,
	createMainCategory,
} from '@/_helpers/data';

export default function Home() {
	const [mainCategories, setMainCategories] = useState<any[] | undefined>();
	const [mainCategoriesPage, setMainCategoriesPage] = useState(1);
	const [mainCategoriesPagesCount, setMainCategoryPagesCount] = useState(1);
	const [subCategories, setSubCategories] = useState<any[] | undefined>();
	const [subCategoriesPage, setSubCategoriesPage] = useState(1);
	const [subCategoriesPagesCount, setSubCategoryPagesCount] = useState(1);
	const [feedback, setFeedback] = useState('');
	const [categoryName, setCategoryName] = useState('');
	const mainCategoryModal = useRef<HTMLDivElement | null>();
	const subCategoryModal = useRef<HTMLDivElement | null>();

	const getMainCategoryData = useCallback(async () => {
		const categoryData = await fetchMainCategories(mainCategoriesPage);
		if (categoryData.message === 'Error')
			return setFeedback(categoryData.message);
		if (categoryData.result) {
			setMainCategories(categoryData.data);
			setMainCategoryPagesCount(categoryData.totalPages);
		}
	}, [mainCategoriesPage]);

	const getSubCategoryData = useCallback(async () => {
		const categoryData = await fetchSubCategories(subCategoriesPage);
		if (categoryData.message === 'Error')
			return setFeedback(categoryData.message);
		if (categoryData.result) {
			setSubCategories(categoryData.data);
			setSubCategoryPagesCount(categoryData.totalPages);
		}
	}, [subCategoriesPage]);

	useEffect(() => {
		getMainCategoryData();
		getSubCategoryData();
	}, [getMainCategoryData, getSubCategoryData]);

	const onSubmitCategory: ReactEventHandler = async (e) => {
		e.preventDefault();
		const data = await createMainCategory(categoryName);
		if (data.message === 'Error') return setFeedback(data.message);
		if (data.result) getMainCategoryData();
		else setFeedback(data.message);
	};

	const toggleMainCategoryModal: ReactEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const originalClass = mainCategoryModal.current?.className;
		let newClass;
		if (originalClass?.includes('hidden')) {
			newClass = (originalClass as string).replace('hidden', '');
		} else {
			newClass = originalClass + 'hidden';
		}
		mainCategoryModal.current?.setAttribute('class', newClass as string);
	};

	const toggleSubCategoryModal: ReactEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const originalClass = subCategoryModal.current?.className;
		let newClass;
		if (originalClass?.includes('hidden')) {
			newClass = (originalClass as string).replace('hidden', '');
		} else {
			newClass = originalClass + 'hidden';
		}
		subCategoryModal.current?.setAttribute('class', newClass as string);
	};

	const formClicks: ReactEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<main className='flex flex-col relative h-full p-20'>
			<div className='flex flex-col p-4 text-bold bg-gray'>Admin Dashboard</div>
			<div className='flex flex-row p-4'>
				<div id='main-category-container' className='flex flex-col flex-1'>
					<div id='main-category-list'>
						<div>
							{mainCategories && (
								<List
									name='Main Categories'
									itemName='main_category'
									items={mainCategories}
									currentPage={mainCategoriesPage}
									pagesCount={mainCategoriesPagesCount}
								/>
							)}
						</div>
					</div>
					<div className='flex flex-row w-1/2'>
						<Button
							id='show-main-category-modal'
							labelText='New Main Category'
							onClick={toggleMainCategoryModal}
						/>
					</div>
					<div
						ref={(ref) => (mainCategoryModal.current = ref)}
						className='modal flex absolute justify-center items-center bg-black/50 bottom-0 left-0 top-0 right-0 hidden'
						onClick={toggleMainCategoryModal}
					>
						<form
							id='main-category-form'
							onSubmit={onSubmitCategory}
							onClick={formClicks}
							className='flex flex-col bg-white w-1/2 p-5'
						>
							<span>Add New Main Category</span>
							<div className='flex flex-col py-2'>
								<TextInput
									id='category-name'
									placeholder='Category Name'
									onChange={(e) =>
										setCategoryName((e.target as HTMLInputElement).value)
									}
								/>
							</div>
							<div className='flex flex-col py-2'>
								<Button
									id='submit-category'
									labelText='Add Category'
									onClick={onSubmitCategory}
								/>
							</div>
						</form>
					</div>
				</div>
				<div id='sub-category-container' className='flex flex-col flex-1'>
					<div id='sub-category-list'>
						<div>
							{subCategories && (
								<List
									name='Sub Categories'
									itemName='sub_category'
									items={subCategories}
									currentPage={subCategoriesPage}
									pagesCount={subCategoriesPagesCount}
								/>
							)}
						</div>
					</div>
					<div className='flex flex-row w-1/2'>
						<Button
							id='show-sub-category-modal'
							labelText='New Sub Category'
							onClick={toggleSubCategoryModal}
						/>
					</div>
					<div
						ref={(ref) => (subCategoryModal.current = ref)}
						className='modal flex absolute justify-center items-center bg-black/50 bottom-0 left-0 top-0 right-0 hidden'
						onClick={toggleSubCategoryModal}
					>
						<form
							id='sub-category-form'
							onSubmit={onSubmitCategory}
							onClick={formClicks}
							className='flex flex-col bg-white w-1/2 p-5'
						>
							<span>Add New Sub Category</span>
							<div className='flex flex-col py-2'>
								<TextInput
									id='category-name'
									placeholder='Category Name'
									onChange={(e) =>
										setCategoryName((e.target as HTMLInputElement).value)
									}
								/>
							</div>
							<div className='flex flex-col py-2'>
								<Button
									id='submit-category'
									labelText='Add Sub Category'
									onClick={onSubmitCategory}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
