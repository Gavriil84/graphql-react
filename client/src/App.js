import Home from "./components/screen/Home";
import { Routes, Route, Link } from "react-router-dom";
import Individual from "./components/screen/Individual";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:pId/:firstname/:lastname" element={<Individual />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
