import { InMemoryCache } from '@apollo/client/core';
import { possibleTypes } from "./possibleTypes.json";


const cache = new InMemoryCache({ possibleTypes })

export default ({ $config }) => {
    return {
        httpEndpoint: $config.baseUrl + "/graphql", // process.env.BACKEND_URL + "/graphql" ||
        cache,
    }
}