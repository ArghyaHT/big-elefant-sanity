import currencyList from '../scripts/currencyList.json';  // adjust path
import { sanityClient } from '../utils/sanityClient';


export default {
    name: 'beverages',
    title: 'Beverage',
    type: 'document',
    fieldsets: [
        {
            name: 'heroBanner',
            title: 'Hero Banner',
            options: { collapsible: true, collapsed: false }, // Optional
        },
        {
            name: 'homeProduct',
            title: 'Home Product',
            options: { collapsible: true, collapsed: false },
        },
        {
            name: 'seo',
            title: 'SEO',
            options: { collapsible: true, collapsed: false },
        },

    ],
    fields: [
        {
            name: 'productName',
            title: 'Product Name',
            type: 'string',
            description: 'Name of the product as it will appear on the site',
        },
        {
            name: 'productImage',
            title: 'Product Image(Feature Image)',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            fieldset: 'seo',

        },
        {
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'string',
            fieldset: 'seo',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            fieldset: 'seo',
            options: {
                source: 'productName',
                maxLength: 96,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')      // Replace spaces with -
                    .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
                    .slice(0, 96),
            },
            validation: Rule => Rule.required(),
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            fieldset: 'seo',
            of: [{ type: 'string' }],
        },
        {
            name: 'isFeatured',
            title: 'Featured Product',
            type: 'boolean',
            description: 'Mark this product as featured (max 5 allowed)',
            initialValue: false,
            validation: (Rule) =>
                Rule.custom(async (isFeatured, context) => {
                    if (!isFeatured) return true;

                    const currentProductId = context.document._id;

                    const count = await sanityClient.fetch(
                        `count(*[_type == "product" && isFeatured == true && !(_id == $currentId)])`,
                        { currentId: currentProductId }
                    );

                    if (count >= 5) {
                        return 'Only 5 products can be featured at the same time.';
                    }
                    return true;
                }),
        },
        {
            name: 'bannerTitle',
            title: 'Banner Title',
            type: 'string',
            fieldset: 'heroBanner',
              hidden: ({ parent }) => !parent?.isFeatured,


        },
        {
            name: 'bannerBackground',
            title: 'Banner Background',
            type: 'image',
            fieldset: 'heroBanner',
            options: {
                hotspot: true,
            },
              hidden: ({ parent }) => !parent?.isFeatured,

        },
        {
            name: 'productFeatures',
            title: 'Product Features',
            type: 'array',
            fieldset: 'homeProduct',
            of: [{ type: 'string' }],
        },
        {
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            fieldset: 'homeProduct',
        },
        {
            name: 'calories',
            title: 'Calories',
            type: 'number',
            fieldset: 'homeProduct',
            validation: Rule => Rule.min(0).error('Calories cannot be negative'),
        },
        {
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'color',
            fieldset: 'homeProduct',
            options: {
                disableAlpha: true, // optional: disables transparency selection
            }
        },
        {
            name: 'currency',
            title: 'Currency',
            type: 'string',
            options: {
                list: currencyList
            },
            initialValue: 'INR',  // set this to the actual value from your currencyList

        },
        {
            name: 'mrpOf4',
            title: 'Marked price for Pack of 4',
            type: 'number',
            validation: Rule => Rule.min(0).error('Price must be positive'),
        },
         {
            name: 'pricePack4',
            title: 'Selling price for Pack of 4',
            type: 'number',
            validation: Rule => Rule.min(0).error('Price must be positive'),
        },
          {
            name: 'stockpack4',
            title: 'Stock for Pack of 4',
            type: 'number',
            validation: Rule => Rule.min(0).error('Stock must be positive'),
        },
           {
            name: 'deliveryChargespack4',
            title: 'Delivery Charges for Pack of 4',
            type: 'number',
            validation: Rule => Rule.min(0).error('Delevery Charges must be positive'),
        },
           {
            name: 'mrpOf6',
            title: 'Marked price for Pack of 6',
            type: 'number',
            validation: Rule => Rule.min(0).error('Price must be positive'),
        },
        {
            name: 'pricePack6',
            title: 'Selling price for Pack of 6',
            type: 'number',
            validation: Rule => Rule.min(0).error('Price must be positive'),
        },
          {
            name: 'stockpack6',
            title: 'Stock for Pack of 6',
            type: 'number',
            validation: Rule => Rule.min(0).error('Stock must be positive'),
        },
           {
            name: 'deliveryChargespack6',
            title: 'Delivery Charges for Pack of 6',
            type: 'number',
            validation: Rule => Rule.min(0).error('Delevery Charges must be positive'),
        },
           {
            name: 'mrpOf12',
            title: 'Marked price for Pack of 12',
            type: 'number',
            validation: Rule => Rule.min(0).error('Price must be positive'),
        },
        {
            name: 'pricePack12',
            title: 'Selling Price for Pack of 12',
            type: 'number',
            validation: Rule => Rule.min(0).error('Price must be positive'),
        },
         {
            name: 'stockpack12',
            title: 'Stock for Pack of 12',
            type: 'number',
            validation: Rule => Rule.min(0).error('Stock must be positive'),
        },
          {
            name: 'deliveryChargespack12',
            title: 'Delivery Charges for Pack of 12',
            type: 'number',
            validation: Rule => Rule.min(0).error('Delevery Charges must be positive'),
        },
        {
            name: 'longDescription',
            title: 'Long Description',
            type: 'text',
        },
        {
            name: 'productImages',
            title: 'Product Image Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        },

        {
  name: 'reviews',
  title: 'Reviews',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'reviewerName',
          title: 'Reviewer Name',
          type: 'string',
        },
        {
          name: 'rating',
          title: 'Rating (Rating must be between 1 and 5)',
          type: 'number',
          validation: (Rule) =>
            Rule
              .min(1)
              .max(5)
              .precision(1)
              .error('Rating must be between 1.0 and 5.0'),
        },
        {
          name: 'reviewText',
          title: 'Review Text',
          type: 'text',
          rows: 4,
        },
      ],
    },
  ],
}

    ],
    preview: {
        select: {
            title: 'productName',
        },
    },
}
