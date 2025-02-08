 // Start of Selection
export const imageSlider = {
    name: 'imageSlider',
    title: 'Image Slider',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'images',
        title: 'Slider Images',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: {
                  hotspot: true,
                },
              },
              {
                name: 'alt',
                title: 'Alt Text',
                type: 'string',
              },
              {
                name: 'caption',
                title: 'Caption',
                type: 'string',
              },
              {
                name: 'link',
                title: 'Link',
                type: 'url',
              },
            ],
          },
        ],
      },
    ],
  };