import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import 'antd/dist/antd.css'
import Title from './components/layout/Title';
import AddPerson from './components/forms/AddPerson';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title />
        <AddPerson />
      </div>
    </ApolloProvider>
  );
}

export default App;
