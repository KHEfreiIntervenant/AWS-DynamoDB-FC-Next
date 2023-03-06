import { ddbDocClient } from "../../config/ddbDocClient";
import { useRouter } from "next/router";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import Navigation from "@/components/navigation";

const styles = {
	inputField:
		"form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
};
type FormData = {
	firstName: { value: string };
	lastName: { value: string };
	city: { value: string };
	phoneNumber: { value: string };
};

const UpdateData = () => {
	const router = useRouter();
	const data = router.query;

	const handleSubmit = async (event: React.SyntheticEvent) => {
		// Stop the form from submitting and refreshing the page.
		event.preventDefault();

		const target = event.target as typeof event.target & FormData;

		// setting up the parameters for UpdateCommand
		const params = {
			TableName: "my-users",
			Key: {
				id: Number(data.id), //primaryKey
				dateAdded: data.dateAdded, //sortKey
			},
			UpdateExpression:
				"set firstName = :p, lastName = :r, city = :q, phoneNumber = :z, dateModified = :k",
			ExpressionAttributeValues: {
				":p": target.firstName.value,
				":r": target.lastName.value,
				":q": target.city.value,
				":z": target.phoneNumber.value,
				":k": new Date().toLocaleString(),
			},
		};

		// updating the db
		try {
			const data = await ddbDocClient.send(new UpdateCommand(params));
			console.log("Success - updated", data);
			alert("Data Updated Successfully");
			router.push("/viewdata");
		} catch (err) {
			console.log("Error", err);
		}
	};

	return (
		<>
			<Navigation />
			<div className="flex flex-col justify-center items-center h-screen">
				<p className="text-3xl mb-20">Update Data</p>
				<div className="block p-6 rounded-lg shadow-lg bg-white w-1/3 justify-self-center">
					<form onSubmit={handleSubmit} id="addData-form">
						<div className="mb-6">
							<label
								htmlFor="firstName"
								className="block text-gray-700 font-bold mb-2"
							>
								First Name
							</label>
							<input
								type="text"
								className={styles.inputField}
								id="firstName"
								name="firstName"
								defaultValue={data.firstName}
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="lastName"
								className="block text-gray-700 font-bold mb-2"
							>
								Last Name
							</label>
							<input
								type="text"
								className={styles.inputField}
								id="lastName"
								name="lastName"
								defaultValue={data.lastName}
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="city"
								className="block text-gray-700 font-bold mb-2"
							>
								City
							</label>
							<input
								type="text"
								className={styles.inputField}
								id="city"
								name="city"
								defaultValue={data.city}
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="phoneNumber"
								className="block text-gray-700 font-bold mb-2"
							>
								Phone Number
							</label>
							<input
								type="number"
								className={styles.inputField}
								id="phoneNumber"
								name="phoneNumber"
								defaultValue={data.phoneNumber}
							/>
						</div>

						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition ease-in-out"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default UpdateData;
