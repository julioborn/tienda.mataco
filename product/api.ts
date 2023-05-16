import axios from "axios";
import { Product } from "./types";
const Papa = require('papaparse')

export default {
    list: async (): Promise<Product[]> => {
        return axios
            .get(
                `https://docs.google.com/spreadsheets/d/e/2PACX-1vT1BKeW6ojztspP9auiRwjR2gs_fBJf4e0bSRkdTHKm4cPveq-ZVxhaEiU3BiB8k6qenchsuqjUXG9y/pub?output=csv`,
                {
                    responseType: "blob",
                },
            )
            .then(
                (response) =>
                    new Promise<Product[]>((resolve, reject) => {
                        Papa.parse(response.data, {
                            header: true,
                            complete: (results: { data: Product[]; }) => {
                                const products = results.data as Product[]
                                return resolve(
                                    products.map((product) => ({
                                        ...product,
                                        precio: Number(product.precio),
                                    })),
                                )
                            },
                            error: (error: { message: any; }) => reject(error.message)
                        })
                    })
            )
    }
}