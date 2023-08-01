import { SERVER_URL } from '@/_helpers/utils';
export async function fetchMainCategories(page = 1, limit = 0) {
	const url = SERVER_URL + `main_category?page=${page}&limit=${limit}`;
	try {
		const result = await fetch(url);
		const categoryData = await result.json();
		return categoryData;
	} catch (e: any) {
		return { message: 'Error', error: e.message };
	}
}
export async function fetchSubCategories(page = 1, limit = 0) {
	const url = SERVER_URL + `sub_category?page=${page}&limit=${limit}`;
	try {
		const result = await fetch(url);
		const categoryData = await result.json();
		return categoryData;
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
export async function createSubCategory(name: string, mainCategoryId: string) {
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
