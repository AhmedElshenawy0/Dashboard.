// All Users Query
export const ALL_QUERY = gql`
query {
  users {
    id
    name
    email
    avatar
    role
    creationAt
  }
}
`;
export const GET_PROFILE = gql`
query {
  myProfile {
    id
    name
    avatar
    email
  }
}
`;
// Single User Query
export const SINGLE_USER_QUERY = gql`
query ($id:ID!){
  user(id: $id) {
    id
    name
    email
    avatar
    role
    creationAt
  }
}
`;
