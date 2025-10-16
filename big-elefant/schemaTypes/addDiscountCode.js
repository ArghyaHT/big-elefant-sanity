export default {
  name: 'discountCoupon',
  title: 'Discount Coupons',
  type: 'document',
  fields: [
    {
      name: 'couponCode',
      title: 'Add Coupon Code',
      type: 'string',
      description: 'Enter the coupon code customers will use',
      validation: Rule => Rule.required().error('Coupon code is required'),
    },
    {
      name: 'isActive',
      title: 'Active / Inactive',
      type: 'boolean',
      description: 'Toggle to activate or deactivate this coupon',
      initialValue: true,
    },
    {
  name: 'applyToAll',
  title: 'Apply to All Products',
  type: 'boolean',
  description: 'Enable this to apply the coupon to all products',
  initialValue: true, // 👈 default ON
},
{
  name: 'products',
  title: 'Select Products',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'beverages' },
        { type: 'merchandise' },
      ],
    },
  ],
  description: 'Select one or more products that this coupon applies to (if not applying to all)',
  hidden: ({ parent }) => parent?.applyToAll, // 👈 hides when "applyToAll" is true
  validation: Rule =>
    Rule.custom((products, context) => {
      if (!context.parent?.applyToAll && (!products || products.length === 0)) {
        return 'Please select at least one product or enable "Apply to All"';
      }
      return true;
    }),
},
    {
      name: 'validity',
      title: 'Validity Between',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'datetime',
          validation: Rule => Rule.required().error('Start date is required'),
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'datetime',
          validation: Rule => Rule.required().error('End date is required'),
        },
      ],
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          { title: 'Percentage Discount', value: 'percentage' },
          { title: 'Fixed Discount', value: 'fixed' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required().error('Select a discount type'),
    },
    {
      name: 'discountValue',
      title: 'Discount Value',
      type: 'number',
      description: 'Enter discount amount or percentage (based on discount type)',
      validation: Rule => Rule.required().positive().error('Enter a valid discount value'),
    },
  ],

  preview: {
    select: {
      title: 'couponCode',
      active: 'isActive',
      startDate: 'validity.startDate',
      endDate: 'validity.endDate',
    },
    prepare({ title, active, startDate, endDate }) {
      const status = active ? '🟢 Active' : '🔴 Inactive';
      const validity = startDate && endDate
        ? `(${new Date(startDate).toLocaleDateString()} → ${new Date(endDate).toLocaleDateString()})`
        : '(No dates set)';
      return {
        title: title || 'Untitled Coupon',
        subtitle: `${status} ${validity}`,
      };
    },
  },
};
