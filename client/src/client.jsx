import { InMemoryCache } from '@apollo/client/cache';
import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { asyncMap } from '@apollo/client/utilities';

const authMiddlewareLink = new ApolloLink((operation, forward) => {
  const authorizationHeaders = {
    authorization:
      'Bearer ' +
      (localStorage.getItem('AUTH_TOKEN') ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2FkZzh3bGIwMDAxdHduYm4zNnF2cTFqIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiaXRhZG1pbkB0ZWN0b3JvLmNvbSIsImlhdCI6MTU4OTg2NzU3Nn0.wCRc3vJ_3OqqQRK6olf4dGQ6oFf_jHMGxx2eTjOvhtE'),
    'X-External': 'Y',
  };
  operation.setContext({ headers: authorizationHeaders });
  return forward(operation);
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return asyncMap(forward(operation), async (response) => {
    const context = operation.getContext();
    const headers = context.response.headers;
    console.log(headers, 'Array.from headerssss........');
    console.log(Array.from(headers), 'Array.from headerssss........');
    if (headers) {
      const token = headers.get('x-refresh-token');
      if (token) localStorage.setItem('AUTH_TOKEN', token);
    }
    return response;
  });
});

const errorLink = onError(({ graphQLErrors }) => {
  let growlMsg = 'Error in query response';
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      growlMsg = message;
    });
    alert(growlMsg);
    return;
  }
  alert(growlMsg);
});

const cache = new InMemoryCache();
let defaultLinks = [authMiddlewareLink, afterwareLink, errorLink];

const URL = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const Link = ApolloLink.from([...defaultLinks, URL]);

const Client = new ApolloClient({ cache, link: Link });

export { Client };
