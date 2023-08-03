import { SERVER_URL } from '@/_helpers/utils';
import { mainCategory } from '@/app/home/page';
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
	name: string,
	mainCategoryId = '',
	subCategoryId = '',
	image = name + '_p.png'
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
				main_category: mainCategoryId,
				sub_category: subCategoryId,
				service_name: name,
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
