// You can test out creating APIs in this directory.
// each file in this directory is mapped to /api/<filename>
// For example, this file maps to https://localhost:3000/api/getContent
// Learn more: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

type Data = {
	data: any;
};
type Error = {
	errorMessage: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | Error>
) {
	AWS.config.update({
		accessKeyId: "YOUR_ACCESS_KEY_ID",
		secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
		region: "YOUR_REGION",
	});
	const docClient = new AWS.DynamoDB.DocumentClient();
	const params = {
		TableName: "YOUR_TABLE_NAME",
		Key: {
			TO_CHANGE_KEY: "TO_CHANGE_VALUE",
		},
	};

	docClient.get(params, (err, data) => {
		if (err) {
			console.error("Error retrieving content from DynamoDB", err);
			res.status(500).json({ errorMessage: err.message });
		} else {
			console.log("sending", data!.Item);

			res.status(200).json({ data: data!.Item });
		}
	});
}
