'use client';

import {
	useState,
	useEffect,
	useRef,
	useCallback,
	ReactEventHandler,
	MouseEvent,
} from 'react';

import List from './components/list';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import DropDown from '../components/DropDown';

import {
	fetchMainCategories,
	fetchSubCategories,
	createMainCategory,
	createSubCategory,
	createService,
	fetchServices,
} from '@/_helpers/data';

export type mainCategory = {
	id: string;
	main_category: string;
};

export type subCategory = {
	id: string;
	main_category: string;
	sub_category: string;
};

export default function Home() {
	const [mainCategories, setMainCategories] = useState<any[] | undefined>();
	const [mainCategoriesPage, setMainCategoriesPage] = useState(1);
	const [mainCategoriesPagesCount, setMainCategoryPagesCount] = useState(1);

	const [subCategories, setSubCategories] = useState<any[] | undefined>();
	const [subCategoriesPage, setSubCategoriesPage] = useState(1);
	const [subCategoryMainCategory, setSubCategoryMainCategory] = useState<
		mainCategory | undefined
	>();
	const [subCategoriesPagesCount, setSubCategoryPagesCount] = useState(1);

	const [services, setServices] = useState<any[] | undefined>();
	const [servicesPage, setServicessPage] = useState(1);
	const [servicesMainCategory, setServicesMainCategory] = useState<
		mainCategory | undefined
	>();
	const [servicesSubCategory, setServicesSubCategory] = useState<
		subCategory | undefined
	>();
	const [servicesPagesCount, setServicesPagesCount] = useState(1);

	const [categoryName, setCategoryName] = useState('');
	const [subCategoryName, setSubCategoryName] = useState('');
	const [serviceName, setServiceName] = useState('');

	const mainCategoryModal = useRef<HTMLDivElement | null>();
	const subCategoryModal = useRef<HTMLDivElement | null>();
	const serviceModal = useRef<HTMLDivElement | null>();

	const [feedback, setFeedback] = useState('');

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

	const getServicesData = useCallback(async () => {
		const serviceData = await fetchServices(servicesPage);
		if (serviceData.message === 'Error')
			return setFeedback(serviceData.message);
		if (serviceData.result) {
			setServices(serviceData.data);
			setServicesPagesCount(serviceData.totalPages);
		}
	}, [servicesPage]);

	useEffect(() => {
		getMainCategoryData();
		getSubCategoryData();
		getServicesData();
	}, [getMainCategoryData, getSubCategoryData, getServicesData]);

	const onSubmitCategory: ReactEventHandler = async (e) => {
		e.preventDefault();
		const data = await createMainCategory(categoryName);
		if (data.message === 'Error') return setFeedback(data.message);
		if (data.result) getMainCategoryData();
		else setFeedback(data.message);
	};

	const onSubmitSubCategory: ReactEventHandler = async (e) => {
		e.preventDefault();
		const data = await createSubCategory(
			subCategoryName,
			subCategoryMainCategory?.id
		);
		if (data.message === 'Error') return setFeedback(data.message);
		if (data.result) getSubCategoryData();
		else setFeedback(data.message);
	};

	const onSubmitService: ReactEventHandler = async (e) => {
		e.preventDefault();
		const data = await createService(
			serviceName,
			servicesMainCategory?.id,
			servicesSubCategory?.id
		);
		if (data.message === 'Error') return setFeedback(data.message);
		if (data.result) getServicesData();
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

	const toggleServicesModal: ReactEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const originalClass = serviceModal.current?.className;
		let newClass;
		if (originalClass?.includes('hidden')) {
			newClass = (originalClass as string).replace('hidden', '');
		} else {
			newClass = originalClass + 'hidden';
		}
		serviceModal.current?.setAttribute('class', newClass as string);
	};

	const formClicks: ReactEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const onChooseSubMainCategory = (
		category: mainCategory,
		callBack: () => void
	) => {
		setSubCategoryMainCategory(category);
		callBack();
	};

	const onChooseServicesMainCategory = (
		category: mainCategory,
		callBack: () => void
	) => {
		setServicesMainCategory(category);
		callBack();
	};

	const onChooseServicesSubCategory = (
		category: subCategory,
		callBack: () => void
	) => {
		setServicesSubCategory(category);
		callBack();
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
					<div className='flex flex-row'>
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
									secondaryItemName='main_category'
									items={subCategories}
									currentPage={subCategoriesPage}
									pagesCount={subCategoriesPagesCount}
								/>
							)}
						</div>
					</div>
					<div className='flex flex-row'>
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
							onSubmit={onSubmitSubCategory}
							onClick={formClicks}
							className='flex flex-col bg-white w-1/2 p-5'
						>
							<span>Add New Sub Category</span>
							<div>
								<DropDown
									list={mainCategories?.map((category) => {
										return {
											option: category.main_category,
											value: category.id,
										};
									})}
									toSaveLabel='main_category'
									selectedOption={subCategoryMainCategory?.main_category}
									placeholder='Select Main Category'
									onClickItem={onChooseSubMainCategory}
								/>
							</div>
							<div className='flex flex-col py-2'>
								<TextInput
									id='sub-category-name'
									placeholder='Sub Category Name'
									onChange={(e) =>
										setSubCategoryName((e.target as HTMLInputElement).value)
									}
								/>
							</div>
							<div className='flex flex-col py-2'>
								<Button
									id='submit-sub-category'
									labelText='Add Sub Category'
									onClick={onSubmitSubCategory}
								/>
							</div>
						</form>
					</div>
				</div>
				<div id='services-container' className='flex flex-col flex-1'>
					<div id='services-list'>
						<div>
							{services && (
								<List
									name='Services'
									itemName='service_name'
									secondaryItemName='sub_category'
									items={services}
									currentPage={servicesPage}
									pagesCount={servicesPagesCount}
								/>
							)}
						</div>
					</div>
					<div className='flex flex-row'>
						<Button
							id='show-services-modal'
							labelText='New Service'
							onClick={toggleServicesModal}
						/>
					</div>
					<div
						ref={(ref) => (serviceModal.current = ref)}
						className='modal flex absolute justify-center items-center bg-black/50 bottom-0 left-0 top-0 right-0 hidden'
						onClick={toggleServicesModal}
					>
						<form
							id='service-form'
							onSubmit={onSubmitService}
							onClick={formClicks}
							className='flex flex-col bg-white w-1/2 p-5'
						>
							<span>Add New Service</span>
							<div>
								<DropDown
									list={mainCategories?.map((category) => {
										return {
											option: category.main_category,
											value: category.id,
										};
									})}
									toSaveLabel='main_category'
									selectedOption={servicesMainCategory?.main_category}
									placeholder='Select Main Category'
									onClickItem={onChooseServicesMainCategory}
								/>
							</div>
							{servicesMainCategory && (
								<div>
									<DropDown
										list={subCategories?.map((category) => {
											if (
												category.main_category ===
												servicesMainCategory.main_category
											) {
												return {
													option: category.sub_category,
													value: category.id,
												};
											}
											return { option: '', value: '' };
										})}
										toSaveLabel='sub_category'
										selectedOption={servicesSubCategory?.sub_category}
										placeholder='Select Sub Category'
										onClickItem={onChooseServicesSubCategory}
									/>
								</div>
							)}
							<div className='flex flex-col py-2'>
								<TextInput
									id='service-name'
									placeholder='Service Name'
									onChange={(e) =>
										setServiceName((e.target as HTMLInputElement).value)
									}
								/>
							</div>
							<div className='flex flex-col py-2'>
								<Button
									id='submit-service'
									labelText='Add Service'
									onClick={onSubmitService}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
