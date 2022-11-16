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
driftApi.updateContact("16344778575",  attributesToUpdate,  token).then((res)  =>  console.log(res));
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
