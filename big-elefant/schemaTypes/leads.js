export default {
  name: 'lead',
  title: 'Leads',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required().error('First name is required'),
    },
    // {
    //   name: 'lastName',
    //   title: 'Last Name',
    //   type: 'string',
    // },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email().error('Valid email is required'),
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required().error('Phone number is required'),
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    },
  ],
};
