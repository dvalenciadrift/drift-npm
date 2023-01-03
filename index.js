const axios = require("axios");

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
		return response.data;
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
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

async function retrieveContactById(contactId, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.get(
			`https://driftapi.com/contacts/${contactId}`,
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

async function deleteContact(contactId, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.delete(
			`https://driftapi.com/contacts/${contactId}`,
			{ headers }
		);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function unsuscribeContacts(emails, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.post(
			`https://driftapi.com/emails/unsubscribe`,
			JSON.stringify(emails),
			{ headers }
		);
		return "Contacts unsuscribed succesfully";
	} catch (error) {
		console.error(error);
	}
}

async function postEvent(data, token) {
	//Required Scope: contact_write
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.post(
			`https://driftapi.com/contacts/timeline`,
			{ contactId: data.contactId, event: data.event },
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

async function listCustomAttributes(token) {
	//Require Scope: all_read_contacts
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.get(
			`https://driftapi.com/contacts/attributes`,
			{ headers }
		);
		return response.data.data;
	} catch (error) {
		console.error(error);
	}
}

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
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

async function listConversations(options, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		let statusIdString = "";
		let nextString = options.next ? `next=${options.next}` : null;
		if (options.statusId) {
			options.statusId.forEach((element) => {
				statusIdString = statusIdString + `&statusId=${element}`;
			});
		}
		const response = await axios.get(
			`https://driftapi.com/conversations/list?limit=${options.limit}${statusIdString}&${nextString}`,
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

async function retrieveConversation(conversationId, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.get(
			`https://driftapi.com/conversations/${conversationId}`,
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

async function retrieveConversationMessages(conversationId, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.get(
			`https://driftapi.com/conversations/${conversationId}/messages`,
			{ headers }
		);
		return response.data.data;
	} catch (error) {
		console.error(error);
	}
}

async function retrieveConversationTranscript(conversationId, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.get(
			`https://driftapi.com/conversations/${conversationId}/transcript`,
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

async function retrieveConversationAttachments(docId, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.get(
			`https://driftapi.com/attachments/${docId}/data`,
			{ headers }
		);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function createConversation(options, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.post(
			`https://driftapi.com/conversations/new`,
			JSON.stringify(options),
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	createContact,
	updateContact,
	retrieveContactById,
	deleteContact,
	unsuscribeContacts,
	postEvent,
	listCustomAttributes,
	createMessage,
	listConversations,
	retrieveConversation,
	retrieveConversationMessages,
	retrieveConversationTranscript,
	retrieveConversationAttachments,
	createConversation,
};
