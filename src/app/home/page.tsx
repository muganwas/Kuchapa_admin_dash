'use client';

import {
	useState,
	useEffect,
	useRef,
	useCallback,
	ReactEventHandler,
} from 'react';

import { useRouter } from 'next/navigation';

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
	updateMainCategory,
	updateSubCategory,
	updateService,
} from '@/_helpers/data';
import { logout } from '@/_helpers/authentication';
import Cookies from 'js-cookie';

export interface mainCategory {
	id?: string;
	main_category?: string;
}

export interface subCategory {
	id?: string;
	main_category?: string;
	sub_category?: string;
}

export interface service {
	id?: string;
	main_category?: string;
	sub_category?: string;
	service_name?: string;
	image?: string;
}

export type mainSubService = {
	id?: string;
	main_category?: string;
	sub_category?: string;
	service_name?: string;
};

export default function Home() {
	const router = useRouter();

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
	const [servicesPage, setServicesPage] = useState(1);
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

	const [selectedItem, setSelectedItem] = useState<mainSubService>();

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
	}, [getMainCategoryData]);

	useEffect(() => {
		getSubCategoryData();
	}, [getSubCategoryData]);

	useEffect(() => {
		getServicesData();
	}, [getServicesData]);

	const onSubmitCategory: ReactEventHandler = async (e) => {
		e.preventDefault();
		let data;
		if (!selectedItem) data = await createMainCategory(categoryName);
		else
			data = await updateMainCategory(selectedItem.id, {
				main_category: categoryName,
			});
		if (data.message === 'Error') return setFeedback(data.message);
		if (data.result) getMainCategoryData();
		else setFeedback(data.message);
	};

	const onSubmitSubCategory: ReactEventHandler = async (e) => {
		e.preventDefault();
		let data;
		if (!selectedItem)
			data = await createSubCategory(
				subCategoryName,
				subCategoryMainCategory?.id
			);
		else
			data = await updateSubCategory(selectedItem.id, {
				sub_category: subCategoryName,
				main_category: subCategoryMainCategory?.id,
			});
		if (data.message === 'Error') return setFeedback(data.message);
		if (data.result) getSubCategoryData();
		else setFeedback(data.message);
	};

	const onSubmitService: ReactEventHandler = async (e) => {
		e.preventDefault();
		let data;
		if (!selectedItem)
			data = await createService(
				serviceName,
				servicesMainCategory?.id,
				servicesSubCategory?.id
			);
		else
			data = await updateService(selectedItem.id, {
				service_name: serviceName,
				main_category: servicesMainCategory?.id,
				sub_category: servicesSubCategory?.id,
			});
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
			setSelectedItem(undefined);
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
			setSubCategoryName('');
			setSelectedItem(undefined);
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
			setServiceName('');
			setSelectedItem(undefined);
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

	const onLogout: ReactEventHandler = async (e) => {
		e.preventDefault();
		const logoutInfo = await logout();
		if (logoutInfo.message.includes('success')) {
			Cookies.remove('session');
			Cookies.remove('refreshToken');
			Cookies.remove('idToken');
			router.push('/');
		}
	};

	return (
		<main className='flex flex-col relative h-full p-20'>
			<div id='welcome-bar' className='flex flex-row justify-between'>
				<span className='inline-block p-1 text-sm'>Welcome back Admin</span>
				<span
					id='logout'
					className='inline-block p-1 text-sm font-bold cursor-pointer'
					onClick={onLogout}
				>
					Logout
				</span>
			</div>
			<div className='flex flex-col p-4 text-bold bg-gray'>Admin Dashboard</div>
			<div className='flex flex-row p-4'>
				<div id='main-category-container' className='flex flex-col flex-1'>
					<div id='main-category-list'>
						<div>
							{mainCategories && (
								<List
									name='Main Categories'
									itemName='main_category'
									onNext={(e) => {
										e.preventDefault();
										if (mainCategoriesPagesCount > 1) {
											setMainCategoriesPage(mainCategoriesPage + 1);
										}
									}}
									onPageSelect={(e, page) => {
										e.preventDefault();
										setMainCategoriesPage(page);
									}}
									onPrev={(e) => {
										e.preventDefault();
										if (
											mainCategoriesPagesCount > 1 &&
											mainCategoriesPage > 1
										) {
											setMainCategoriesPage(mainCategoriesPage - 1);
										}
									}}
									onItemSelect={(e, item) => {
										e.preventDefault;
										setSelectedItem({
											id: item?.id,
											main_category: item?.main_category,
										});
										toggleMainCategoryModal(e);
									}}
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
							<span>
								{selectedItem
									? 'Update Main Category'
									: 'Add New Main Category'}
							</span>
							<div className='flex flex-col py-2'>
								<TextInput
									id='category-name'
									placeholder='Category Name'
									defaultValue={selectedItem?.main_category}
									onChange={(e) =>
										setCategoryName((e.target as HTMLInputElement).value)
									}
								/>
							</div>
							<div className='flex flex-col py-2'>
								<Button
									id='submit-category'
									labelText={selectedItem ? 'Update Category' : 'Add Category'}
									onClick={async (e) => {
										await onSubmitCategory(e);
										toggleMainCategoryModal(e);
									}}
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
									onNext={(e) => {
										e.preventDefault();
										if (subCategoriesPagesCount > 1) {
											setSubCategoriesPage(subCategoriesPage + 1);
										}
									}}
									onPageSelect={(e, page) => {
										e.preventDefault();
										setSubCategoriesPage(page);
									}}
									onItemSelect={(e, item) => {
										e.preventDefault;
										setSelectedItem({
											id: item?.id,
											main_category: item?.main_category,
											sub_category: item?.sub_category,
										});
										toggleSubCategoryModal(e);
									}}
									onPrev={(e) => {
										e.preventDefault();
										if (subCategoriesPagesCount > 1 && subCategoriesPage > 1) {
											setSubCategoriesPage(subCategoriesPage - 1);
										}
									}}
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
							<span>
								{selectedItem ? 'Update Sub Category ' : 'Add New Sub Category'}
							</span>
							<div>
								<DropDown
									list={mainCategories?.map((category) => {
										return {
											option: category.main_category,
											value: category.id,
										};
									})}
									defaultValue={selectedItem?.main_category}
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
									defaultValue={selectedItem?.sub_category}
									onChange={(e) =>
										setSubCategoryName((e.target as HTMLInputElement).value)
									}
								/>
							</div>
							<div className='flex flex-col py-2'>
								<Button
									id='submit-sub-category'
									labelText={
										selectedItem ? 'Update Sub Category ' : 'Add Sub Category'
									}
									onClick={async (e) => {
										await onSubmitSubCategory(e);
										toggleSubCategoryModal(e);
									}}
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
									onNext={(e) => {
										e.preventDefault();
										if (servicesPagesCount > 1) {
											setServicesPage(servicesPage + 1);
										}
									}}
									onPageSelect={(e, page) => {
										e.preventDefault();
										setServicesPage(page);
									}}
									onItemSelect={(e, item) => {
										e.preventDefault;
										setSelectedItem({
											id: item?.id,
											main_category: item?.main_category,
											sub_category: item?.sub_category,
											service_name: item?.service_name,
										});
										toggleServicesModal(e);
									}}
									onPrev={(e) => {
										e.preventDefault();
										if (servicesPagesCount > 1 && servicesPage > 1) {
											setServicesPage(servicesPage - 1);
										}
									}}
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
							<span>{selectedItem ? 'Update Service' : 'Add New Service'}</span>
							<div>
								<DropDown
									list={mainCategories?.map((category) => {
										return {
											option: category.main_category,
											value: category.id,
										};
									})}
									defaultValue={selectedItem?.main_category}
									toSaveLabel='main_category'
									selectedOption={servicesMainCategory?.main_category}
									placeholder='Select Main Category'
									onClickItem={onChooseServicesMainCategory}
								/>
							</div>
							{(servicesMainCategory || selectedItem) && (
								<div>
									<DropDown
										list={subCategories?.map((category) => {
											const toCompare =
												servicesMainCategory?.main_category ||
												selectedItem?.main_category;
											if (category.main_category === toCompare) {
												return {
													option: category.sub_category,
													value: category.id,
												};
											}
											return { option: '', value: '' };
										})}
										defaultValue={selectedItem?.sub_category}
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
									defaultValue={selectedItem?.service_name}
									onChange={(e) =>
										setServiceName((e.target as HTMLInputElement).value)
									}
								/>
							</div>
							<div className='flex flex-col py-2'>
								<Button
									id='submit-service'
									labelText={selectedItem ? 'Update Service' : 'Add Service'}
									onClick={async (e) => {
										await onSubmitService(e);
										toggleServicesModal(e);
									}}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
