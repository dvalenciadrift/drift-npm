const axios = require("axios");

async function createMessage(conversationId, options, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.post(
			`https://driftapi.com/conversations/${conversationId}/messages`,
			JSON.stringify(options),
			{ headers }
		);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function createContact(data, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.post(
			`https://driftapi.com/contacts`,
			JSON.stringify({ attributes: data }),
			{ headers }
		);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function updateContact(contactId, data, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.patch(
			`https://driftapi.com/contacts/${contactId}`,
			JSON.stringify({ attributes: data }),
			{ headers }
		);
		return response;
	} catch (error) {
		console.error(error);
	}
}

module.exports.createMessage = createMessage;
module.exports.createContact = createContact;
module.exports.updateContact = updateContact;
