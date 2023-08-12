import { SERVER_URL } from '@/_helpers/utils';
import { mainCategory, service, subCategory } from '@/app/home/page';
export async function fetchMainCategories(page = 1, limit = 7) {
	const url = SERVER_URL + `main_category?page=${page}&limit=${limit}`;
	try {
		const result = await fetch(url);
		const categoryData = await result.json();
		return categoryData;
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}
export async function fetchSubCategories(page = 1, limit = 7) {
	const url = SERVER_URL + `sub_category?page=${page}&limit=${limit}`;
	try {
		const result = await fetch(url);
		const categoryData = await result.json();
		return categoryData;
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}

export async function fetchServices(page = 1, limit = 7) {
	const url = SERVER_URL + `service?page=${page}&limit=${limit}`;
	try {
		const result = await fetch(url);
		const serviceData = await result.json();
		return serviceData;
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}

export async function createMainCategory(name: string) {
	const url = SERVER_URL + 'main_category/create';
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Connection: 'keep-alive',
			},
			body: JSON.stringify({ main_category: name }),
		});
		const data = await response.json();
		return data;
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}
export async function createSubCategory(name: string, mainCategoryId = '') {
	const url = SERVER_URL + 'sub_category/create';
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Connection: 'keep-alive',
			},
			body: JSON.stringify({
				main_category: mainCategoryId,
				sub_category: name,
			}),
		});
		const data = await response.json();
		return data;
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}

export async function createService(
	service_name: string,
	main_category = '',
	sub_category = '',
	image = service_name?.toLowerCase().replaceAll(' ', '_')
) {
	const url = SERVER_URL + 'service/create';
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Connection: 'keep-alive',
			},
			body: JSON.stringify({
				main_category,
				sub_category,
				service_name,
				image,
			}),
		});
		const data = await response.json();
		return data;
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}

export async function updateMainCategory(id = '', updateInfo: mainCategory) {
	const url = SERVER_URL + 'main_category/';
	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Connection: 'keep-alive',
			},
			body: JSON.stringify({ id, updateInfo }),
		});
		const updateResults = await response.json();
		return updateResults;
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}

export async function updateSubCategory(id = '', updateInfo: subCategory) {
	const url = SERVER_URL + 'sub_category/';
	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Connection: 'keep-alive',
			},
			body: JSON.stringify({ id, updateInfo }),
		});
		const updateResults = await response.json();
		return updateResults;
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}

export async function updateService(id = '', updateInfo: service) {
	const url = SERVER_URL + 'service/';
	updateInfo.image = updateInfo.service_name
		?.toLowerCase()
		.replaceAll(' ', '_');
	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Connection: 'keep-alive',
			},
			body: JSON.stringify({ id, updateInfo }),
		});
		const updateResults = await response.json();
		return updateResults;
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}
