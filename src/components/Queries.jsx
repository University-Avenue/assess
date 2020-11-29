export const ME_QUERY = `
  query {
    me {
      is_guest
      join_date
    }
  }
`;

export const GET_ITEMS = `
query {
\tboards () {
\t\tid
    name
    items {
      id
      name
      column_values {
        title
        value
      }
    }
\t}
}
`;
