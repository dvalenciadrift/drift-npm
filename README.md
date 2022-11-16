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
