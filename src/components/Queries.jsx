export const ME_QUERY = `
  query {
    me {
      is_guest
      join_date
      email
      id
      account {
        name
        id
      }
    }
  }
`;

export const USER_QUERY = (id) => `
  query {
    users(ids: [${id}]) {
      created_at
      email
      id
      is_guest
      account {
        name
        id
      }
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
