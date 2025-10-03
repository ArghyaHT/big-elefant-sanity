// ./schemas/customer.js

export default {
  name: 'customer',
  title: 'Customers',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'otp',
      title: 'OTP',
      type: 'number',
    },
    {
      name: 'addresses',
      title: 'Addresses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'firstName',
              title: 'First Name',
              type: 'string',
            },
            {
              name: 'lastName',
              title: 'Last Name',
              type: 'string',
            },
            {
              name: 'phoneNumber',
              title: 'Phone Number',
              type: 'string',
            },
            {
              name: 'addressLine1',
              title: 'Address Line 1',
              type: 'string',
            },
             {
              name: 'addressLine2',
              title: 'Address Line 2',
              type: 'string',
            },
            {
              name: 'city',
              title: 'City',
              type: 'string',
            },
            {
              name: 'state',
              title: 'State',
              type: 'string',
            },
            {
              name: 'locality',
              title: 'Locality',
              type: 'string',
            },
            {
              name: 'landmark',
              title: 'Landmark',
              type: 'string',
            },
            {
              name: 'pin',
              title: 'Pin Code',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
};
