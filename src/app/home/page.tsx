'use client';

import { useState, useEffect, ReactElement } from 'react';

import { SERVER_URL } from '@/_helpers/utils';
export default function Home() {
	const [mainCategories, setMainCategories] = useState([]);

	useEffect(() => {
		const url = SERVER_URL + 'main_category/';
		fetch(url)
			.then((res) => res.json())
			.then((categories) => {
				setMainCategories(categories.data);
			})
			.catch((e) => {
				console.log({ e });
			});
	});

	// const mainCategoriesDisplay: Element = () => (
	// 	<div>
	// 		{mainCategories.forEach((category) => {
	// 			return <span>{category.name}</span>;
	// 		})}
	// 	</div>
	// );

	return (
		<div>
			<span>Admin Dashboard</span>
			<div id='lists'>
				<div></div>
			</div>
			<div>Create New Main Category</div>
			<div>Create New Sub Category</div>
			<div>Create New Service</div>
		</div>
	);
}
