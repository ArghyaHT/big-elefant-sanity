import currencyList from '../scripts/currencyList.json';  // adjust path
import { sanityClient } from '../utils/sanityClient';

export default {
    name: 'merchandise',
    title: 'Merchandise',
    type: 'document',
    fieldsets: [
        {
            name: 'merchProduct',
            title: 'Merch Product',
            options: { collapsible: true, collapsed: false },
        },
        {
            name: 'seo',
            title: 'SEO',
            options: { collapsible: true, collapsed: false },
        },
    ],
    fields: [
        // Basic info
        {
            name: 'merchName',
            title: 'Merch Name',
            type: 'string',
            description: 'Name of the merchandise product as it will appear on the site',
        },
        {
            name: 'merchImage',
            title: 'Merch Image (Feature Image)',
            type: 'image',
            options: { hotspot: true },
        },

        // SEO
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
                source: 'merchName',
                maxLength: 96,
                slugify: input =>
                    input.toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w\-]+/g, '')
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

        // Featured & hero banner
        {
            name: 'isFeatured',
            title: 'Featured Product',
            type: 'boolean',
            initialValue: false,
            description: 'Mark this product as featured (max 5 allowed)',
            validation: Rule =>
                Rule.custom(async (isFeatured, context) => {
                    if (!isFeatured) return true;
                    const currentId = context.document._id;
                    const count = await sanityClient.fetch(
                        `count(*[_type == "merchandise" && isFeatured == true && !(_id == $currentId)])`,
                        { currentId }
                    );
                    return count >= 5
                        ? 'Only 5 products can be featured at the same time.'
                        : true;
                }),
        },
        // Home product section
        {
            name: 'merchFeatures',
            title: 'Merch Features',
            type: 'array',
            fieldset: 'merchProduct',
            of: [{ type: 'string' }],
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            fieldset: 'merchProduct',
        },
        {
            name: 'currency',
            title: 'Currency',
            type: 'string',
            options: { list: currencyList },
            initialValue: 'INR',
        },
        {
            name: 'variants',
            title: 'Variants',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Variant',
                    fields: [
                        // Product type dropdown
                        {
                            name: 'productType',
                            title: 'Product Type',
                            type: 'string',
                            validation: Rule => Rule.required(),
                            options: {
                                list: [
                                    { title: 'Cloth', value: 'Cloth' },
                                    { title: 'Bottle', value: 'Bottle' },
                                    { title: 'Mug', value: 'Mug' },
                                    { title: 'Bag', value: 'Bag' }
                                ],
                                layout: 'dropdown',
                            }
                        },

                        // Color picker
                        {
                            name: 'merchColor',
                            title: 'Merch Color',
                            type: 'color',
                            options: { disableAlpha: true },
                            validation: Rule => Rule.required(),
                        },

                        // Merch images
                        {
                            name: 'merchImages',
                            title: 'Merch Image Gallery',
                            type: 'array',
                            of: [{ type: 'image', options: { hotspot: true } }],
                        },

                        // Cloth sizes
                        {
                            name: 'clothSizes',
                            title: 'Cloth Sizes',
                            type: 'array',
                            hidden: ({ parent }) => parent?.productType !== 'Cloth',
                            of: [
                                {
                                    type: 'object',
                                    title: 'Size',
                                    fields: [
                                        {
                                            name: 'sizeName',
                                            title: 'Size',
                                            type: 'string',
                                            options: {
                                                list: [
                                                    { title: 'S', value: 'S' },
                                                    { title: 'M', value: 'M' },
                                                    { title: 'L', value: 'L' },
                                                    { title: 'XL', value: 'XL' },
                                                    { title: '2XL', value: '2XL' },
                                                    { title: '3XL', value: '3XL' },
                                                ], layout: 'dropdown'
                                            },
                                            validation: Rule => Rule.required(),
                                        },
                                        { name: 'mrp', title: 'MRP', type: 'number', validation: Rule => Rule.min(0) },
                                        { name: 'price', title: 'Selling Price', type: 'number', validation: Rule => Rule.min(0) },
                                        { name: 'stock', title: 'Stock', type: 'number', validation: Rule => Rule.min(0) },
                                        { name: 'deliveryCharges', title: 'Delivery Charges', type: 'number', validation: Rule => Rule.min(0) },
                                    ]
                                }
                            ]
                        },

                        // Bottle / Mug sizes
                        {
                            name: 'bottleSizes',
                            title: 'Bottle/Mug Sizes',
                            type: 'array',
                            hidden: ({ parent }) => parent?.productType !== 'Bottle' && parent?.productType !== 'Mug',
                            of: [
                                {
                                    type: 'object',
                                    title: 'Size',
                                    fields: [
                                        {
                                            name: 'sizeName',
                                            title: 'Size',
                                            type: 'string',
                                            options: {
                                                list: ['300ml', '500ml', '750ml'],
                                                layout: 'dropdown'
                                            },
                                            validation: Rule => Rule.required(),
                                        },
                                        { name: 'mrp', title: 'MRP', type: 'number' },
                                        { name: 'price', title: 'Selling Price', type: 'number' },
                                        { name: 'stock', title: 'Stock', type: 'number' },
                                        { name: 'deliveryCharges', title: 'Delivery Charges', type: 'number' },
                                    ]
                                }
                            ]
                        },

                        // Bag sizes
                        {
                            name: 'bagSizes',
                            title: 'Bag Sizes',
                            type: 'array',
                            hidden: ({ parent }) => parent?.productType !== 'Bag',
                            of: [
                                {
                                    type: 'object',
                                    title: 'Size',
                                    fields: [
                                        {
                                            name: 'sizeName',
                                            title: 'Size',
                                            type: 'string',
                                            options: {
                                                list: ['Small', 'Medium', 'Large'],
                                                layout: 'dropdown'
                                            },
                                            validation: Rule => Rule.required(),
                                        },
                                        { name: 'mrp', title: 'MRP', type: 'number' },
                                        { name: 'price', title: 'Selling Price', type: 'number' },
                                        { name: 'stock', title: 'Stock', type: 'number' },
                                        { name: 'deliveryCharges', title: 'Delivery Charges', type: 'number' },
                                    ]
                                }
                            ]
                        },
                    ],

                    preview: {
                        select: {
                            productName: 'productType',
                            color: 'merchColor.hex',
                            clothCount: 'clothSizes.length',
                            bottleCount: 'bottleSizes.length',
                            bagCount: 'bagSizes.length'
                        },
                        prepare({ productName, color, clothCount, bottleCount, bagCount }) {
                            const sizeCount = clothCount || bottleCount || bagCount || 0;
                            return {
                                title: `${productName || 'Product'} - ${color || 'Color'} (${sizeCount} size(s))`,
                                media: null,
                            };
                        }
                    }
                }
            ]
        },

        // Reviews
        {
            name: 'reviews',
            title: 'Reviews',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'reviewerName', title: 'Reviewer Name', type: 'string' },
                        {
                            name: 'rating',
                            title: 'Rating (1-5)',
                            type: 'number',
                            validation: Rule => Rule.min(1).max(5).precision(1),
                        },
                        { name: 'reviewText', title: 'Review Text', type: 'text', rows: 4 },
                    ],
                },
            ],
        },
    ],

    preview: {
        select: { title: 'merchName', media: 'merchImage' },
    },
};
