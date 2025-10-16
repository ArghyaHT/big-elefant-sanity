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
            name: 'subtotalPrice',
            title: 'Subtotal Price',
            type: 'number',
            fieldset: 'orderDetails',
        },
        {
            name: 'deliveryCharges',
            title: 'Delivery Charges',
            type: 'number',
            fieldset: 'orderDetails',
        },
        {
            name: 'discountCharges',
            title: 'Discount Charges',
            type: 'number',
            fieldset: 'orderDetails',
        },
        {
            name: 'totalPrice',
            title: 'Total Price',
            type: 'number',
            fieldset: 'orderDetails',
        },

        {
            name: 'paymentMode',
            title: 'Payment Mode',
            type: 'string',
            fieldset: 'orderDetails',
        },

        // Cart Items (Array of Products)
        // {
        //     name: 'products',
        //     title: 'Products',
        //     type: 'array',
        //     of: [
        //         {
        //             type: 'object',
        //             fields: [
        //                 { name: 'id', title: 'Product ID', type: 'string', },
        //                 { name: 'name', title: 'Product Name', type: 'string', },
        //                 { name: 'price', title: 'Price', type: 'number', },
        //                 { name: 'quantity', title: 'Quantity', type: 'number', },
        //                 { name: 'packSize', title: 'Pack Size', type: 'number', },
        //                 { name: 'currency', title: 'Currency', type: 'string', },
        //                 {
        //                     name: 'productImage',
        //                     title: 'Product Image',
        //                     type: 'url',
        //                 },
        //             ],
        //         },
        //     ],
        // },
        {
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                // Beverages
                {
                    type: 'object',
                    name: 'beverage',
                    title: 'Beverage',
                    fields: [
                        { name: 'id', title: 'Product ID', type: 'string' },
                        { name: 'name', title: 'Product Name', type: 'string' },
                        { name: 'price', title: 'Price', type: 'number' },
                        { name: 'quantity', title: 'Quantity', type: 'number' },
                        { name: 'packSize', title: 'Pack Size', type: 'number' },
                        { name: 'currency', title: 'Currency', type: 'string' },
                        { name: 'productImage', title: 'Product Image', type: 'url' },
                    ],
                    preview: {
                        select: {
                            title: 'name', // ✅ Correct field for beverage
                            media: 'productImage', // optional, shows image in preview
                        }
                    }
                },

                // Merchandise
                {
                    type: 'object',
                    name: 'merch',
                    title: 'Merch',
                    fields: [
                        { name: 'id', title: 'Product ID', type: 'string' },
                        { name: 'merchName', title: 'Merch Name', type: 'string' },
                        { name: 'price', title: 'Price', type: 'number' },
                        { name: 'quantity', title: 'Quantity', type: 'number' },
                        { name: 'currency', title: 'Currency', type: 'string' },
                        { name: 'selectedSize', title: 'Selected Size', type: 'string' },
                        { name: 'selectedColor', title: 'Selected Color', type: 'string' },
                        { name: 'productImage', title: 'Product Image', type: 'url' },
                    ],
                    preview: {
                        select: {
                            title: 'merchName', // ✅ Correct field for merch
                            media: 'productImage', // optional
                        }
                    }
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
        // {
        //     name: 'email',
        //     title: 'Email',
        //     type: 'string',
        //     validation: Rule => Rule.required().email().error('Valid email is required'),
        //     fieldset: 'shippingDetails',

        // },
        {
            name: 'contact',
            title: 'Phone Number',
            type: 'string',
            validation: Rule => Rule.required().error('Phone number is required'),
            fieldset: 'shippingDetails',

        },

        // Address Details
        {
            name: 'addressLine1',
            title: 'Flat, House Number',
            type: 'string',
            fieldset: 'shippingDetails',

        },
        {
            name: 'addressLine2',
            title: 'Apartment, Area, Sector, Village',
            type: 'string',
            fieldset: 'shippingDetails',

        },
        // {
        //     name: 'locality',
        //     title: 'Locality',
        //     type: 'string',
        //     fieldset: 'shippingDetails',

        // },
        // {
        //     name: 'landmark',
        //     title: 'Landmark',
        //     type: 'string',
        //     fieldset: 'shippingDetails',

        // },
        {
            name: 'pin',
            title: 'PIN Code',
            type: 'number',
            fieldset: 'shippingDetails',

        },
        {
            name: 'city',
            title: 'City/ District / Town',
            type: 'string',
            fieldset: 'shippingDetails',

        },
        {
            name: 'state',
            title: 'State',
            type: 'string',
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
