// Import required AWS SDK clients and commands for Node.js.
import { useEffect, useState } from "react";
import { ddbDocClient } from "../../config/ddbDocClient";
import { ScanCommand, ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import Link from "next/link.js";
import Navigation from "@/components/navigation";

const Styles = {
	tableHeadings:
		"text-sm font-medium text-gray-900 px-6 py-4 text-left border-2",
	tableData: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap",
};

const ViewData = () => {
	let data: ScanCommandOutput;
	const [tableData, setTableData] = useState<
		Record<string, NativeAttributeValue>[]
	>([]);

	//   scanning the dynamodb table
	const scanTable = async () => {
		try {
			data = await ddbDocClient.send(
				new ScanCommand({ TableName: "my-users" })
			);
			if (!data.Items) throw new Error("No data found");
			setTableData(data.Items);
			console.log("success", data.Items);
		} catch (err) {
			console.log("Error", err);
		}
	};

	//   deleting an item from the table
	const deleteItem = async (primaryKeyValue: string, sortKeyValue: string) => {
		try {
			await ddbDocClient.send(
				new DeleteCommand({
					TableName: "my-users",
					Key: {
						id: primaryKeyValue, // primarykeyName : primaryKeyValue
						dateAdded: sortKeyValue, // sortkeyName : sortkeyValue
					},
				})
			);
			console.log("Success - item deleted");
			scanTable();
		} catch (err) {
			console.log("Error", err);
		}
	};

	useEffect(() => {
		scanTable();
	}, []);

	return (
		<>
			<Navigation />
			<div className="flex flex-col justify-center items-center h-screen">
				<p className="text-3xl">View Data</p>
				<div className="flex flex-col w-2/3 py-10">
					<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
							<div className="overflow-hidden">
								<table className="min-w-full">
									<thead className="border-b">
										<tr>
											<th scope="col" className={Styles.tableHeadings}>
												id
											</th>
											<th scope="col" className={Styles.tableHeadings}>
												First Name
											</th>
											<th scope="col" className={Styles.tableHeadings}>
												Last Name
											</th>
											<th scope="col" className={Styles.tableHeadings}>
												City
											</th>
											<th scope="col" className={Styles.tableHeadings}>
												Phone Number
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-center border-2"
											>
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{tableData.map((item) => (
											<tr className="border-b" key={item.id}>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{item.id}
												</td>
												<td className={Styles.tableData}>{item.firstName}</td>
												<td className={Styles.tableData}>{item.lastName}</td>
												<td className={Styles.tableData}>{item.city}</td>
												<td className={Styles.tableData}>{item.phoneNumber}</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
													<Link
														href={{
															pathname: "/updatedata",
															query: {
																id: item.id,
																dateAdded: item.dateAdded,
																firstName: item.firstName,
																lastName: item.lastName,
																city: item.city,
																phoneNumber: item.phoneNumber,
															},
														}}
													>
														<button
															type="button"
															className="inline-block px-6 py-2.5 mr-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
														>
															Edit
														</button>
													</Link>
													<button
														type="button"
														className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
														onClick={() => deleteItem(item.id, item.dateAdded)}
													>
														Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewData;
