import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Buy clik Ecommerce Website')
    .items([
      // S.documentTypeListItem('orderType').title('orderType'),
      S.documentTypeListItem('category').title('Categories'),
      // S.documentTypeListItem('productType').title('productType'),
      // S.documentTypeListItem('salesType').title('salesType'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['orderType', 'category', 'productType', 'salesType'].includes(item.getId()!),
      ),
    ])
