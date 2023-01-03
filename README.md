# drift-npm

Drift API wrapper for Node.

## Installation

```
npm install drift-npm --save
```

## API Token

## Contacts API

### `createContact(attributes, token)`

When creating a new contact, you must send an `attributes` object that contains, at least, an `email` key. To view the full list of default attributes, visit [this link](https://devdocs.drift.com/docs/contact-model).

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
const  attributes  =  {
			email:  "newcontact@email.com",
			name:  "New Contact",
};
driftApi.createContact(attributes,  token).then((res)  =>  console.log(res));
```

#### Result:

```
{
  data: {
    id: 16344778575,
    createdAt: 1668615901358,
    attributes: {
      _END_USER_VERSION: 3,
      _end_user_version: 3,
      _calculated_version: 3,
      socialProfiles: {},
      name: 'New Contact',
      email: 'newcontact@email.com',
      events: {},
      tags: [],
      start_date: 1668615901358
    }
  }
}
```

### `updateContact(contactId, attributesToUpdate, token)`

You can update a contact record by providing its `contactId` and an object with the attributes to update.
To create and maintain custom attributes, just perform a PATCH with the new attribute, and we will respect the attribute.

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
const  attributesToUpdate  =  {
					name:  "Updated Contact",
};
driftApi.updateContact("16344778575", attributesToUpdate, token).then((res) => console.log(res));
```

#### Result:

```
{
  data: {
    id: 16344778575,
    createdAt: 1668615901358,
    attributes: {
      _END_USER_VERSION: 3,
      _end_user_version: 3,
      _calculated_version: 3,
      socialProfiles: {},
      name: 'Updated Contact',
      email: 'newcontact@email.com',
      events: {},
      tags: [],
      start_date: 1668615901358
    }
  }
}
```

### `retrieveContactbyId(contactId, token)`

You can retrieve contacts using their `contactId`

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
driftApi.retrieveContactById("16344778575", token).then((res)  => console.log(res.data));
```

#### Result:

```
{
  id: 16344778575,
  createdAt: 1668615901358,
  attributes: {
    _END_USER_VERSION: 4,
    _end_user_version: 4,
    _calculated_version: 4,
    socialProfiles: {},
    name: 'Updated Contact',
    email: 'newcontact@email.com',
    events: {},
    tags: [],
    start_date: 1668615901358
  }
}
```

### `unsuscribeContacts(emails, token)`

When unsubscribing contacts, just provide an array of emails as the first parameter.

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
const  emails  = ["newcontact@email.com"];
driftApi.unsuscribeContacts(emails, token).then((res) => console.log(res));
```

#### Result:

```
Contacts unsuscribed succesfully
```

### `postEvent(eventData, token)`

To post a Timeline Event to a contact you need to pass an `eventData` object with, at least a `contactId` and `event` keys. You can also include a `createdAt`. [Here](https://devdocs.drift.com/docs/posting-timeline-events) you can find additional information about Timeline Events.

> To use `postEvent` you need `contact_write` permission scope.

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
const  eventData  =  {
				contactId:  "16344778575",
				event:  "This is a Timeline Event",
};
driftApi.postEvent(eventData, token).then((res) => console.log(res.data));
```

#### Result:

```
{
  attributes: {},
  event: 'this is a timeline event',
  createdAt: 1668624543328,
  contactId: 16344778575
}
```

### `listCustomAttributes(token)`

You can use `listCustomAttributes` to return all the created/enabled custom contact fields in the organization's account.

> To use `listCustomAttributes` you need `all_contact_read` permission scope.

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
driftApi.listCustomAttributes(token).then((res) => console.log(res));
```

#### Result:

```
{
  properties: [
    { type: 'STRING', displayName: 'Alias', name: 'alias' },
    { type: 'STRING', displayName: 'avatar_url', name: 'avatar_url' },
    { type: 'STRING', displayName: 'bio', name: 'bio' },
    { type: 'STRING', displayName: 'City', name: 'city' },
    { type: 'STRING', displayName: 'Country', name: 'country' },
    { type: 'STRING', displayName: 'custom_utm', name: 'custom_utm' },
    ...
    ...
  ]
}
```

## Conversations API

### `createMessate(conversationId, options, token)`

Post a new message into the specified conversation. You can send chat messages or private notes, send buttons and specify the drift user that is sending the message with their ID.

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
const  options  =  {
	type:  "chat", //or "private_note"
	body:  "This is the message body", //optional
	"buttons":  [  //optional
		{"value":  "yes please", "label":  "yes please", "type":  "reply"}],
	"userId":  12345  //optional
};
driftApi.createMessage("3655684801", options, token).then((res) => console.log(res));
```

#### Result:

```
{
  data: {
    id: 14331424770,
    conversationId: 3655684801,
    body: 'This is the message body',
    author: { id: 5136943, type: 'user', bot: true },
    type: 'chat',
    createdAt: 1672759766709,
    context: { ip: '18.232.245.220', location: [Object] },
    attributes: { developer_app_id: '7bcf4690-4696-4079-b5db-165ed74fa127' }
  }
}
```

### listConversations(options, token)

Query the conversations in your Drift account. This is a paginated endpoint which defaults to 25 results per request and maximum 50 results.

**statusId:**
1: OPEN
2: CLOSED
3: PENDING

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
const  options  =  {
	limit: 5, //optional (25 default, 50 max)
	statusId: [1], //optional
	next: "2", //optional
};
driftApi.listConversations(options, token).then((res) => console.log(res));
```

#### Result:

```
{
  data: [
    {
      status: 'open',
      contactId: 16657938742,
      createdAt: 1671114583608,
      id: 3669254414,
      inboxId: 692556,
      updatedAt: 1671114593381
    },
    {
      status: 'open',
      contactId: 16649655387,
      createdAt: 1671047134090,
      id: 3668802704,
      inboxId: 692556,
      updatedAt: 1671047198908
    }
  ],
  pagination: { more: true, next: '4' },
  links: {
    self: 'https://api.drift.com/conversations/list?page_token=c3RhdHVzSWRzPTEmaGlnaGVzdFVwZGF0ZWRBdD0xNjcxMTE0NTkzMzgxJmhpZ2hlc3RJZD0zNjY5MjU0NDEzJmxpbWl0PTI',
    next: 'https://api.drift.com/conversations/list?page_token=c3RhdHVzSWRzPTEmaGlnaGVzdFVwZGF0ZWRBdD0xNjcxMDQ3MTk4OTA4JmhpZ2hlc3RJZD0zNjY4ODAyNzA0JmxpbWl0PTI'
  }
}
```

### retrieveConversation(conversationId, token)

Get detailed information about a particular conversation.

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
driftApi.retrieveConversation("3635813266", token).then((res) => console.log(res));
```

#### Result:

```
{
  data: {
    status: 'open',
    participants: [ 5136942 ],
    contactId: 16166831393,
    createdAt: 1667330738928,
    id: 3635813266,
    relatedPlaybookId: 2536091,
    inboxId: 692556,
    updatedAt: 1668091121313
  }
}
```

### retrieveConversationMessages(conversationId, token)

Returns an array of messages for a specific conversation.

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
driftApi.retrieveConversationMessages("3670145878", token).then((res) => console.log(res));
```

#### Result:

```
{
  messages: [
    {
      id: 14272728303,
      conversationId: 3670145878,
      author: [Object],
      type: 'chat',
      createdAt: 1671223319461,
      context: [Object],
      attributes: [Object]
    },
    {
      id: 14272728336,
      conversationId: 3670145878,
      body: '<p>Hey there!</p>',
      author: [Object],
      type: 'chat',
      createdAt: 1671223319868,
      attributes: {}
    },
    {
      id: 14272728346,
      conversationId: 3670145878,
      body: '<p>Want to book a meeting</p>',
      author: [Object],
      type: 'chat',
      createdAt: 1671223320031,
      buttons: [Array],
      attributes: {}
    },
    ...
 ]
}
```

### retrieveConversationTranscript(conversationId, token)

Returns a formatted transcript for a specific conversation

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
driftApi.retrieveConversationTranscript("3670145878", token).then((res) => console.log(res));
```

#### Result:

```
Dec 16, 03:41:59 PM EST Bot (Agent): Hey there!
Dec 16, 03:42:00 PM EST Bot (Agent): Want to book a meeting
Dec 16, 03:42:04 PM EST null: Yes
Dec 16, 03:42:05 PM EST Bot (Agent): I'll send you a meeting invite. What's your email address?
Dec 16, 03:42:13 PM EST dvalencia@drift.com: dvalencia@drift.com
Dec 16, 03:42:14 PM EST Bot (Agent): You can grab a time on agent@email.com's calendar here.
Dec 16, 03:42:24 PM EST Bot (Agent): All set! I've sent an email confirmation to dvalencia@drift.com.
```

### createConversation(options, token)

Use an email address to create a new conversation. A common use case is creating conversations in Drift that represent activity from other data sources, enabling Drift to be your one-stop shop for contact activity.
Note that Drift cookies will not be attached to contacts created through the endpoint.

#### Usage:

```
const driftApi =  require("drift-npm");
const  token  =  "XXXXXXXXXXXXXX"; //Replace with your token;
const options = {
	email: "user@email.com",
	message: {
		body: "A conversation was started let's resume from drift!",
		attributes: {
			integrationSource: "Message from facebook",
		},
	},
};
driftApi.createConversation(options, token).then((res) => console.log(res));
```

#### Result:

```
{
  status: 'open',
  contactId: 15876049972,
  createdAt: 1672785977005,
  id: 3678044627,
  inboxId: 692556,
  updatedAt: 1672785977007
}
```
