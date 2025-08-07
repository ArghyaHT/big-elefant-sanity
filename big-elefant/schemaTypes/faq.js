// ./schemas/faq.js

export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'About the Brand', value: 'About the Brand' },
          { title: 'Ingredients & Flavors', value: 'Ingredients & Flavors' },
          { title: 'Sustainability', value: 'Sustainability' },
          { title: 'Orders & Shipping', value: 'Orders & Shipping' },
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: Rule => Rule.required(),
    },
  ],
};
