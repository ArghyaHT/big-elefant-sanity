export default {
    name: 'order',
    title: 'Orders',
    type: 'document',
    fieldsets: [
        {
            name: 'shippingDetails',
            title: 'Shipping Details',
            options: { collapsible: true, collapsed: false }, // Optional
        },
         {
            name: 'orderDetails',
            title: 'Order Details',
            options: { collapsible: true, collapsed: false },
        },

    ],

    fields: [
        {
            name: 'orderId',
            title: 'Order Id',
            type: 'string',
            fieldset: 'orderDetails',
        },
         {
            name: 'paymentId',
            title: 'Payment Id',
            type: 'string',
            fieldset: 'orderDetails',
        },
         {
            name: 'status',
            title: 'Status',
            type: 'string',
            fieldset: 'orderDetails',
        },
        {
            name: 'totalPrice',
            title: 'Total Price',
            type: 'number',
            fieldset: 'orderDetails',
        },

          // Cart Items (Array of Products)
        {
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'id', title: 'Product ID', type: 'string', },
                        { name: 'name', title: 'Product Name', type: 'string',},
                        { name: 'price', title: 'Price', type: 'number',  },
                        { name: 'quantity', title: 'Quantity', type: 'number', },
                        { name: 'packSize', title: 'Pack Size', type: 'number', },
                        { name: 'currency', title: 'Currency', type: 'string',},
                        {
                            name: 'productImage',
                            title: 'Product Image',
                            type: 'url',
                        },
                    ],
                },
            ],
        },
        // Customer Information
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required().error('First name is required'),
            fieldset: 'shippingDetails',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: Rule => Rule.required().email().error('Valid email is required'),
            fieldset: 'shippingDetails',

        },
        {
            name: 'contact',
            title: 'Phone Number',
            type: 'string',
            validation: Rule => Rule.required().error('Phone number is required'),
            fieldset: 'shippingDetails',

        },

        // Address Details
        {
            name: 'addressLine',
            title: 'Address Line',
            type: 'string',
            fieldset: 'shippingDetails',

        },
        {
            name: 'locality',
            title: 'Locality',
            type: 'string',
            fieldset: 'shippingDetails',

        },
        {
            name: 'landmark',
            title: 'Landmark',
            type: 'string',
            fieldset: 'shippingDetails',

        },
        {
            name: 'city',
            title: 'City',
            type: 'string',
            fieldset: 'shippingDetails',

        },
        {
            name: 'state',
            title: 'State',
            type: 'string',
            fieldset: 'shippingDetails',

        },
        {
            name: 'pin',
            title: 'Pin Code',
            type: 'number',
            fieldset: 'shippingDetails',

        },
      // Submission Time
        {
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            readOnly: true,
            initialValue: () => new Date().toISOString(),
        },
    ],
};
