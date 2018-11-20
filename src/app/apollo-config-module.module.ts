import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Inject, NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Operation } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { environment } from '../environments/environment.prod';
import { GraphcoolConfig, GRAPHCOOL_CONFIG } from './core/providers/graphcool-config.provider';
import { getOperationAST } from 'graphql';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  declarations: []
})
export class ApolloConfigModuleModule {

  constructor(
    private apollo: Apollo,
    @Inject(GRAPHCOOL_CONFIG) private graphcolConfig: GraphcoolConfig,
    private httpLink: HttpLink) {

    const uri = this.graphcolConfig.simpleAPI;
    const http = httpLink.create({ uri });

    const linkError = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Locations: ${locations}, Path: ${path}`));
      }

      if (networkError) { console.log(`[Network error]: ${networkError}`); }
    });

    const ws = new WebSocketLink({
      uri: this.graphcolConfig.subscriptionsAPI,
      options: {
        reconnect: true,
        timeout: 30000
      }
    });

    apollo.create({
      link: ApolloLink.from([
        linkError,
        ApolloLink.split(
          (operation: Operation) => {
            const operationAST = getOperationAST(operation.query, operation.operationName);
            return !!operationAST && operationAST.operation === 'subscription';
          },
          ws,
          http
        )
      ]),
      cache: new InMemoryCache(),
      connectToDevTools: !environment.production
    });
  }

}
