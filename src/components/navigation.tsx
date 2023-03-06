import Link from "next/link";

const Navigation = () => {
	return (
		<nav className="bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<Link href="/createTable">
							<span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
								Create Table
							</span>
						</Link>
						<div className="ml-10 flex items-baseline space-x-4">
							<Link href="/addData">
								<span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
									Add Data
								</span>
							</Link>
							<Link href="/updatedata">
								<span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
									Update Data
								</span>
							</Link>
							<Link href="/viewData">
								<span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
									View Data
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navigation;
